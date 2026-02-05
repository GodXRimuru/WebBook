# TENSURA WebBooks - Enhanced Edition

A fully-featured web reading platform with advanced authentication, engagement features, and user dashboard.

## ✨ New Features

### 🔐 Enhanced Authentication
- **All Firebase Auth Providers Enabled:**
  - Email/Password (with remember me)
  - Google Sign-In
  - Facebook Login
  - Twitter Authentication
  - GitHub Login
  - Phone Number (SMS verification)
- **Session Persistence:** Users stay logged in across page refreshes
- **Secure Token Management:** Proper Firebase auth state handling

### 📊 Reading Features
- **Chapter Progress Tracking:** Visual progress bars showing reading completion
- **Bookmarks:** Save your favorite chapters for quick access
- **Text Highlighting:** Select and save important passages
- **Reading Time Tracking:** Monitor how long you spend reading

### 💬 Enhanced Engagement
- **Like/Dislike System:** For both books and chapters with real-time counts
- **Improved Comments:** 
  - User avatars and badges
  - Character counter
  - Like functionality on comments
  - Visible to all, posting requires login
- **Reader Polls:** Interactive polls within chapters for engagement

### 👤 User Dashboard
Accessible via the dashboard button in the header (when logged in):

1. **Profile Section:**
   - Customizable display name and bio
   - Avatar upload (with image optimization)
   - Reading statistics (books read, time spent, bookmarks)
   - User badges display

2. **Reading History:**
   - Track all chapters you've read
   - Quick navigation back to chapters

3. **Bookmarks:**
   - Grid view of all saved chapters
   - One-click access to bookmarked content

4. **Highlights:**
   - View all your saved text highlights
   - Organized by chapter

5. **Notifications:**
   - Get notified about new chapters, comments, likes
   - Unread badge counter
   - Mark all as read functionality

6. **Analytics (Admin Only):**
   - Total views across platform
   - Total likes and comments
   - Active reader counts
   - Comprehensive metrics

### 🎨 Enhanced UI/UX
- **Improved Views Badge:** Eye-catching design with gradient background, border glow, and pulse animation
- **Enhanced Book Engagement Bar:** Shows total views, likes, and comments at book level
- **Material Design Icons:** Modern icon system throughout
- **Responsive Dashboard Navigation:** Smooth expanding menu items
- **Toast Notifications:** Non-intrusive success/error messages
- **Interactive Cover Effects:** Hover animations on book/series covers

## 🚀 Installation

1. **Clone or download this repository**

2. **Firebase Setup:**
   ```bash
   # The Firebase config is already in script.js
   # You need to configure Firebase Console:
   ```

3. **Firebase Console Configuration:**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Select your project (webbook-9d8ec)
   
   **Authentication Setup:**
   - Navigate to Authentication → Sign-in method
   - Enable the following providers:
     * Email/Password ✓
     * Google (add OAuth client ID)
     * Facebook (add App ID and secret)
     * Twitter (add API keys)
     * GitHub (add OAuth app credentials)
     * Phone (enable and configure)
   
   - Go to Authentication → Settings → Authorized domains
   - Add your deployment domain (e.g., yourname.github.io)

   **Firestore Setup:**
   - Navigate to Firestore Database
   - Deploy the rules from `firestore.rules` file
   - Create indexes for:
     * comments: (seriesId, bookId, chapterId, timestamp)
     * likes: (seriesId, bookId, chapterId)
     * readingHistory: (userId, lastRead)
     * notifications: (userId, timestamp)

   **Storage Setup (for avatars):**
   - Navigate to Storage
   - Enable Storage
   - Deploy storage rules to allow authenticated uploads

4. **Deploy:**
   - Upload all files to your web host
   - For GitHub Pages: push to your repository
   - For custom hosting: upload to your server

## 📱 Features by Section

### Homepage
- Series grid with cover images
- Hover effects and animations
- Responsive design

### Book Pages
- Chapter list with progress indicators
- Reading statistics
- Like/dislike functionality
- Visual engagement metrics

### Chapter Reading
- Clean, distraction-free reading experience
- Sticky progress bar
- Text highlighting mode
- Interactive polls
- Enhanced comments section
- Previous/Next navigation

### Dashboard
- Elegant navigation system inspired by modern design
- Comprehensive user statistics
- All user data in one place
- Admin analytics (when enabled)

## 🔧 Configuration

### Adding Admin Users
Edit `script.js` and add Firebase UIDs to the `ADMIN_UIDS` array:
```javascript
const ADMIN_UIDS = ['your-firebase-uid-here', 'another-admin-uid'];
```

### Customizing Theme
Edit CSS variables in `style.css`:
```css
:root {
    --accent: #c9a961; /* Main accent color */
    --bg-primary: #0a0a0a; /* Background */
    /* ... more variables */
}
```

### Adding Content
Edit the `seriesData` array in `script.js` to add new books, chapters, and polls.

## 🎯 Key Improvements from Original

1. **Authentication Fixed:** Users now stay logged in properly
2. **All Auth Providers:** Complete Firebase auth integration
3. **Enhanced Visibility:** Views badge is now prominent and eye-catching
4. **Full Feature Set:** All requested features implemented
5. **Better UX:** Smooth animations, better feedback, intuitive navigation
6. **Mobile Optimized:** Fully responsive across all devices
7. **Performance:** Firestore persistence for offline support

## 📖 Usage Tips

### For Readers:
- Click the dashboard icon to access your profile
- Use highlight mode to save important passages
- Bookmark chapters to read later
- Participate in polls to engage with content

### For Admins:
- Access analytics from the dashboard
- Monitor user engagement
- Track popular content

## 🛠 Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Authentication:** Firebase Auth (all providers)
- **Database:** Cloud Firestore
- **Storage:** Firebase Storage
- **Icons:** Material Symbols
- **Fonts:** Google Fonts (Crimson Pro, Cormorant Garamond)

## 🔒 Security

- Firestore security rules properly configured
- User data isolated by UID
- Input sanitization for comments
- XSS protection
- Secure file uploads (2MB limit, image types only)

## 📄 License

This project is provided as-is for educational and personal use.

## 🤝 Support

For issues or questions:
1. Check Firebase Console for any configuration errors
2. Verify all authentication providers are properly set up
3. Ensure Firestore rules are deployed
4. Check browser console for error messages

## 🎨 Customization Guide

The platform is designed to be easily customizable:
- **Colors:** Modify CSS variables
- **Content:** Edit seriesData in script.js
- **Features:** Enable/disable features by commenting code
- **Layout:** Responsive grid system makes layout changes easy

---

**Enjoy your enhanced reading platform! 📚✨**
