// ==========================================
// ENHANCED ADMIN PANEL
// ==========================================

// Firebase Configuration (same as main site)
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

let currentUser = null;
let allUsers = [];
let allAdmins = [];
let selectedAdminToRemove = null;

// ==========================================
// AUTH CHECK
// ==========================================

auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    
    if (!user) {
        // Not logged in - redirect to main site
        window.location.href = 'index.html';
        return;
    }

    // Check if user is admin
    const isAdmin = await checkIfAdmin(user.email);
    
    if (!isAdmin) {
        // Not admin - show access denied
        document.getElementById('access-denied').style.display = 'flex';
        document.getElementById('admin-main').style.display = 'none';
    } else {
        // Is admin - show panel
        document.getElementById('access-denied').style.display = 'none';
        document.getElementById('admin-main').style.display = 'block';
        
        // Load admin data
        loadDashboard();
    }
});

async function checkIfAdmin(email) {
    try {
        const doc = await db.collection('admins').doc(email.toLowerCase()).get();
        return doc.exists;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// ==========================================
// LOAD DASHBOARD
// ==========================================

async function loadDashboard() {
    loadStats();
    loadAdminsList();
    loadUsersList();
    loadRecentComments();
}

// Load statistics
async function loadStats() {
    try {
        // Count users
        const usersSnapshot = await db.collection('userProfiles').get();
        document.getElementById('total-users').textContent = usersSnapshot.size;

        // Count comments
        const commentsSnapshot = await db.collection('comments').get();
        document.getElementById('total-comments').textContent = commentsSnapshot.size;

        // Count total views
        const chaptersSnapshot = await db.collection('chapters').get();
        let totalViews = 0;
        chaptersSnapshot.forEach(doc => {
            totalViews += (doc.data().views || 0);
        });
        document.getElementById('total-views').textContent = totalViews;

        // Count admins
        const adminsSnapshot = await db.collection('admins').get();
        document.getElementById('total-admins').textContent = adminsSnapshot.size;

    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load admins list
async function loadAdminsList() {
    const container = document.getElementById('admins-list-container');
    container.innerHTML = '<div class="loading">Loading admins...</div>';

    try {
        const snapshot = await db.collection('admins').get();
        allAdmins = [];

        snapshot.forEach(doc => {
            allAdmins.push({
                email: doc.id,
                ...doc.data()
            });
        });

        if (allAdmins.length === 0) {
            container.innerHTML = '<p class="no-data">No admins found</p>';
            return;
        }

        container.innerHTML = '';
        allAdmins.forEach(admin => {
            const adminCard = createAdminCard(admin);
            container.appendChild(adminCard);
        });

    } catch (error) {
        console.error('Error loading admins:', error);
        container.innerHTML = '<p class="error-message">Failed to load admins</p>';
    }
}

function createAdminCard(admin) {
    const div = document.createElement('div');
    div.className = 'admin-card';
    
    const isCurrentUser = admin.email.toLowerCase() === currentUser.email.toLowerCase();
    
    div.innerHTML = `
        <div class="admin-info">
            <div class="admin-avatar">
                ${admin.photoURL ? 
                    `<img src="${admin.photoURL}" alt="${admin.username || admin.email}">` :
                    `<div class="avatar-placeholder">${(admin.username || admin.email).charAt(0).toUpperCase()}</div>`
                }
            </div>
            <div class="admin-details">
                <h4>${admin.username || admin.email}</h4>
                <p>${admin.email}</p>
                ${isCurrentUser ? '<span class="you-badge">You</span>' : ''}
            </div>
        </div>
        <div class="admin-actions">
            ${!isCurrentUser ? 
                `<button class="danger-btn-small" onclick="showRemoveAdminModal('${admin.email}')">Remove Admin</button>` :
                '<span class="text-muted">Primary Admin</span>'
            }
        </div>
    `;
    
    return div;
}

// Load users list
async function loadUsersList() {
    const container = document.getElementById('users-list-container');
    container.innerHTML = '<div class="loading">Loading users...</div>';

    try {
        const snapshot = await db.collection('userProfiles').get();
        allUsers = [];

        snapshot.forEach(doc => {
            allUsers.push({
                uid: doc.id,
                ...doc.data()
            });
        });

        renderUsersList(allUsers);

    } catch (error) {
        console.error('Error loading users:', error);
        container.innerHTML = '<p class="error-message">Failed to load users</p>';
    }
}

function renderUsersList(users) {
    const container = document.getElementById('users-list-container');
    
    if (users.length === 0) {
        container.innerHTML = '<p class="no-data">No users found</p>';
        return;
    }

    container.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'users-table';
    table.innerHTML = `
        <thead>
            <tr>
                <th>User</th>
                <th>Email</th>
                <th>Joined</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="users-table-body"></tbody>
    `;
    
    container.appendChild(table);
    
    const tbody = document.getElementById('users-table-body');
    users.forEach(user => {
        const row = createUserRow(user);
        tbody.appendChild(row);
    });
}

function createUserRow(user) {
    const tr = document.createElement('tr');
    
    const isAdmin = allAdmins.some(admin => admin.email.toLowerCase() === user.email?.toLowerCase());
    const joinDate = user.createdAt ? new Date(user.createdAt.toDate()).toLocaleDateString() : 'N/A';
    
    tr.innerHTML = `
        <td>
            <div class="user-cell">
                ${user.photoURL ? 
                    `<img src="${user.photoURL}" alt="${user.username || user.email}" class="user-avatar-small">` :
                    `<div class="user-avatar-small avatar-placeholder">${(user.username || user.email || '?').charAt(0).toUpperCase()}</div>`
                }
                <span>${user.username || 'No username'}</span>
            </div>
        </td>
        <td>${user.email || 'N/A'}</td>
        <td>${joinDate}</td>
        <td>
            ${isAdmin ? 
                '<span class="badge badge-admin">Admin</span>' :
                '<span class="badge badge-user">User</span>'
            }
        </td>
        <td>
            ${!isAdmin && user.email ? 
                `<button class="action-btn-small" onclick="quickPromoteUser('${user.email}')">Make Admin</button>` :
                isAdmin ? '<span class="text-muted">Already Admin</span>' : ''
            }
        </td>
    `;
    
    return tr;
}

// Search users
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('user-search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allUsers.filter(user => 
                (user.email?.toLowerCase().includes(query)) ||
                (user.username?.toLowerCase().includes(query))
            );
            renderUsersList(filtered);
        });
    }
});

