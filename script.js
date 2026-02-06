// ==========================================
// FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCOPC2hi_P4F_8SdkpLOncymuGkgBQ5rJY",
    authDomain: "webbook-9d8ec.firebaseapp.com",
    projectId: "webbook-9d8ec",
    storageBucket: "webbook-9d8ec.firebasestorage.app",
    messagingSenderId: "744179746502",
    appId: "1:744179746502:web:730b71902076c43a5679c7",
    measurementId: "G-SW8CDMNDGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ==========================================
// GLOBAL STATE
// ==========================================
let currentUser = null;
let currentSeries = null;
let currentBook = null;
let currentChapter = null;
let userReactions = {}; // Track user's like/dislike state

// ==========================================
// DATA
// ==========================================
const seriesData = [
    {
        id: 1,
        name: "The Diary You Hold",
        description: "A dark psychological thriller trilogy that will make you question everything you thought you knew about trust, memory, and reality. Follow Emily's descent into a nightmare where the line between victim and villain blurs with every page turned.",
        cover: "assets/images/diary-you-hold-cover.png",
        books: [
            {
                id: 1,
                title: "The Diary You Hold",
                description: "When Emily finds her husband's secret diary, she discovers that the man she married is not who she thought he was.",
                chapters: [
                    {
                        id: 1,
                        title: "The Discovery",
                        content: `The diary was leather-bound, tucked beneath a loose floorboard in our bedroom closet. I wasn't snooping—at least, that's what I told myself. I was looking for the Christmas decorations, the ones Mark swore he'd stored there last January. Instead, my fingers found smooth leather where there should have been cardboard boxes.

I should have stopped. I should have pushed it back into its hiding place and pretended I'd never found it. But curiosity is a powerful thing, especially when you've been married for seven years and you think you know every corner of your spouse's mind.

The first entry was dated three years ago. Three years. I opened to a random page, my hands trembling as I read his handwriting—familiar yet suddenly foreign.

"She doesn't know what I've done. She smiles at me every morning, makes me coffee, asks about my day. Sometimes I wonder if she suspects anything. But then I see that look in her eyes, that complete trust, and I know I'm safe. For now."

My blood ran cold. What had he done? What secret was so terrible that he needed to hide it beneath our bedroom floor? I flipped through more pages, my heart pounding so hard I could hear it in my ears.

Each entry was worse than the last. References to "the incident" and "what happened that night." Mentions of someone named Sarah—a name I'd never heard him speak. And then, on a page near the end, something that made my stomach drop:

"I saw Emily looking at me differently today. Just for a moment, I thought she knew. But she can't know. No one can ever know what I did to her sister."

I dropped the diary. My sister Rachel had died five years ago. They said it was an accident. A tragic fall down the stairs in her apartment. Mark had been so supportive, so loving during my grief. He'd held me while I cried, helped me plan the funeral, never left my side.

The diary sat on the floor, its pages spread open like a confession waiting to be read. I picked it up again with shaking hands. I had to know the truth. I had to know what my husband had done.

And as I read on, I realized that the truth was far more terrible than I could have ever imagined.`
                    },
                    {
                        id: 2,
                        title: "The First Lie",
                        content: `I couldn't sleep that night. Mark lay beside me, breathing softly, completely oblivious to the fact that I'd discovered his darkest secret. Every time I closed my eyes, I saw Rachel's face—her bright smile, her laugh, the way she'd always looked out for me.

We'd been close once, Rachel and I. Inseparable as children, best friends through college. But something had changed in the months before she died. She'd grown distant, stopped returning my calls, made excuses whenever I suggested we meet. At the time, I'd thought she was just busy with work, her new promotion demanding all her attention.

Now I wondered if there was another reason.

The diary was hidden in my car now, wrapped in a grocery bag and shoved under the passenger seat. I couldn't risk Mark finding it disturbed, couldn't let him know I'd discovered his hiding place. But I needed to read more. I needed to understand what had happened between him and Rachel.

The next morning, I made breakfast like always. Scrambled eggs, toast, fresh coffee. Mark came downstairs at seven-thirty sharp, kissed my cheek, asked if I'd slept well. I lied and said I had.

"You seem distracted," he said, studying my face over his coffee cup.

My heart skipped. "Just tired. Didn't sleep great."

"Bad dreams?"

"Something like that."

He reached across the table, took my hand. His touch, once comforting, now made my skin crawl. "You know you can talk to me about anything, right? We don't keep secrets."

The irony was almost too much. I forced a smile. "I know."

After he left for work, I sat in my car in the garage and opened the diary again. My hands were steadier today, my resolve harder. I needed to know everything.

I found the entries about Rachel quickly enough. They started innocuously—mentions of running into her at a coffee shop, a conversation at a party. But then the tone changed.

"She knows too much. I can see it in her eyes when she looks at me. Emily's so trusting, so naive, but Rachel sees through me. She's always been the smart one, the protective one. I need to do something before she ruins everything."

My vision blurred with tears. Rachel had known. She'd seen something in Mark that I'd been blind to. And she'd paid for that knowledge with her life.

I kept reading, page after page, as the morning turned to afternoon. The entries grew darker, more detailed. Plans and considerations. Ways to make it look like an accident. The calculations of a man who'd decided that murder was preferable to exposure.

And then, the entry from the day she died:

"It's done. She's gone. The police are calling it an accident, just like I knew they would. Emily is devastated, and I'm playing the supportive husband perfectly. She has no idea I was the last person to see her sister alive. She has no idea I pushed."`
                    }
                ]
            }
        ]
    }
];

