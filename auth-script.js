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
// PANEL SWITCHING
// ==========================================
const container = document.querySelector('.auth-container');
const showRegisterBtn = document.getElementById('show-register');
const showLoginBtn = document.getElementById('show-login');

showRegisterBtn.addEventListener('click', () => {
    container.classList.add('right-panel-active');
});

showLoginBtn.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
});

// ==========================================
// LOGIN FORM
// ==========================================
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const rememberMe = document.getElementById('remember-me').checked;
    
    try {
        loginError.textContent = '';
        loginError.classList.remove('show');
        
        // Set persistence
        const persistence = rememberMe ? 
            firebase.auth.Auth.Persistence.LOCAL : 
            firebase.auth.Auth.Persistence.SESSION;
        
        await auth.setPersistence(persistence);
        await auth.signInWithEmailAndPassword(email, password);
        
        // Redirect to main app
        window.location.href = 'index.html';
    } catch (error) {
        loginError.textContent = getErrorMessage(error.code);
        loginError.classList.add('show');
    }
});

// ==========================================
// REGISTER FORM
// ==========================================
const registerForm = document.getElementById('register-form');
const registerError = document.getElementById('register-error');

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    
    if (password.length < 6) {
        registerError.textContent = 'Password must be at least 6 characters';
        registerError.classList.add('show');
        return;
    }
    
    try {
        registerError.textContent = '';
        registerError.classList.remove('show');
        
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        
        // Update profile with name
        await userCredential.user.updateProfile({
            displayName: name
        });
        
        // Create user document in Firestore
        await db.collection('users').doc(userCredential.user.uid).set({
            displayName: name,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Redirect to main app
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = getErrorMessage(error.code);
        registerError.classList.add('show');
    }
});

