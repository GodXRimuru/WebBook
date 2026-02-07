// ==========================================
// COMPLETELY REBUILT COMMENT SYSTEM - FIXED
// ==========================================
// This is a complete rewrite to fix all comment loading and display issues

class CommentSystemFixed {
    constructor() {
        this.commentsListener = null;
        this.pinnedComments = new Set();
        this.isInitialized = false;
        this.currentSeriesId = null;
        this.currentBookId = null;
        this.currentChapterId = null;
    }

    // Initialize comment system for current chapter
    async initialize(seriesId, bookId, chapterId) {
        console.log('Initializing comments for:', { seriesId, bookId, chapterId });
        
        // Store current chapter info
        this.currentSeriesId = seriesId;
        this.currentBookId = bookId;
        this.currentChapterId = chapterId;
        
        // Cleanup any existing listeners
        this.cleanup();
        
        // Load pinned comments first
        await this.loadPinnedComments(seriesId, bookId, chapterId);
        
        // Setup real-time listener
        this.setupRealtimeListener(seriesId, bookId, chapterId);
        
        this.isInitialized = true;
    }

    // Setup real-time listener for comments
    setupRealtimeListener(seriesId, bookId, chapterId) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) {
            console.error('Comments list element not found');
            return;
        }

        commentsList.innerHTML = '<div class="loading-comments"><span>Loading comments...</span></div>';

        try {
            // Create query for this specific chapter
            const query = db.collection('comments')
                .where('seriesId', '==', String(seriesId))
                .where('bookId', '==', String(bookId))
                .where('chapterId', '==', String(chapterId))
                .orderBy('timestamp', 'desc')
                .limit(100);

            // Listen for real-time updates
            this.commentsListener = query.onSnapshot(
                (snapshot) => {
                    console.log('Comments snapshot received:', snapshot.size, 'comments');
                    this.renderComments(snapshot);
                },
                (error) => {
                    console.error('Error loading comments:', error);
                    
                    // If index error, try without orderBy
                    if (error.code === 'failed-precondition') {
                        console.log('Retrying without orderBy...');
                        this.setupFallbackListener(seriesId, bookId, chapterId);
                    } else {
                        commentsList.innerHTML = `
                            <div class="error-message">
                                <p>Failed to load comments. Please refresh the page.</p>
                                <p class="error-detail">${error.message}</p>
                            </div>
                        `;
                    }
                }
            );
        } catch (error) {
            console.error('Error setting up listener:', error);
            commentsList.innerHTML = `
                <div class="error-message">
                    <p>Error setting up comments. Please try again.</p>
                </div>
            `;
        }
    }

    // Fallback listener without orderBy
    setupFallbackListener(seriesId, bookId, chapterId) {
        const commentsList = document.getElementById('comments-list');
        
        try {
            const query = db.collection('comments')
                .where('seriesId', '==', String(seriesId))
                .where('bookId', '==', String(bookId))
                .where('chapterId', '==', String(chapterId))
                .limit(100);

            this.commentsListener = query.onSnapshot(
                (snapshot) => {
                    console.log('Fallback comments loaded:', snapshot.size);
                    this.renderComments(snapshot);
                },
                (error) => {
                    console.error('Fallback error:', error);
                    commentsList.innerHTML = `
                        <div class="error-message">
                            <p>Unable to load comments.</p>
                            <button onclick="location.reload()" class="retry-btn">Refresh Page</button>
                        </div>
                    `;
                }
            );
        } catch (error) {
            console.error('Fallback setup error:', error);
        }
    }

    // Render comments
    renderComments(snapshot) {
        const commentsList = document.getElementById('comments-list');
        if (!commentsList) return;

        commentsList.innerHTML = '';

        if (snapshot.empty) {
            commentsList.innerHTML = `
                <div class="no-comments">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <p>No comments yet.</p>
                    <p class="sub-text">Be the first to share your thoughts!</p>
                </div>
            `;
            return;
        }

        // Convert snapshot to array and sort by timestamp
        const comments = [];
        snapshot.forEach(doc => {
            const data = doc.data();
            comments.push({
                id: doc.id,
                ...data,
                timestamp: data.timestamp ? data.timestamp.toDate() : new Date()
            });
        });

        // Sort by timestamp (newest first)
        comments.sort((a, b) => b.timestamp - a.timestamp);

        // Separate pinned and regular comments
        const pinnedComments = comments.filter(c => this.pinnedComments.has(c.id));
        const regularComments = comments.filter(c => !this.pinnedComments.has(c.id));

        // Add pinned comments section
        if (pinnedComments.length > 0) {
            const pinnedSection = document.createElement('div');
            pinnedSection.className = 'pinned-comments-section';
            pinnedSection.innerHTML = '<h4 class="pinned-title">📌 Pinned Comments</h4>';
            
            pinnedComments.forEach(comment => {
                const commentEl = this.createCommentElement(comment, true);
                pinnedSection.appendChild(commentEl);
            });
            
            commentsList.appendChild(pinnedSection);
        }

        // Add regular comments
        regularComments.forEach(comment => {
            const commentEl = this.createCommentElement(comment, false);
            commentsList.appendChild(commentEl);
        });

        console.log('Rendered', comments.length, 'comments');
    }

    // Create comment element
    createCommentElement(comment, isPinned) {
        const dateStr = this.formatDate(comment.timestamp);
        const isSpoiler = comment.isSpoiler || false;

        const div = document.createElement('div');
        div.className = `comment ${isPinned ? 'pinned' : ''} ${isSpoiler ? 'has-spoiler' : ''}`;
        div.dataset.commentId = comment.id;

        // Create comment HTML
        const commentHTML = `
            <div class="comment-header">
                <span class="comment-author">${this.escapeHtml(comment.authorEmail || 'Anonymous')}</span>
                <span class="comment-date">${dateStr}</span>
                ${isPinned ? '<span class="pin-badge">📌 Pinned</span>' : ''}
            </div>
            <div class="comment-body">
                ${isSpoiler ? this.renderSpoilerComment(comment.text || '') : `<p class="comment-text">${this.escapeHtml(comment.text || '')}</p>`}
            </div>
            ${this.canManageComment(comment) ? this.renderCommentActions(comment.id, isPinned) : ''}
        `;

        div.innerHTML = commentHTML;

        // Attach event listeners for spoiler toggle
        if (isSpoiler) {
            const spoilerToggle = div.querySelector('.spoiler-toggle');
            if (spoilerToggle) {
                spoilerToggle.addEventListener('click', (e) => {
                    e.preventDefault();
                    const spoilerContent = div.querySelector('.spoiler-content');
                    if (spoilerContent) {
                        spoilerContent.classList.toggle('revealed');
                        spoilerToggle.textContent = spoilerContent.classList.contains('revealed') 
                            ? 'Hide Spoiler' 
                            : 'Show Spoiler';
                    }
                });
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

    // Render comment actions
    renderCommentActions(commentId, isPinned) {
        return `
            <div class="comment-actions">
                <button class="action-btn pin-btn" onclick="commentSystemFixed.togglePin('${commentId}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
                    </svg>
                    ${isPinned ? 'Unpin' : 'Pin'}
                </button>
                <button class="action-btn delete-btn" onclick="commentSystemFixed.deleteComment('${commentId}')">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Delete
                </button>
            </div>
        `;
    }

    // Check if user can manage comment
    canManageComment(comment) {
        if (!currentUser) return false;
        
        // Check if user is admin
        // IMPORTANT: Add admin emails here - works for ALL login methods
        // (Email/Password, Google, GitHub, Facebook, Twitter)
        const ADMIN_EMAILS = [
            'gamersandip872@gmail.com',  // Replace with your email
            // Add more admin emails (use the email from their OAuth account):
            // 'admin@gmail.com',        // Works if they login with Google
            // 'mod@yahoo.com',          // Works if they login with Email/Password
            // 'friend@outlook.com',     // Works if they login with GitHub
        ];
        
        // Normalize emails for comparison
        const currentEmail = currentUser.email ? currentUser.email.toLowerCase().trim() : '';
        const commentEmail = comment.authorEmail ? comment.authorEmail.toLowerCase().trim() : '';
        
        const isAdmin = ADMIN_EMAILS.some(adminEmail => 
            adminEmail.toLowerCase().trim() === currentEmail
        );
        
        // Allow if user is comment author OR is admin
        return currentEmail === commentEmail || isAdmin;
    }

    // Submit new comment
    async submitComment(text, isSpoiler = false) {
        if (!currentUser) {
            alert('Please sign in to comment');
            showAuthModal();
            return false;
        }

        if (!text || !text.trim()) {
            alert('Please enter a comment');
            return false;
        }

        if (!this.currentSeriesId || !this.currentBookId || !this.currentChapterId) {
            console.error('Chapter information missing');
            return false;
        }

        try {
            console.log('Submitting comment...');
            
            await db.collection('comments').add({
                seriesId: String(this.currentSeriesId),
                bookId: String(this.currentBookId),
                chapterId: String(this.currentChapterId),
                authorEmail: currentUser.email,
                text: text.trim(),
                isSpoiler: isSpoiler,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            console.log('Comment submitted successfully');
            return true;
        } catch (error) {
            console.error('Error posting comment:', error);
            alert('Failed to post comment: ' + error.message);
            return false;
        }
    }

    // Toggle pin status
    async togglePin(commentId) {
        if (!this.currentSeriesId || !this.currentBookId || !this.currentChapterId) return;
        
        const chapterKey = `s${this.currentSeriesId}_b${this.currentBookId}_c${this.currentChapterId}`;
        
        try {
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
            
            // Force re-render
            if (this.commentsListener) {
                // Trigger a manual refresh by querying again
                const snapshot = await db.collection('comments')
                    .where('seriesId', '==', String(this.currentSeriesId))
                    .where('bookId', '==', String(this.currentBookId))
                    .where('chapterId', '==', String(this.currentChapterId))
                    .get();
                this.renderComments(snapshot);
            }
        } catch (error) {
            console.error('Error toggling pin:', error);
        }
    }

    // Delete comment (admin/author only)
    async deleteComment(commentId) {
        if (!confirm('Are you sure you want to delete this comment? This cannot be undone.')) {
            return;
        }

        try {
            await db.collection('comments').doc(commentId).delete();
            console.log('Comment deleted successfully');
            
            // Remove from pinned if it was pinned
            if (this.pinnedComments.has(commentId)) {
                this.pinnedComments.delete(commentId);
                const chapterKey = `s${this.currentSeriesId}_b${this.currentBookId}_c${this.currentChapterId}`;
                await this.savePinnedComments(chapterKey);
            }
            
            alert('Comment deleted successfully');
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment: ' + error.message);
        }
    }

    // Load pinned comments
    async loadPinnedComments(seriesId, bookId, chapterId) {
        const chapterKey = `s${seriesId}_b${bookId}_c${chapterId}`;
        
        try {
            const doc = await db.collection('pinnedComments').doc(chapterKey).get();
            if (doc.exists) {
                const data = doc.data();
                this.pinnedComments = new Set(data.commentIds || []);
                console.log('Loaded pinned comments:', this.pinnedComments);
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
            console.log('Saved pinned comments');
        } catch (error) {
            console.error('Error saving pinned comments:', error);
        }
    }

    // Format date
    formatDate(date) {
        if (!date) return 'Unknown';
        
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

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Cleanup listeners
    cleanup() {
        if (this.commentsListener) {
            this.commentsListener();
            this.commentsListener = null;
        }
        this.isInitialized = false;
        console.log('Cleaned up comment system');
    }
}

// Create global instance
const commentSystemFixed = new CommentSystemFixed();

// Enhanced comment form handler
function setupFixedCommentForm() {
    const form = document.getElementById('comment-form');
    if (!form) {
        console.warn('Comment form not found');
        return;
    }

    // Add spoiler checkbox if not exists
    const footer = form.querySelector('.comment-form-footer');
    if (footer && !footer.querySelector('.spoiler-checkbox')) {
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

    // Setup character counter
    const textarea = document.getElementById('comment-input');
    const charCount = document.getElementById('char-count');
    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            charCount.textContent = `${textarea.value.length}/1000`;
        });
    }

    // Update form submit handler
    form.onsubmit = async (e) => {
        e.preventDefault();
        
        const text = textarea ? textarea.value.trim() : '';
        const spoilerInput = document.getElementById('spoiler-toggle-input');
        const isSpoiler = spoilerInput ? spoilerInput.checked : false;
        
        if (!text) {
            alert('Please enter a comment');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Posting...';
        }

        try {
            const success = await commentSystemFixed.submitComment(text, isSpoiler);
            
            if (success) {
                // Reset form
                if (textarea) textarea.value = '';
                if (charCount) charCount.textContent = '0/1000';
                if (spoilerInput) spoilerInput.checked = false;
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to post comment. Please try again.');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Post';
            }
        }
    };

    console.log('Comment form setup complete');
}

// Export for use in main script
window.commentSystemFixed = commentSystemFixed;
window.setupFixedCommentForm = setupFixedCommentForm;

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupFixedCommentForm);
} else {
    setupFixedCommentForm();
}