// ==========================================
// AUTH STATE
// ==========================================
auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    const authBtn = document.getElementById('auth-btn');
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (user) {
        authBtn.textContent = user.email;
        authBtn.onclick = showUserMenu;
        document.getElementById('user-email').textContent = user.email;
        
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
        
        // Load user's reactions if on a chapter page
        if (currentSeries && currentBook && currentChapter) {
            await loadUserReaction(currentSeries.id, currentBook.id, currentChapter.id);
        }

        // Initialize bookmark manager
        if (window.bookmarkManager) {
            await window.bookmarkManager.initialize();
        }

        // Reload comments to show user-specific actions
        if (currentSeries && currentBook && currentChapter && window.commentSystem) {
            window.commentSystem.initialize(currentSeries.id, currentBook.id, currentChapter.id);
        }
    } else {
        authBtn.textContent = 'Login';
        authBtn.onclick = showAuthModal;
        
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
        
        userReactions = {};
    }
});

// ==========================================
// AUTH HANDLERS (Email/Password only)
// ==========================================

// Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});

// Register
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-password-confirm').value;
    const errorDiv = document.getElementById('register-error');

    if (password !== confirm) {
        errorDiv.textContent = 'Passwords do not match';
        return;
    }

    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters';
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        closeAuthModal();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});

// Reset Password
document.getElementById('reset-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('reset-email').value;
    const errorDiv = document.getElementById('reset-error');
    const successDiv = document.getElementById('reset-success');

    try {
        await auth.sendPasswordResetEmail(email);
        successDiv.textContent = 'Reset link sent! Check your email.';
        errorDiv.textContent = '';
        document.getElementById('reset-email').value = '';
    } catch (error) {
        errorDiv.textContent = error.message;
        successDiv.textContent = '';
    }
});

// Logout
async function logout() {
    try {
        await auth.signOut();
        closeUserMenu();
        showPage('homepage');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ==========================================
// MODALS
// ==========================================

function showAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
    const authContainer = document.querySelector('.auth-container');
    authContainer.classList.remove('active');
    document.body.style.overflow = '';
    document.querySelectorAll('.error-message, .success-message').forEach(el => el.textContent = '');
    // Reset to login form
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.login').classList.add('active');
}

function showUserMenu() {
    document.getElementById('user-menu').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUserMenu() {
    document.getElementById('user-menu').classList.remove('active');
    document.body.style.overflow = '';
}

// Toggle functions for auth modal
function toggleToRegister() {
    const authContainer = document.querySelector('.auth-container');
    authContainer.classList.add('active');
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.register').classList.add('active');
}

function toggleToLogin() {
    const authContainer = document.querySelector('.auth-container');
    authContainer.classList.remove('active');
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.login').classList.add('active');
}

function showResetForm() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    const resetBox = document.querySelector('.form-box.reset');
    resetBox.classList.add('active');
    // Hide toggle panels when in reset mode
    document.querySelector('.toggle-box').style.display = 'none';
}

function switchToLogin() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.login').classList.add('active');
    const authContainer = document.querySelector('.auth-container');
    authContainer.classList.remove('active');
    // Show toggle panels again
    document.querySelector('.toggle-box').style.display = 'block';
}

// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageId) {
    // Cleanup comment listeners when leaving chapter page
    if (window.commentSystem && pageId !== 'chapter-page') {
        window.commentSystem.cleanup();
    }

    // Reset progress tracker when leaving chapter page
    if (window.progressTracker && pageId !== 'chapter-page') {
        window.progressTracker.reset();
    }

    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ==========================================
// CONTENT
// ==========================================

function loadSeries() {
    const seriesList = document.getElementById('series-list');
    seriesList.innerHTML = '';

    seriesData.forEach(series => {
        const totalChapters = series.books.reduce((sum, book) => sum + book.chapters.length, 0);
        
        const card = document.createElement('div');
        card.className = 'series-card';
        card.innerHTML = `
            <img src="${series.cover}" alt="${series.name}" class="series-card-cover">
            <div class="series-card-content">
                <h3 class="series-card-title">${series.name}</h3>
                <p class="series-card-desc">${series.description}</p>
                <p class="series-card-stats">${series.books.length} books • ${totalChapters} chapters</p>
            </div>
        `;
        card.addEventListener('click', () => loadSeriesPage(series.id));
        seriesList.appendChild(card);
    });
}

function loadSeriesPage(seriesId) {
    currentSeries = seriesData.find(s => s.id === seriesId);
    if (!currentSeries) return;

    document.getElementById('series-name').textContent = currentSeries.name;
    document.getElementById('series-desc').textContent = currentSeries.description;
    document.getElementById('series-cover-img').src = currentSeries.cover;
    
    const totalChapters = currentSeries.books.reduce((sum, book) => sum + book.chapters.length, 0);
    document.getElementById('series-stats').textContent = `${currentSeries.books.length} books • ${totalChapters} chapters`;

    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    currentSeries.books.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <div class="book-number">Book ${book.id}</div>
            <h3 class="book-card-title">${book.title}</h3>
            <p class="book-card-desc">${book.description}</p>
            <p class="book-card-chapters">${book.chapters.length} chapters</p>
        `;
        card.addEventListener('click', () => loadBookPage(seriesId, book.id));
        booksList.appendChild(card);
    });

    showPage('series-page');
}

async function loadBookPage(seriesId, bookId) {
    currentSeries = seriesData.find(s => s.id === seriesId);
    currentBook = currentSeries.books.find(b => b.id === bookId);
    if (!currentBook) return;

    document.getElementById('book-name').textContent = currentBook.title;
    document.getElementById('back-to-series-btn').onclick = () => loadSeriesPage(seriesId);

    const chaptersList = document.getElementById('chapters-list');
    chaptersList.innerHTML = '';

    for (const chapter of currentBook.chapters) {
        const views = await getChapterViews(seriesId, bookId, chapter.id);
        
        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.innerHTML = `
            <div class="chapter-card-info">
                <h3>Chapter ${chapter.id}: ${chapter.title}</h3>
                <p class="chapter-card-status">Tap to read</p>
            </div>
            <div class="chapter-card-views">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                </svg>
                ${views}
            </div>
        `;
        card.addEventListener('click', () => loadChapterPage(seriesId, bookId, chapter.id));
        chaptersList.appendChild(card);
    }

    showPage('book-page');
}

async function loadChapterPage(seriesId, bookId, chapterId) {
    currentSeries = seriesData.find(s => s.id === seriesId);
    currentBook = currentSeries.books.find(b => b.id === bookId);
    currentChapter = currentBook.chapters.find(c => c.id === chapterId);
    if (!currentChapter) return;

    document.getElementById('chapter-name').textContent = `Chapter ${currentChapter.id}: ${currentChapter.title}`;
    document.getElementById('back-to-book-btn').onclick = () => loadBookPage(seriesId, bookId);

    const contentDiv = document.getElementById('chapter-content');
    contentDiv.innerHTML = '';
    currentChapter.content.split('\n\n').forEach(para => {
        if (para.trim()) {
            const p = document.createElement('p');
            p.textContent = para.trim();
            contentDiv.appendChild(p);
        }
    });

    // Enhanced view counter with abuse prevention
    if (window.viewCounter) {
        await window.viewCounter.loadAndDisplayViews(seriesId, bookId, chapterId);
    } else {
        // Fallback to original view counter
        await incrementViews(seriesId, bookId, chapterId);
        const views = await getChapterViews(seriesId, bookId, chapterId);
        document.getElementById('chapter-views').textContent = views;
    }

    const currentIndex = currentBook.chapters.findIndex(c => c.id === chapterId);
    const prevBtn = document.getElementById('prev-chapter');
    const nextBtn = document.getElementById('next-chapter');

    if (currentIndex > 0) {
        prevBtn.disabled = false;
        prevBtn.onclick = () => loadChapterPage(seriesId, bookId, currentBook.chapters[currentIndex - 1].id);
    } else {
        prevBtn.disabled = true;
    }

    if (currentIndex < currentBook.chapters.length - 1) {
        nextBtn.disabled = false;
        nextBtn.onclick = () => loadChapterPage(seriesId, bookId, currentBook.chapters[currentIndex + 1].id);
    } else {
        nextBtn.disabled = true;
    }

    // Load reactions
    await loadChapterReactions(seriesId, bookId, chapterId);
    await loadUserReaction(seriesId, bookId, chapterId);
    
    // Enhanced comment system with real-time updates
    if (window.commentSystem) {
        window.commentSystem.initialize(seriesId, bookId, chapterId);
        window.setupEnhancedCommentForm();
    } else {
        // Fallback to original comment loading
        loadComments(seriesId, bookId, chapterId);
    }

    // Initialize reader features (only if user has reading history)
    if (window.initializeReaderFeatures) {
        window.initializeReaderFeatures();
    }
    
    showPage('chapter-page');
}

// ==========================================
// FIRESTORE
// ==========================================

async function incrementViews(seriesId, bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                transaction.set(docRef, { views: 1, likes: 0, dislikes: 0 });
            } else {
                transaction.update(docRef, { views: (doc.data().views || 0) + 1 });
            }
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

async function getChapterViews(seriesId, bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        const doc = await docRef.get();
        return doc.exists ? (doc.data().views || 0) : 0;
    } catch (error) {
        console.error('Error getting views:', error);
        return 0;
    }
}

// ==========================================
// LIKE/DISLIKE FUNCTIONALITY
// ==========================================

async function loadChapterReactions(seriesId, bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        const doc = await docRef.get();
        const data = doc.exists ? doc.data() : { likes: 0, dislikes: 0 };
        
        document.getElementById('like-count').textContent = data.likes || 0;
        document.getElementById('dislike-count').textContent = data.dislikes || 0;
    } catch (error) {
        console.error('Error loading reactions:', error);
        document.getElementById('like-count').textContent = '0';
        document.getElementById('dislike-count').textContent = '0';
    }
}

async function loadUserReaction(seriesId, bookId, chapterId) {
    if (!currentUser) {
        updateReactionButtons(null);
        return;
    }

    const chapterKey = `s${seriesId}_b${bookId}_c${chapterId}`;
    const userReactionRef = db.collection('userReactions').doc(`${currentUser.uid}_${chapterKey}`);
    
    try {
        const doc = await userReactionRef.get();
        const reaction = doc.exists ? doc.data().reaction : null;
        userReactions[chapterKey] = reaction;
        updateReactionButtons(reaction);
    } catch (error) {
        console.error('Error loading user reaction:', error);
        updateReactionButtons(null);
    }
}

function updateReactionButtons(reaction) {
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    
    likeBtn.classList.remove('active');
    dislikeBtn.classList.remove('active');
    
    if (reaction === 'like') {
        likeBtn.classList.add('active');
    } else if (reaction === 'dislike') {
        dislikeBtn.classList.add('active');
    }
}

async function toggleLike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const currentReaction = userReactions[chapterKey];
    const newReaction = currentReaction === 'like' ? null : 'like';
    
    await updateReaction(currentSeries.id, currentBook.id, currentChapter.id, newReaction, currentReaction);
}

async function toggleDislike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const currentReaction = userReactions[chapterKey];
    const newReaction = currentReaction === 'dislike' ? null : 'dislike';
    
    await updateReaction(currentSeries.id, currentBook.id, currentChapter.id, newReaction, currentReaction);
}

async function updateReaction(seriesId, bookId, chapterId, newReaction, oldReaction) {
    const chapterKey = `s${seriesId}_b${bookId}_c${chapterId}`;
    const chapterRef = db.collection('chapters').doc(chapterKey);
    const userReactionRef = db.collection('userReactions').doc(`${currentUser.uid}_${chapterKey}`);
    
    try {
        await db.runTransaction(async (transaction) => {
            const chapterDoc = await transaction.get(chapterRef);
            const data = chapterDoc.exists ? chapterDoc.data() : { likes: 0, dislikes: 0, views: 0 };
            
            let likes = data.likes || 0;
            let dislikes = data.dislikes || 0;
            
            // Remove old reaction
            if (oldReaction === 'like') likes--;
            if (oldReaction === 'dislike') dislikes--;
            
            // Add new reaction
            if (newReaction === 'like') likes++;
            if (newReaction === 'dislike') dislikes++;
            
            // Ensure no negative values
            likes = Math.max(0, likes);
            dislikes = Math.max(0, dislikes);
            
            transaction.set(chapterRef, { ...data, likes, dislikes }, { merge: true });
            
            if (newReaction) {
                transaction.set(userReactionRef, {
                    reaction: newReaction,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            } else {
                transaction.delete(userReactionRef);
            }
        });
        
        // Update local state and UI
        userReactions[chapterKey] = newReaction;
        updateReactionButtons(newReaction);
        await loadChapterReactions(seriesId, bookId, chapterId);
        
    } catch (error) {
        console.error('Error updating reaction:', error);
        alert('Failed to update reaction. Please try again.');
    }
}

// ==========================================
// COMMENTS
// ==========================================

async function loadComments(seriesId, bookId, chapterId) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '<div class="loading">Loading comments...</div>';

    try {
        const snapshot = await db.collection('comments')
            .where('seriesId', '==', seriesId)
            .where('bookId', '==', bookId)
            .where('chapterId', '==', chapterId)
            .orderBy('timestamp', 'desc')
            .get();

        commentsList.innerHTML = '';

        if (snapshot.empty) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to comment!</p>';
            return;
        }

        snapshot.forEach(doc => {
            const comment = doc.data();
            const date = comment.timestamp ? comment.timestamp.toDate() : new Date();
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${escapeHtml(comment.authorEmail)}</span>
                    <span class="comment-date">${dateStr}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
            `;
            commentsList.appendChild(div);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML = '<p class="error-message">Failed to load comments. Please refresh the page.</p>';
    }
}

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const textarea = document.getElementById('comment-input');
    const text = textarea.value.trim();
    if (!text) return;

    const submitBtn = e.target.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
        await db.collection('comments').add({
            seriesId: currentSeries.id,
            bookId: currentBook.id,
            chapterId: currentChapter.id,
            authorEmail: currentUser.email,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        textarea.value = '';
        document.getElementById('char-count').textContent = '0/1000';
        
        // Wait a moment for Firestore to process, then reload
        setTimeout(() => {
            loadComments(currentSeries.id, currentBook.id, currentChapter.id);
        }, 500);
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post';
    }
});

document.getElementById('comment-input').addEventListener('input', (e) => {
    document.getElementById('char-count').textContent = `${e.target.value.length}/1000`;
});

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// INIT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSeries();
});
