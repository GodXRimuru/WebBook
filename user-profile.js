// ==========================================
// USER PROFILE SYSTEM
// ==========================================

// This should be added to script.js or included separately

// Initialize user profile on auth change
async function initializeUserProfile(user) {
    if (!user) return;

    try {
        // Check if profile exists
        const profileDoc = await db.collection('userProfiles').doc(user.uid).get();
        
        if (!profileDoc.exists) {
            // Create new profile
            await db.collection('userProfiles').doc(user.uid).set({
                email: user.email,
                username: user.displayName || user.email.split('@')[0],
                photoURL: user.photoURL || null,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        }

        // Check if user is admin
        const isAdmin = await checkIfUserIsAdmin(user.email);
        
        // Show admin panel button if admin
        const adminBtn = document.getElementById('admin-panel-btn');
        if (adminBtn) {
            adminBtn.style.display = isAdmin ? 'flex' : 'none';
        }

    } catch (error) {
        console.error('Error initializing user profile:', error);
    }
}

async function checkIfUserIsAdmin(email) {
    try {
        const adminDoc = await db.collection('admins').doc(email.toLowerCase()).get();
        return adminDoc.exists;
    } catch (error) {
        console.error('Error checking admin status:', error);
        return false;
    }
}

// Show profile settings modal
function showProfileSettings() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    // Create modal if doesn't exist
    let modal = document.getElementById('profile-settings-modal');
    if (!modal) {
        modal = createProfileSettingsModal();
        document.body.appendChild(modal);
    }

    // Load current profile data
    loadProfileData();
    modal.classList.add('active');
}

function createProfileSettingsModal() {
    const modal = document.createElement('div');
    modal.id = 'profile-settings-modal';
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeProfileSettings()"></div>
        <div class="modal-content profile-settings-content">
            <h2>Profile Settings</h2>
            
            <div class="profile-photo-section">
                <div class="current-photo">
                    <img id="profile-photo-preview" src="" alt="Profile Photo" style="display: none;">
                    <div id="profile-photo-placeholder" class="photo-placeholder">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                    </div>
                </div>
                <div class="photo-upload">
                    <input type="file" id="profile-photo-input" accept="image/*" style="display: none;">
                    <button class="secondary-btn" onclick="document.getElementById('profile-photo-input').click()">
                        Upload Photo
                    </button>
                    <p class="help-text">JPG, PNG or GIF. Max 2MB.</p>
                </div>
            </div>

            <div class="form-group">
                <label>Username</label>
                <input type="text" id="profile-username" placeholder="Enter username" maxlength="30">
            </div>

            <div class="form-group">
                <label>Email</label>
                <input type="email" id="profile-email" disabled>
                <p class="help-text">Email cannot be changed</p>
            </div>

            <div id="profile-error" class="error-message"></div>
            <div id="profile-success" class="success-message"></div>

            <div class="modal-actions">
                <button class="secondary-btn" onclick="closeProfileSettings()">Cancel</button>
                <button class="primary-btn" onclick="saveProfileSettings()">Save Changes</button>
            </div>
        </div>
    `;

    // Add photo input handler
    const photoInput = modal.querySelector('#profile-photo-input');
    photoInput.addEventListener('change', handlePhotoSelect);

    return modal;
}

async function loadProfileData() {
    if (!currentUser) return;

    try {
        const profileDoc = await db.collection('userProfiles').doc(currentUser.uid).get();
        const profile = profileDoc.data();

        if (profile) {
            document.getElementById('profile-username').value = profile.username || '';
            document.getElementById('profile-email').value = currentUser.email;

            if (profile.photoURL) {
                document.getElementById('profile-photo-preview').src = profile.photoURL;
                document.getElementById('profile-photo-preview').style.display = 'block';
                document.getElementById('profile-photo-placeholder').style.display = 'none';
            }
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function handlePhotoSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('File size must be less than 2MB');
        return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onload = (e) => {
        document.getElementById('profile-photo-preview').src = e.target.result;
        document.getElementById('profile-photo-preview').style.display = 'block';
        document.getElementById('profile-photo-placeholder').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

async function saveProfileSettings() {
    if (!currentUser) return;

    const username = document.getElementById('profile-username').value.trim();
    const errorDiv = document.getElementById('profile-error');
    const successDiv = document.getElementById('profile-success');
    const photoInput = document.getElementById('profile-photo-input');

    errorDiv.textContent = '';
    successDiv.textContent = '';

    if (!username) {
        errorDiv.textContent = 'Username is required';
        return;
    }

    try {
        let photoURL = null;

        // Upload photo if selected
        if (photoInput.files.length > 0) {
            const file = photoInput.files[0];
            const storageRef = storage.ref(`profile-photos/${currentUser.uid}`);
            await storageRef.put(file);
            photoURL = await storageRef.getDownloadURL();
        } else {
            // Keep existing photo URL
            const profileDoc = await db.collection('userProfiles').doc(currentUser.uid).get();
            photoURL = profileDoc.data()?.photoURL || null;
        }

        // Update profile
        await db.collection('userProfiles').doc(currentUser.uid).update({
            username: username,
            photoURL: photoURL,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });

        // Also update admin doc if user is admin
        const isAdmin = await checkIfUserIsAdmin(currentUser.email);
        if (isAdmin) {
            await db.collection('admins').doc(currentUser.email.toLowerCase()).update({
                username: username,
                photoURL: photoURL
            });
        }

        successDiv.textContent = 'Profile updated successfully!';

        // Update UI
        setTimeout(() => {
            closeProfileSettings();
            // Reload user menu if needed
            updateUserMenuDisplay();
        }, 1500);

    } catch (error) {
        console.error('Error saving profile:', error);
        errorDiv.textContent = 'Failed to save profile: ' + error.message;
    }
}

function closeProfileSettings() {
    const modal = document.getElementById('profile-settings-modal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function updateUserMenuDisplay() {
    // Update user menu with new profile info
    if (currentUser) {
        db.collection('userProfiles').doc(currentUser.uid).get().then(doc => {
            const profile = doc.data();
            if (profile) {
                const userEmailEl = document.getElementById('user-email');
                if (userEmailEl) {
                    userEmailEl.textContent = profile.username || currentUser.email;
                }
            }
        });
    }
}

// Export functions
window.initializeUserProfile = initializeUserProfile;
window.showProfileSettings = showProfileSettings;
window.checkIfUserIsAdmin = checkIfUserIsAdmin;
