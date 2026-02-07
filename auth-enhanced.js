// ==========================================
// ENHANCED AUTHENTICATION WITH OAUTH PROVIDERS
// ==========================================
// This file adds Google, GitHub, Facebook, and Twitter authentication
// using signInWithPopup for GitHub Pages compatibility

// OAuth Provider Configurations
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();

// Configure providers for optimal user experience
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

// ==========================================
// OAUTH SIGN-IN HANDLERS
// ==========================================

async function signInWithGoogle() {
    try {
        await auth.signInWithPopup(googleProvider);
        closeAuthModal();
        showSuccessMessage('Successfully signed in with Google!');
    } catch (error) {
        console.error('Google sign-in error:', error);
        handleAuthError(error, 'login-error');
    }
}

async function signInWithGitHub() {
    try {
        await auth.signInWithPopup(githubProvider);
        closeAuthModal();
        showSuccessMessage('Successfully signed in with GitHub!');
    } catch (error) {
        console.error('GitHub sign-in error:', error);
        handleAuthError(error, 'login-error');
    }
}

async function signInWithFacebook() {
    try {
        await auth.signInWithPopup(facebookProvider);
        closeAuthModal();
        showSuccessMessage('Successfully signed in with Facebook!');
    } catch (error) {
        console.error('Facebook sign-in error:', error);
        handleAuthError(error, 'login-error');
    }
}

async function signInWithTwitter() {
    try {
        await auth.signInWithPopup(twitterProvider);
        closeAuthModal();
        showSuccessMessage('Successfully signed in with Twitter!');
    } catch (error) {
        console.error('Twitter sign-in error:', error);
        handleAuthError(error, 'login-error');
    }
}

// ==========================================
// ERROR HANDLING
// ==========================================

function handleAuthError(error, errorElementId) {
    const errorDiv = document.getElementById(errorElementId);
    if (!errorDiv) return;

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
        case 'auth/cancelled-popup-request':
            // User opened multiple popups, ignore this error
            return;
        default:
            message = error.message;
    }

    errorDiv.textContent = message;
    setTimeout(() => {
        errorDiv.textContent = '';
    }, 5000);
}

function showSuccessMessage(message) {
    // Create temporary success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'auth-success-toast';
    successDiv.textContent = message;
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.classList.add('show');
    }, 100);

    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 3000);
}

// ==========================================
// INITIALIZE OAUTH BUTTONS
// ==========================================

function initializeOAuthButtons() {
    // Add OAuth buttons to both login and register forms
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    const oauthButtons = `
        <div class="oauth-divider">
            <span>Or continue with</span>
        </div>
        <div class="oauth-buttons">
            <button type="button" class="oauth-btn google-btn" onclick="signInWithGoogle()">
                <svg width="18" height="18" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9s.348 2.827.957 4.042l3.007-2.335z"/>
                    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"/>
                </svg>
                Google
            </button>
            <button type="button" class="oauth-btn github-btn" onclick="signInWithGitHub()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
            </button>
            <button type="button" class="oauth-btn facebook-btn" onclick="signInWithFacebook()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
            </button>
            <button type="button" class="oauth-btn twitter-btn" onclick="signInWithTwitter()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Twitter
            </button>
        </div>
    `;

    // Insert before the submit button in login form
    const loginSubmitBtn = loginForm.querySelector('button[type="submit"]');
    loginSubmitBtn.insertAdjacentHTML('afterend', oauthButtons);

    // Insert before the submit button in register form
    const registerSubmitBtn = registerForm.querySelector('button[type="submit"]');
    registerSubmitBtn.insertAdjacentHTML('afterend', oauthButtons);
}

// Initialize OAuth buttons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeOAuthButtons);
} else {
    initializeOAuthButtons();
}
