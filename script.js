// ==========================================
// FIREBASE CONFIGURATION & INITIALIZATION
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

// ⚡ FIX: Enable auth persistence to keep users logged in across sessions
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => console.log('✅ Auth persistence enabled - users will stay logged in'))
    .catch((error) => console.error('❌ Persistence error:', error));

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

"It's done. She's gone. The police are calling it an accident, just like I knew they would. Emily is devastated, and I'm playing the supportive husband perfectly. She has no idea I was the last person to see her sister alive. She has no idea I pushed."

The diary fell from my hands. I sat in the dark garage, my world crumbling around me. My husband was a murderer. And I'd been sharing his bed for three years since he'd killed my sister.

The question now was: what was I going to do about it?`
                    },
                    {
                        id: 3,
                        title: "Reflections in Darkness",
                        content: `Three days passed. Three days of pretending everything was normal. Three days of sitting across from a killer at dinner, lying beside him at night, accepting his kisses and his lies.

I was living in a horror movie, except I couldn't turn it off or walk away. This was my life now, a nightmare I couldn't wake from.

The diary had become my obsession. I read it during my lunch breaks at work, in parking lots, anywhere Mark wouldn't find me. Each entry revealed another layer of deception, another carefully constructed lie. Our entire relationship was built on a foundation of murder and manipulation.

I learned things I'd never suspected. The "business trip" to Seattle when we were dating? He'd been visiting a woman he'd met online, testing whether he could maintain multiple relationships without getting caught. The promotion at work he'd been so proud of? He'd sabotaged his colleague to get it, planting evidence of fraud that had gotten the man fired.

Mark wasn't just a murderer. He was a predator, a man who viewed other people as obstacles or tools to be used and discarded.

And I'd married him.

"You've been acting strange lately," Mark said one evening. We were sitting in the living room, me with a book I wasn't reading, him watching some crime documentary. The irony wasn't lost on me.

"I'm fine," I said automatically.

"You're not fine. You barely talk to me anymore. You flinch when I touch you." He muted the TV, turned to face me fully. "Did I do something wrong?"

Yes, I wanted to scream. You killed my sister. You've been lying to me for years. You're a monster.

Instead, I said, "I've just been stressed at work. The Morrison account is demanding."

He studied me for a long moment, and I saw something flicker in his eyes. Suspicion? Doubt? "You know you can tell me anything, right? We're a team."

"I know."

"Because if something was bothering you, really bothering you, I'd want to help. I'd want to fix it." His tone was gentle, concerned, but there was an edge to it that made my blood run cold. "That's what husbands do. They protect their wives. They keep them safe."

The implied threat hung in the air between us. I forced myself to meet his eyes, to smile. "I appreciate that. Really. But I'm okay. Just tired."

He nodded slowly, but I could see he didn't believe me. Mark had always been perceptive, always able to read people. It's what made him so good at his job, so successful at manipulating everyone around him. And now that skill was turned on me.

That night, I lay awake listening to him breathe. How long until he figured it out? How long until he realized I knew the truth? And when he did, would I end up like Rachel—another "accident," another tragedy for people to mourn?

I needed a plan. I needed evidence beyond the diary, something that would convince the police. Because if I went to them with just a handwritten journal, Mark would talk his way out of it. He'd say I was mentally unstable, grief-stricken, imagining things. He'd been so supportive after Rachel's death, after all. Everyone knew what a wonderful husband he was.

No, I needed more. I needed proof that couldn't be dismissed or explained away.

And I needed to be very, very careful.

Because the man sleeping beside me had killed before. And he wouldn't hesitate to do it again.`
                    }
                ]
            },
            {
                id: 2,
                title: "The Truth You Stayed For",
                description: "Six months after discovering Mark's diary, Emily has been playing the perfect wife while secretly building her case.",
                chapters: [
                    { id: 1, title: "The Email", content: `The email arrived on a Tuesday morning at 3:47 AM...` },
                    { id: 2, title: "Midnight Rendezvous", content: `The warehouse loomed before me, dark and abandoned...` }
                ]
            },
            {
                id: 3,
                title: "It Was Never Missing",
                description: "The final book reveals that Emily, Mark, and Rachel are all pawns in a much larger game.",
                chapters: [
                    { id: 1, title: "The Realization", content: `Dr. Sarah Chen sat across from me, her expression carefully neutral...` }
                ]
            }
        ]
    }
];

