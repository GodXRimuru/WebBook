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
const storage = firebase.storage();

// Enable persistence for offline support
db.enablePersistence().catch((err) => {
    if (err.code == 'failed-precondition') {
        console.log('Persistence failed: Multiple tabs open');
    } else if (err.code == 'unimplemented') {
        console.log('Persistence not available');
    }
});

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

And as I read on, I realized that the truth was far more terrible than I could have ever imagined.`,
                        poll: {
                            question: "What should Emily do with the diary?",
                            options: [
                                "Confront Mark immediately",
                                "Go to the police",
                                "Continue reading in secret",
                                "Put it back and pretend she never found it"
                            ]
                        }
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

Because the man sleeping beside me had killed before. And he wouldn't hesitate to do it again.`,
                        poll: {
                            question: "How dangerous is Mark really?",
                            options: [
                                "Extremely - he'll kill again",
                                "Moderate - only if cornered",
                                "Low - Rachel was a one-time thing",
                                "Emily might be imagining things"
                            ]
                        }
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
// STATE
// ==========================================
let currentUser = null;
let currentSeries = null;
let currentBook = null;
let currentChapter = null;
let highlightMode = false;
let readingStartTime = null;
let userProfile = null;

// Admin users (add Firebase UIDs here)
const ADMIN_UIDS = [];

// ==========================================
// AUTH - ENHANCED WITH ALL PROVIDERS
// ==========================================

// Setup auth persistence
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch(console.error);

// Check for redirect result on page load
auth.getRedirectResult().then(result => {
    if (result.user) {
        console.log('Sign-in successful via redirect');
        closeAuthModal();
        showToast('Welcome back!', 'success');
    }
}).catch(error => {
    console.error('Redirect sign-in error:', error);
    if (error.code === 'auth/unauthorized-domain') {
        showToast('Please add your domain to Firebase authorized domains', 'error');
    }
});

// Auth state observer - FIXED for persistence
auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    await updateAuthUI();
    
    if (user) {
        // Load user profile
        await loadUserProfile();
        // Check for admin
        if (ADMIN_UIDS.includes(user.uid)) {
            document.body.classList.add('admin');
        }
        // Load notifications
        loadNotifications();
    } else {
        userProfile = null;
        document.body.classList.remove('admin');
    }
    
    if (user && currentChapter) {
        loadComments(currentSeries.id, currentBook.id, currentChapter.id);
    }
});

async function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const dashboardBtn = document.getElementById('dashboard-btn');
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (currentUser) {
        authBtn.textContent = 'Account';
        authBtn.classList.add('logged-in');
        authBtn.onclick = showUserMenu;
        
        if (dashboardBtn) dashboardBtn.style.display = 'flex';
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (commentForm) commentForm.style.display = 'flex';
        
        document.getElementById('user-email').textContent = currentUser.email;
        
        // Update display name if available
        if (userProfile && userProfile.displayName) {
            document.getElementById('user-display-name').textContent = userProfile.displayName;
        }
    } else {
        authBtn.textContent = 'Login';
        authBtn.classList.remove('logged-in');
        authBtn.onclick = showAuthModal;
        
        if (dashboardBtn) dashboardBtn.style.display = 'none';
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
    }
}

// Email/Password Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    const errorDiv = document.getElementById('login-error');

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

// Register
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
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
        const result = await auth.createUserWithEmailAndPassword(email, password);
        // Create user profile
        await createUserProfile(result.user.uid);
        closeAuthModal();
        showToast('Account created successfully!', 'success');
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = getErrorMessage(error);
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
        errorDiv.textContent = getErrorMessage(error);
        successDiv.textContent = '';
    }
});

// Google Sign-In
function setupGoogleAuth(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                console.error('Google sign-in error:', error);
                showToast(getErrorMessage(error), 'error');
            }
        });
    }
}

setupGoogleAuth('google-btn');
setupGoogleAuth('google-btn-register');

// Facebook Sign-In
function setupFacebookAuth(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('click', async () => {
            const provider = new firebase.auth.FacebookAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                console.error('Facebook sign-in error:', error);
                showToast(getErrorMessage(error), 'error');
            }
        });
    }
}

setupFacebookAuth('facebook-btn');
setupFacebookAuth('facebook-btn-register');

// Twitter Sign-In
function setupTwitterAuth(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('click', async () => {
            const provider = new firebase.auth.TwitterAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                console.error('Twitter sign-in error:', error);
                showToast(getErrorMessage(error), 'error');
            }
        });
    }
}

setupTwitterAuth('twitter-btn');
setupTwitterAuth('twitter-btn-register');

// GitHub Sign-In
function setupGitHubAuth(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('click', async () => {
            const provider = new firebase.auth.GithubAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                console.error('GitHub sign-in error:', error);
                showToast(getErrorMessage(error), 'error');
            }
        });
    }
}

setupGitHubAuth('github-btn');
setupGitHubAuth('github-btn-register');

// Phone Sign-In
let confirmationResult = null;

function setupPhoneAuth(buttonId) {
    const btn = document.getElementById(buttonId);
    if (btn) {
        btn.addEventListener('click', () => {
            switchToPhoneAuth();
        });
    }
}

setupPhoneAuth('phone-btn');
setupPhoneAuth('phone-btn-register');

function switchToPhoneAuth() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.phone-auth').classList.add('active');
    document.querySelector('.toggle-box').style.display = 'none';
    
    // Setup reCAPTCHA
    if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                console.log('reCAPTCHA solved');
            }
        });
        window.recaptchaVerifier.render();
    }
}

