# Installation Guide - TENSURA WebBooks Fixed Version

## Quick Start

1. **Download all files** from the `tensura-webbooks-fixed` folder
2. **Upload to your web server** (GitHub Pages, Netlify, Firebase Hosting, etc.)
3. **Verify Firebase configuration** is correct in `script.js` (lines 4-12)
4. **Done!** Your site should now work with all fixes applied

## Detailed Setup

### Step 1: Prepare Your Files

Download/extract all files from the fixed version:
```
tensura-webbooks-fixed/
├── index.html (main page)
├── style.css (main stylesheet)
├── script.js (main functionality)
├── legal-style.css (legal pages stylesheet)
├── privacy.html
├── terms.html
├── data-deletion.html
├── firestore.rules
├── assets/
│   └── images/
│       └── (all your book covers and images)
└── README-FIXES.md (this file)
```

### Step 2: Firebase Setup

If you haven't already set up Firebase:

1. Go to https://console.firebase.google.com/
2. Select your project (or create a new one)
3. Enable Authentication:
   - Go to Authentication → Sign-in method
   - Enable "Email/Password"
   - Enable "Google"
   - Add your website domain to "Authorized domains"
4. Enable Firestore:
   - Go to Firestore Database
   - Create database in production mode
   - Deploy the firestore.rules file
5. Get your Firebase config and update `script.js` lines 4-12

### Step 3: Deploy to Firebase Hosting (Recommended)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize in your project folder
firebase init

# Select:
# - Firestore
# - Hosting

# Deploy
firebase deploy
```

### Step 4: Alternative Deployment Options

#### GitHub Pages:
1. Create a new repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select main branch as source
5. Save and wait for deployment

#### Netlify:
1. Drag and drop the entire folder to Netlify
2. Or connect your GitHub repository
3. Netlify will auto-deploy

### Step 5: Verify Everything Works

1. **Open your website**
2. **Test Login**:
   - Click "Login" button in header
   - Try registering with email/password
   - Try Google sign-in
   - Test "Forgot Password" link
3. **Test Comments**:
   - Navigate to any chapter
   - Post a comment
   - Verify it appears after a moment
4. **Test Footer**:
   - Click Privacy Policy, Terms, Data Deletion links
   - Verify they open and have matching design
   - Click "Back to TENSURA WebBooks" on each page
5. **Test Mobile**:
   - Open on phone
   - Test login modal (should show vertical layout)
   - Verify all features work

## Troubleshooting

### Comments not appearing:
- Check browser console for errors
- Verify Firestore rules are deployed
- Check Firebase console → Firestore to see if data is being saved
- Make sure you're logged in when posting

### Login not working:
- Verify Firebase config in script.js matches your project
- Check that Email/Password auth is enabled in Firebase Console
- For Google sign-in: Verify your domain is in Authorized domains list
- Check browser console for specific error messages

### Modal not showing correctly:
- Clear browser cache
- Verify style.css is loading properly
- Check for JavaScript errors in console

### Legal pages look wrong:
- Verify legal-style.css is in the same directory
- Check that the `<link>` tags in HTML point to correct file
- Clear browser cache

## Common Issues

**Issue**: "auth/unauthorized-domain" error
**Solution**: Add your domain to Firebase Console → Authentication → Settings → Authorized domains

**Issue**: Modal doesn't toggle between Login/Register
**Solution**: Clear browser cache, ensure style.css is fully loaded

**Issue**: Footer not showing
**Solution**: Check that index.html has the footer HTML section (should be before closing </body>)

**Issue**: Images not loading
**Solution**: Verify assets/images folder is uploaded with all images

## File Structure Requirements

Important: Maintain this exact structure:
```
website-root/
├── index.html
├── style.css
├── script.js
├── legal-style.css
├── privacy.html
├── terms.html
├── data-deletion.html
└── assets/
    └── images/
        ├── diary-you-hold-cover.png
        └── (other images)
```

## Security Notes

1. **Never commit Firebase config with sensitive keys to public repos**
2. **Use Firestore security rules** (provided in firestore.rules)
3. **Enable reCAPTCHA** in Firebase Console for production
4. **Regularly update Firebase SDK** versions
5. **Monitor Firebase usage** to detect anomalies

## Performance Tips

1. **Enable compression** on your web server
2. **Use CDN** for faster asset loading
3. **Optimize images** in assets folder (compress PNGs/JPGs)
4. **Enable caching** for static assets
5. **Consider lazy loading** for chapter content

## Customization

### Change Colors:
Edit CSS variables in `style.css` (lines 1-30):
```css
--accent: #c9a961; /* Gold color */
--bg-primary: #0a0a0a; /* Main background */
```

### Add More Authentication Methods:
1. Enable in Firebase Console
2. Add button to modal in index.html
3. Add handler in script.js (similar to Google auth)

### Modify Legal Pages:
Just edit the HTML files (privacy.html, terms.html, data-deletion.html)

## Support

For issues specific to this fixed version, check:
1. README-FIXES.md for list of what was changed
2. Browser console for error messages
3. Firebase Console for authentication/database errors

## Credits

- Original TENSURA WebBooks by GodxRimuru
- Fixes and redesign by Claude
- Login design inspiration from community templates