// ==========================================
// GLOBAL STATE
// ==========================================
let currentUser = null;
let currentSeries = null;
let currentBook = null;
let currentChapter = null;
let userBookmarks = [];
let userHighlights = [];
let readingProgress = {};
let userProfile = {};

// Badge system
const BADGES = {
    FIRST_COMMENT: { name: '💬 First Comment', icon: '💬', description: 'Posted your first comment' },
    BOOKWORM: { name: '📚 Bookworm', icon: '📚', description: 'Read 10 chapters' },
    DEDICATED_READER: { name: '🌟 Dedicated Reader', icon: '🌟', description: 'Read 50 chapters' },
    MASTER_READER: { name: '👑 Master Reader', icon: '👑', description: 'Read 100 chapters' },
    EARLY_SUPPORTER: { name: '🎖️ Early Supporter', icon: '🎖️', description: 'One of the first 100 users' },
    COMMENTATOR: { name: '🗨️ Commentator', icon: '🗨️', description: 'Posted 25 comments' },
    BOOKMARK_COLLECTOR: { name: '🔖 Collector', icon: '🔖', description: 'Saved 20 bookmarks' }
};

// ==========================================
// AUTH - AUTHENTICATION SYSTEM
// ==========================================

// ⚡ FIX: Handle redirect result properly for all providers
auth.getRedirectResult().then(result => {
    if (result.user) {
        console.log('✅ Sign-in successful via redirect');
        initializeUserProfile(result.user);
        closeAuthModal();
        showToast('Welcome back! You are now signed in.', 'success');
    }
}).catch(error => {
    console.error('❌ Redirect sign-in error:', error);
    handleAuthError(error);
});

// ⚡ FIX: Auth state observer - properly handles login persistence
auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    console.log('Auth state changed:', user ? 'Logged in' : 'Logged out');
    
    if (user) {
        await initializeUserProfile(user);
        await loadUserData();
    }
    
    updateAuthUI();
    
    // Reload comments if on chapter page
    if (user && currentChapter) {
        loadComments(currentSeries.id, currentBook.id, currentChapter.id);
    }
});

async function initializeUserProfile(user) {
    const userRef = db.collection('users').doc(user.uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
        // Create new user profile
        await userRef.set({
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL || null,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            badges: ['EARLY_SUPPORTER'],
            chaptersRead: 0,
            commentsPosted: 0,
            bookmarks: 0
        });
    }
    
    userProfile = (await userRef.get()).data();
}

async function loadUserData() {
    if (!currentUser) return;
    
    // Load bookmarks
    const bookmarksSnap = await db.collection('bookmarks')
        .where('userId', '==', currentUser.uid)
        .get();
    userBookmarks = bookmarksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Load reading progress
    const progressSnap = await db.collection('progress')
        .where('userId', '==', currentUser.uid)
        .get();
    readingProgress = {};
    progressSnap.docs.forEach(doc => {
        readingProgress[doc.id] = doc.data();
    });
}

function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (currentUser) {
        authBtn.textContent = 'Account';
        authBtn.classList.add('logged-in');
        authBtn.onclick = showUserMenu;
        
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
        
        const userEmail = document.getElementById('user-email');
        if (userEmail) userEmail.textContent = currentUser.email;
        
        updateUserBadges();
    } else {
        authBtn.textContent = 'Login';
        authBtn.classList.remove('logged-in');
        authBtn.onclick = showAuthModal;
        
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
    }
}

function updateUserBadges() {
    if (!userProfile.badges) return;
    
    const badgesContainer = document.getElementById('user-badges');
    if (badgesContainer) {
        badgesContainer.innerHTML = userProfile.badges
            .slice(0, 3)
            .map(badgeKey => {
                const badge = BADGES[badgeKey];
                return badge ? `<span class="badge" title="${badge.description}">${badge.icon}</span>` : '';
            })
            .join('');
    }
}

