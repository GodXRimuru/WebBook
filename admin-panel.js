// ==========================================
// ADMIN PANEL SCRIPT
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

let currentUser = null;
let allUsers = [];
let allComments = [];

// ==========================================
// ADMIN EMAIL LIST
// ==========================================
// Add your admin email addresses here
// These emails work for ALL login methods (Email/Password, Google, GitHub, Facebook, Twitter)
// Just use the email address associated with their account, regardless of how they sign in

const ADMIN_EMAILS = [
    'gamersandip872@gmail.com',  // Your email - REPLACE THIS
    // Add more admin emails below (works for any login method):
    // 'admin@gmail.com',           // Can login via Google
    // 'moderator@yahoo.com',       // Can login via Email/Password
    // 'friend@outlook.com',        // Can login via GitHub
    // 'helper@proton.me',          // Can login via Facebook/Twitter
];

// ==========================================
// CHECK ADMIN ACCESS
// ==========================================
function isAdmin(email) {
    if (!email) return false;
    
    // Normalize email to lowercase for comparison
    const normalizedEmail = email.toLowerCase().trim();
    
    return ADMIN_EMAILS.some(adminEmail => 
        adminEmail.toLowerCase().trim() === normalizedEmail
    );
}

// ==========================================
// AUTH STATE
// ==========================================
auth.onAuthStateChanged(async (user) => {
    const loadingDiv = document.getElementById('loading-admin');
    const notAdminDiv = document.getElementById('not-admin');
    const adminContent = document.getElementById('admin-content');

    if (user) {
        currentUser = user;
        
        // Check if user is admin
        if (isAdmin(user.email)) {
            loadingDiv.style.display = 'none';
            notAdminDiv.style.display = 'none';
            adminContent.style.display = 'block';
            
            document.getElementById('admin-email').textContent = user.email;
            
            // Load admin data
            await loadDashboard();
        } else {
            // Not an admin
            loadingDiv.style.display = 'none';
            notAdminDiv.style.display = 'block';
            adminContent.style.display = 'none';
        }
    } else {
        // Not logged in - redirect to main site
        window.location.href = 'index.html';
    }
});

// ==========================================
// LOAD DASHBOARD DATA
// ==========================================
async function loadDashboard() {
    try {
        await Promise.all([
            loadUsers(),
            loadComments(),
            loadStats()
        ]);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

// ==========================================
// LOAD USERS
// ==========================================
async function loadUsers() {
    const usersList = document.getElementById('users-list');
    usersList.innerHTML = '<tr><td colspan="4" style="text-align: center;">Loading users...</td></tr>';

    try {
        // Note: You'll need Firebase Admin SDK for full user management
        // For now, we'll show users who have commented
        const commentsSnapshot = await db.collection('comments').get();
        const userEmails = new Set();
        
        commentsSnapshot.forEach(doc => {
            const email = doc.data().authorEmail;
            if (email) userEmails.add(email);
        });

        // Add admin emails
        ADMIN_EMAILS.forEach(email => userEmails.add(email));

        allUsers = Array.from(userEmails).map(email => ({
            email,
            isAdmin: isAdmin(email),
            joined: 'N/A' // Would need Admin SDK to get real join date
        }));

        renderUsers(allUsers);
        
        // Update stats
        document.getElementById('total-users').textContent = allUsers.length;
        document.getElementById('total-admins').textContent = ADMIN_EMAILS.length;
    } catch (error) {
        console.error('Error loading users:', error);
        usersList.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--error);">Error loading users</td></tr>';
    }
}

function renderUsers(users) {
    const usersList = document.getElementById('users-list');
    
    if (users.length === 0) {
        usersList.innerHTML = '<tr><td colspan="4" style="text-align: center;">No users found</td></tr>';
        return;
    }

    usersList.innerHTML = users.map(user => `
        <tr>
            <td>${user.email}</td>
            <td>
                ${user.isAdmin 
                    ? '<span class="admin-badge">Admin</span>' 
                    : '<span class="user-badge">User</span>'}
            </td>
            <td>${user.joined}</td>
            <td>
                ${!user.isAdmin 
                    ? `<button class="action-btn" onclick="makeAdmin('${user.email}')">Make Admin</button>`
                    : currentUser.email !== user.email 
                        ? `<button class="action-btn danger" onclick="removeAdmin('${user.email}')">Remove Admin</button>`
                        : '<span style="color: var(--text-tertiary);">You</span>'}
            </td>
        </tr>
    `).join('');
}

// ==========================================
// LOAD COMMENTS
// ==========================================
async function loadComments() {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '<p style="text-align: center;">Loading comments...</p>';

    try {
        const snapshot = await db.collection('comments')
            .orderBy('timestamp', 'desc')
            .limit(50)
            .get();

        allComments = [];
        snapshot.forEach(doc => {
            allComments.push({
                id: doc.id,
                ...doc.data(),
                timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
            });
        });

        renderComments(allComments);
        
        // Update stats
        document.getElementById('total-comments').textContent = allComments.length;
    } catch (error) {
        console.error('Error loading comments:', error);
        
        // Try without orderBy
        try {
            const snapshot = await db.collection('comments').limit(50).get();
            allComments = [];
            snapshot.forEach(doc => {
                allComments.push({
                    id: doc.id,
                    ...doc.data(),
                    timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
                });
            });
            renderComments(allComments);
            document.getElementById('total-comments').textContent = allComments.length;
        } catch (err) {
            commentsList.innerHTML = '<p style="text-align: center; color: var(--error);">Error loading comments</p>';
        }
    }
}

function renderComments(comments) {
    const commentsList = document.getElementById('comments-list');
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p style="text-align: center;">No comments found</p>';
        return;
    }

    commentsList.innerHTML = comments.map(comment => `
        <div class="comment-item">
            <div class="comment-header">
                <span class="comment-author">${comment.authorEmail || 'Anonymous'}</span>
                <span style="color: var(--text-tertiary); font-size: 0.875rem;">
                    ${formatDate(comment.timestamp)}
                </span>
            </div>
            <p class="comment-text">${escapeHtml(comment.text || '')}</p>
            <div class="comment-actions">
                <button class="action-btn danger" onclick="deleteComment('${comment.id}')">Delete</button>
                ${comment.isSpoiler ? '<span style="color: var(--accent); font-size: 0.875rem;">⚠️ Spoiler</span>' : ''}
            </div>
        </div>
    `).join('');
}

