// ==========================================
// ADMIN ROLE MANAGEMENT SYSTEM
// ==========================================

class AdminManager {
    constructor() {
        this.adminEmails = [];
        this.currentUser = null;
    }

    // Initialize admin system
    init(adminEmails = [], currentUser = null) {
        this.adminEmails = adminEmails.map(email => email.toLowerCase());
        this.currentUser = currentUser;
        this.updateAdminUI();
    }

    // Check if email is admin
    isAdmin(email) {
        if (!email) return false;
        return this.adminEmails.includes(email.toLowerCase());
    }

    // Check if current user is admin
    isCurrentUserAdmin() {
        if (!this.currentUser || !this.currentUser.email) return false;
        return this.isAdmin(this.currentUser.email);
    }

    // Update user when auth state changes
    setCurrentUser(user) {
        this.currentUser = user;
        this.updateAdminUI();
        this.saveAdminStatusToFirestore();
    }

    // Update admin UI elements
    updateAdminUI() {
        const adminBtn = document.getElementById('admin-panel-btn');
        
        if (adminBtn) {
            if (this.isCurrentUserAdmin()) {
                adminBtn.style.display = 'flex';
            } else {
                adminBtn.style.display = 'none';
            }
        }
    }

    // Save admin status to Firestore user document
    async saveAdminStatusToFirestore() {
        if (!this.currentUser) return;

        try {
            const isAdmin = this.isCurrentUserAdmin();
            
            await db.collection('users').doc(this.currentUser.uid).set({
                email: this.currentUser.email,
                displayName: this.currentUser.displayName || '',
                photoURL: this.currentUser.photoURL || '',
                isAdmin: isAdmin,
                lastLogin: firebase.firestore.FieldValue.serverTimestamp()
            }, { merge: true });

            console.log('Admin status saved:', isAdmin);
        } catch (error) {
            console.error('Error saving admin status:', error);
        }
    }

    // Check if user has admin access and redirect if not
    async checkAdminAccess() {
        if (!this.currentUser) {
            this.showAccessDenied('You must be logged in to access this page.');
            return false;
        }

        if (!this.isCurrentUserAdmin()) {
            this.showAccessDenied('You must be an administrator to access this panel.');
            return false;
        }

        return true;
    }

    // Show access denied message
    showAccessDenied(message) {
        // Check if we're on admin page
        if (window.location.pathname.includes('admin')) {
            const container = document.querySelector('.admin-container') || document.body;
            container.innerHTML = `
                <div class="access-denied">
                    <div class="access-denied-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
                        </svg>
                    </div>
                    <h1>Access Denied</h1>
                    <p>${message}</p>
                    <button onclick="window.location.href='index.html'" class="go-back-btn">Go to Main Site</button>
                </div>
            `;
        }
    }
}

// Create global instance
window.adminManager = new AdminManager();