// Load recent comments
async function loadRecentComments() {
    const container = document.getElementById('comments-list-container');
    container.innerHTML = '<div class="loading">Loading comments...</div>';

    try {
        const snapshot = await db.collection('comments')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();

        if (snapshot.empty) {
            container.innerHTML = '<p class="no-data">No comments found</p>';
            return;
        }

        container.innerHTML = '';
        snapshot.forEach(doc => {
            const comment = doc.data();
            const commentCard = createCommentCard(doc.id, comment);
            container.appendChild(commentCard);
        });

    } catch (error) {
        console.error('Error loading comments:', error);
        container.innerHTML = '<p class="error-message">Failed to load comments</p>';
    }
}

function createCommentCard(commentId, comment) {
    const div = document.createElement('div');
    div.className = 'comment-card';
    
    const date = comment.timestamp ? new Date(comment.timestamp.toDate()).toLocaleString() : 'N/A';
    
    div.innerHTML = `
        <div class="comment-header-admin">
            <div>
                <strong>${comment.authorEmail}</strong>
                <span class="comment-date-admin">${date}</span>
            </div>
            <button class="delete-btn-small" onclick="deleteCommentAdmin('${commentId}')">Delete</button>
        </div>
        <p class="comment-text-admin">${escapeHtml(comment.text)}</p>
        <div class="comment-meta">
            <span>Series: ${comment.seriesId} | Book: ${comment.bookId} | Chapter: ${comment.chapterId}</span>
        </div>
    `;
    
    return div;
}

async function deleteCommentAdmin(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
        await db.collection('comments').doc(commentId).delete();
        loadRecentComments(); // Reload
        showToast('Comment deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting comment:', error);
        showToast('Failed to delete comment', 'error');
    }
}

// ==========================================
// PROMOTE USER TO ADMIN
// ==========================================

function showPromoteUserModal() {
    document.getElementById('promote-modal').classList.add('active');
    document.getElementById('promote-email').value = '';
    document.getElementById('promote-error').textContent = '';
    document.getElementById('promote-success').textContent = '';
}

function closePromoteModal() {
    document.getElementById('promote-modal').classList.remove('active');
}

async function promoteUserToAdmin() {
    const email = document.getElementById('promote-email').value.trim().toLowerCase();
    const errorDiv = document.getElementById('promote-error');
    const successDiv = document.getElementById('promote-success');
    
    errorDiv.textContent = '';
    successDiv.textContent = '';

    if (!email) {
        errorDiv.textContent = 'Please enter an email address';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorDiv.textContent = 'Please enter a valid email address';
        return;
    }

    // Check if already admin
    const isAlreadyAdmin = await checkIfAdmin(email);
    if (isAlreadyAdmin) {
        errorDiv.textContent = 'This user is already an admin';
        return;
    }

    try {
        // Add to admins collection
        await db.collection('admins').doc(email).set({
            promotedBy: currentUser.email,
            promotedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        successDiv.textContent = `Successfully promoted ${email} to admin!`;
        
        // Reload admins list
        setTimeout(() => {
            loadAdminsList();
            loadStats();
            closePromoteModal();
        }, 1500);

    } catch (error) {
        console.error('Error promoting user:', error);
        errorDiv.textContent = 'Failed to promote user: ' + error.message;
    }
}

async function quickPromoteUser(email) {
    if (!confirm(`Promote ${email} to admin?`)) return;

    try {
        await db.collection('admins').doc(email.toLowerCase()).set({
            promotedBy: currentUser.email,
            promotedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        showToast(`${email} promoted to admin!`, 'success');
        loadAdminsList();
        loadUsersList();
        loadStats();

    } catch (error) {
        console.error('Error promoting user:', error);
        showToast('Failed to promote user', 'error');
    }
}

// ==========================================
// REMOVE ADMIN
// ==========================================

function showRemoveAdminModal(email) {
    selectedAdminToRemove = email;
    document.getElementById('remove-admin-email').textContent = email;
    document.getElementById('remove-admin-modal').classList.add('active');
}

function closeRemoveAdminModal() {
    document.getElementById('remove-admin-modal').classList.remove('active');
    selectedAdminToRemove = null;
}

async function confirmRemoveAdmin() {
    if (!selectedAdminToRemove) return;

    try {
        await db.collection('admins').doc(selectedAdminToRemove.toLowerCase()).delete();
        
        showToast('Admin rights removed successfully', 'success');
        closeRemoveAdminModal();
        loadAdminsList();
        loadUsersList();
        loadStats();

    } catch (error) {
        console.error('Error removing admin:', error);
        showToast('Failed to remove admin rights', 'error');
    }
}

// ==========================================
// UTILITIES
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function logoutAdmin() {
    if (confirm('Are you sure you want to logout?')) {
        auth.signOut().then(() => {
            window.location.href = 'index.html';
        });
    }
}

function filterComments(filter) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // TODO: Implement filtering logic
    loadRecentComments();
}
