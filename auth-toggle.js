// ==========================================
// AUTH MODAL TOGGLE ANIMATION
// ==========================================

// Get elements
const authContainer = document.querySelector('.auth-container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

// Toggle to register
if (registerBtn) {
    registerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authContainer.classList.add('active');
    });
}

// Toggle to login
if (loginBtn) {
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        authContainer.classList.remove('active');
    });
}

// Close modal and reset to login
function closeAuthModal() {
    const authModal = document.getElementById('auth-modal');
    authModal.classList.remove('active');
    // Reset to login view after closing
    setTimeout(() => {
        authContainer.classList.remove('active');
    }, 300);
}

// Show auth modal
function showAuthModal() {
    const authModal = document.getElementById('auth-modal');
    authModal.classList.add('active');
}

// Profile card social toggle (footer)
const profileSocialBtn = document.getElementById('profile-social-btn');
const profileSocial = document.getElementById('profile-social');

if (profileSocialBtn && profileSocial) {
    profileSocialBtn.addEventListener('click', () => {
        profileSocial.classList.toggle('show-social');
        profileSocialBtn.classList.toggle('show-icon');
    });
}