// Email/Password Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    const rememberMe = document.getElementById('remember-me').checked;

    try {
        // Set persistence based on remember me
        const persistence = rememberMe ? 
            firebase.auth.Auth.Persistence.LOCAL : 
            firebase.auth.Auth.Persistence.SESSION;
        await auth.setPersistence(persistence);
        
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        showToast('Welcome back!', 'success');
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = getErrorMessage(error);
    }
});

// Email/Password Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const errorDiv = document.getElementById('register-error');

    if (password !== confirm) {
        errorDiv.textContent = 'Passwords do not match';
        return;
    }

    try {
        const result = await auth.createUserWithEmailAndPassword(email, password);
        await result.user.updateProfile({ displayName: username });
        await initializeUserProfile(result.user);
        closeAuthModal();
        showToast('Account created successfully! Welcome!', 'success');
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = getErrorMessage(error);
    }
});

// Password Reset
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
        showToast('Password reset email sent!', 'success');
    } catch (error) {
        errorDiv.textContent = getErrorMessage(error);
        successDiv.textContent = '';
    }
});

// ⚡ Google Sign-In (Login)
document.getElementById('google-btn').addEventListener('click', signInWithGoogle);
document.getElementById('google-btn-register').addEventListener('click', signInWithGoogle);

async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithRedirect(provider);
    } catch (error) {
        console.error('Google sign-in error:', error);
        handleAuthError(error);
    }
}

// ⚡ Facebook Sign-In
document.getElementById('facebook-btn').addEventListener('click', signInWithFacebook);
document.getElementById('facebook-btn-register').addEventListener('click', signInWithFacebook);

async function signInWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    try {
        await auth.signInWithRedirect(provider);
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        handleAuthError(error);
    }
}

// ⚡ Twitter Sign-In
document.getElementById('twitter-btn').addEventListener('click', signInWithTwitter);
document.getElementById('twitter-btn-register').addEventListener('click', signInWithTwitter);

async function signInWithTwitter() {
    const provider = new firebase.auth.TwitterAuthProvider();
    try {
        await auth.signInWithRedirect(provider);
    } catch (error) {
        console.error('Twitter sign-in error:', error);
        handleAuthError(error);
    }
}

// ⚡ GitHub Sign-In
document.getElementById('github-btn').addEventListener('click', signInWithGitHub);
document.getElementById('github-btn-register').addEventListener('click', signInWithGitHub);

async function signInWithGitHub() {
    const provider = new firebase.auth.GithubAuthProvider();
    try {
        await auth.signInWithRedirect(provider);
    } catch (error) {
        console.error('GitHub sign-in error:', error);
        handleAuthError(error);
    }
}

// ⚡ Phone Sign-In
document.getElementById('phone-btn').addEventListener('click', () => switchToPhone());
document.getElementById('phone-btn-register').addEventListener('click', () => switchToPhone());

function switchToPhone() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.phone').classList.add('active');
    document.querySelector('.toggle-box').style.display = 'none';
    initializeRecaptcha();
}

function initializeRecaptcha() {
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            size: 'normal',
            callback: () => console.log('reCAPTCHA solved')
        });
    }
}

document.getElementById('phone-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;
    const errorDiv = document.getElementById('phone-error');

    try {
        const appVerifier = window.recaptchaVerifier;
        window.confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, appVerifier);
        document.getElementById('phone-code-input').style.display = 'block';
        showToast('Verification code sent!', 'success');
    } catch (error) {
        console.error('Phone sign-in error:', error);
        errorDiv.textContent = getErrorMessage(error);
    }
});

document.getElementById('verify-code-btn').addEventListener('click', async () => {
    const code = document.getElementById('verification-code').value;
    const errorDiv = document.getElementById('phone-error');

    try {
        await window.confirmationResult.confirm(code);
        closeAuthModal();
        showToast('Phone verification successful!', 'success');
    } catch (error) {
        console.error('Verification error:', error);
        errorDiv.textContent = 'Invalid verification code';
    }
});

