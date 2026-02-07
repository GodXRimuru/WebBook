# TENSURA WebBooks - FIXED VERSION

## What's Fixed in This Version

### 🔧 Major Fixes

1. **Login UI Fixed** 
   - Login modal now properly appears centered on screen
   - Fixed z-index issues preventing modal from showing correctly
   - Improved modal overlay positioning
   - Fixed issue where login UI appeared at bottom of page

2. **Password Reset Working**
   - Firebase password reset email functionality fully implemented
   - "Forgot Password?" link now shows reset form properly
   - Reset form has better visibility and styling
   - Users receive email with password reset link

3. **Comments System Completely Rebuilt**
   - New `comment-system-fixed.js` replaces old comment system
   - Fixed real-time loading issues
   - Better error handling for Firestore index errors
   - Fallback mechanisms when indexes aren't ready
   - Improved comment rendering and display
   - All comments now load reliably

4. **Views Counter Enhanced**
   - More eye-catching design with accent color
   - Better positioning and visibility
   - Styled badge with border and background
   - Hover effects for better UX

5. **All Console Errors Fixed**
   - Better error handling throughout
   - Graceful fallbacks for missing features
   - Proper initialization checks
   - Fixed async/await issues

## 📧 Support Email Setup

### For Terms of Service, Privacy Policy, and Data Deletion

You need to create a support email address. Here are your options:

#### Option 1: Gmail (Recommended - Free)
1. Go to https://accounts.google.com/signup
2. Create a new Gmail account like:
   - `tensura.support@gmail.com`
   - `tensurabooks.help@gmail.com`
   - `webbooks.support@gmail.com`

#### Option 2: Professional Email (Paid)
Use a custom domain email like `support@tensurabooks.com`

- Providers: Google Workspace, Microsoft 365, Zoho Mail
- Cost: ~$6/month

#### Option 3: Privacy-Focused (Free)
- ProtonMail: https://proton.me/mail
- Tutanota: https://tutanota.com

### Where to Add Support Email

Once you create your support email, update it in these files:

1. **terms.html** (line ~50-60)
   - Find: `support@tensurabooks.com`
   - Replace with your actual support email

2. **privacy.html** (line ~70-80)
   - Find: `support@tensurabooks.com`
   - Replace with your actual support email

3. **data-deletion.html** (line ~40-50)
   - Find: `support@tensurabooks.com`
   - Replace with your actual support email

### Email Template for Support

When users contact you, here's a template response:

```
Subject: Re: [Their Subject]

Hello,

Thank you for contacting TENSURA WebBooks support.

[Your response here]

If you need immediate assistance, please ensure you include:
- Your email address associated with your account
- Nature of your request
- Any relevant screenshots

Best regards,
TENSURA WebBooks Team
support@[yourdomain].com
```

## 🚀 Installation Instructions

### 1. Extract Files
Extract all files from this ZIP to your project folder.

### 2. Update Firebase Config (if needed)
The Firebase configuration is already set in `script.js`. If you need to use a different Firebase project:

```javascript
// In script.js, update these values:
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

### 3. Firebase Setup

#### Enable Authentication Methods:
1. Go to Firebase Console → Authentication → Sign-in method
2. Enable:
   - Email/Password ✅
   - Google (optional)
   - GitHub (optional)
   - Facebook (optional)
   - Twitter (optional)

#### Password Reset Email:
Firebase handles this automatically! When users click "Forgot Password?" and enter their email, Firebase sends them a reset link.

To customize the email template:
1. Go to Firebase Console → Authentication → Templates
2. Click "Password reset"
3. Customize the email template
4. Save changes

### 4. Firestore Setup

#### Create Collections:
```
comments/
  - seriesId (string)
  - bookId (string)
  - chapterId (string)
  - authorEmail (string)
  - text (string)
  - isSpoiler (boolean)
  - timestamp (timestamp)

pinnedComments/
  - commentIds (array)
  - updatedAt (timestamp)

chapters/
  - views (number)
  - likes (number)
  - dislikes (number)

userReactions/
  - userId (string)
  - type (string: 'like' or 'dislike')
  - timestamp (timestamp)
