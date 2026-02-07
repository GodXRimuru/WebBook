// ==========================================
// COMPLETE COMMENT SYSTEM WITH ADMIN FEATURES
// ==========================================

class CommentSystem {
    constructor() {
        this.currentUser = null;
        this.currentChapterId = null;
        this.adminEmails = [];
        this.comments = [];
        this.unsubscribe = null;
    }

    // Initialize the comment system
    async init(chapterId, user, adminEmails = []) {
        this.currentChapterId = chapterId;
        this.currentUser = user;
        this.adminEmails = adminEmails.map(email => email.toLowerCase());
        
        // Load comments
        await this.loadComments();
        
        // Setup UI
        this.setupUI();
    }

    // Check if user is admin
    isAdmin(email) {
        if (!email) return false;
        return this.adminEmails.includes(email.toLowerCase());
    }

    // Load comments from Firestore
    async loadComments() {
        if (!this.currentChapterId) return;

        try {
            // Unsubscribe from previous listener
            if (this.unsubscribe) {
                this.unsubscribe();
            }

            const commentsRef = db.collection('comments')
                .where('chapterId', '==', this.currentChapterId)
                .orderBy('timestamp', 'desc');

            // Real-time listener
            this.unsubscribe = commentsRef.onSnapshot((snapshot) => {
                this.comments = [];
                snapshot.forEach((doc) => {
                    this.comments.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                this.renderComments();
            }, (error) => {
                console.error('Error loading comments:', error);
                this.showError('Failed to load comments');
            });
        } catch (error) {
            console.error('Error setting up comment listener:', error);
            this.showError('Failed to setup comments');
        }
    }

    // Render comments to DOM
    renderComments() {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        if (this.comments.length === 0) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
            return;
        }

        commentsList.innerHTML = this.comments.map(comment => this.createCommentHTML(comment)).join('');
    }

    // Create HTML for a single comment
    createCommentHTML(comment) {
        const isUserAdmin = this.isAdmin(comment.userEmail);
        const canDelete = this.currentUser && 
                         (comment.userId === this.currentUser.uid || 
                          this.isAdmin(this.currentUser.email));
        
        const timeAgo = this.getTimeAgo(comment.timestamp);
        
        return `
            <div class="comment" data-comment-id="${comment.id}">
                <div class="comment-header">
                    <div class="comment-user">
                        <div class="comment-avatar">
                            ${comment.photoURL ? 
                                `<img src="${comment.photoURL}" alt="${comment.userName}">` :
                                `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                                    <circle cx="12" cy="7" r="4"/>
                                </svg>`
                            }
                        </div>
                        <div class="comment-info">
                            <div class="comment-name">
                                ${this.escapeHTML(comment.userName)}
                                ${isUserAdmin ? '<span class="admin-badge">ADMIN</span>' : ''}
                            </div>
                            <div class="comment-time">${timeAgo}</div>
                        </div>
                    </div>
                    ${canDelete ? `
                        <button class="comment-delete" onclick="window.commentSystem.deleteComment('${comment.id}')">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    ` : ''}
                </div>
                <div class="comment-text">${this.escapeHTML(comment.text)}</div>
            </div>
        `;
    }

    // Setup UI event listeners
    setupUI() {
        const commentForm = document.getElementById('comment-form');
        const commentInput = document.getElementById('comment-input');
        const submitBtn = document.getElementById('submit-comment');

        if (!commentForm || !commentInput || !submitBtn) return;

        // Update UI based on login state
        if (this.currentUser) {
            commentInput.disabled = false;
            commentInput.placeholder = 'Share your thoughts...';
            submitBtn.disabled = false;
        } else {
            commentInput.disabled = true;
            commentInput.placeholder = 'Please login to comment';
            submitBtn.disabled = true;
        }

        // Character counter
        const charCount = document.getElementById('char-count');
        if (charCount && commentInput) {
            commentInput.addEventListener('input', () => {
                const length = commentInput.value.length;
                charCount.textContent = `${length}/1000`;
                
                if (length > 1000) {
                    charCount.style.color = '#ef4444';
                } else {
                    charCount.style.color = '';
                }
            });
        }

        // Form submission
        commentForm.onsubmit = async (e) => {
            e.preventDefault();
            await this.postComment();
        };
    }

    // Post a new comment
    async postComment() {
        if (!this.currentUser) {
            this.showError('Please login to comment');
            return;
        }

        const commentInput = document.getElementById('comment-input');
        const submitBtn = document.getElementById('submit-comment');
        
        if (!commentInput) return;

        const text = commentInput.value.trim();

        if (!text) {
            this.showError('Comment cannot be empty');
            return;
        }

        if (text.length > 1000) {
            this.showError('Comment is too long (max 1000 characters)');
            return;
        }

        // Disable form while submitting
        if (submitBtn) submitBtn.disabled = true;
        commentInput.disabled = true;

        try {
            await db.collection('comments').add({
                chapterId: this.currentChapterId,
                userId: this.currentUser.uid,
                userEmail: this.currentUser.email || '',
                userName: this.currentUser.displayName || this.currentUser.email || 'Anonymous',
                photoURL: this.currentUser.photoURL || '',
                text: text,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            // Clear input
            commentInput.value = '';
            const charCount = document.getElementById('char-count');
            if (charCount) charCount.textContent = '0/1000';

            this.showSuccess('Comment posted!');
        } catch (error) {
            console.error('Error posting comment:', error);
            this.showError('Failed to post comment. Please try again.');
        } finally {
            // Re-enable form
            if (submitBtn) submitBtn.disabled = false;
            commentInput.disabled = false;
        }
    }

    // Delete a comment
    async deleteComment(commentId) {
        if (!this.currentUser) return;

        if (!confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            await db.collection('comments').doc(commentId).delete();
            this.showSuccess('Comment deleted');
        } catch (error) {
            console.error('Error deleting comment:', error);
            this.showError('Failed to delete comment');
        }
    }

    // Helper: Get time ago string
    getTimeAgo(timestamp) {
        if (!timestamp) return 'Just now';

        const now = new Date();
        const commentDate = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const seconds = Math.floor((now - commentDate) / 1000);

        if (seconds < 60) return 'Just now';
        
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        
        const days = Math.floor(hours / 24);
        if (days < 7) return `${days}d ago`;
        
        const weeks = Math.floor(days / 7);
        if (weeks < 4) return `${weeks}w ago`;
        
        const months = Math.floor(days / 30);
        if (months < 12) return `${months}mo ago`;
        
        const years = Math.floor(days / 365);
        return `${years}y ago`;
    }

    // Helper: Escape HTML
    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Helper: Show error message
    showError(message) {
        const toast = this.createToast(message, 'error');
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Helper: Show success message
    showSuccess(message) {
        const toast = this.createToast(message, 'success');
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Helper: Create toast element
    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `comment-toast ${type}`;
        toast.textContent = message;
        return toast;
    }

    // Cleanup
    destroy() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }
}

// Create global instance
window.commentSystem = new CommentSystem();
