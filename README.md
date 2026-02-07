# TENSURA WebBooks

A modern, responsive web-based reading platform for hosting and managing web novels and book series.

![TENSURA WebBooks](https://img.shields.io/badge/Status-Production-success)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [File Structure](#file-structure)
- [Core Components](#core-components)
- [Setup Instructions](#setup-instructions)
- [Authentication System](#authentication-system)
- [Admin Panel](#admin-panel)
- [Database Configuration](#database-configuration)
- [Styling System](#styling-system)
- [JavaScript Modules](#javascript-modules)
- [Customization Guide](#customization-guide)
- [Troubleshooting](#troubleshooting)

---

## 🌟 Overview

TENSURA WebBooks is a full-featured web novel platform that allows content creators to:
- Host multiple book series and standalone novels
- Manage chapters with rich text content
- Track views and engagement
- Enable user comments and reactions
- Implement secure authentication
- Provide admin controls for content management

**Live Demo**: Your GitHub Pages URL will be here

---

## ✨ Features

### Reader Features
- 📖 **Reading Experience**
  - Clean, distraction-free reader interface
  - Adjustable font sizes
  - Dark/Light theme toggle
  - Chapter navigation (previous/next)
  - Bookmark functionality

- 👤 **User Authentication**
  - Email/Password registration and login
  - Social login (Google, GitHub, Facebook, Twitter)
  - Password reset functionality
  - User profiles
  - Secure session management

- 💬 **Engagement**
  - Chapter comments system
  - Like/Dislike reactions
  - View counter
  - Social sharing

### Admin Features
- 📊 **Content Management**
  - Add/Edit/Delete series
  - Manage books and chapters
  - Upload cover images
  - Rich text editor

- 👥 **User Management**
  - View all users
  - Manage admin permissions
  - Monitor user activity

- 📈 **Analytics**
  - View statistics
  - Track popular content
  - Monitor engagement metrics

---

## 📁 File Structure

```
tensura-webbooks/
├── index.html                    # Main homepage
├── privacy.html                  # Privacy policy page
├── terms.html                    # Terms of service page
├── data-deletion.html           # Data deletion instructions
├── admin.html                    # Basic admin panel
├── admin-enhanced.html          # Enhanced admin panel with more features
│
├── assets/                       # Static assets
│   ├── images/                   # Images, covers, profile pictures
│   │   ├── tensura-tiktok-pfp.jpg
│   │   └── diary-you-hold-cover.png
│   └── fonts/                    # Custom fonts (if any)
│
├── CSS Files/
├── style.css                     # Main stylesheet (27KB)
├── features-styles.css           # Reader features styles (9KB)
├── mobile-fixes.css              # Mobile responsive fixes (9KB)
├── fixes.css                     # General bug fixes (13KB)
├── critical-fixes-v2.css         # Auth modal & footer styles (11KB)
├── admin-panel-styles.css        # Admin panel specific styles (12KB)
├── legal-style.css               # Legal pages styling (5KB)
│
├── JavaScript Files/
├── script.js                     # Main application logic (27KB)
├── auth.js                       # Authentication system (8KB)
├── auth-toggle.js                # Auth modal toggle logic (1KB)
├── comments.js                   # Comments system (10KB)
├── reactions-animated.js         # Like/Dislike reactions (2KB)
├── reader-features.js            # Reader controls (17KB)
├── view-counter.js               # View tracking (8KB)
├── user-profile.js               # User profile management (12KB)
├── admin-manager.js              # Admin utilities (3KB)
├── admin-panel-enhanced.js       # Enhanced admin features (15KB)
├── init-admins.js                # Admin initialization (1KB)
└── supabase-config.js            # Database configuration (0.5KB)
```

---

## 🔧 Core Components

### 1. `index.html` - Main Application
The main entry point containing:
- **Header**: Logo and login button
- **Homepage**: Series display and navigation
- **Series Page**: Book listings for selected series
- **Book Page**: Chapter listings
- **Reader**: Full chapter reading interface
- **Comments Section**: User comments and reactions
- **Auth Modal**: Login/Register sliding modal
- **Footer**: Profile card and legal links

### 2. `style.css` - Main Stylesheet
Core styling including:
- CSS variables for theming
- Layout grid system
- Typography settings
- Card components
- Navigation elements
- Responsive breakpoints

**Key CSS Variables:**
```css
--bg-primary: #0a0a0a;        /* Dark background */
--accent: #c9a961;            /* Gold accent */
--text-primary: #e8e6e3;      /* Light text */
--font-display: 'Crimson Pro'; /* Display font */
--font-body: 'Libre Baskerville'; /* Body font */
```

### 3. `script.js` - Main Application Logic

**Data Structure:**
```javascript
const seriesData = [
    {
        id: 1,
        name: "Series Name",
        description: "Series description",
        cover: "path/to/cover.png",
        books: [
            {
                id: 1,
                title: "Book Title",
                description: "Book description",
                chapters: [
                    {
                        id: 1,
                        title: "Chapter Title",
                        content: "Chapter content..."
                    }
                ]
            }
        ]
    }
];
```

**Key Functions:**
- `loadSeries()` - Displays all series on homepage
- `showSeriesPage(seriesId)` - Shows books in a series
- `showBookPage(bookId)` - Shows chapters in a book
- `showChapter(chapterId)` - Displays chapter content
- `showPage(pageId)` - Navigation between pages

---

## 🔐 Authentication System

### Firebase Authentication
The app uses Firebase Authentication with multiple providers:

**Setup (auth.js):**
```javascript
// Firebase config is in script.js
const auth = firebase.auth();

// Social login providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
```

**Login Methods:**
1. **Email/Password**: Traditional registration and login
2. **Google**: OAuth with Google accounts
3. **GitHub**: OAuth with GitHub accounts
4. **Facebook**: OAuth with Facebook accounts
5. **Twitter**: OAuth with Twitter accounts

**Auth Modal Features:**
- Sliding toggle animation (desktop: horizontal, mobile: vertical)
- Form validation
- Error handling
- Password reset
- Remember me checkbox
- Social login buttons

### User Session Management
```javascript
// Check auth state
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        currentUser = user;
        updateUIForAuthenticatedUser();
    } else {
        // User is signed out
        currentUser = null;
        updateUIForGuest();
    }
});
```

---

## 👨‍💼 Admin Panel

### Admin Configuration
Admins are defined by email in `script.js`:

```javascript
const ADMIN_EMAILS = [
    'gamersandip872@gmail.com',
    // Add more admin emails here
];
```

### Admin Features

**Basic Admin Panel** (`admin.html`):
- Series management
- Book management
- Chapter management
- User list

**Enhanced Admin Panel** (`admin-enhanced.html`):
- Advanced analytics
- Bulk operations
- Content scheduling
- User management
- Settings panel

### Admin Functions (`admin-manager.js`):
```javascript
function isAdmin(email) {
    return ADMIN_EMAILS.includes(email.toLowerCase());
}

function showAdminPanel() {
    if (isAdmin(currentUser.email)) {
        document.getElementById('admin-panel-btn').style.display = 'block';
    }
}
```

---

## 💾 Database Configuration

### Firebase Setup
1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication providers (Email, Google, GitHub, etc.)
3. Create Firestore database
4. Update config in `script.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};
```

### Supabase Setup (Optional)
For additional features like storage:

1. Create project at [supabase.com](https://supabase.com)
2. Update `supabase-config.js`:

```javascript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_KEY';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);
```

### Database Collections

**users**
```javascript
{
    uid: string,
    email: string,
    displayName: string,
    photoURL: string,
    createdAt: timestamp,
    isAdmin: boolean
}
```

**comments**
```javascript
{
    chapterId: number,
    userId: string,
    userName: string,
    text: string,
    timestamp: timestamp,
    likes: number
}
```

**views**
```javascript
{
    chapterId: number,
    count: number,
    lastUpdated: timestamp
}
```

**reactions**
```javascript
{
    chapterId: number,
    userId: string,
    type: 'like' | 'dislike',
    timestamp: timestamp
}
```

---

## 🎨 Styling System

### Critical Fixes v2 (`critical-fixes-v2.css`)

**Auth Modal Styles:**
- Desktop: Horizontal sliding toggle (form slides left/right)
- Mobile (<768px): Vertical stacking (toggle on top, form on bottom)
- Smooth animations with CSS transitions
- Gold accent theme matching site design

**Footer Styles:**
- Desktop: Links LEFT, Profile card RIGHT
- Mobile: Stacked vertically (profile first, links second)
- Compact profile card design
- Floating social icons panel

### Responsive Breakpoints
```css
/* Mobile */
@media screen and (max-width: 480px) { }

/* Tablet */
@media screen and (max-width: 768px) { }

/* Desktop */
@media screen and (min-width: 769px) { }
```

### Theme Colors
- **Primary Background**: `#0a0a0a` (Near black)
- **Elevated Background**: `#1a1a1a` (Slightly lighter)
- **Accent Gold**: `#daa520` (Goldenrod)
- **Text Primary**: `#e8e6e3` (Off-white)
- **Text Secondary**: `#ccc` (Light gray)
- **Border**: `rgba(218, 165, 32, 0.3)` (Transparent gold)

---

## 📜 JavaScript Modules

### 1. **auth.js** - Authentication Logic
Handles all authentication operations:
- User registration
- Login/Logout
- Password reset
- Social authentication
- Session management
- Auth modal toggle

### 2. **comments.js** - Comments System
Manages user comments:
- Add comments
- Delete comments (own or admin)
- Real-time updates
- Character limit (1000 chars)
- Login prompt for guests

### 3. **reactions-animated.js** - Like/Dislike System
Handles user reactions:
- Like/Dislike toggle
- Animated feedback
- Persistent state
- Real-time count updates

### 4. **reader-features.js** - Reading Experience
Enhances the reader:
- Font size adjustment
- Theme switching (dark/light)
- Chapter navigation
- Progress tracking
- Keyboard shortcuts

### 5. **view-counter.js** - Analytics
Tracks engagement:
- Chapter views
- Unique visitors
- View timestamps
- Popular content tracking

### 6. **user-profile.js** - Profile Management
User profile features:
- Display name editing
- Avatar upload
- Reading history
- Preferences
- Account settings

---

## 🛠️ Setup Instructions

### Quick Start

1. **Clone or Download** this repository

2. **Update Firebase Configuration**
   - Open `script.js`
   - Replace the `firebaseConfig` object with your Firebase credentials

3. **Configure Admin Emails**
   ```javascript
   // In script.js
   const ADMIN_EMAILS = [
       'your-email@example.com',
   ];
   ```

4. **Add Your Content**
   - Edit the `seriesData` array in `script.js`
   - Add your series, books, and chapters
   - Upload cover images to `assets/images/`

5. **Deploy**
   - **GitHub Pages**: Push to GitHub and enable Pages
   - **Netlify**: Connect repository and deploy
   - **Vercel**: Import repository and deploy
   - **Local Server**: Use any HTTP server

### Local Development

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js:**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

---

## 🎯 Customization Guide

### Change Site Name and Branding

**1. Update Title and Header:**
```html
<!-- In index.html -->
<title>YOUR SITE NAME</title>
<h1 class="app-title">YOUR SITE NAME</h1>
```

**2. Update Footer:**
```html
<h3 class="profile-name">Your Name</h3>
<p class="profile-title">Your Title</p>
```

**3. Replace Profile Image:**
- Add your image to `assets/images/`
- Update the path in footer:
```html
<img src="assets/images/your-image.jpg" alt="Your Name">
```

### Change Color Theme

Edit CSS variables in `style.css`:
```css
:root {
    --bg-primary: #YOUR_COLOR;
    --accent: #YOUR_ACCENT;
    --text-primary: #YOUR_TEXT_COLOR;
}
```

### Add New Series/Books

Edit `seriesData` in `script.js`:
```javascript
const seriesData = [
    {
        id: 1,
        name: "Your Series Name",
        description: "Your series description",
        cover: "assets/images/your-cover.png",
        books: [
            {
                id: 1,
                title: "Your Book Title",
                description: "Your book description",
                chapters: [
                    {
                        id: 1,
                        title: "Chapter 1",
                        content: `Your chapter content here...`
                    }
                ]
            }
        ]
    }
];
```

### Customize Social Links

Update links in the footer section of `index.html`:
```html
<a href="https://tiktok.com/@yourhandle" target="_blank">
<a href="https://instagram.com/yourhandle" target="_blank">
<a href="https://youtube.com/@yourhandle" target="_blank">
<a href="https://facebook.com/yourpage" target="_blank">
```

---

## 🔍 Troubleshooting

### Login Not Working
- Check Firebase configuration in `script.js`
- Ensure authentication providers are enabled in Firebase Console
- Check browser console for errors
- Verify domain is authorized in Firebase settings

### Images Not Loading
- Check file paths in `seriesData`
- Ensure images are in `assets/images/` folder
- Verify image file extensions match code
- Check browser console for 404 errors

### Admin Panel Not Showing
- Verify your email is in `ADMIN_EMAILS` array
- Log in with the admin email
- Check browser console for errors
- Ensure `admin-manager.js` is loaded

### Comments Not Saving
- Check Firestore rules allow writes
- Verify user is logged in
- Check browser console for errors
- Ensure Firebase is initialized

### Mobile Layout Issues
- Clear browser cache
- Check if all CSS files are loading
- Verify `critical-fixes-v2.css` is included
- Test on different mobile browsers

### Auth Modal Not Displaying Correctly
- Ensure `critical-fixes-v2.css` is loaded
- Check for CSS conflicts in browser DevTools
- Verify Font Awesome icons are loading
- Clear browser cache and reload

---

## 📱 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🤝 Contributing

Contributions are welcome! Please feel free to:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact via email (your-email@example.com)
- Join our Discord community (if applicable)

---

## 🙏 Acknowledgments

- Firebase for authentication and database
- Font Awesome for icons
- Google Fonts for typography
- All contributors and users

---

## 📈 Roadmap

### Upcoming Features
- [ ] Reading progress sync across devices
- [ ] Bookmarks and favorites
- [ ] Search functionality
- [ ] User notifications
- [ ] Chapter scheduling
- [ ] Reading statistics
- [ ] Mobile app (PWA)
- [ ] Multi-language support

---

## 🔒 Security

- All passwords are hashed by Firebase
- HTTPS recommended for production
- Environment variables for sensitive data
- Regular security updates
- XSS protection
- CSRF protection

---

**Made with ❤️ for book lovers and content creators**

**Version**: 1.0.0  
**Last Updated**: February 2026
