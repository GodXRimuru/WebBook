// ==========================================
// READER FEATURES MODULE
// ==========================================
// Advanced reader features: bookmarks, highlights, reactions, progress tracking
// Features only load contextually on book/chapter pages

// ==========================================
// READING PROGRESS TRACKER
// ==========================================

class ReadingProgressTracker {
    constructor() {
        this.progressBar = null;
        this.initialized = false;
    }

    initialize() {
        if (this.initialized) return;

        // Create progress bar element
        const progressContainer = document.createElement('div');
        progressContainer.className = 'reading-progress-container';
        progressContainer.innerHTML = `
            <div class="reading-progress-bar">
                <div class="reading-progress-fill" id="reading-progress-fill"></div>
            </div>
            <div class="reading-progress-text" id="reading-progress-text">0%</div>
        `;

        // Insert at the top of chapter page
        const chapterPage = document.getElementById('chapter-page');
        const chapterHeader = chapterPage.querySelector('.chapter-header');
        chapterHeader.after(progressContainer);

        this.progressBar = document.getElementById('reading-progress-fill');
        this.progressText = document.getElementById('reading-progress-text');
        this.initialized = true;

        this.attachScrollListener();
    }

    attachScrollListener() {
        const chapterContent = document.getElementById('chapter-content');
        const chapterPage = document.getElementById('chapter-page');

        chapterPage.addEventListener('scroll', () => {
            this.updateProgress(chapterContent, chapterPage);
        });
    }

    updateProgress(content, container) {
        const containerTop = container.scrollTop;
        const containerHeight = container.clientHeight;
        const contentHeight = content.scrollHeight;

        const scrollableHeight = contentHeight - containerHeight;
        const scrolled = containerTop;
        const percentage = Math.min(100, Math.round((scrolled / scrollableHeight) * 100));

        this.progressBar.style.width = percentage + '%';
        this.progressText.textContent = percentage + '%';

        // Save progress to localStorage for resume feature
        if (currentUser && currentSeries && currentBook && currentChapter) {
            this.saveProgress(percentage);
        }
    }

    saveProgress(percentage) {
        const key = `progress_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
        localStorage.setItem(key, percentage);
    }

    getProgress(seriesId, bookId, chapterId) {
        const key = `progress_s${seriesId}_b${bookId}_c${chapterId}`;
        return parseInt(localStorage.getItem(key) || '0');
    }

    reset() {
        if (this.progressBar) {
            this.progressBar.style.width = '0%';
            this.progressText.textContent = '0%';
        }
    }
}

const progressTracker = new ReadingProgressTracker();

// ==========================================
// BOOKMARK SYSTEM
// ==========================================

class BookmarkManager {
    constructor() {
        this.bookmarks = new Set();
        this.initialized = false;
    }

    async initialize() {
        if (!currentUser) return;
        await this.loadUserBookmarks();
    }

    async loadUserBookmarks() {
        try {
            const snapshot = await db.collection('bookmarks')
                .where('userId', '==', currentUser.uid)
                .get();

            this.bookmarks.clear();
            snapshot.forEach(doc => {
                const data = doc.data();
                const key = `s${data.seriesId}_b${data.bookId}_c${data.chapterId}`;
                this.bookmarks.add(key);
            });
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        }
    }

    addBookmarkButton() {
        // Add bookmark button to chapter header
        const chapterHeader = document.querySelector('.chapter-header');
        const existingBtn = document.getElementById('bookmark-btn');
        
        if (existingBtn) {
            this.updateBookmarkButton();
            return;
        }

        const bookmarkBtn = document.createElement('button');
        bookmarkBtn.id = 'bookmark-btn';
        bookmarkBtn.className = 'bookmark-btn';
        bookmarkBtn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
            <span>Bookmark</span>
        `;
        bookmarkBtn.onclick = () => this.toggleBookmark();

        chapterHeader.querySelector('.chapter-stats').appendChild(bookmarkBtn);
        this.updateBookmarkButton();
    }

    async toggleBookmark() {
        if (!currentUser) {
            showAuthModal();
            return;
        }

        const key = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
        const isBookmarked = this.bookmarks.has(key);

        if (isBookmarked) {
            await this.removeBookmark(key);
        } else {
            await this.addBookmark(key);
        }
    }

