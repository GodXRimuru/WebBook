// ==========================================
// ENHANCED COMMENT SYSTEM
// ==========================================
// Features: Spoiler toggle, pinned comments, real-time updates

class CommentSystem {
    constructor() {
        this.commentsListener = null;
        this.pinnedComments = new Set();
    }

    // Initialize comment system for current chapter
    initialize(seriesId, bookId, chapterId) {
        this.cleanup();
        this.setupRealtimeListener(seriesId, bookId, chapterId);
        this.loadPinnedComments(seriesId, bookId, chapterId);
    }

    // Setup real-time listener for comments
    setupRealtimeListener(seriesId, bookId, chapterId) {
        const commentsList = document.getElementById('comments-list');
        commentsList.innerHTML = '<div class="loading">Loading comments...</div>';

        // Listen for real-time updates
        this.commentsListener = db.collection('comments')
            .where('seriesId', '==', seriesId)
            .where('bookId', '==', bookId)
            .where('chapterId', '==', chapterId)
            .orderBy('timestamp', 'desc')
            .onSnapshot(
                (snapshot) => this.renderComments(snapshot),
                (error) => {
                    console.error('Error loading comments:', error);
                    commentsList.innerHTML = '<p class="error-message">Failed to load comments. Please refresh the page.</p>';
                }
            );
    }

    // Render comments
    renderComments(snapshot) {
        const commentsList = document.getElementById('comments-list');
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

        const div = document.createElement('div');
        div.className = `comment ${isPinned ? 'pinned' : ''} ${isSpoiler ? 'has-spoiler' : ''}`;
        div.dataset.commentId = commentId;

        div.innerHTML = `
            <div class="comment-header">
                <span class="comment-author">${this.escapeHtml(comment.authorEmail)}</span>
                <span class="comment-date">${dateStr}</span>
                ${isPinned ? '<span class="pin-badge">📌 Pinned</span>' : ''}
            </div>
            <div class="comment-body">
                ${isSpoiler ? this.renderSpoilerComment(comment.text) : `<p class="comment-text">${this.escapeHtml(comment.text)}</p>`}
            </div>
            ${this.canManageComment(comment) ? this.renderCommentActions(commentId, isPinned) : ''}
        `;

        // Attach event listeners
        if (isSpoiler) {
            const spoilerToggle = div.querySelector('.spoiler-toggle');
            if (spoilerToggle) {
                spoilerToggle.onclick = (e) => {
                    e.preventDefault();
                    div.querySelector('.spoiler-content').classList.toggle('revealed');
                    spoilerToggle.textContent = div.querySelector('.spoiler-content').classList.contains('revealed') 
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

    // Render comment actions (for admin/author)
    renderCommentActions(commentId, isPinned) {
        // Only show to admin users (you can expand this logic)
        return `
            <div class="comment-actions">
                <button class="action-btn pin-btn" onclick="commentSystem.togglePin('${commentId}')">
                    ${isPinned ? 'Unpin' : 'Pin'}
                </button>
            </div>
        `;
    }

    // Check if user can manage comment
    canManageComment(comment) {
        // For now, simple check - expand with admin roles later
        return currentUser && currentUser.email === comment.authorEmail;
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

            return true;
        } catch (error) {
            console.error('Error posting comment:', error);
            throw error;
        }
    }

    // Toggle pin status
    async togglePin(commentId) {
        const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
        
        if (this.pinnedComments.has(commentId)) {
            // Unpin
            this.pinnedComments.delete(commentId);
            await this.savePinnedComments(chapterKey);
        } else {
            // Pin (limit to 3 pinned comments)
            if (this.pinnedComments.size >= 3) {
                alert('Maximum 3 pinned comments allowed');
                return;
            }
            this.pinnedComments.add(commentId);
            await this.savePinnedComments(chapterKey);
        }
    }

    // Load pinned comments
    async loadPinnedComments(seriesId, bookId, chapterId) {
        const chapterKey = `s${seriesId}_b${bookId}_c${chapterId}`;
        
        try {
            const doc = await db.collection('pinnedComments').doc(chapterKey).get();
            if (doc.exists) {
                this.pinnedComments = new Set(doc.data().commentIds || []);
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
        } catch (error) {
            console.error('Error saving pinned comments:', error);
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
const commentSystem = new CommentSystem();

// Enhanced comment form handler
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
        const isSpoiler = document.getElementById('spoiler-toggle-input').checked;
        
        if (!text) return;

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting...';

        try {
            await commentSystem.submitComment(text, isSpoiler);
            
            // Reset form
            textarea.value = '';
            document.getElementById('char-count').textContent = '0/1000';
            document.getElementById('spoiler-toggle-input').checked = false;
            
        } catch (error) {
            alert('Failed to post comment. Please try again.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Post';
        }
    };
}

// Export for use in main script
window.commentSystem = commentSystem;
window.setupEnhancedCommentForm = setupEnhancedCommentForm;