document.getElementById('phone-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneNumber = document.getElementById('phone-number').value;
    const errorDiv = document.getElementById('phone-error');
    
    try {
        confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
        document.getElementById('verify-code-section').style.display = 'block';
        errorDiv.textContent = '';
        showToast('Verification code sent!', 'success');
    } catch (error) {
        console.error('Phone auth error:', error);
        errorDiv.textContent = getErrorMessage(error);
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
            window.recaptchaVerifier = null;
        }
    }
});

async function verifyPhoneCode() {
    const code = document.getElementById('verification-code').value;
    const errorDiv = document.getElementById('phone-error');
    
    if (!confirmationResult) {
        errorDiv.textContent = 'Please request a code first';
        return;
    }
    
    try {
        await confirmationResult.confirm(code);
        closeAuthModal();
        showToast('Phone verified successfully!', 'success');
    } catch (error) {
        errorDiv.textContent = 'Invalid verification code';
    }
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
        showToast('Error signing out', 'error');
    }
}

// Helper function for error messages
function getErrorMessage(error) {
    const errorMessages = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/operation-not-allowed': 'Operation not allowed',
        'auth/weak-password': 'Password is too weak',
        'auth/user-disabled': 'This account has been disabled',
        'auth/user-not-found': 'No account found with this email',
        'auth/wrong-password': 'Incorrect password',
        'auth/too-many-requests': 'Too many attempts. Try again later',
        'auth/unauthorized-domain': 'Domain not authorized. Please add to Firebase console',
        'auth/popup-blocked': 'Popup blocked. Please allow popups',
        'auth/popup-closed-by-user': 'Popup closed before completion',
        'auth/invalid-phone-number': 'Invalid phone number format',
        'auth/missing-phone-number': 'Please enter a phone number',
        'auth/quota-exceeded': 'SMS quota exceeded',
        'auth/invalid-verification-code': 'Invalid verification code',
        'auth/invalid-verification-id': 'Verification expired. Please try again'
    };
    
    return errorMessages[error.code] || error.message;
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
    document.querySelector('.toggle-box').style.display = 'block';
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

function switchToReset() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    const resetBox = document.querySelector('.form-box.reset');
    resetBox.classList.add('active');
    document.querySelector('.toggle-box').style.display = 'none';
}

function switchToLogin() {
    document.querySelectorAll('.form-box').forEach(box => box.classList.remove('active'));
    document.querySelector('.form-box.login').classList.add('active');
    const authContainer = document.querySelector('.auth-container');
    authContainer.classList.remove('active');
    document.querySelector('.toggle-box').style.display = 'block';
}

// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageId) {
    // Save reading time if leaving chapter page
    if (document.getElementById('chapter-page').classList.contains('active') && readingStartTime) {
        saveReadingTime();
    }
    
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo(0, 0);
    
    // Start reading timer if entering chapter page
    if (pageId === 'chapter-page') {
        readingStartTime = Date.now();
    }
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
            <div class="series-cover-wrapper">
                <img src="${series.cover}" alt="${series.name}" class="series-card-cover">
                <div class="series-cover-overlay"></div>
            </div>
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
            <h3 class="book-title">Book ${book.id}: ${book.title}</h3>
            <p class="book-desc">${book.description}</p>
            <p class="book-card-stats">${book.chapters.length} chapters</p>
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

    // Load book engagement stats
    await loadBookEngagement(seriesId, bookId);

    const chaptersList = document.getElementById('chapters-list');
    chaptersList.innerHTML = '';

    for (const chapter of currentBook.chapters) {
        const views = await getChapterViews(seriesId, bookId, chapter.id);
        const progress = await getChapterProgress(seriesId, bookId, chapter.id);
        
        const item = document.createElement('div');
        item.className = 'chapter-item' + (progress >= 100 ? ' read' : '');
        item.innerHTML = `
            <div class="chapter-info">
                <h3 class="chapter-item-title">Chapter ${chapter.id}: ${chapter.title}</h3>
                <div class="chapter-item-meta">
                    <span><span class="material-symbols-rounded" style="font-size: 14px;">visibility</span> ${views}</span>
                </div>
            </div>
            ${progress > 0 ? `
                <div class="chapter-progress-indicator">
                    <svg class="chapter-progress-circle" viewBox="0 0 50 50">
                        <circle class="chapter-progress-bg" cx="25" cy="25" r="22"></circle>
                        <circle class="chapter-progress-fill" cx="25" cy="25" r="22" 
                            style="stroke-dasharray: ${Math.PI * 44}; stroke-dashoffset: ${Math.PI * 44 * (1 - progress / 100)}"></circle>
                    </svg>
                    <span class="chapter-progress-text">${Math.round(progress)}%</span>
                </div>
            ` : ''}
        `;
        item.addEventListener('click', () => loadChapterPage(seriesId, bookId, chapter.id));
        chaptersList.appendChild(item);
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

    // Load chapter content
    const contentDiv = document.getElementById('chapter-content');
    contentDiv.innerHTML = '';
    currentChapter.content.split('\n\n').forEach(para => {
        if (para.trim()) {
            const p = document.createElement('p');
            p.textContent = para.trim();
            contentDiv.appendChild(p);
        }
    });

    // Load highlights for this chapter
    await loadHighlights();

    // Increment views
    await incrementViews(seriesId, bookId, chapterId);
    const views = await getChapterViews(seriesId, bookId, chapterId);
    document.getElementById('chapter-views').textContent = views;

    // Load likes
    await loadChapterLikes();

    // Setup chapter navigation
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

    // Load poll if exists
    if (currentChapter.poll) {
        await loadPoll(seriesId, bookId, chapterId);
    } else {
        document.getElementById('chapter-poll-section').style.display = 'none';
    }

    // Load comments
    loadComments(seriesId, bookId, chapterId);

    // Setup reading progress
    setupReadingProgress();

    // Load bookmarks status
    await loadBookmarkStatus();

    // Record reading history
    if (currentUser) {
        recordReadingHistory(seriesId, bookId, chapterId);
    }

    showPage('chapter-page');
}

