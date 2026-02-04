# The Diary You Hold - Web Novel Platform

A fully functional dark psychological thriller web novel website featuring Firebase authentication, real-time view tracking, and a comments system.

## Features

### ✨ Core Functionality
- **3 Complete Books** with engaging psychological thriller content
- **Dynamic Chapter Navigation** with previous/next buttons
- **Real-time View Tracking** using Firebase Firestore
- **Comment System** for reader engagement
- **User Authentication** with multiple providers

### 🔐 Authentication
- Email/Password authentication
- Google Sign-In (active)
- GitHub Sign-In (coming soon)
- Microsoft Sign-In (coming soon)

### 🎨 Design
- Dark, atmospheric theme perfect for psychological thrillers
- Elegant serif typography (Cormorant Garamond, Crimson Pro)
- Fully responsive and mobile-friendly
- Smooth animations and transitions
- Grain texture overlay for atmospheric effect

## Setup Instructions

### Prerequisites
- A Firebase account (free tier works perfectly)
- A text editor
- A web browser

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `web-novel-diary` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Set Up Firebase Authentication

1. In your Firebase project, click "Authentication" in the left sidebar
2. Click "Get Started"
3. Enable the following sign-in methods:
   - **Email/Password**: Click "Enable" toggle and save
   - **Google**: Click "Enable", add your email as project support, save

### Step 3: Set Up Firestore Database

1. Click "Firestore Database" in the left sidebar
2. Click "Create Database"
3. Start in **Production Mode**
4. Choose your location (closest to your users)
5. Click "Enable"

### Step 4: Configure Firestore Security Rules

1. Click on the "Rules" tab in Firestore
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Anyone can read chapters and their view counts
    match /chapters/{chapterId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Anyone can read comments
    // Only authenticated users can write comments
    match /comments/{commentId} {
      allow read: if true;
      allow create: if request.auth != null 
                    && request.resource.data.authorEmail == request.auth.token.email;
      allow update, delete: if false;
    }
  }
}
```

3. Click "Publish"

### Step 5: Get Your Firebase Configuration

1. Click the gear icon (⚙️) next to "Project Overview"
2. Select "Project Settings"
3. Scroll down to "Your apps"
4. Click the Web icon (`</>`)
5. Register your app with nickname: "The Diary You Hold"
6. **Copy the firebaseConfig object**

It will look like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

### Step 6: Update Your Website

1. Open `script.js` in a text editor
2. Find the Firebase configuration section at the top (lines 5-11)
3. Replace the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_ACTUAL_API_KEY",
    authDomain: "your-actual-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-actual-project.appspot.com",
    messagingSenderId: "your-actual-sender-id",
    appId: "your-actual-app-id"
};
```

4. Save the file

### Step 7: Add Authorized Domains (for deployment)

1. In Firebase Console, go to Authentication → Settings
2. Scroll to "Authorized domains"
3. Add your deployment domain (e.g., `yourusername.github.io`)

## Deployment Options

### Option 1: GitHub Pages (Recommended)

1. Create a new repository on GitHub
2. Upload all files (index.html, style.css, script.js)
3. Go to repository Settings → Pages
4. Select main branch as source
5. Your site will be at: `https://yourusername.github.io/repository-name`

### Option 2: Netlify

1. Create account at [netlify.com](https://netlify.com)
2. Drag and drop your web-novel folder to Netlify
3. Your site will be live instantly with a custom URL

### Option 3: Local Testing

Simply open `index.html` in your web browser. Firebase will work with localhost!

## File Structure

```
web-novel/
├── index.html          # Main HTML structure
├── style.css           # Dark thriller styling
├── script.js           # Firebase integration & functionality
├── README.md           # This file
└── assets/
    └── images/         # Placeholder for future images
```

## How to Use

### For Readers
1. Browse the series on the homepage
2. Click a book to see its chapters
3. Click a chapter to read
4. Sign in to leave comments
5. View counts update automatically

### For Admin/Content Creators
- Add new books by editing the `booksData` array in `script.js`
- Each book needs: id, title, description, and chapters array
- Each chapter needs: id, title, and content (text)

## Sample Content Included

The website comes pre-loaded with:
- **Book 1**: "The Diary You Hold" (3 chapters)
- **Book 2**: "The Truth You Stayed For" (2 chapters)
- **Book 3**: "It Was Never Missing" (1 chapter)

All chapters contain complete, engaging psychological thriller content perfect for testing.

## Troubleshooting

### Firebase Errors
- **"Firebase not initialized"**: Check that your config is correct
- **"Permission denied"**: Review Firestore security rules
- **"Auth failed"**: Check that authentication methods are enabled

### Google Sign-In Issues
- Make sure Google authentication is enabled in Firebase Console
- Add your domain to authorized domains
- Clear browser cache and try again

### Comments Not Showing
- Ensure user is signed in
- Check browser console for errors
- Verify Firestore rules allow reading comments

## Future Enhancements

- GitHub authentication (marked as "Coming Soon")
- Microsoft authentication (marked as "Coming Soon")
- Chapter bookmarking
- Reading progress tracking
- Dark/light theme toggle
- Search functionality
- Author profiles

## Credits

Created as a demonstration of modern web development with Firebase integration.

Fonts:
- Cormorant Garamond (display)
- Crimson Pro (body)
- Libre Baskerville (accents)

## License

Free to use and modify for personal or commercial projects.

---

**Note**: Remember to keep your Firebase API key and configuration secure. For production apps, consider implementing additional security measures and rate limiting.