function handleAuthError(error) {
    let errorMsg = 'Authentication failed. ';
    
    if (error.code === 'auth/unauthorized-domain') {
        errorMsg = 'Domain not authorized. Please add your domain to Firebase Console → Authentication → Settings → Authorized domains';
    } else if (error.code === 'auth/popup-blocked') {
        errorMsg = 'Pop-up blocked. Please allow pop-ups or try again.';
    } else {
        errorMsg += error.message;
    }
    
    showToast(errorMsg, 'error');
}

function getErrorMessage(error) {
    const messages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password should be at least 6 characters',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Please try again later'
    };
    return messages[error.code] || error.message;
}

// Logout
async function logout() {
    try {
        await auth.signOut();
        closeUserMenu();
        showPage('homepage');
        showToast('Signed out successfully', 'success');
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ==========================================
// MODALS & UI
// ==========================================

function showAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
    document.body.style.overflow = '';
    // Reset forms
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    document.querySelectorAll('.form-box form').forEach(form => form.reset());
}

function showUserMenu() {
    document.getElementById('user-menu').classList.add('active');
}

function closeUserMenu() {
    document.getElementById('user-menu').classList.remove('active');
}

function toggleToLogin() {
    const container = document.querySelector('.modal-content');
    container.classList.remove('active');
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.login').classList.add('active');
    document.querySelector('.toggle-box').style.display = 'flex';
}

function toggleToRegister() {
    const container = document.querySelector('.modal-content');
    container.classList.add('active');
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.register').classList.add('active');
    document.querySelector('.toggle-box').style.display = 'flex';
}

function switchToReset() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.reset').classList.add('active');
    document.querySelector('.toggle-box').style.display = 'none';
}

function switchToLogin() {
    toggleToLogin();
}

// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
}