// ==========================================
// READING PROGRESS TRACKING
// ==========================================

function setupReadingProgress() {
    const contentDiv = document.getElementById('chapter-content');
    const progressFill = document.getElementById('reading-progress-fill');
    const progressText = document.getElementById('reading-progress-text');
    
    const updateProgress = () => {
        const windowHeight = window.innerHeight;
        const documentHeight = contentDiv.offsetHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const contentTop = contentDiv.offsetTop;
        
        const progress = Math.min(100, Math.max(0, 
            ((scrollTop - contentTop + windowHeight) / documentHeight) * 100
        ));
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
        
        // Save progress to database
        if (currentUser && progress > 0) {
            saveChapterProgress(currentSeries.id, currentBook.id, currentChapter.id, progress);
        }
    };
    
    window.addEventListener('scroll', updateProgress);
    updateProgress();
}

async function saveChapterProgress(seriesId, bookId, chapterId, progress) {
    if (!currentUser) return;
    
    const docRef = db.collection('progress').doc(`${currentUser.uid}_s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        await docRef.set({
            userId: currentUser.uid,
            seriesId,
            bookId,
            chapterId,
            progress: Math.round(progress),
            lastRead: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Error saving progress:', error);
    }
}

async function getChapterProgress(seriesId, bookId, chapterId) {
    if (!currentUser) return 0;
    
    const docRef = db.collection('progress').doc(`${currentUser.uid}_s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        const doc = await docRef.get();
        return doc.exists ? (doc.data().progress || 0) : 0;
    } catch (error) {
        console.error('Error getting progress:', error);
        return 0;
    }
}

// ==========================================
// BOOKMARKS
// ==========================================

async function toggleBookmark() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const bookmarkBtn = document.getElementById('bookmark-btn');
    const isBookmarked = bookmarkBtn.classList.contains('active');
    
    const bookmarkId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const bookmarkRef = db.collection('bookmarks').doc(bookmarkId);
    
    try {
        if (isBookmarked) {
            await bookmarkRef.delete();
            bookmarkBtn.classList.remove('active');
            showToast('Bookmark removed', 'info');
        } else {
            await bookmarkRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                seriesName: currentSeries.name,
                bookTitle: currentBook.title,
                chapterTitle: currentChapter.title,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            bookmarkBtn.classList.add('active');
            showToast('Bookmarked!', 'success');
            
            // Send notification
            if (currentUser) {
                createNotification('bookmark', `You bookmarked ${currentChapter.title}`);
            }
        }
    } catch (error) {
        console.error('Error toggling bookmark:', error);
        showToast('Error updating bookmark', 'error');
    }
}

async function loadBookmarkStatus() {
    if (!currentUser) return;
    
    const bookmarkId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const bookmarkRef = db.collection('bookmarks').doc(bookmarkId);
    
    try {
        const doc = await bookmarkRef.get();
        const bookmarkBtn = document.getElementById('bookmark-btn');
        if (doc.exists) {
            bookmarkBtn.classList.add('active');
        } else {
            bookmarkBtn.classList.remove('active');
        }
    } catch (error) {
        console.error('Error loading bookmark status:', error);
    }
}

// ==========================================
// TEXT HIGHLIGHTING
// ==========================================

function toggleHighlightMode() {
    highlightMode = !highlightMode;
    const highlightBtn = document.getElementById('highlight-mode-btn');
    const contentDiv = document.getElementById('chapter-content');
    
    if (highlightMode) {
        highlightBtn.classList.add('active');
        contentDiv.classList.add('highlight-mode');
        showToast('Select text to highlight', 'info');
    } else {
        highlightBtn.classList.remove('active');
        contentDiv.classList.remove('highlight-mode');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mouseup', handleTextSelection);
});

async function handleTextSelection() {
    if (!highlightMode || !currentUser) return;
    
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (selectedText.length > 10 && selectedText.length < 500) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlighted';
        span.textContent = selectedText;
        
        try {
            range.deleteContents();
            range.insertNode(span);
            
            // Save to database
            await db.collection('highlights').add({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                text: selectedText,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            showToast('Text highlighted!', 'success');
            selection.removeAllRanges();
            
            await loadHighlights();
        } catch (error) {
            console.error('Error saving highlight:', error);
            showToast('Error saving highlight', 'error');
        }
    }
}

async function loadHighlights() {
    if (!currentUser) {
        document.getElementById('user-highlights').style.display = 'none';
        return;
    }
    
    try {
        const snapshot = await db.collection('highlights')
            .where('userId', '==', currentUser.uid)
            .where('seriesId', '==', currentSeries.id)
            .where('bookId', '==', currentBook.id)
            .where('chapterId', '==', currentChapter.id)
            .orderBy('timestamp', 'desc')
            .get();
        
        if (!snapshot.empty) {
            const highlightsList = document.getElementById('highlights-list');
            highlightsList.innerHTML = '';
            
            snapshot.forEach(doc => {
                const data = doc.data();
                const div = document.createElement('div');
                div.className = 'highlight-item';
                div.innerHTML = `
                    <div class="highlight-text">"${escapeHtml(data.text)}"</div>
                    <div class="highlight-actions">
                        <button class="highlight-delete-btn" onclick="deleteHighlight('${doc.id}')">Delete</button>
                    </div>
                `;
                highlightsList.appendChild(div);
            });
            
            document.getElementById('user-highlights').style.display = 'block';
        } else {
            document.getElementById('user-highlights').style.display = 'none';
        }
    } catch (error) {
        console.error('Error loading highlights:', error);
    }
}

async function deleteHighlight(highlightId) {
    try {
        await db.collection('highlights').doc(highlightId).delete();
        showToast('Highlight deleted', 'info');
        await loadHighlights();
    } catch (error) {
        console.error('Error deleting highlight:', error);
        showToast('Error deleting highlight', 'error');
    }
}

// ==========================================
// LIKES & DISLIKES
// ==========================================

async function toggleChapterLike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const likeBtn = document.getElementById('chapter-like-btn');
    const dislikeBtn = document.getElementById('chapter-dislike-btn');
    const isLiked = likeBtn.classList.contains('liked');
    
    const likeId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const likeRef = db.collection('likes').doc(likeId);
    
    try {
        if (isLiked) {
            await likeRef.delete();
            likeBtn.classList.remove('liked');
        } else {
            await likeRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                type: 'like',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            likeBtn.classList.add('liked');
            dislikeBtn.classList.remove('disliked');
        }
        
        await loadChapterLikes();
    } catch (error) {
        console.error('Error toggling like:', error);
    }
}

