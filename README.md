# TENSURA WebBooks - Web Novel Platform

A fully functional web novel platform featuring series organization, Firebase authentication with Google sign-in, password reset, real-time view tracking, and a comments system.

## ✨ What's New in This Version

### Fixed Issues
✅ **Google Sign-In Works** - Properly configured with popup authentication  
✅ **Forgot Password Feature** - Send password reset emails  
✅ **Comments System Fixed** - Now properly saves and displays comments  
✅ **Series Structure** - Books organized by series instead of flat list  

### New Features
✅ **Series Organization** - Books grouped into series with cover images  
✅ **Standalone Books Section** - Ready for non-series novels  
✅ **Forgot Password Tab** - Users can reset their passwords  
✅ **Book Cover Display** - Series covers shown on homepage and series page  
✅ **Improved Navigation** - Series → Book → Chapter hierarchy  

## 📚 Current Content

### The Diary You Hold Series
A dark psychological thriller trilogy with:
- **Book 1**: 3 chapters
- **Book 2**: 2 chapters  
- **Book 3**: 1 chapter
- Custom cover image included

## 🚀 Quick Setup

### 1. Your Firebase is Already Configured! ✅

Your Firebase credentials are already in `script.js`:
- Project ID: webbook-9d8ec
- All authentication methods ready

### 2. Complete Firebase Setup

#### Enable Authentication:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your "webbook-9d8ec" project
3. Click **Authentication** → **Get Started**
4. Enable these sign-in methods:
   - ✅ **Email/Password** - Toggle on, Save
   - ✅ **Google** - Toggle on, add support email, Save

#### Create Firestore Database:
1. Click **Firestore Database** → **Create Database**
2. Select **Production Mode**
3. Choose your location → **Enable**

#### Set Security Rules:
1. Go to **Rules** tab in Firestore
2. Copy/paste from `firestore.rules` file
3. Click **Publish**

### 3. Test Locally

Just open `index.html` in your browser - everything works!

### 4. Deploy (Optional)

Upload these files to GitHub Pages or Netlify:
- `index.html`
- `style.css`
- `script.js`
- `assets/` folder (with images)

**Important**: Add your deployment domain to Firebase:
- Firebase Console → Authentication → Settings → Authorized domains
- Add: `yourusername.github.io`

## 🎨 Features

### Authentication
- ✅ Email/Password registration and login
- ✅ Google Sign-In (working!)
- ✅ Forgot Password with email reset
- ✅ GitHub auth button (coming soon)
- ✅ Microsoft auth button (coming soon)

### Content Structure
- **Series View**: Browse all available series
- **Series Page**: See all books in a series with cover
- **Book Page**: View chapters list
- **Chapter Page**: Read with view count and comments
- **Standalone Books**: Section for non-series novels

### Reader Features
- Real-time view tracking per chapter
- Comments system (login required)
- Previous/Next chapter navigation
- Responsive mobile design
- Dark themed reading experience

## 📱 How It Works

### For Readers
1. **Browse Series** - Click a series card on homepage
2. **Select Book** - Choose from series books
3. **Read Chapters** - View count increments automatically
4. **Comment** - Sign in to share thoughts

### For Admins (Adding Content)

Edit the `seriesData` array in `script.js`:

```javascript
const seriesData = [
    {
        id: 1,
        name: "Your Series Name",
        description: "Series description...",
        cover: "assets/images/cover.png",
        books: [
            {
                id: 1,
                title: "Book Title",
                description: "Book description...",
                chapters: [
                    {
                        id: 1,
                        title: "Chapter Title",
                        content: `Chapter text here...`
                    }
                ]
            }
        ]
    }
];
```

## 🔐 Security

Firestore rules ensure:
- Anyone can read chapters and comments
- Only authenticated users can write comments
- Comments are immutable (can't be edited/deleted)
- View counts can only be incremented

## 🐛 Troubleshooting

### Google Sign-In Not Working?
1. Check that Google auth is enabled in Firebase Console
2. Make sure domain is in Authorized domains list
3. Disable popup blockers
4. Clear browser cache

### Comments Not Showing?
1. Make sure Firestore database is created
2. Check that security rules are published
3. Verify user is signed in
4. Check browser console for errors

### Forgot Password Not Sending Email?
1. Verify email address is registered
2. Check spam folder
3. Ensure Email/Password auth is enabled in Firebase

## 📂 File Structure

```
tensura-webbooks/
├── index.html           # Main structure
├── style.css            # Dark theme styling  
├── script.js            # Firebase & functionality
├── firestore.rules      # Database security rules
├── .gitignore           # Git ignore file
└── assets/
    └── images/
        └── diary-you-hold-cover.png
```

## 🎯 Next Steps

1. **Add More Content**: Edit `seriesData` in `script.js`
2. **Customize Design**: Modify colors in `style.css` `:root` section
3. **Add Book Covers**: Place images in `assets/images/`
4. **Enable Analytics**: Firebase Analytics already configured

## 📝 Notes

- Site name: **TENSURA WebBooks**
- Current series: **The Diary You Hold** (psychological thriller)
- All Firebase config is set up and ready
- Mobile-friendly responsive design
- Elegant serif fonts for literary feel

## 🔧 Technical Details

- **Frontend**: Pure HTML/CSS/JavaScript
- **Backend**: Firebase (Auth + Firestore)
- **Authentication**: Email/Password + Google OAuth
- **Database**: Cloud Firestore
- **Hosting**: Static (GitHub Pages, Netlify, etc.)

---

**Ready to use!** Just complete the Firebase setup steps above and open `index.html`.