// ==========================================
// CONTENT LOADING
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
        const progressKey = `${seriesId}-${bookId}-${chapter.id}`;
        const progress = readingProgress[progressKey]?.progress || 0;
        
        const card = document.createElement('div');
        card.className = 'chapter-card';
        card.innerHTML = `
            <div class="chapter-card-info">
                <h3>Chapter ${chapter.id}: ${chapter.title}</h3>
                ${progress > 0 ? `<div class="chapter-progress-mini">
                    <div class="progress-bar-mini">
                        <div class="progress-fill-mini" style="width: ${progress}%"></div>
                    </div>
                    <span class="progress-text">${Math.round(progress)}% complete</span>
                </div>` : '<p class="chapter-card-status">Tap to read</p>'}
            </div>
            <div class="chapter-card-views enhanced">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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

    // Increment views
    await incrementViews(seriesId, bookId, chapterId);
    const views = await getChapterViews(seriesId, bookId, chapterId);
    document.getElementById('chapter-views').textContent = views;

    // Load likes/dislikes
    await loadLikesDislikesUI(seriesId, bookId, chapterId);

    // Setup navigation
    setupChapterNavigation(seriesId, bookId, chapterId);

    // Load comments
    await loadComments(seriesId, bookId, chapterId);

    // Setup character count for comments
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
        commentInput.addEventListener('input', () => {
            document.getElementById('char-count').textContent = commentInput.value.length;
        });
    }

    // Load reading progress
    initializeReadingProgress();

    // Show bookmark status
    updateBookmarkButton(seriesId, bookId, chapterId);

    // Load poll if exists
    loadChapterPoll(seriesId, bookId, chapterId);

    // Track chapter read
    if (currentUser) {
        trackChapterRead(seriesId, bookId, chapterId);
    }

    showPage('chapter-page');
}

function setupChapterNavigation(seriesId, bookId, chapterId) {
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
}

// ==========================================
// VIEWS SYSTEM
// ==========================================

async function incrementViews(seriesId, bookId, chapterId) {
    const viewRef = db.collection('views').doc(`${seriesId}-${bookId}-${chapterId}`);
    
    try {
        await db.runTransaction(async (transaction) => {
            const viewDoc = await transaction.get(viewRef);
            const newCount = (viewDoc.exists ? viewDoc.data().count : 0) + 1;
            transaction.set(viewRef, { count: newCount, lastViewed: firebase.firestore.FieldValue.serverTimestamp() });
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

async function getChapterViews(seriesId, bookId, chapterId) {
    const viewRef = db.collection('views').doc(`${seriesId}-${bookId}-${chapterId}`);
    const viewDoc = await viewRef.get();
    return viewDoc.exists ? viewDoc.data().count : 0;
}

// ==========================================
// LIKES & DISLIKES SYSTEM
// ==========================================

async function loadLikesDislikesUI(seriesId, bookId, chapterId) {
    const docId = `${seriesId}-${bookId}-${chapterId}`;
    const likeRef = db.collection('likes').doc(docId);
    
    const likeDoc = await likeRef.get();
    const data = likeDoc.exists ? likeDoc.data() : { likes: 0, dislikes: 0, users: {} };
    
    document.getElementById('like-count').textContent = data.likes || 0;
    document.getElementById('dislike-count').textContent = data.dislikes || 0;
    
    if (currentUser && data.users && data.users[currentUser.uid]) {
        const userAction = data.users[currentUser.uid];
        if (userAction === 'like') {
            document.getElementById('like-btn').classList.add('active');
        } else if (userAction === 'dislike') {
            document.getElementById('dislike-btn').classList.add('active');
        }
    }
}

document.getElementById('like-btn').addEventListener('click', () => {
    if (!currentUser) {
        showToast('Please sign in to like', 'info');
        showAuthModal();
        return;
    }
    toggleLikeDislike('like');
});

document.getElementById('dislike-btn').addEventListener('click', () => {
    if (!currentUser) {
        showToast('Please sign in to react', 'info');
        showAuthModal();
        return;
    }
    toggleLikeDislike('dislike');
});

async function toggleLikeDislike(action) {
    const docId = `${currentSeries.id}-${currentBook.id}-${currentChapter.id}`;
    const likeRef = db.collection('likes').doc(docId);
    
    try {
        await db.runTransaction(async (transaction) => {
            const likeDoc = await transaction.get(likeRef);
            const data = likeDoc.exists ? likeDoc.data() : { likes: 0, dislikes: 0, users: {} };
            
            const currentAction = data.users[currentUser.uid];
            
            // Remove previous action
            if (currentAction) {
                data[currentAction + 's'] = Math.max(0, data[currentAction + 's'] - 1);
            }
            
            // Toggle or set new action
            if (currentAction === action) {
                delete data.users[currentUser.uid];
                document.getElementById(action + '-btn').classList.remove('active');
            } else {
                data.users[currentUser.uid] = action;
                data[action + 's'] = (data[action + 's'] || 0) + 1;
                document.getElementById(action + '-btn').classList.add('active');
                if (currentAction) {
                    const otherAction = action === 'like' ? 'dislike' : 'like';
                    document.getElementById(otherAction + '-btn').classList.remove('active');
                }
            }
            
            transaction.set(likeRef, data);
        });
        
        // Reload UI
        await loadLikesDislikesUI(currentSeries.id, currentBook.id, currentChapter.id);
    } catch (error) {
        console.error('Error toggling like/dislike:', error);
        showToast('Failed to update reaction', 'error');
    }
}

// ==========================================
// BOOKMARKS SYSTEM
// ==========================================

document.getElementById('bookmark-btn').addEventListener('click', toggleBookmark);

function updateBookmarkButton(seriesId, bookId, chapterId) {
    const isBookmarked = userBookmarks.some(b => 
        b.seriesId === seriesId && b.bookId === bookId && b.chapterId === chapterId
    );
    
    const btn = document.getElementById('bookmark-btn');
    if (isBookmarked) {
        btn.classList.add('active');
        btn.querySelector('svg').style.fill = 'currentColor';
    } else {
        btn.classList.remove('active');
        btn.querySelector('svg').style.fill = 'none';
    }
}

async function toggleBookmark() {
    if (!currentUser) {
        showToast('Please sign in to bookmark', 'info');
        showAuthModal();
        return;
    }
    
    const bookmarkData = {
        userId: currentUser.uid,
        seriesId: currentSeries.id,
        bookId: currentBook.id,
        chapterId: currentChapter.id,
        seriesName: currentSeries.name,
        bookTitle: currentBook.title,
        chapterTitle: currentChapter.title,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    const existing = userBookmarks.find(b => 
        b.seriesId === currentSeries.id && 
        b.bookId === currentBook.id && 
        b.chapterId === currentChapter.id
    );
    
    try {
        if (existing) {
            await db.collection('bookmarks').doc(existing.id).delete();
            userBookmarks = userBookmarks.filter(b => b.id !== existing.id);
            showToast('Bookmark removed', 'success');
        } else {
            const docRef = await db.collection('bookmarks').add(bookmarkData);
            userBookmarks.push({ id: docRef.id, ...bookmarkData });
            showToast('Bookmark added', 'success');
            
            // Award badge
            await checkAndAwardBadge('BOOKMARK_COLLECTOR', userBookmarks.length >= 20);
        }
        
        updateBookmarkButton(currentSeries.id, currentBook.id, currentChapter.id);
    } catch (error) {
        console.error('Bookmark error:', error);
        showToast('Failed to update bookmark', 'error');
    }
}

// ==========================================
// READING PROGRESS
// ==========================================

function initializeReadingProgress() {
    const contentDiv = document.getElementById('chapter-content');
    if (!contentDiv) return;
    
    let isScrolling;
    contentDiv.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            updateReadingProgress();
        }, 150);
    });
}

async function updateReadingProgress() {
    const contentDiv = document.getElementById('chapter-content');
    if (!contentDiv || !currentUser) return;
    
    const scrollTop = contentDiv.scrollTop;
    const scrollHeight = contentDiv.scrollHeight - contentDiv.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    // Update progress bar
    const progressFill = document.querySelector('.chapter-progress-bar .progress-fill');
    if (progressFill) {
        progressFill.style.width = progress + '%';
    }
    
    // Save to Firestore
    if (progress > 5) { // Only save if meaningfully progressed
        const progressKey = `${currentSeries.id}-${currentBook.id}-${currentChapter.id}`;
        const progressRef = db.collection('progress').doc(`${currentUser.uid}-${progressKey}`);
        
        try {
            await progressRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                progress: Math.round(progress),
                lastRead: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error('Progress save error:', error);
        }
    }
}

async function trackChapterRead(seriesId, bookId, chapterId) {
    const userRef = db.collection('users').doc(currentUser.uid);
    const historyRef = db.collection('readingHistory').doc(`${currentUser.uid}-${seriesId}-${bookId}-${chapterId}`);
    
    try {
        await historyRef.set({
            userId: currentUser.uid,
            seriesId, bookId, chapterId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await userRef.update({
            chaptersRead: firebase.firestore.FieldValue.increment(1)
        });
        
        // Check for badges
        const userDoc = await userRef.get();
        const chaptersRead = userDoc.data().chaptersRead;
        await checkAndAwardBadge('BOOKWORM', chaptersRead >= 10);
        await checkAndAwardBadge('DEDICATED_READER', chaptersRead >= 50);
        await checkAndAwardBadge('MASTER_READER', chaptersRead >= 100);
    } catch (error) {
        console.error('Track read error:', error);
    }
}

// ==========================================
// COMMENTS SYSTEM
// ==========================================

document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const commentInput = document.getElementById('comment-input');
    const commentText = commentInput.value.trim();
    
    if (!commentText) return;
    if (!currentUser) {
        showToast('Please sign in to comment', 'info');
        showAuthModal();
        return;
    }
    
    try {
        const commentData = {
            userId: currentUser.uid,
            userEmail: currentUser.email,
            userName: currentUser.displayName || currentUser.email.split('@')[0],
            seriesId: currentSeries.id,
            bookId: currentBook.id,
            chapterId: currentChapter.id,
            text: commentText,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            likes: 0
        };
        
        await db.collection('comments').add(commentData);
        commentInput.value = '';
        document.getElementById('char-count').textContent = '0';
        
        await loadComments(currentSeries.id, currentBook.id, currentChapter.id);
        showToast('Comment posted!', 'success');
        
        // Update user stats and check badges
        const userRef = db.collection('users').doc(currentUser.uid);
        await userRef.update({
            commentsPosted: firebase.firestore.FieldValue.increment(1)
        });
        
        const userDoc = await userRef.get();
        const commentsPosted = userDoc.data().commentsPosted;
        
        await checkAndAwardBadge('FIRST_COMMENT', commentsPosted >= 1);
        await checkAndAwardBadge('COMMENTATOR', commentsPosted >= 25);
        
    } catch (error) {
        console.error('Comment error:', error);
        showToast('Failed to post comment', 'error');
    }
});

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
        
        if (snapshot.empty) {
            commentsList.innerHTML = '<div class="no-comments">No comments yet. Be the first to comment!</div>';
            return;
        }
        
        commentsList.innerHTML = '';
        
        for (const doc of snapshot.docs) {
            const comment = doc.data();
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            
            // Get user badges
            const userDoc = await db.collection('users').doc(comment.userId).get();
            const userData = userDoc.exists ? userDoc.data() : {};
            const badges = userData.badges || [];
            
            const badgesHTML = badges.slice(0, 3).map(badgeKey => {
                const badge = BADGES[badgeKey];
                return badge ? `<span class="badge" title="${badge.description}">${badge.icon}</span>` : '';
            }).join('');
            
            const timeAgo = comment.timestamp ? getTimeAgo(comment.timestamp.toDate()) : 'Just now';
            
            commentDiv.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar"></div>
                    <div class="comment-meta">
                        <span class="comment-author">${comment.userName}</span>
                        <div class="comment-badges">${badgesHTML}</div>
                        <span class="comment-time">${timeAgo}</span>
                    </div>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
            `;
            
            commentsList.appendChild(commentDiv);
        }
    } catch (error) {
        console.error('Load comments error:', error);
        commentsList.innerHTML = '<div class="error">Failed to load comments</div>';
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };
    
    for (const [name, secondsInInterval] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInInterval);
        if (interval >= 1) {
            return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
        }
    }
    
    return 'just now';
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// POLLS SYSTEM
// ==========================================