// ==========================================
// GOOGLE SIGN-IN
// ==========================================
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Login with Google
document.getElementById('google-login-btn').addEventListener('click', async () => {
    try {
        loginError.textContent = '';
        loginError.classList.remove('show');
        
        const result = await auth.signInWithPopup(googleProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        loginError.textContent = getErrorMessage(error.code);
        loginError.classList.add('show');
    }
});

// Register with Google
document.getElementById('google-register-btn').addEventListener('click', async () => {
    try {
        registerError.textContent = '';
        registerError.classList.remove('show');
        
        const result = await auth.signInWithPopup(googleProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = getErrorMessage(error.code);
        registerError.classList.add('show');
    }
});

// ==========================================
// FACEBOOK SIGN-IN
// ==========================================
const facebookProvider = new firebase.auth.FacebookAuthProvider();

// Login with Facebook
document.getElementById('facebook-login-btn').addEventListener('click', async () => {
    try {
        loginError.textContent = '';
        loginError.classList.remove('show');
        
        const result = await auth.signInWithPopup(facebookProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        loginError.textContent = getErrorMessage(error.code);
        loginError.classList.add('show');
    }
});

// Register with Facebook
document.getElementById('facebook-register-btn').addEventListener('click', async () => {
    try {
        registerError.textContent = '';
        registerError.classList.remove('show');
        
        const result = await auth.signInWithPopup(facebookProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = getErrorMessage(error.code);
        registerError.classList.add('show');
    }
});

// ==========================================
// TWITTER SIGN-IN
// ==========================================
const twitterProvider = new firebase.auth.TwitterAuthProvider();

// Login with Twitter
document.getElementById('twitter-login-btn').addEventListener('click', async () => {
    try {
        loginError.textContent = '';
        loginError.classList.remove('show');
        
        const result = await auth.signInWithPopup(twitterProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        loginError.textContent = getErrorMessage(error.code);
        loginError.classList.add('show');
    }
});

// Register with Twitter
document.getElementById('twitter-register-btn').addEventListener('click', async () => {
    try {
        registerError.textContent = '';
        registerError.classList.remove('show');
        
        const result = await auth.signInWithPopup(twitterProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = getErrorMessage(error.code);
        registerError.classList.add('show');
    }
});

// ==========================================
// GITHUB SIGN-IN
// ==========================================
const githubProvider = new firebase.auth.GithubAuthProvider();

// Login with GitHub
document.getElementById('github-login-btn').addEventListener('click', async () => {
    try {
        loginError.textContent = '';
        loginError.classList.remove('show');
        
        const result = await auth.signInWithPopup(githubProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        loginError.textContent = getErrorMessage(error.code);
        loginError.classList.add('show');
    }
});

// Register with GitHub
document.getElementById('github-register-btn').addEventListener('click', async () => {
    try {
        registerError.textContent = '';
        registerError.classList.remove('show');
        
        const result = await auth.signInWithPopup(githubProvider);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                displayName: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        registerError.textContent = getErrorMessage(error.code);
        registerError.classList.add('show');
    }
});

// ==========================================
// PHONE AUTHENTICATION
// ==========================================
const phoneModal = document.getElementById('phone-modal');
const closePhoneBtn = document.getElementById('close-phone');
const phoneForm = document.getElementById('phone-form');
const verifyCodeForm = document.getElementById('verify-code-form');
const phoneError = document.getElementById('phone-error');
const verifyError = document.getElementById('verify-error');

let confirmationResult;
let recaptchaVerifier;

// Show phone modal
document.getElementById('phone-login-btn').addEventListener('click', () => {
    phoneModal.classList.add('show');
    initializeRecaptcha();
});

document.getElementById('phone-register-btn').addEventListener('click', () => {
    phoneModal.classList.add('show');
    initializeRecaptcha();
});

// Close phone modal
closePhoneBtn.addEventListener('click', () => {
    phoneModal.classList.remove('show');
    phoneForm.style.display = 'block';
    verifyCodeForm.style.display = 'none';
    phoneForm.reset();
    verifyCodeForm.reset();
});

phoneModal.addEventListener('click', (e) => {
    if (e.target === phoneModal) {
        phoneModal.classList.remove('show');
        phoneForm.style.display = 'block';
        verifyCodeForm.style.display = 'none';
    }
});

// Initialize reCAPTCHA
function initializeRecaptcha() {
    if (!recaptchaVerifier) {
        recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
            'size': 'normal',
            'callback': (response) => {
                // reCAPTCHA solved
            },
            'expired-callback': () => {
                phoneError.textContent = 'reCAPTCHA expired. Please try again.';
                phoneError.classList.add('show');
            }
        });
        recaptchaVerifier.render();
    }
}

// Send verification code
phoneForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const phoneNumber = document.getElementById('phone-number').value;
    
    try {
        phoneError.textContent = '';
        phoneError.classList.remove('show');
        
        confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
        
        // Show verification code form
        phoneForm.style.display = 'none';
        verifyCodeForm.style.display = 'block';
    } catch (error) {
        phoneError.textContent = getErrorMessage(error.code);
        phoneError.classList.add('show');
        
        // Reset reCAPTCHA
        if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
            initializeRecaptcha();
        }
    }
});

// Verify code
verifyCodeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const code = document.getElementById('verification-code').value;
    
    try {
        verifyError.textContent = '';
        verifyError.classList.remove('show');
        
        const result = await confirmationResult.confirm(code);
        
        // Check if user document exists, create if not
        const userDoc = await db.collection('users').doc(result.user.uid).get();
        if (!userDoc.exists) {
            await db.collection('users').doc(result.user.uid).set({
                phoneNumber: result.user.phoneNumber,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        window.location.href = 'index.html';
    } catch (error) {
        verifyError.textContent = 'Invalid verification code. Please try again.';
        verifyError.classList.add('show');
    }
});

// ==========================================
// RESET PASSWORD MODAL
// ==========================================
const resetModal = document.getElementById('reset-modal');
const showResetBtn = document.getElementById('show-reset');
const closeResetBtn = document.getElementById('close-reset');
const resetForm = document.getElementById('reset-form');
const resetError = document.getElementById('reset-error');
const resetSuccess = document.getElementById('reset-success');

showResetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    resetModal.classList.add('show');
});

closeResetBtn.addEventListener('click', () => {
    resetModal.classList.remove('show');
});

resetModal.addEventListener('click', (e) => {
    if (e.target === resetModal) {
        resetModal.classList.remove('show');
    }
});

resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;
    
    try {
        resetError.textContent = '';
        resetError.classList.remove('show');
        resetSuccess.textContent = '';
        resetSuccess.classList.remove('show');
        
        await auth.sendPasswordResetEmail(email);
        
        resetSuccess.textContent = 'Password reset email sent! Check your inbox.';
        resetSuccess.classList.add('show');
        
        setTimeout(() => {
            resetModal.classList.remove('show');
            resetSuccess.classList.remove('show');
            resetForm.reset();
        }, 3000);
    } catch (error) {
        resetError.textContent = getErrorMessage(error.code);
        resetError.classList.add('show');
    }
});

// ==========================================
// ERROR MESSAGES
// ==========================================
function getErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            return 'This email is already registered.';
        case 'auth/invalid-email':
            return 'Invalid email address.';
        case 'auth/operation-not-allowed':
            return 'This sign-in method is not enabled.';
        case 'auth/weak-password':
            return 'Password is too weak. Use at least 6 characters.';
        case 'auth/user-disabled':
            return 'This account has been disabled.';
        case 'auth/user-not-found':
            return 'No account found with this email.';
        case 'auth/wrong-password':
            return 'Incorrect password.';
        case 'auth/too-many-requests':
            return 'Too many failed attempts. Please try again later.';
        case 'auth/popup-closed-by-user':
            return 'Sign-in popup was closed. Please try again.';
        case 'auth/cancelled-popup-request':
            return 'Only one popup request allowed at a time.';
        case 'auth/account-exists-with-different-credential':
            return 'An account already exists with the same email but different sign-in method.';
        case 'auth/invalid-phone-number':
            return 'Invalid phone number. Please include country code (e.g., +1234567890).';
        case 'auth/missing-phone-number':
            return 'Please enter a phone number.';
        case 'auth/quota-exceeded':
            return 'SMS quota exceeded. Please try again later.';
        case 'auth/invalid-verification-code':
            return 'Invalid verification code. Please try again.';
        case 'auth/invalid-verification-id':
            return 'Verification session expired. Please request a new code.';
        default:
            return 'An error occurred. Please try again.';
    }
}

// ==========================================
// CHECK IF USER IS ALREADY LOGGED IN
// ==========================================
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in, redirect to main app
        window.location.href = 'index.html';
    }
});
