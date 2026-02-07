# 🎉 Complete Admin & Profile System - User Guide

## ✨ New Features Added

### 1. 👤 **User Profiles**
- Set custom username
- Upload profile photo
- Profile photo storage in Firebase Storage
- Auto-created on first login

### 2. 🛡️ **Admin Panel**
- Direct access from main site (admins only)
- Promote users to admin
- Remove admin rights
- View all users
- Manage comments
- Statistics dashboard

### 3. 🔗 **Admin Panel Button**
- Appears in header for admin users ONLY
- Hidden for regular users
- One-click access to admin panel

---

## 🚀 Quick Setup

### Step 1: Configure Initial Admin
Your email is already set as admin in `script.js`:
```javascript
const ADMIN_EMAILS = [
    'gamersandip872@gmail.com',  // ← Your email
];
```

### Step 2: Deploy Files
Upload all files to your GitHub repository.

### Step 3: Test Admin Access
1. Log in with your admin email
2. Look for "Admin Panel" button in header (top-right)
3. Click to access admin panel

---

## 👤 User Profile System

### For Regular Users:

**Set Your Profile:**
1. Log in to the site
2. Click your email in the top-right
3. Click "Profile Settings"
4. Enter your username
5. Upload a profile photo (optional)
6. Click "Save Changes"

**Your Profile Will Show:**
- In comments (username instead of email)
- In user menu
- In admin panel (if you become admin)

### Profile Photo Requirements:
- Format: JPG, PNG, or GIF
- Max size: 2MB
- Recommended: Square image (e.g., 400x400px)

---

## 🛡️ Admin Panel Features

### Access Admin Panel:
**Method 1:** Click "Admin Panel" button in header (visible only to admins)
**Method 2:** Go directly to `admin-enhanced.html`

### Dashboard Overview:
```
📊 Statistics
├─ Total Users
├─ Total Comments
├─ Total Views
└─ Admin Users

👥 Admin Management
├─ Promote User to Admin
├─ Current Admins List
└─ Remove Admin Rights

👤 All Users
├─ Search Users
├─ View User Profiles
└─ Quick Promote to Admin

💬 Comments Moderation
├─ View All Comments
├─ Delete Comments
└─ Filter Comments
```

---

## 🎯 Admin Features Explained

### 1. Promote User to Admin

**Method A: From Admin Management**
1. Go to Admin Panel
2. Click "Promote User to Admin"
3. Enter user's email
4. Click "Promote to Admin"

**Method B: Quick Promote from User List**
1. Go to "All Users" section
2. Find the user
3. Click "Make Admin" button next to their name

**Result:**
- User gets admin rights immediately
- Admin panel button appears for them
- They can delete/pin any comment
- They appear in "Current Admins" list

### 2. Remove Admin Rights

**Steps:**
1. Go to "Current Admins" section
2. Find the admin you want to remove
3. Click "Remove Admin"
4. Confirm the action

**Result:**
- User loses admin rights
- Admin panel button disappears for them
- They can no longer manage comments
- They're removed from admins list

**Note:** You cannot remove yourself!

### 3. User Management

**View All Users:**
- See all registered users
- View their usernames and emails
- See when they joined
- Check if they're admin or regular user

**Search Users:**
- Type in the search box
- Search by email or username
- Instant filtering

### 4. Comment Moderation

**Delete Comments:**
1. Scroll through recent comments
2. Click "Delete" on any comment
3. Confirm deletion

**Filter Comments:**
- All: Show all comments
- Flagged: Show reported comments (future feature)
- Today: Show comments from today

---

## 🔒 How Admin System Works

### Admin Check Flow:
```
User logs in
    ↓
System checks: db.collection('admins').doc(email)
    ↓
Document exists? → Admin ✅
Document missing? → Regular User ❌
```

### Storage Structure:
```
Firestore Collections:

/admins/{email}
    - promotedBy: "admin@example.com"
    - promotedAt: timestamp
    - username: "John Doe" (optional)
    - photoURL: "https://..." (optional)

/userProfiles/{userId}
    - email: "user@example.com"
    - username: "JohnDoe"
    - photoURL: "https://..."
    - createdAt: timestamp
    - updatedAt: timestamp

Firebase Storage:
/profile-photos/{userId}
    - User profile images
```

---

## 📱 User Experience