async function loadChapterPoll(seriesId, bookId, chapterId) {
    const pollDiv = document.getElementById('chapter-poll');
    const pollRef = db.collection('polls').doc(`${seriesId}-${bookId}-${chapterId}`);
    
    try {
        const pollDoc = await pollRef.get();
        if (!pollDoc.exists) {
            pollDiv.style.display = 'none';
            return;
        }
        
        const poll = pollDoc.data();
        pollDiv.style.display = 'block';
        
        const userVoted = currentUser && poll.voters && poll.voters[currentUser.uid];
        
        document.querySelector('.poll-title').textContent = poll.question;
        
        const optionsDiv = document.querySelector('.poll-options');
        const resultsDiv = document.querySelector('.poll-results');
        
        if (userVoted) {
            showPollResults(poll);
        } else {
            showPollOptions(poll, seriesId, bookId, chapterId);
        }
    } catch (error) {
        console.error('Load poll error:', error);
    }
}

function showPollOptions(poll, seriesId, bookId, chapterId) {
    const optionsDiv = document.querySelector('.poll-options');
    optionsDiv.style.display = 'block';
    document.querySelector('.poll-results').style.display = 'none';
    
    optionsDiv.innerHTML = poll.options.map((option, index) => `
        <button class="poll-option" onclick="votePoll(${seriesId}, ${bookId}, ${chapterId}, ${index})">
            ${option}
        </button>
    `).join('');
}

