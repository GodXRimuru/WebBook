// ==========================================
// AUTHENTICATION SYSTEM - MODAL BASED
// ==========================================

// OAuth Provider Configurations
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// ==========================================
// MODAL FUNCTIONS
// ==========================================

function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        // Reset to login form
        const authBox = document.querySelector('.auth-box');
        if (authBox) {
            authBox.classList.remove('active');
        }
    }
}

function toggleToRegister() {
    const authBox = document.querySelector('.auth-box');
    if (authBox) {
        authBox.classList.add('active');
    }
}

function toggleToLogin() {
    const authBox = document.querySelector('.auth-box');
    if (authBox) {
        authBox.classList.remove('active');
    }
}

function switchToLogin() {
    toggleToLogin();
}

function showResetForm() {
    const loginBox = document.querySelector('.form-box.login');
    const resetBox = document.querySelector('.form-box.reset');
    
    if (loginBox) loginBox.style.display = 'none';
    if (resetBox) resetBox.style.display = 'block';
}

function hideResetForm() {
    const loginBox = document.querySelector('.form-box.login');
    const resetBox = document.querySelector('.form-box.reset');
    
    if (loginBox) loginBox.style.display = 'block';
    if (resetBox) resetBox.style.display = 'none';
}

// ==========================================
// OAUTH SIGN-IN HANDLERS
// ==========================================

async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
        closeAuthModal();
        showAuthToast('Successfully signed in with Google!', 'success');
    } catch (error) {
        console.error('Google sign-in error:', error);
        handleAuthError(error);
    }
}

async function signInWithGitHub() {
    try {
        await auth.signInWithPopup(githubProvider);
        closeAuthModal();
        showAuthToast('Successfully signed in with GitHub!', 'success');
    } catch (error) {
        console.error('GitHub sign-in error:', error);
        handleAuthError(error);
    }
}

async function signInWithFacebook() {
    try {
        await auth.signInWithPopup(facebookProvider);
        closeAuthModal();
        showAuthToast('Successfully signed in with Facebook!', 'success');
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        handleAuthError(error);
    }
}

async function signInWithTwitter() {
    try {
        await auth.signInWithPopup(twitterProvider);
        closeAuthModal();
        showAuthToast('Successfully signed in with Twitter!', 'success');
    } catch (error) {
        console.error('Twitter sign-in error:', error);
        handleAuthError(error);
    }
}

// ==========================================
// EMAIL/PASSWORD AUTH
// ==========================================

function setupAuthForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const resetForm = document.getElementById('reset-form');

    if (loginForm) {
        loginForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me')?.checked;
            
            try {
                const persistence = rememberMe ? 
                    firebase.auth.Auth.Persistence.LOCAL : 
                    firebase.auth.Auth.Persistence.SESSION;
                
                await auth.setPersistence(persistence);
                await auth.signInWithEmailAndPassword(email, password);
                
                closeAuthModal();
                showAuthToast('Successfully logged in!', 'success');
            } catch (error) {
                handleAuthError(error);
            }
        };
    }

    if (registerForm) {
        registerForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-password-confirm').value;
            
            if (password !== confirmPassword) {
                showAuthError('Passwords do not match');
                return;
            }

            if (password.length < 6) {
                showAuthError('Password must be at least 6 characters');
                return;
            }
            
            try {
                await auth.createUserWithEmailAndPassword(email, password);
                closeAuthModal();
                showAuthToast('Account created successfully!', 'success');
            } catch (error) {
                handleAuthError(error);
            }
        };
    }

    if (resetForm) {
        resetForm.onsubmit = async (e) => {
            e.preventDefault();
            const email = document.getElementById('reset-email').value;
            
            try {
                await auth.sendPasswordResetEmail(email);
                document.getElementById('reset-success').textContent = 'Password reset email sent!';
                setTimeout(() => {
                    hideResetForm();
                    closeAuthModal();
                }, 2000);
            } catch (error) {
                handleAuthError(error);
            }
        };
    }
}

// ==========================================
// ERROR HANDLING
// ==========================================

function handleAuthError(error) {
    let message = 'An error occurred. Please try again.';

    switch (error.code) {
        case 'auth/popup-closed-by-user':
            message = 'Sign-in cancelled.';
            break;
        case 'auth/popup-blocked':
            message = 'Pop-up blocked. Please allow pop-ups for this site.';
            break;
        case 'auth/account-exists-with-different-credential':
            message = 'An account already exists with this email using a different sign-in method.';
            break;
        case 'auth/email-already-in-use':
            message = 'This email is already registered.';
            break;
        case 'auth/invalid-email':
            message = 'Invalid email address.';
            break;
        case 'auth/user-not-found':
            message = 'No account found with this email.';
            break;
        case 'auth/wrong-password':
            message = 'Incorrect password.';
            break;
        case 'auth/weak-password':
            message = 'Password is too weak.';
            break;
        case 'auth/cancelled-popup-request':
            return; // Ignore
        default:
            message = error.message;
    }

    showAuthError(message);
}

function showAuthError(message) {
    showAuthToast(message, 'error');
}

function showAuthToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `auth-toast auth-toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================
// INITIALIZE
// ==========================================

// Setup forms when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupAuthForms);
} else {
    setupAuthForms();
}

// Close modal on overlay click
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('auth-overlay')) {
        closeAuthModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAuthModal();
    }
});
