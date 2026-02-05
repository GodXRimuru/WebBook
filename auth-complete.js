// ==========================================
// AUTHENTICATION HANDLERS - ALL PROVIDERS
// ==========================================

// ========== GOOGLE AUTHENTICATION ==========
function setupGoogleAuth() {
    const googleBtn = document.getElementById('google-btn');
    const googleBtnRegister = document.getElementById('google-btn-register');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'login-error');
            }
        });
    }
    
    if (googleBtnRegister) {
        googleBtnRegister.addEventListener('click', async () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'register-error');
            }
        });
    }
}

// ========== FACEBOOK AUTHENTICATION ==========
function setupFacebookAuth() {
    const facebookBtn = document.getElementById('facebook-btn');
    const facebookBtnRegister = document.getElementById('facebook-btn-register');
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', async () => {
            const provider = new firebase.auth.FacebookAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'login-error');
            }
        });
    }
    
    if (facebookBtnRegister) {
        facebookBtnRegister.addEventListener('click', async () => {
            const provider = new firebase.auth.FacebookAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'register-error');
            }
        });
    }
}

// ========== GITHUB AUTHENTICATION ==========
function setupGithubAuth() {
    const githubBtn = document.getElementById('github-btn');
    const githubBtnRegister = document.getElementById('github-btn-register');
    
    if (githubBtn) {
        githubBtn.addEventListener('click', async () => {
            const provider = new firebase.auth.GithubAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'login-error');
            }
        });
    }
    
    if (githubBtnRegister) {
        githubBtnRegister.addEventListener('click', async () => {
            const provider = new firebase.auth.GithubAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'register-error');
            }
        });
    }
}

// ========== TWITTER AUTHENTICATION ==========
function setupTwitterAuth() {
    const twitterBtn = document.getElementById('twitter-btn');
    const twitterBtnRegister = document.getElementById('twitter-btn-register');
    
    if (twitterBtn) {
        twitterBtn.addEventListener('click', async () => {
            const provider = new firebase.auth.TwitterAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'login-error');
            }
        });
    }
    
    if (twitterBtnRegister) {
        twitterBtnRegister.addEventListener('click', async () => {
            const provider = new firebase.auth.TwitterAuthProvider();
            try {
                await auth.signInWithRedirect(provider);
            } catch (error) {
                handleAuthError(error, 'register-error');
            }
        });
    }
}

// ========== PHONE AUTHENTICATION ==========
let confirmationResult = null;
let recaptchaVerifier = null;

function setupPhoneAuth() {
    const phoneBtn = document.getElementById('phone-btn');
    const phoneBtnRegister = document.getElementById('phone-btn-register');
    
    if (phoneBtn) {
        phoneBtn.addEventListener('click', () => {
            openPhoneModal();
        });
    }
    
    if (phoneBtnRegister) {
        phoneBtnRegister.addEventListener('click', () => {
            openPhoneModal();
        });
    }
    
    // Send verification code
    const sendCodeBtn = document.getElementById('send-code-btn');
    if (sendCodeBtn) {
        sendCodeBtn.addEventListener('click', sendVerificationCode);
    }
    
    // Verify code
    const verifyCodeBtn = document.getElementById('verify-code-btn');
    if (verifyCodeBtn) {
        verifyCodeBtn.addEventListener('click', verifyCode);
    }
    
    // Resend code
    const resendCodeBtn = document.getElementById('resend-code-btn');
    if (resendCodeBtn) {
        resendCodeBtn.addEventListener('click', sendVerificationCode);
    }
}

function openPhoneModal() {
    const phoneModal = document.getElementById('phone-modal');
    phoneModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize reCAPTCHA if not already done
    if (!recaptchaVerifier) {
        try {
            recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'normal',
                'callback': (response) => {
                    console.log('reCAPTCHA solved');
                },
                'expired-callback': () => {
                    console.log('reCAPTCHA expired');
                    recaptchaVerifier = null;
                }
            });
            recaptchaVerifier.render();
        } catch (error) {
            console.error('reCAPTCHA error:', error);
        }
    }
}