async function toggleChapterDislike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const likeBtn = document.getElementById('chapter-like-btn');
    const dislikeBtn = document.getElementById('chapter-dislike-btn');
    const isDisliked = dislikeBtn.classList.contains('disliked');
    
    const likeId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const likeRef = db.collection('likes').doc(likeId);
    
    try {
        if (isDisliked) {
            await likeRef.delete();
            dislikeBtn.classList.remove('disliked');
        } else {
            await likeRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                chapterId: currentChapter.id,
                type: 'dislike',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            dislikeBtn.classList.add('disliked');
            likeBtn.classList.remove('liked');
        }
        
        await loadChapterLikes();
    } catch (error) {
        console.error('Error toggling dislike:', error);
    }
}

async function loadChapterLikes() {
    try {
        const likesSnapshot = await db.collection('likes')
            .where('seriesId', '==', currentSeries.id)
            .where('bookId', '==', currentBook.id)
            .where('chapterId', '==', currentChapter.id)
            .where('type', '==', 'like')
            .get();
        
        document.getElementById('chapter-likes').textContent = likesSnapshot.size;
        
        // Check user's like status
        if (currentUser) {
            const likeId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
            const userLike = await db.collection('likes').doc(likeId).get();
            
            const likeBtn = document.getElementById('chapter-like-btn');
            const dislikeBtn = document.getElementById('chapter-dislike-btn');
            
            if (userLike.exists) {
                if (userLike.data().type === 'like') {
                    likeBtn.classList.add('liked');
                    dislikeBtn.classList.remove('disliked');
                } else {
                    dislikeBtn.classList.add('disliked');
                    likeBtn.classList.remove('liked');
                }
            }
        }
    } catch (error) {
        console.error('Error loading likes:', error);
    }
}