function showPollResults(poll) {
    const optionsDiv = document.querySelector('.poll-options');
    const resultsDiv = document.querySelector('.poll-results');
    
    optionsDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    
    const totalVotes = Object.keys(poll.voters || {}).length;
    
    resultsDiv.innerHTML = poll.options.map((option, index) => {
        const votes = poll.votes[index] || 0;
        const percentage = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        
        return `
            <div class="poll-result">
                <div class="poll-result-label">
                    <span>${option}</span>
                    <span>${votes} votes (${percentage}%)</span>
                </div>
                <div class="poll-result-bar">
                    <div class="poll-result-fill" style="width: ${percentage}%"></div>
                </div>
            </div>
        `;
    }).join('');
}

async function votePoll(seriesId, bookId, chapterId, optionIndex) {
    if (!currentUser) {
        showToast('Please sign in to vote', 'info');
        showAuthModal();
        return;
    }
    
    const pollRef = db.collection('polls').doc(`${seriesId}-${bookId}-${chapterId}`);
    
    try {
        await db.runTransaction(async (transaction) => {
            const pollDoc = await transaction.get(pollRef);
            const poll = pollDoc.data();
            
            if (poll.voters && poll.voters[currentUser.uid]) {
                throw new Error('Already voted');
            }
            
            poll.votes[optionIndex] = (poll.votes[optionIndex] || 0) + 1;
            poll.voters = poll.voters || {};
            poll.voters[currentUser.uid] = optionIndex;
            
            transaction.update(pollRef, poll);
        });
        
        showToast('Vote recorded!', 'success');
        await loadChapterPoll(seriesId, bookId, chapterId);
    } catch (error) {
        console.error('Vote error:', error);
        showToast('Failed to vote', 'error');
    }
}