    async addBookmark(key) {
        try {
            await db.collection('bookmarks').add({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                chapterTitle: currentChapter.title,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            this.bookmarks.add(key);
            this.updateBookmarkButton();
            this.showToast('Bookmark added!');
        } catch (error) {
            console.error('Error adding bookmark:', error);
            this.showToast('Failed to add bookmark', true);
        }
    }

    async removeBookmark(key) {
        try {
            const snapshot = await db.collection('bookmarks')
                .where('userId', '==', currentUser.uid)
                .where('seriesId', '==', currentSeries.id)
                .where('bookId', '==', currentBook.id)
                .where('chapterId', '==', currentChapter.id)
                .get();

            const batch = db.batch();
            snapshot.forEach(doc => batch.delete(doc.ref));
            await batch.commit();

            this.bookmarks.delete(key);
            this.updateBookmarkButton();
            this.showToast('Bookmark removed!');
        } catch (error) {
            console.error('Error removing bookmark:', error);
            this.showToast('Failed to remove bookmark', true);
        }
    }

    updateBookmarkButton() {
        const btn = document.getElementById('bookmark-btn');
        if (!btn) return;

        const key = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
        const isBookmarked = this.bookmarks.has(key);

        if (isBookmarked) {
            btn.classList.add('bookmarked');
            btn.querySelector('svg').setAttribute('fill', 'currentColor');
            btn.querySelector('span').textContent = 'Bookmarked';
        } else {
            btn.classList.remove('bookmarked');
            btn.querySelector('svg').setAttribute('fill', 'none');
            btn.querySelector('span').textContent = 'Bookmark';
        }
    }

    showToast(message, isError = false) {
        const toast = document.createElement('div');
        toast.className = `feature-toast ${isError ? 'error' : 'success'}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 2000);
    }
}

const bookmarkManager = new BookmarkManager();

// ==========================================
// TEXT HIGHLIGHTING WITH NOTES
// ==========================================

class HighlightManager {
    constructor() {
        this.highlights = [];
        this.activeHighlight = null;
    }

    enable() {
        const content = document.getElementById('chapter-content');
        if (!content) return;

        // Allow text selection and add highlight button
        content.addEventListener('mouseup', (e) => this.handleSelection(e));
        content.addEventListener('touchend', (e) => this.handleSelection(e));
    }

    handleSelection(e) {
        if (!currentUser) return;

        const selection = window.getSelection();
        const selectedText = selection.toString().trim();

        if (selectedText.length < 3 || selectedText.length > 500) {
            this.hideHighlightMenu();
            return;
        }

        // Show highlight menu
        this.showHighlightMenu(e.clientX, e.clientY, selectedText, selection);
    }

    showHighlightMenu(x, y, text, selection) {
        this.hideHighlightMenu();

        const menu = document.createElement('div');
        menu.id = 'highlight-menu';
        menu.className = 'highlight-menu';
        menu.style.left = x + 'px';
        menu.style.top = (y - 50) + 'px';
        menu.innerHTML = `
            <button class="highlight-option yellow" data-color="yellow">
                <span class="highlight-dot"></span> Highlight
            </button>
            <button class="highlight-option note" data-note="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg> Add Note
            </button>
        `;

        document.body.appendChild(menu);

        // Add click handlers
        menu.querySelectorAll('.highlight-option').forEach(btn => {
            btn.onclick = () => {
                const color = btn.dataset.color;
                const isNote = btn.dataset.note;

                if (isNote) {
                    this.promptForNote(text, selection);
                } else {
                    this.saveHighlight(text, color);
                }

                this.hideHighlightMenu();
            };
        });

        // Close menu when clicking elsewhere
        setTimeout(() => {
            document.addEventListener('click', this.hideHighlightMenu.bind(this), { once: true });
        }, 100);
    }

    hideHighlightMenu() {
        const menu = document.getElementById('highlight-menu');
        if (menu) menu.remove();
    }

    promptForNote(text, selection) {
        const note = prompt('Add a note for this highlight:', '');
        if (note !== null) {
            this.saveHighlight(text, 'yellow', note);
        }
    }

    async saveHighlight(text, color, note = '') {
        try {
            await db.collection('highlights').add({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                text: text,
                color: color,
                note: note,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });

            bookmarkManager.showToast(note ? 'Note added!' : 'Text highlighted!');
        } catch (error) {
            console.error('Error saving highlight:', error);
            bookmarkManager.showToast('Failed to save highlight', true);
        }
    }
}

const highlightManager = new HighlightManager();

// ==========================================
// CHAPTER REACTIONS (EMOJI-BASED)
// ==========================================

class ReactionManager {
    constructor() {
        this.reactions = ['❤️', '🔥', '😭', '🤯', '😈'];
        this.userReaction = null;
    }

    addReactionButtons() {
        const reactionsDiv = document.querySelector('.chapter-reactions');
        if (!reactionsDiv) return;

        // Clear existing content
        reactionsDiv.innerHTML = '<h4 class="reaction-title">How did you feel about this chapter?</h4>';

        const container = document.createElement('div');
        container.className = 'emoji-reactions';

        this.reactions.forEach(emoji => {
            const btn = document.createElement('button');
            btn.className = 'emoji-reaction-btn';
            btn.innerHTML = `
                <span class="emoji">${emoji}</span>
                <span class="count" data-reaction="${emoji}">0</span>
            `;
            btn.onclick = () => this.toggleReaction(emoji);
            container.appendChild(btn);
        });

        reactionsDiv.appendChild(container);
        this.loadReactions();
    }

    async loadReactions() {
        try {
            const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
            
            // Load reaction counts
            const snapshot = await db.collection('chapterReactions')
                .where('chapterKey', '==', chapterKey)
                .get();

            const counts = {};
            this.reactions.forEach(emoji => counts[emoji] = 0);

            snapshot.forEach(doc => {
                const data = doc.data();
                if (counts[data.reaction] !== undefined) {
                    counts[data.reaction]++;
                }

                // Track user's reaction
                if (currentUser && doc.data().userId === currentUser.uid) {
                    this.userReaction = data.reaction;
                }
            });

            // Update UI
            this.reactions.forEach(emoji => {
                const countEl = document.querySelector(`[data-reaction="${emoji}"]`);
                if (countEl) countEl.textContent = counts[emoji];
            });

            this.updateActiveReaction();
        } catch (error) {
            console.error('Error loading reactions:', error);
        }
    }

    async toggleReaction(emoji) {
        if (!currentUser) {
            showAuthModal();
            return;
        }

        const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;

        try {
            // Remove old reaction if exists
            if (this.userReaction) {
                const oldSnapshot = await db.collection('chapterReactions')
                    .where('userId', '==', currentUser.uid)
                    .where('chapterKey', '==', chapterKey)
                    .get();

                const batch = db.batch();
                oldSnapshot.forEach(doc => batch.delete(doc.ref));
                await batch.commit();
            }

            // Add new reaction if different
            if (this.userReaction !== emoji) {
                await db.collection('chapterReactions').add({
                    userId: currentUser.uid,
                    chapterKey: chapterKey,
                    seriesId: currentSeries.id,
                    bookId: currentBook.id,
                    chapterId: currentChapter.id,
                    reaction: emoji,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
                this.userReaction = emoji;
            } else {
                this.userReaction = null;
            }

            await this.loadReactions();
        } catch (error) {
            console.error('Error toggling reaction:', error);
            bookmarkManager.showToast('Failed to update reaction', true);
        }
    }

    updateActiveReaction() {
        document.querySelectorAll('.emoji-reaction-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        if (this.userReaction) {
            const activeBtn = Array.from(document.querySelectorAll('.emoji-reaction-btn'))
                .find(btn => btn.querySelector('.emoji').textContent === this.userReaction);
            if (activeBtn) activeBtn.classList.add('active');
        }
    }
}

const reactionManager = new ReactionManager();

// ==========================================
// INITIALIZE READER FEATURES
// ==========================================

function initializeReaderFeatures() {
    if (!currentUser) return;

    // Only initialize on chapter page
    const chapterPage = document.getElementById('chapter-page');
    if (!chapterPage.classList.contains('active')) return;

    // Check if user has read this book before (has reading history)
    const hasHistory = checkReadingHistory();
    if (!hasHistory) {
        // First time reading, don't show advanced features yet
        return;
    }

    // Initialize features
    progressTracker.initialize();
    bookmarkManager.initialize().then(() => {
        bookmarkManager.addBookmarkButton();
    });
    highlightManager.enable();
    reactionManager.addReactionButtons();
}

function checkReadingHistory() {
    // Check if user has any reading progress saved for this book
    const bookKey = `s${currentSeries.id}_b${currentBook.id}`;
    const keys = Object.keys(localStorage).filter(k => k.startsWith(`progress_${bookKey}`));
    return keys.length > 0;
}

// Export for use in main script
window.initializeReaderFeatures = initializeReaderFeatures;
window.progressTracker = progressTracker;
window.bookmarkManager = bookmarkManager;
window.reactionManager = reactionManager;