function closePhoneModal() {
    const phoneModal = document.getElementById('phone-modal');
    phoneModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset to step 1
    document.getElementById('phone-step-1').classList.add('active');
    document.getElementById('phone-step-2').classList.remove('active');
    document.getElementById('phone-number').value = '';
    document.getElementById('verification-code').value = '';
    document.getElementById('phone-error-1').textContent = '';
    document.getElementById('phone-error-2').textContent = '';
}

async function sendVerificationCode() {
    const phoneNumber = document.getElementById('phone-number').value;
    const errorDiv = document.getElementById('phone-error-1');
    
    if (!phoneNumber || !phoneNumber.startsWith('+')) {
        errorDiv.textContent = 'Please enter a valid phone number with country code (e.g., +1234567890)';
        return;
    }
    
    try {
        if (!recaptchaVerifier) {
            recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                'size': 'normal'
            });
            await recaptchaVerifier.render();
        }
        
        confirmationResult = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
        
        // Move to step 2
        document.getElementById('phone-step-1').classList.remove('active');
        document.getElementById('phone-step-2').classList.add('active');
        errorDiv.textContent = '';
    } catch (error) {
        console.error('Error sending code:', error);
        errorDiv.textContent = getPhoneErrorMessage(error);
        
        // Reset reCAPTCHA on error
        if (recaptchaVerifier) {
            recaptchaVerifier.clear();
            recaptchaVerifier = null;
            // Re-render reCAPTCHA
            setTimeout(() => {
                try {
                    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
                        'size': 'normal'
                    });
                    recaptchaVerifier.render();
                } catch (e) {
                    console.error('Error re-rendering reCAPTCHA:', e);
                }
            }, 100);
        }
    }
}

async function verifyCode() {
    const code = document.getElementById('verification-code').value;
    const errorDiv = document.getElementById('phone-error-2');
    
    if (!code || code.length !== 6) {
        errorDiv.textContent = 'Please enter a valid 6-digit code';
        return;
    }
    
    try {
        await confirmationResult.confirm(code);
        closePhoneModal();
        closeAuthModal();
        errorDiv.textContent = '';
    } catch (error) {
        console.error('Error verifying code:', error);
        errorDiv.textContent = 'Invalid code. Please try again.';
    }
}

function getPhoneErrorMessage(error) {
    switch (error.code) {
        case 'auth/invalid-phone-number':
            return 'Invalid phone number format. Use international format (e.g., +1234567890)';
        case 'auth/too-many-requests':
            return 'Too many attempts. Please try again later.';
        case 'auth/quota-exceeded':
            return 'SMS quota exceeded. Please try again later.';
        default:
            return error.message || 'Failed to send verification code. Please try again.';
    }
}

// ========== ERROR HANDLER ==========
function handleAuthError(error, errorDivId) {
    console.error('Auth error:', error);
    
    let errorMsg = '';
    
    switch (error.code) {
        case 'auth/unauthorized-domain':
            errorMsg = 'Domain not authorized. Please add your domain to Firebase Console → Authentication → Settings → Authorized domains';
            break;
        case 'auth/account-exists-with-different-credential':
            errorMsg = 'An account already exists with this email. Please sign in using your original method.';
            break;
        case 'auth/popup-blocked':
            errorMsg = 'Popup was blocked. Please allow popups for this site and try again.';
            break;
        case 'auth/popup-closed-by-user':
            errorMsg = 'Sign-in cancelled. Please try again.';
            break;
        case 'auth/cancelled-popup-request':
            errorMsg = 'Sign-in cancelled. Please try again.';
            break;
        case 'auth/network-request-failed':
            errorMsg = 'Network error. Please check your connection and try again.';
            break;
        default:
            errorMsg = error.message || 'Authentication failed. Please try again.';
    }
    
    const errorDiv = document.getElementById(errorDivId);
    if (errorDiv) {
        errorDiv.textContent = errorMsg;
    } else {
        // Fallback: show in active form
        const activeErrorDiv = document.querySelector('.form-box.active .error-message');
        if (activeErrorDiv) {
            activeErrorDiv.textContent = errorMsg;
        }
    }
}

// ========== INITIALIZE ALL AUTH METHODS ==========
function initializeAllAuthMethods() {
    setupGoogleAuth();
    setupFacebookAuth();
    setupGithubAuth();
    setupTwitterAuth();
    setupPhoneAuth();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllAuthMethods);
} else {
    initializeAllAuthMethods();
}
