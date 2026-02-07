// ==========================================
// VIEW COUNTER WITH ABUSE PREVENTION
// ==========================================
// Tracks chapter views with per-user-per-chapter limitation
// Prevents refresh spam and manipulation

class ViewCounter {
    constructor() {
        this.viewedChapters = new Set();
        this.loadViewedFromStorage();
    }

    // Load viewed chapters from localStorage
    loadViewedFromStorage() {
        try {
            const stored = localStorage.getItem('viewedChapters');
            if (stored) {
                this.viewedChapters = new Set(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Error loading viewed chapters:', error);
        }
    }

    // Save viewed chapters to localStorage
    saveViewedToStorage() {
        try {
            localStorage.setItem('viewedChapters', JSON.stringify([...this.viewedChapters]));
        } catch (error) {
            console.error('Error saving viewed chapters:', error);
        }
    }

    // Generate unique key for chapter
    getChapterKey(seriesId, bookId, chapterId) {
        return `s${seriesId}_b${bookId}_c${chapterId}`;
    }

    // Check if chapter has been viewed
    hasViewed(seriesId, bookId, chapterId) {
        const key = this.getChapterKey(seriesId, bookId, chapterId);
        return this.viewedChapters.has(key);
    }

    // Record a view for the current chapter
    async recordView(seriesId, bookId, chapterId) {
        const chapterKey = this.getChapterKey(seriesId, bookId, chapterId);

        // Check if already viewed
        if (this.hasViewed(seriesId, bookId, chapterId)) {
            console.log('Chapter already viewed, skipping count increment');
            return await this.getViewCount(chapterKey);
        }

        // For authenticated users, also check Firestore to prevent multi-device abuse
        if (currentUser) {
            const alreadyViewed = await this.checkUserViewInFirestore(chapterKey);
            if (alreadyViewed) {
                console.log('User already viewed this chapter on another device');
                this.viewedChapters.add(chapterKey);
                this.saveViewedToStorage();
                return await this.getViewCount(chapterKey);
            }
        }

        // Increment view count
        try {
            const chapterRef = db.collection('chapters').doc(chapterKey);
            
            // Use transaction to safely increment
            const newCount = await db.runTransaction(async (transaction) => {
                const chapterDoc = await transaction.get(chapterRef);
                const data = chapterDoc.exists ? chapterDoc.data() : { views: 0, likes: 0, dislikes: 0 };
                const newViews = (data.views || 0) + 1;
                
                transaction.set(chapterRef, { ...data, views: newViews }, { merge: true });
                return newViews;
            });

            // Mark as viewed locally
            this.viewedChapters.add(chapterKey);
            this.saveViewedToStorage();

            // Record user view in Firestore if authenticated
            if (currentUser) {
                await this.recordUserView(chapterKey);
            }

            console.log('View recorded successfully:', newCount);
            return newCount;

        } catch (error) {
            console.error('Error recording view:', error);
            return 0;
        }
    }

    // Check if user has viewed this chapter (Firestore check)
    async checkUserViewInFirestore(chapterKey) {
        if (!currentUser) return false;

        try {
            const viewDoc = await db.collection('userViews')
                .doc(`${currentUser.uid}_${chapterKey}`)
                .get();
            
            return viewDoc.exists;
        } catch (error) {
            console.error('Error checking user view:', error);
            return false;
        }
    }

    // Record user view in Firestore
    async recordUserView(chapterKey) {
        if (!currentUser) return;

        try {
            await db.collection('userViews').doc(`${currentUser.uid}_${chapterKey}`).set({
                userId: currentUser.uid,
                chapterKey: chapterKey,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error recording user view:', error);
        }
    }

    // Get current view count
    async getViewCount(chapterKey) {
        try {
            const chapterDoc = await db.collection('chapters').doc(chapterKey).get();
            if (chapterDoc.exists) {
                return chapterDoc.data().views || 0;
            }
            return 0;
        } catch (error) {
            console.error('Error getting view count:', error);
            return 0;
        }
    }

    // Load and display view count for current chapter
    async loadAndDisplayViews(seriesId, bookId, chapterId) {
        const chapterKey = this.getChapterKey(seriesId, bookId, chapterId);
        const viewsElement = document.getElementById('chapter-views');
        
        if (!viewsElement) return;

        try {
            // Get current count
            const count = await this.getViewCount(chapterKey);
            
            // Display with animation
            this.animateCount(viewsElement, count);

            // Record view (will increment if not already viewed)
            const newCount = await this.recordView(seriesId, bookId, chapterId);
            
            // Update display if count changed
            if (newCount !== count) {
                this.animateCount(viewsElement, newCount);
            }

        } catch (error) {
            console.error('Error loading views:', error);
            viewsElement.textContent = '0';
        }
    }

    // Animate count change
    animateCount(element, targetCount) {
        const currentCount = parseInt(element.textContent) || 0;
        
        if (currentCount === targetCount) {
            element.textContent = this.formatCount(targetCount);
            return;
        }

        const duration = 500;
        const steps = 20;
        const increment = (targetCount - currentCount) / steps;
        let current = currentCount;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current += increment;
            
            if (step >= steps) {
                element.textContent = this.formatCount(targetCount);
                clearInterval(timer);
            } else {
                element.textContent = this.formatCount(Math.round(current));
            }
        }, duration / steps);
    }

    // Format count for display (e.g., 1.2k, 5.3M)
    formatCount(count) {
        if (count < 1000) return count.toString();
        if (count < 1000000) return (count / 1000).toFixed(1) + 'k';
        return (count / 1000000).toFixed(1) + 'M';
    }

    // Reset view tracking (for testing/admin purposes)
    resetViewTracking() {
        this.viewedChapters.clear();
        localStorage.removeItem('viewedChapters');
        console.log('View tracking reset');
    }

    // Get user's view history
    async getUserViewHistory() {
        if (!currentUser) return [];

        try {
            const snapshot = await db.collection('userViews')
                .where('userId', '==', currentUser.uid)
                .orderBy('timestamp', 'desc')
                .limit(50)
                .get();

            const history = [];
            snapshot.forEach(doc => {
                history.push({
                    chapterKey: doc.data().chapterKey,
                    timestamp: doc.data().timestamp
                });
            });

            return history;
        } catch (error) {
            console.error('Error getting view history:', error);
            return [];
        }
    }
}

// Create global instance
const viewCounter = new ViewCounter();

// Export for use in main script
window.viewCounter = viewCounter;
