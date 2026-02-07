// ==========================================
// ADMIN INITIALIZATION HELPER
// ==========================================
// This script helps initialize admin users in Firestore
// Run this once after logging in with your admin email

async function initializeAdminInFirestore() {
    const ADMIN_EMAILS = [
        'gamersandip872@gmail.com',
        // Add more admin emails here
    ];

    console.log('Initializing admin users in Firestore...');

    for (const email of ADMIN_EMAILS) {
        try {
            await db.collection('admins').doc(email.toLowerCase()).set({
                email: email.toLowerCase(),
                addedAt: firebase.firestore.FieldValue.serverTimestamp(),
                addedBy: 'system'
            });
            console.log(`✓ Admin initialized: ${email}`);
        } catch (error) {
            console.error(`✗ Failed to initialize ${email}:`, error);
        }
    }

    console.log('Admin initialization complete!');
}

// Call this function from browser console after logging in:
// initializeAdminInFirestore()