```

#### Create Indexes:
Go to Firestore → Indexes → Create index:

1. **Comments Index**:
   - Collection: `comments`
   - Fields:
     - seriesId: Ascending
     - bookId: Ascending
     - chapterId: Ascending
     - timestamp: Descending

2. **User Reactions Index**:
   - Collection: `userReactions`
   - Fields:
     - chapterId: Ascending
     - userId: Ascending

### 5. Deploy

#### GitHub Pages:
1. Push all files to your GitHub repository
2. Go to Settings → Pages
3. Source: Deploy from branch (main)
4. Save

#### Other Hosting:
- Netlify: Drag and drop folder
- Vercel: Import from Git
- Firebase Hosting: `firebase deploy`

## 📝 File Structure

```
tensura-fixed-complete/
├── index.html                    # Main HTML file
├── style.css                     # Main styles (UPDATED)
├── script.js                     # Core functionality (UPDATED)
├── auth-enhanced.js              # OAuth authentication
├── comment-system-fixed.js       # NEW - Fixed comment system
├── view-counter.js               # View tracking
├── reader-features.js            # Reading progress
├── features-styles.css           # Feature-specific styles
├── firestore.rules               # Security rules
├── terms.html                    # Terms of service
├── privacy.html                  # Privacy policy
├── data-deletion.html            # Data deletion policy
├── legal-style.css               # Legal pages styles
└── assets/
    └── images/
        └── [cover images]
```

## 🎨 Customization

### Changing Colors:
Edit CSS variables in `style.css`:
```css
:root {
    --accent: #c9a961;           /* Main accent color */
    --accent-hover: #d4b677;     /* Hover state */
    --bg-primary: #0a0a0a;       /* Background */
    --text-primary: #e8e8e8;     /* Text color */
}
```

### Adding More Books:
Edit `seriesData` array in `script.js`:
```javascript
const seriesData = [
    {
        id: 1,
        name: "Series Name",
        description: "Description...",
        cover: "assets/images/cover.png",
        books: [
            {
                id: 1,
                title: "Book Title",
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

## 🔒 Security

### Firestore Rules:
The `firestore.rules` file contains security rules. Make sure to deploy them:
```bash
firebase deploy --only firestore:rules
```

### API Keys:
The Firebase API key in the code is safe to expose publicly. Firebase security is enforced through Firestore rules and Authentication settings.

## 🐛 Troubleshooting

### Comments Not Loading:
1. Check browser console for errors
2. Verify Firestore indexes are created
3. Make sure you're signed in
4. Check Firestore rules allow read access

### Password Reset Not Working:
1. Verify Email/Password auth is enabled in Firebase
2. Check spam folder for reset email
3. Verify email template is configured in Firebase Console

### Login Modal Not Appearing:
- Clear browser cache
- Check browser console for JavaScript errors
- Verify all script files are loading

### Views Not Incrementing:
1. Check Firestore rules allow write access
2. Verify `chapters` collection exists
3. Check browser console for errors

## 📱 Mobile Optimization

The site is fully responsive and works on:
- ✅ Mobile phones (iOS/Android)
- ✅ Tablets
- ✅ Desktop browsers
- ✅ Chrome, Firefox, Safari, Edge

## 🆘 Getting Help

### Common Issues:

**Q: How do I reset a user's password as admin?**
A: Go to Firebase Console → Authentication → Users → Click user → Reset password

**Q: How do I delete a comment?**
A: Comments can only be managed by their author. For admin deletion, use Firebase Console → Firestore → Find and delete the comment document

**Q: How do I backup my data?**
A: Firebase Console → Firestore → Import/Export → Export to Google Cloud Storage

**Q: How many users can I have?**
A: Firebase Spark (free) plan: 50,000 reads/day, 20,000 writes/day

## 📈 Analytics

To add Google Analytics:
1. Create GA4 property
2. Add tracking code to `index.html` before `</head>`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 📄 License

This project is for personal/commercial use. Modify as needed.

## ✨ Credits

Built with:
- Firebase (Authentication, Firestore)
- Vanilla JavaScript
- CSS3
- HTML5

---

**Version**: Fixed Complete v2.0  
**Last Updated**: February 2026  
**Status**: Production Ready ✅