### For Regular Users:
```
Header:
[TENSURA WebBooks]    [Login]

After Login:
[TENSURA WebBooks]    [user@email.com ▼]
                            ↓
                      [Profile Settings]
                      [Sign Out]
```

### For Admin Users:
```
Header:
[TENSURA WebBooks]    [🛡️ Admin Panel] [admin@email.com ▼]
                                            ↓
                                      [Profile Settings]
                                      [Sign Out]
```

---

## 💡 Common Tasks

### Make Someone Admin:
1. Get their email address
2. Go to Admin Panel
3. Click "Promote User to Admin"
4. Enter their email
5. Done! They're now admin

### Change Your Username:
1. Click your email (top-right)
2. Click "Profile Settings"
3. Change username
4. Save

### Upload Profile Photo:
1. Go to Profile Settings
2. Click "Upload Photo"
3. Select image (JPG, PNG, GIF)
4. Save

### Delete Inappropriate Comment:
1. Go to Admin Panel
2. Scroll to Comments section
3. Find the comment
4. Click "Delete"

---

## 🐛 Troubleshooting

### Admin Panel Button Not Showing:
**Check:**
1. Are you logged in?
2. Is your email in Firestore `admins` collection?
3. Clear cache and reload
4. Check browser console for errors

**Fix:**
```javascript
// In browser console:
db.collection('admins').doc('youremail@gmail.com').set({
    promotedBy: 'system',
    promotedAt: firebase.firestore.FieldValue.serverTimestamp()
});
// Refresh page
```

### Profile Photo Not Uploading:
**Check:**
1. File size < 2MB?
2. File is image (JPG/PNG/GIF)?
3. Good internet connection?

**Fix:**
- Resize image to smaller size
- Convert to JPG format
- Try different image

### Can't Delete Comments:
**Check:**
1. Are you admin?
2. Is admin panel open?
3. Any console errors?

**Fix:**
- Refresh admin panel
- Check Firestore rules allow deletion
- Verify you're logged in as admin

---

## 🔐 Security Notes

### Admin Permissions:
- ✅ Delete ANY comment
- ✅ Pin ANY comment
- ✅ Promote/demote admins
- ✅ View all users
- ✅ Access admin panel

### Regular User Permissions:
- ✅ Post comments
- ✅ Edit own profile
- ✅ View public content
- ❌ Cannot delete others' comments
- ❌ Cannot pin comments
- ❌ Cannot access admin panel

### Data Privacy:
- Profile photos: Public (anyone can see)
- Email: Visible in comments and admin panel
- Username: Public (replaces email in UI)
- Admin status: Visible in admin panel

---

## 📊 Admin Panel Sections

### 1. Statistics Dashboard
Shows:
- Total registered users
- Total comments posted
- Total chapter views
- Number of admins

### 2. Admin Management
Features:
- Promote new admins
- View all current admins
- Remove admin rights
- See who promoted whom

### 3. User Management
Features:
- List all users
- Search by email/username
- View join dates
- Quick promote to admin
- See admin status

### 4. Comment Moderation
Features:
- View recent comments
- Delete any comment
- See comment metadata
- Filter options (All/Flagged/Today)

---

## ✅ Testing Checklist

- [ ] Admin panel button appears for admin
- [ ] Admin panel button hidden for regular users
- [ ] Can access admin panel via button
- [ ] Can access admin panel via direct URL
- [ ] Can promote user to admin
- [ ] Promoted user sees admin panel button
- [ ] Can remove admin rights
- [ ] Can set username in profile
- [ ] Can upload profile photo
- [ ] Profile photo appears in comments
- [ ] Username appears instead of email
- [ ] Can delete comments from admin panel
- [ ] Statistics show correct numbers
- [ ] Search users works correctly

---

## 🎉 Summary

**What Changed:**
1. ✅ Users can set username and profile photo
2. ✅ Admins see "Admin Panel" button in header
3. ✅ Full admin panel with user/comment management
4. ✅ Promote/demote admins from admin panel
5. ✅ Profile settings modal for all users

**New Files:**
- `admin-enhanced.html` - New admin panel
- `admin-panel-enhanced.js` - Admin panel logic
- `admin-panel-styles.css` - Admin panel styles
- `user-profile.js` - Profile management
- Modified: `index.html`, `script.js`, `mobile-fixes.css`

**Ready to Use!** 🚀

Deploy these files and start managing your web novel platform like a pro!