// ==========================================
// LOAD STATS
// ==========================================
async function loadStats() {
    try {
        const chaptersSnapshot = await db.collection('chapters').get();
        let totalViews = 0;
        
        const stats = [];
        
        chaptersSnapshot.forEach(doc => {
            const data = doc.data();
            const views = data.views || 0;
            totalViews += views;
            
            stats.push({
                chapter: doc.id,
                views: views,
                likes: data.likes || 0,
                dislikes: data.dislikes || 0
            });
        });

        // Update total views
        document.getElementById('total-views').textContent = totalViews;

        // Render content stats
        const contentStats = document.getElementById('content-stats');
        
        if (stats.length === 0) {
            contentStats.innerHTML = '<p style="text-align: center;">No content statistics available</p>';
            return;
        }

        // Sort by views
        stats.sort((a, b) => b.views - a.views);

        contentStats.innerHTML = `
            <table class="users-table">
                <thead>
                    <tr>
                        <th>Chapter</th>
                        <th>Views</th>
                        <th>Likes</th>
                        <th>Dislikes</th>
                        <th>Ratio</th>
                    </tr>
                </thead>
                <tbody>
                    ${stats.map(stat => {
                        const ratio = stat.likes + stat.dislikes > 0 
                            ? ((stat.likes / (stat.likes + stat.dislikes)) * 100).toFixed(1) 
                            : 0;
                        return `
                            <tr>
                                <td>${stat.chapter}</td>
                                <td>${stat.views}</td>
                                <td>${stat.likes}</td>
                                <td>${stat.dislikes}</td>
                                <td>${ratio}%</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        `;
    } catch (error) {
        console.error('Error loading stats:', error);
        document.getElementById('content-stats').innerHTML = '<p style="color: var(--error);">Error loading statistics</p>';
    }
}

// ==========================================
// ADMIN ACTIONS
// ==========================================

async function deleteComment(commentId) {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
        await db.collection('comments').doc(commentId).delete();
        alert('Comment deleted successfully');
        await loadComments();
    } catch (error) {
        console.error('Error deleting comment:', error);
        alert('Failed to delete comment: ' + error.message);
    }
}

function makeAdmin(email) {
    alert(`To make ${email} an admin:\n\n1. Open admin-panel.js\n2. Find the ADMIN_EMAILS array\n3. Add '${email}' to the list\n4. Save and redeploy\n\nExample:\nconst ADMIN_EMAILS = [\n    'gamersandip872@gmail.com',\n    '${email}',\n];`);
}

function removeAdmin(email) {
    alert(`To remove ${email} as admin:\n\n1. Open admin-panel.js\n2. Find the ADMIN_EMAILS array\n3. Remove '${email}' from the list\n4. Save and redeploy`);
}

// ==========================================
// SEARCH FUNCTIONALITY
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // User search
    const userSearch = document.getElementById('user-search');
    if (userSearch) {
        userSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allUsers.filter(user => 
                user.email.toLowerCase().includes(query)
            );
            renderUsers(filtered);
        });
    }

    // Comment search
    const commentSearch = document.getElementById('comment-search');
    if (commentSearch) {
        commentSearch.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = allComments.filter(comment => 
                (comment.text || '').toLowerCase().includes(query) ||
                (comment.authorEmail || '').toLowerCase().includes(query)
            );
            renderComments(filtered);
        });
    }
});

// ==========================================
// TAB SWITCHING
// ==========================================

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabName + '-tab').classList.add('active');
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function formatDate(date) {
    if (!date) return 'Unknown';
    
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return 'Just now';
    }
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
