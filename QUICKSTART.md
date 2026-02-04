# Quick Start Guide - The Diary You Hold

## 5-Minute Setup

### 1. Create Firebase Project (2 minutes)
- Go to https://console.firebase.google.com/
- Click "Add Project"
- Name it "web-novel-diary"
- Click through the setup (disable Analytics if asked)

### 2. Enable Authentication (1 minute)
- Click "Authentication" → "Get Started"
- Enable "Email/Password" 
- Enable "Google"

### 3. Create Firestore Database (1 minute)
- Click "Firestore Database" → "Create Database"
- Select "Production Mode"
- Choose your location → "Enable"
- Go to "Rules" tab
- Copy/paste the rules from `firestore.rules` file
- Click "Publish"

### 4. Get Your Config (30 seconds)
- Click Settings (⚙️) → "Project Settings"
- Scroll to "Your apps" → Click Web icon `</>`
- Copy the `firebaseConfig` object

### 5. Update Website (30 seconds)
- Open `script.js`
- Replace lines 5-11 with your config
- Save

### 6. Test Locally
- Open `index.html` in your browser
- It works!

## Deploy to GitHub Pages (Optional)

1. Create new repo on GitHub
2. Upload these files:
   - index.html
   - style.css  
   - script.js
   - README.md
3. Settings → Pages → Select main branch
4. Add your GitHub Pages URL to Firebase authorized domains:
   - Firebase Console → Authentication → Settings → Authorized domains

Done! Your web novel is live.

## First Steps After Setup

1. **Create Test Account**
   - Click "Login" → "Create Account"
   - Use your email

2. **Test Reading**
   - Click "Book 1: The Diary You Hold"
   - Click "Chapter 1: The Discovery"
   - Watch view count increment

3. **Test Comments**
   - Scroll to bottom
   - Write a comment
   - Submit

4. **Verify in Firebase**
   - Go to Firebase Console
   - Check Firestore Database
   - You should see `chapters` and `comments` collections

## Common Issues

**"Firebase is not defined"**
- Check internet connection (Firebase CDN needs to load)
- Open browser console for specific error

**"Permission denied"**
- Copy firestore.rules exactly
- Make sure you clicked "Publish" in Firebase

**"Google sign in failed"**
- Make sure Google auth is enabled in Firebase Console
- Check that popup blockers are disabled

## Need Help?

Check the full README.md for detailed troubleshooting and advanced features.