async function toggleBookLike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const likeBtn = document.getElementById('book-like-btn');
    const dislikeBtn = document.getElementById('book-dislike-btn');
    const isLiked = likeBtn.classList.contains('liked');
    
    const likeId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_book`;
    const likeRef = db.collection('bookLikes').doc(likeId);
    
    try {
        if (isLiked) {
            await likeRef.delete();
            likeBtn.classList.remove('liked');
        } else {
            await likeRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                type: 'like',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            likeBtn.classList.add('liked');
            dislikeBtn.classList.remove('disliked');
        }
        
        await loadBookEngagement(currentSeries.id, currentBook.id);
    } catch (error) {
        console.error('Error toggling book like:', error);
    }
}

async function toggleBookDislike() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const likeBtn = document.getElementById('book-like-btn');
    const dislikeBtn = document.getElementById('book-dislike-btn');
    const isDisliked = dislikeBtn.classList.contains('disliked');
    
    const likeId = `${currentUser.uid}_s${currentSeries.id}_b${currentBook.id}_book`;
    const likeRef = db.collection('bookLikes').doc(likeId);
    
    try {
        if (isDisliked) {
            await likeRef.delete();
            dislikeBtn.classList.remove('disliked');
        } else {
            await likeRef.set({
                userId: currentUser.uid,
                seriesId: currentSeries.id,
                bookId: currentBook.id,
                type: 'dislike',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
            dislikeBtn.classList.add('disliked');
            likeBtn.classList.remove('liked');
        }
        
        await loadBookEngagement(currentSeries.id, currentBook.id);
    } catch (error) {
        console.error('Error toggling book dislike:', error);
    }
}

async function loadBookEngagement(seriesId, bookId) {
    try {
        // Get total views
        let totalViews = 0;
        const book = seriesData.find(s => s.id === seriesId).books.find(b => b.id === bookId);
        for (const chapter of book.chapters) {
            totalViews += await getChapterViews(seriesId, bookId, chapter.id);
        }
        
        // Get total likes
        const likesSnapshot = await db.collection('bookLikes')
            .where('seriesId', '==', seriesId)
            .where('bookId', '==', bookId)
            .where('type', '==', 'like')
            .get();
        
        // Get total comments
        const commentsSnapshot = await db.collection('comments')
            .where('seriesId', '==', seriesId)
            .where('bookId', '==', bookId)
            .get();
        
        document.getElementById('book-total-views').textContent = totalViews;
        document.getElementById('book-total-likes').textContent = likesSnapshot.size;
        document.getElementById('book-total-comments').textContent = commentsSnapshot.size;
        
        // Check user's like status
        if (currentUser) {
            const likeId = `${currentUser.uid}_s${seriesId}_b${bookId}_book`;
            const userLike = await db.collection('bookLikes').doc(likeId).get();
            
            const likeBtn = document.getElementById('book-like-btn');
            const dislikeBtn = document.getElementById('book-dislike-btn');
            
            if (userLike.exists) {
                if (userLike.data().type === 'like') {
                    likeBtn.classList.add('liked');
                    dislikeBtn.classList.remove('disliked');
                } else {
                    dislikeBtn.classList.add('disliked');
                    likeBtn.classList.remove('liked');
                }
            }
        }
    } catch (error) {
        console.error('Error loading book engagement:', error);
    }
}

// ==========================================
// POLLS
// ==========================================

async function loadPoll(seriesId, bookId, chapterId) {
    if (!currentChapter.poll) return;
    
    const pollSection = document.getElementById('chapter-poll-section');
    pollSection.style.display = 'block';
    
    const pollId = `s${seriesId}_b${bookId}_c${chapterId}`;
    const pollRef = db.collection('polls').doc(pollId);
    
    try {
        // Get or create poll
        const pollDoc = await pollRef.get();
        let pollData;
        
        if (!pollDoc.exists) {
            // Initialize poll
            const votes = {};
            currentChapter.poll.options.forEach((option, index) => {
                votes[`option${index}`] = 0;
            });
            
            pollData = {
                question: currentChapter.poll.question,
                options: currentChapter.poll.options,
                votes: votes,
                voters: []
            };
            
            await pollRef.set(pollData);
        } else {
            pollData = pollDoc.data();
        }
        
        // Check if user has voted
        const hasVoted = currentUser && pollData.voters && pollData.voters.includes(currentUser.uid);
        
        // Render poll
        const totalVotes = Object.values(pollData.votes).reduce((a, b) => a + b, 0);
        
        pollSection.innerHTML = `
            <div class="poll-container">
                <h4 class="poll-question">${pollData.question}</h4>
                <div class="poll-options">
                    ${pollData.options.map((option, index) => {
                        const voteCount = pollData.votes[`option${index}`] || 0;
                        const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0;
                        
                        return `
                            <div class="poll-option ${hasVoted ? 'voted' : ''}" 
                                 ${!hasVoted && currentUser ? `onclick="votePoll('${pollId}', ${index})"` : ''}>
                                <div class="poll-option-progress" style="width: ${percentage}%"></div>
                                <div class="poll-option-content">
                                    <span class="poll-option-text">${option}</span>
                                    ${hasVoted || !currentUser ? `<span class="poll-option-percent">${percentage}%</span>` : ''}
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="poll-votes">${totalVotes} vote${totalVotes !== 1 ? 's' : ''}</div>
            </div>
        `;
    } catch (error) {
        console.error('Error loading poll:', error);
        pollSection.style.display = 'none';
    }
}

async function votePoll(pollId, optionIndex) {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const pollRef = db.collection('polls').doc(pollId);
    
    try {
        await db.runTransaction(async (transaction) => {
            const pollDoc = await transaction.get(pollRef);
            if (!pollDoc.exists) throw new Error('Poll not found');
            
            const pollData = pollDoc.data();
            
            // Check if already voted
            if (pollData.voters && pollData.voters.includes(currentUser.uid)) {
                showToast('You have already voted', 'info');
                return;
            }
            
            // Update vote count
            const optionKey = `option${optionIndex}`;
            pollData.votes[optionKey] = (pollData.votes[optionKey] || 0) + 1;
            
            // Add user to voters
            if (!pollData.voters) pollData.voters = [];
            pollData.voters.push(currentUser.uid);
            
            transaction.update(pollRef, {
                votes: pollData.votes,
                voters: pollData.voters
            });
        });
        
        showToast('Vote recorded!', 'success');
        await loadPoll(currentSeries.id, currentBook.id, currentChapter.id);
    } catch (error) {
        console.error('Error voting:', error);
        showToast('Error recording vote', 'error');
    }
}

// ==========================================
// COMMENTS - ENHANCED
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
        document.getElementById('comments-count').textContent = snapshot.size;

        if (snapshot.empty) {
            commentsList.innerHTML = '<p class="coming-soon">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        for (const doc of snapshot.docs) {
            const comment = doc.data();
            const date = comment.timestamp ? comment.timestamp.toDate() : new Date();
            const dateStr = formatDate(date);
            
            // Get user profile for badges
            const authorProfile = await getUserProfile(comment.userId || null);
            const badges = authorProfile && authorProfile.badges ? authorProfile.badges : [];

            const div = document.createElement('div');
            div.className = 'comment-item';
            div.innerHTML = `
                <div class="comment-header">
                    <div class="comment-avatar">
                        ${authorProfile && authorProfile.avatarUrl ? 
                            `<img src="${authorProfile.avatarUrl}" alt="Avatar">` :
                            '<span class="material-symbols-rounded">account_circle</span>'
                        }
                    </div>
                    <div class="comment-author">
                        <div class="comment-author-name">
                            ${escapeHtml(authorProfile && authorProfile.displayName ? authorProfile.displayName : comment.authorEmail)}
                            ${badges.map(badge => `<span class="badge">${badge}</span>`).join('')}
                        </div>
                        <div class="comment-timestamp">${dateStr}</div>
                    </div>
                </div>
                <p class="comment-content">${escapeHtml(comment.text)}</p>
                <div class="comment-actions">
                    <button class="comment-action-btn" onclick="likeComment('${doc.id}')">
                        <span class="material-symbols-rounded">thumb_up</span>
                        <span id="comment-likes-${doc.id}">${comment.likes || 0}</span>
                    </button>
                </div>
            `;
            commentsList.appendChild(div);
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML = '<p class="coming-soon">Error loading comments</p>';
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

    const submitBtn = e.target.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Posting...';

    try {
        await db.collection('comments').add({
            seriesId: currentSeries.id,
            bookId: currentBook.id,
            chapterId: currentChapter.id,
            userId: currentUser.uid,
            authorEmail: currentUser.email,
            text: text,
            likes: 0,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        textarea.value = '';
        document.getElementById('char-count').textContent = '0';
        
        showToast('Comment posted!', 'success');
        
        // Create notification
        createNotification('comment', `You commented on ${currentChapter.title}`);
        
        setTimeout(() => {
            loadComments(currentSeries.id, currentBook.id, currentChapter.id);
        }, 500);
    } catch (error) {
        console.error('Error posting comment:', error);
        showToast('Failed to post comment', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Post Comment';
    }
});

document.getElementById('comment-input').addEventListener('input', (e) => {
    document.getElementById('char-count').textContent = e.target.value.length;
});

async function likeComment(commentId) {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    const commentRef = db.collection('comments').doc(commentId);
    
    try {
        await db.runTransaction(async (transaction) => {
            const commentDoc = await transaction.get(commentRef);
            if (!commentDoc.exists) return;
            
            const likes = (commentDoc.data().likes || 0) + 1;
            transaction.update(commentRef, { likes });
        });
        
        document.getElementById(`comment-likes-${commentId}`).textContent = 
            parseInt(document.getElementById(`comment-likes-${commentId}`).textContent) + 1;
    } catch (error) {
        console.error('Error liking comment:', error);
    }
}

// ==========================================
// FIRESTORE HELPERS
// ==========================================

async function incrementViews(seriesId, bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`s${seriesId}_b${bookId}_c${chapterId}`);
    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            if (!doc.exists) {
                transaction.set(docRef, { views: 1 });
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
// USER PROFILE
// ==========================================

async function createUserProfile(uid) {
    try {
        await db.collection('userProfiles').doc(uid).set({
            displayName: '',
            bio: '',
            avatarUrl: '',
            badges: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error creating profile:', error);
    }
}

async function loadUserProfile() {
    if (!currentUser) return;
    
    try {
        const doc = await db.collection('userProfiles').doc(currentUser.uid).get();
        if (doc.exists) {
            userProfile = doc.data();
        } else {
            await createUserProfile(currentUser.uid);
            userProfile = {};
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

async function getUserProfile(userId) {
    if (!userId) return null;
    
    try {
        const doc = await db.collection('userProfiles').doc(userId).get();
        return doc.exists ? doc.data() : null;
    } catch (error) {
        console.error('Error getting user profile:', error);
        return null;
    }
}

async function saveProfile() {
    if (!currentUser) return;
    
    const displayName = document.getElementById('profile-name').value.trim();
    const bio = document.getElementById('profile-bio').value.trim();
    
    try {
        await db.collection('userProfiles').doc(currentUser.uid).update({
            displayName,
            bio
        });
        
        userProfile.displayName = displayName;
        userProfile.bio = bio;
        
        showToast('Profile saved!', 'success');
        await updateAuthUI();
    } catch (error) {
        console.error('Error saving profile:', error);
        showToast('Error saving profile', 'error');
    }
}

// Handle avatar upload
document.getElementById('avatar-upload').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showToast('Please select an image file', 'error');
        return;
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
        showToast('Image too large. Max 2MB', 'error');
        return;
    }
    
    try {
        showToast('Uploading avatar...', 'info');
        
        const storageRef = storage.ref(`avatars/${currentUser.uid}/${Date.now()}_${file.name}`);
        const uploadTask = await storageRef.put(file);
        const downloadURL = await uploadTask.ref.getDownloadURL();
        
        await db.collection('userProfiles').doc(currentUser.uid).update({
            avatarUrl: downloadURL
        });
        
        userProfile.avatarUrl = downloadURL;
        document.getElementById('profile-avatar-img').src = downloadURL;
        document.getElementById('profile-avatar-img').style.display = 'block';
        document.getElementById('profile-avatar-icon').style.display = 'none';
        
        showToast('Avatar updated!', 'success');
    } catch (error) {
        console.error('Error uploading avatar:', error);
        showToast('Error uploading avatar', 'error');
    }
});

// ==========================================
// READING HISTORY
// ==========================================

async function recordReadingHistory(seriesId, bookId, chapterId) {
    if (!currentUser) return;
    
    const historyId = `${currentUser.uid}_s${seriesId}_b${bookId}_c${chapterId}`;
    const historyRef = db.collection('readingHistory').doc(historyId);
    
    try {
        await historyRef.set({
            userId: currentUser.uid,
            seriesId,
            bookId,
            chapterId,
            seriesName: currentSeries.name,
            bookTitle: currentBook.title,
            chapterTitle: currentChapter.title,
            lastRead: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
    } catch (error) {
        console.error('Error recording history:', error);
    }
}

function saveReadingTime() {
    if (!currentUser || !readingStartTime) return;
    
    const duration = Math.floor((Date.now() - readingStartTime) / 1000); // seconds
    
    db.collection('readingStats').doc(currentUser.uid).set({
        totalReadingTime: firebase.firestore.FieldValue.increment(duration)
    }, { merge: true }).catch(console.error);
    
    readingStartTime = null;
}

// ==========================================
// NOTIFICATIONS
// ==========================================

async function createNotification(type, message) {
    if (!currentUser) return;
    
    try {
        await db.collection('notifications').add({
            userId: currentUser.uid,
            type,
            message,
            read: false,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
    } catch (error) {
        console.error('Error creating notification:', error);
    }
}

async function loadNotifications() {
    if (!currentUser) return;
    
    try {
        const snapshot = await db.collection('notifications')
            .where('userId', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();
        
        const unreadCount = snapshot.docs.filter(doc => !doc.data().read).length;
        const badge = document.getElementById('notif-count');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    } catch (error) {
        console.error('Error loading notifications:', error);
    }
}

async function markAllAsRead() {
    if (!currentUser) return;
    
    try {
        const snapshot = await db.collection('notifications')
            .where('userId', '==', currentUser.uid)
            .where('read', '==', false)
            .get();
        
        const batch = db.batch();
        snapshot.docs.forEach(doc => {
            batch.update(doc.ref, { read: true });
        });
        
        await batch.commit();
        showToast('All notifications marked as read', 'success');
        loadNotifications();
        loadDashboardNotifications();
    } catch (error) {
        console.error('Error marking notifications as read:', error);
    }
}

// ==========================================
// DASHBOARD
// ==========================================

function showDashboard() {
    if (!currentUser) {
        showAuthModal();
        return;
    }
    
    showPage('dashboard-page');
    loadDashboardData();
}

// Dashboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const dashLinks = document.querySelectorAll('.dash-link');
    dashLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            
            // Update active link
            dashLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Show section
            document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
            document.getElementById(`${section}-section`).classList.add('active');
            
            // Load section data
            loadDashboardSection(section);
        });
    });
});

async function loadDashboardData() {
    await loadUserProfile();
    loadDashboardSection('profile');
}

async function loadDashboardSection(section) {
    switch(section) {
        case 'profile':
            await loadProfileSection();
            break;
        case 'reading':
            await loadReadingHistorySection();
            break;
        case 'bookmarks':
            await loadBookmarksSection();
            break;
        case 'highlights':
            await loadAllHighlightsSection();
            break;
        case 'notifications':
            await loadDashboardNotifications();
            break;
        case 'analytics':
            await loadAnalytics();
            break;
    }
}

async function loadProfileSection() {
    if (!userProfile) await loadUserProfile();
    
    // Populate profile fields
    document.getElementById('profile-name').value = userProfile.displayName || '';
    document.getElementById('profile-bio').value = userProfile.bio || '';
    
    if (userProfile.avatarUrl) {
        document.getElementById('profile-avatar-img').src = userProfile.avatarUrl;
        document.getElementById('profile-avatar-img').style.display = 'block';
        document.getElementById('profile-avatar-icon').style.display = 'none';
    }
    
    // Display badges
    const badgesContainer = document.getElementById('user-badges');
    badgesContainer.innerHTML = '';
    if (userProfile.badges && userProfile.badges.length > 0) {
        userProfile.badges.forEach(badge => {
            const badgeEl = document.createElement('div');
            badgeEl.className = 'user-badge';
            badgeEl.innerHTML = `
                <span class="material-symbols-rounded">military_tech</span>
                ${badge}
            `;
            badgesContainer.appendChild(badgeEl);
        });
    }
    
    // Load stats
    try {
        // Books read count (unique books)
        const historySnapshot = await db.collection('readingHistory')
            .where('userId', '==', currentUser.uid)
            .get();
        
        const uniqueBooks = new Set();
        historySnapshot.forEach(doc => {
            const data = doc.data();
            uniqueBooks.add(`${data.seriesId}_${data.bookId}`);
        });
        
        document.getElementById('books-read-count').textContent = uniqueBooks.size;
        
        // Reading time
        const statsDoc = await db.collection('readingStats').doc(currentUser.uid).get();
        if (statsDoc.exists) {
            const totalSeconds = statsDoc.data().totalReadingTime || 0;
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            document.getElementById('reading-time').textContent = 
                hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
        } else {
            document.getElementById('reading-time').textContent = '0m';
        }
        
        // Bookmarks count
        const bookmarksSnapshot = await db.collection('bookmarks')
            .where('userId', '==', currentUser.uid)
            .get();
        
        document.getElementById('bookmarks-count').textContent = bookmarksSnapshot.size;
    } catch (error) {
        console.error('Error loading profile stats:', error);
    }
}

async function loadReadingHistorySection() {
    const historyList = document.getElementById('reading-history-list');
    historyList.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const snapshot = await db.collection('readingHistory')
            .where('userId', '==', currentUser.uid)
            .orderBy('lastRead', 'desc')
            .limit(50)
            .get();
        
        historyList.innerHTML = '';
        
        if (snapshot.empty) {
            historyList.innerHTML = '<p class="coming-soon">No reading history yet</p>';
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.lastRead ? data.lastRead.toDate() : new Date();
            
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-info">
                    <div class="history-title">${escapeHtml(data.chapterTitle)}</div>
                    <div class="history-meta">${escapeHtml(data.bookTitle)} • ${formatDate(date)}</div>
                </div>
            `;
            item.onclick = () => loadChapterPage(data.seriesId, data.bookId, data.chapterId);
            historyList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading reading history:', error);
        historyList.innerHTML = '<p class="coming-soon">Error loading history</p>';
    }
}

async function loadBookmarksSection() {
    const bookmarksList = document.getElementById('bookmarks-list');
    bookmarksList.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const snapshot = await db.collection('bookmarks')
            .where('userId', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .get();
        
        bookmarksList.innerHTML = '';
        
        if (snapshot.empty) {
            bookmarksList.innerHTML = '<p class="coming-soon">No bookmarks yet</p>';
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate() : new Date();
            
            const card = document.createElement('div');
            card.className = 'bookmark-card';
            card.innerHTML = `
                <div class="bookmark-title">${escapeHtml(data.chapterTitle)}</div>
                <div class="bookmark-excerpt">${escapeHtml(data.bookTitle)}</div>
                <div class="bookmark-meta">${formatDate(date)}</div>
            `;
            card.onclick = () => loadChapterPage(data.seriesId, data.bookId, data.chapterId);
            bookmarksList.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading bookmarks:', error);
        bookmarksList.innerHTML = '<p class="coming-soon">Error loading bookmarks</p>';
    }
}

async function loadAllHighlightsSection() {
    const highlightsList = document.getElementById('all-highlights-list');
    highlightsList.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const snapshot = await db.collection('highlights')
            .where('userId', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .get();
        
        highlightsList.innerHTML = '';
        
        if (snapshot.empty) {
            highlightsList.innerHTML = '<p class="coming-soon">No highlights yet</p>';
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate() : new Date();
            
            const item = document.createElement('div');
            item.className = 'highlight-item';
            item.innerHTML = `
                <div class="highlight-text">"${escapeHtml(data.text)}"</div>
                <div class="bookmark-meta">
                    Chapter ${data.chapterId} • ${formatDate(date)}
                </div>
                <div class="highlight-actions">
                    <button class="highlight-delete-btn" onclick="deleteHighlight('${doc.id}')">Delete</button>
                </div>
            `;
            highlightsList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading highlights:', error);
        highlightsList.innerHTML = '<p class="coming-soon">Error loading highlights</p>';
    }
}

async function loadDashboardNotifications() {
    const notificationsList = document.getElementById('notifications-list');
    notificationsList.innerHTML = '<div class="loading">Loading...</div>';
    
    try {
        const snapshot = await db.collection('notifications')
            .where('userId', '==', currentUser.uid)
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();
        
        notificationsList.innerHTML = '';
        
        if (snapshot.empty) {
            notificationsList.innerHTML = '<p class="coming-soon">No notifications</p>';
            return;
        }
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const date = data.timestamp ? data.timestamp.toDate() : new Date();
            
            const item = document.createElement('div');
            item.className = 'notification-item' + (!data.read ? ' unread' : '');
            item.innerHTML = `
                <div class="notification-icon">
                    <span class="material-symbols-rounded">${getNotificationIcon(data.type)}</span>
                </div>
                <div class="notification-content">
                    <div class="notification-text">${escapeHtml(data.message)}</div>
                    <div class="notification-time">${formatDate(date)}</div>
                </div>
            `;
            item.onclick = async () => {
                if (!data.read) {
                    await doc.ref.update({ read: true });
                    item.classList.remove('unread');
                    loadNotifications();
                }
            };
            notificationsList.appendChild(item);
        });
    } catch (error) {
        console.error('Error loading notifications:', error);
        notificationsList.innerHTML = '<p class="coming-soon">Error loading notifications</p>';
    }
}

function getNotificationIcon(type) {
    const icons = {
        'comment': 'comment',
        'like': 'favorite',
        'bookmark': 'bookmark',
        'new_chapter': 'menu_book',
        'achievement': 'military_tech'
    };
    return icons[type] || 'notifications';
}

async function loadAnalytics() {
    if (!ADMIN_UIDS.includes(currentUser.uid)) return;
    
    try {
        // Total views
        const chaptersSnapshot = await db.collection('chapters').get();
        let totalViews = 0;
        chaptersSnapshot.forEach(doc => {
            totalViews += doc.data().views || 0;
        });
        document.getElementById('total-views').textContent = totalViews.toLocaleString();
        
        // Total likes
        const likesSnapshot = await db.collection('likes').get();
        document.getElementById('total-likes').textContent = likesSnapshot.size;
        
        // Total comments
        const commentsSnapshot = await db.collection('comments').get();
        document.getElementById('total-comments').textContent = commentsSnapshot.size;
        
        // Active readers (read in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        
        const activeSnapshot = await db.collection('readingHistory')
            .where('lastRead', '>=', firebase.firestore.Timestamp.fromDate(sevenDaysAgo))
            .get();
        
        const uniqueReaders = new Set();
        activeSnapshot.forEach(doc => {
            uniqueReaders.add(doc.data().userId);
        });
        
        document.getElementById('active-readers').textContent = uniqueReaders.size;
    } catch (error) {
        console.error('Error loading analytics:', error);
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'check_circle' :
                 type === 'error' ? 'error' :
                 'info';
    
    toast.innerHTML = `
        <span class="material-symbols-rounded toast-icon">${icon}</span>
        <div class="toast-content">
            <div class="toast-message">${escapeHtml(message)}</div>
        </div>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (seconds < 60) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: now.getFullYear() !== date.getFullYear() ? 'numeric' : undefined
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSeries();
    
    // Setup character counter
    const commentInput = document.getElementById('comment-input');
    if (commentInput) {
        commentInput.addEventListener('input', (e) => {
            document.getElementById('char-count').textContent = e.target.value.length;
        });
    }
    
    // Close modals on overlay click
    document.querySelector('.user-menu-overlay')?.addEventListener('click', closeUserMenu);
    
    // Prevent highlight mode from triggering on UI elements
    document.querySelectorAll('button, a, input, textarea').forEach(el => {
        el.addEventListener('mouseup', (e) => {
            e.stopPropagation();
        });
    });
});

// ==========================================
// SERVICE WORKER (optional)
// ==========================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(() => {
            // Service worker not available, continue without it
        });
    });
}