// ==========================================
// BADGES SYSTEM
// ==========================================

async function checkAndAwardBadge(badgeKey, condition) {
    if (!currentUser || !condition) return;
    
    const userRef = db.collection('users').doc(currentUser.uid);
    const userDoc = await userRef.get();
    const badges = userDoc.data().badges || [];
    
    if (!badges.includes(badgeKey)) {
        badges.push(badgeKey);
        await userRef.update({ badges });
        
        const badge = BADGES[badgeKey];
        showToast(`🎉 Badge Earned: ${badge.name}!`, 'success', 4000);
        updateUserBadges();
    }
}

// ==========================================
// PROFILE & DASHBOARD
// ==========================================

function showProfile() {
    closeUserMenu();
    // Load profile data
    showPage('profile-page');
}

function showDashboard() {
    if (!currentUser) return;
    closeUserMenu();
    loadDashboard();
    showPage('dashboard-page');
}

async function loadDashboard() {
    // Load analytics data
    try {
        const viewsSnap = await db.collection('views').get();
        const likesSnap = await db.collection('likes').get();
        const commentsSnap = await db.collection('comments').get();
        const usersSnap = await db.collection('users').get();
        
        let totalViews = 0;
        viewsSnap.forEach(doc => {
            totalViews += doc.data().count || 0;
        });
        
        let totalLikes = 0;
        likesSnap.forEach(doc => {
            totalLikes += doc.data().likes || 0;
        });
        
        document.getElementById('total-views').textContent = totalViews;
        document.getElementById('total-likes').textContent = totalLikes;
        document.getElementById('total-comments').textContent = commentsSnap.size;
        document.getElementById('total-readers').textContent = usersSnap.size;
    } catch (error) {
        console.error('Dashboard load error:', error);
    }
}

function showNotifications() {
    document.getElementById('notifications-panel').classList.add('active');
    loadNotifications();
}

function closeNotifications() {
    document.getElementById('notifications-panel').classList.remove('active');
}

async function loadNotifications() {
    // Placeholder for notifications system
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '<div class="no-notifications">No new notifications</div>';
}

function showSettings() {
    closeUserMenu();
    showToast('Settings coming soon!', 'info');
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = {
        success: '✓',
        error: '✕',
        info: 'ℹ',
        warning: '⚠'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSeries();
    console.log('✅ TENSURA WebBooks initialized');
});
