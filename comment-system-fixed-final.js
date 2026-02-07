// ==========================================
// FIXED COMMENT SYSTEM WITH ADMIN SUPPORT
// ==========================================

class CommentSystemFixed {
    constructor() {
        this.commentsListener = null;
        this.pinnedComments = new Set();
        this.adminEmails = []; // Will be loaded from script.js
        this.retryCount = 0;
        this.maxRetries = 3;
    }

    // Set admin emails from main script
    setAdminEmails(emails) {
        this.adminEmails = emails.map(e => e.toLowerCase());
        console.log('Admin emails configured:', this.adminEmails.length);
    }

    // Check if current user is admin
    isAdmin() {
        if (!currentUser || !currentUser.email) return false;
        const userEmail = currentUser.email.toLowerCase();
        const isAdminUser = this.adminEmails.includes(userEmail);
        console.log('Admin check:', userEmail, '=', isAdminUser);
        return isAdminUser;
    }

    // Initialize comment system for current chapter
    initialize(seriesId, bookId, chapterId) {
        console.log('Initializing comments for chapter:', chapterId);
        this.cleanup();
        this.retryCount = 0;
        this.loadComments(seriesId, bookId, chapterId);
        this.loadPinnedComments(seriesId, bookId, chapterId);
    }

    // Load comments with retry logic
    async loadComments(seriesId, bookId, chapterId) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) {
            console.error('Comments list element not found');
            return;
        }

        commentsList.innerHTML = '<div class="comments-loading">Loading comments</div>';

        try {
            // Use onSnapshot for real-time updates
            this.commentsListener = db.collection('comments')
                .where('seriesId', '==', seriesId)
                .where('bookId', '==', bookId)
                .where('chapterId', '==', chapterId)
                .orderBy('timestamp', 'desc')
                .onSnapshot(
                    (snapshot) => {
                        console.log('Comments loaded:', snapshot.size);
                        this.retryCount = 0; // Reset retry count on success
                        this.renderComments(snapshot);
                    },
                    (error) => {
                        console.error('Error loading comments:', error);
                        this.handleLoadError(error, seriesId, bookId, chapterId);
                    }
                );
        } catch (error) {
            console.error('Error setting up comment listener:', error);
            this.handleLoadError(error, seriesId, bookId, chapterId);
        }
    }

    // Handle loading errors
    handleLoadError(error, seriesId, bookId, chapterId) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        this.retryCount++;
        
        if (this.retryCount < this.maxRetries) {
            commentsList.innerHTML = `
                <div class="comments-error">
                    <p>Connection issue. Retrying... (${this.retryCount}/${this.maxRetries})</p>
                </div>
            `;
            
            // Retry after 2 seconds
            setTimeout(() => {
                this.loadComments(seriesId, bookId, chapterId);
            }, 2000);
        } else {
            commentsList.innerHTML = `
                <div class="comments-error">
                    <p>Failed to load comments. Please check your connection.</p>
                    <button class="retry-btn" onclick="commentSystemFixed.initialize(${seriesId}, ${bookId}, ${chapterId})">
                        Try Again
                    </button>
                </div>
            `;
        }
    }

    // Render comments
    renderComments(snapshot) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        commentsList.innerHTML = '';

        if (snapshot.empty) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            return;
        }

        // Separate pinned and regular comments
        const pinnedCommentEls = [];
        const regularCommentEls = [];

        snapshot.forEach(doc => {
            const comment = doc.data();
            const commentEl = this.createCommentElement(doc.id, comment);
            
            if (this.pinnedComments.has(doc.id)) {
                pinnedCommentEls.push(commentEl);
            } else {
                regularCommentEls.push(commentEl);
            }
        });

        // Add pinned comments first
        if (pinnedCommentEls.length > 0) {
            const pinnedSection = document.createElement('div');
            pinnedSection.className = 'pinned-comments-section';
            pinnedSection.innerHTML = '<h4 class="pinned-title">📌 Pinned Comments</h4>';
            pinnedCommentEls.forEach(el => pinnedSection.appendChild(el));
            commentsList.appendChild(pinnedSection);
        }

        // Add regular comments
        regularCommentEls.forEach(el => commentsList.appendChild(el));
    }

    // Create comment element
    createCommentElement(commentId, comment) {
        const date = comment.timestamp ? comment.timestamp.toDate() : new Date();
        const dateStr = this.formatDate(date);
        const isPinned = this.pinnedComments.has(commentId);
        const isSpoiler = comment.isSpoiler || false;
        const isCommentByAdmin = this.adminEmails.includes(comment.authorEmail.toLowerCase());
        const canManage = this.isAdmin(); // Only admins can manage ANY comment

        const div = document.createElement('div');
        div.className = `comment ${isPinned ? 'pinned' : ''} ${isSpoiler ? 'has-spoiler' : ''}`;
        div.dataset.commentId = commentId;

        div.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">
                    ${this.escapeHtml(comment.authorEmail)}
                    ${isCommentByAdmin ? '<span class="admin-badge">ADMIN</span>' : ''}
                </span>
                <span class="comment-date">${dateStr}</span>
                ${isPinned ? '<span class="pin-badge">📌 Pinned</span>' : ''}
            </div>
            <div class="comment-body">
                ${isSpoiler ? this.renderSpoilerComment(comment.text) : `<p class="comment-text">${this.escapeHtml(comment.text)}</p>`}
            </div>
            ${canManage ? this.renderCommentActions(commentId, isPinned) : ''}
        `;

        // Attach event listeners
        if (isSpoiler) {
            const spoilerToggle = div.querySelector('.spoiler-toggle');
            if (spoilerToggle) {
                spoilerToggle.onclick = (e) => {
                    e.preventDefault();
                    const spoilerContent = div.querySelector('.spoiler-content');
                    spoilerContent.classList.toggle('revealed');
                    spoilerToggle.textContent = spoilerContent.classList.contains('revealed') 
                        ? 'Hide Spoiler' 
                        : 'Show Spoiler';
                };
            }
        }

        return div;
    }

    // Render spoiler comment
    renderSpoilerComment(text) {
        return `
            <div class="spoiler-warning">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <span>This comment contains spoilers</span>
            </div>
            <div class="spoiler-content">
                <p class="comment-text">${this.escapeHtml(text)}</p>
            </div>
            <button class="spoiler-toggle">Show Spoiler</button>
        `;
    }

    // Render comment actions (for admins only)
    renderCommentActions(commentId, isPinned) {
        return `
            <div class="comment-actions">
                <button class="pin-btn" onclick="commentSystemFixed.togglePin('${commentId}')">
                    ${isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button class="delete-btn" onclick="commentSystemFixed.deleteComment('${commentId}')">
                    Delete
                </button>
            </div>
        `;
    }

    // Submit new comment
    async submitComment(text, isSpoiler = false) {
        if (!currentUser) {
            showAuthModal();
            return false;
        }

        if (!text.trim()) return false;

        try {
            await db.collection('comments').add({
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                authorEmail: currentUser.email,
                text: text.trim(),
                isSpoiler: isSpoiler,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('Comment posted successfully');
            return true;
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }

    // Delete comment (admin only)
    async deleteComment(commentId) {
        if (!this.isAdmin()) {
            alert('Only admins can delete comments');
            return;
        }

        if (!confirm('Are you sure you want to delete this comment?')) {
            return;
        }

        try {
            await db.collection('comments').doc(commentId).delete();
            console.log('Comment deleted:', commentId);
            
            // Also remove from pinned if it was pinned
            if (this.pinnedComments.has(commentId)) {
                this.pinnedComments.delete(commentId);
                await this.savePinnedComments(
                    `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`
                );
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment: ' + error.message);
        }
    }

    // Toggle pin status (admin only)
    async togglePin(commentId) {
        if (!this.isAdmin()) {
            alert('Only admins can pin comments');
            return;
        }

        const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
        
        if (this.pinnedComments.has(commentId)) {
            // Unpin
            this.pinnedComments.delete(commentId);
        } else {
            // Pin (limit to 3)
            if (this.pinnedComments.size >= 3) {
                alert('Maximum 3 pinned comments allowed');
                return;
            }
            this.pinnedComments.add(commentId);
        }
        
        await this.savePinnedComments(chapterKey);
    }

    // Load pinned comments
    async loadPinnedComments(seriesId, bookId, chapterId) {
        const chapterKey = `s${seriesId}_b${bookId}_c${chapterId}`;
        
        try {
            const doc = await db.collection('pinnedComments').doc(chapterKey).get();
            if (doc.exists) {
                this.pinnedComments = new Set(doc.data().commentIds || []);
                console.log('Loaded pinned comments:', this.pinnedComments.size);
            } else {
                this.pinnedComments.clear();
            }
        } catch (error) {
            console.error('Error loading pinned comments:', error);
            this.pinnedComments.clear();
        }
    }

    // Save pinned comments
    async savePinnedComments(chapterKey) {
        try {
            await db.collection('pinnedComments').doc(chapterKey).set({
                commentIds: [...this.pinnedComments],
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log('Pinned comments saved');
        } catch (error) {
            console.error('Error saving pinned comments:', error);
            alert('Failed to update pinned status');
        }
    }

    // Format date
    formatDate(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 7) {
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
            });
        } else if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return 'Just now';
        }
    }

    // Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup
    cleanup() {
        if (this.commentsListener) {
            this.commentsListener();
            this.commentsListener = null;
        }
        this.pinnedComments.clear();
    }
}

// Create global instance
const commentSystemFixed = new CommentSystemFixed();

// Setup enhanced comment form
function setupEnhancedCommentForm() {
    const form = document.getElementById('comment-form');
    if (!form) return;

    // Add spoiler checkbox
    const footer = form.querySelector('.comment-form-footer');
    if (!footer.querySelector('.spoiler-checkbox')) {
        const spoilerDiv = document.createElement('div');
        spoilerDiv.className = 'spoiler-checkbox';
        spoilerDiv.innerHTML = `
            <label>
                <input type="checkbox" id="spoiler-toggle-input">
                <span>Mark as spoiler</span>
            </label>
        `;
        footer.insertBefore(spoilerDiv, footer.firstChild);
    }

    // Update form submit handler
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const textarea = document.getElementById('comment-input');
        const text = textarea.value.trim();
        const isSpoiler = document.getElementById('spoiler-toggle-input')?.checked || false;
        
        if (!text) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            await commentSystemFixed.submitComment(text, isSpoiler);
            
            // Reset form
            textarea.value = '';
            document.getElementById('char-count').textContent = '0/1000';
            if (document.getElementById('spoiler-toggle-input')) {
                document.getElementById('spoiler-toggle-input').checked = false;
            }
            
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Post';
        }
    };
}

// Export for use in main script
window.commentSystemFixed = commentSystemFixed;
window.setupEnhancedCommentForm = setupEnhancedCommentForm;
