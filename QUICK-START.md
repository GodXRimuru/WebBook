# TENSURA WebBooks - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Firebase Console Setup (2 minutes)

1. **Go to Firebase Console:** https://console.firebase.google.com
2. **Select Project:** webbook-9d8ec (already configured)

3. **Enable Authentication Providers:**
   - Click "Authentication" → "Sign-in method"
   - Enable these providers:
     * ✅ Email/Password
     * ✅ Google (will need OAuth setup)
     * ✅ Facebook (will need App ID)
     * ✅ Twitter (will need API keys)
     * ✅ GitHub (will need OAuth app)
     * ✅ Phone (will need SMS configuration)

4. **Add Your Domain:**
   - Go to "Authentication" → "Settings" → "Authorized domains"
   - Click "Add domain"
   - Add your website domain (e.g., `yourname.github.io`)

5. **Deploy Firestore Rules:**
   - Go to "Firestore Database" → "Rules"
   - Copy content from `firestore.rules` file
   - Click "Publish"

6. **Enable Storage:**
   - Go to "Storage" → "Get Started"
   - Use default security rules for now

### Step 2: Deploy Website (2 minutes)

**Option A: GitHub Pages (Recommended)**
```bash
# 1. Create new repository on GitHub
# 2. Upload all files from tensura-webbooks-enhanced/
# 3. Go to Settings → Pages
# 4. Select main branch → Save
# 5. Your site will be at: https://username.github.io/repository-name
```

**Option B: Any Web Host**
```bash
# 1. Upload all files to your web hosting
# 2. Ensure index.html is in the root directory
# 3. Access via your domain
```

### Step 3: Test Everything (1 minute)

1. **Open your website**
2. **Click "Login"** button
3. **Try Email Registration:**
   - Enter email and password
   - Click "Register"
   - You should be logged in!

4. **Test Features:**
   - ✅ Browse books
   - ✅ Read a chapter
   - ✅ Try bookmarking
   - ✅ Leave a comment
   - ✅ Check dashboard

## 🔧 Optional Configurations

### Enable Social Login Providers

#### Google Sign-In:
1. Go to Firebase Console → Authentication → Sign-in method
2. Click Google → Enable
3. Select support email
4. Save

#### Facebook Login:
1. Create Facebook App at https://developers.facebook.com
2. Get App ID and App Secret
3. Add to Firebase Console → Authentication → Facebook
4. Add OAuth redirect URI to Facebook App settings

#### Twitter Login:
1. Create Twitter App at https://developer.twitter.com
2. Get API Key and Secret
3. Add to Firebase Console → Authentication → Twitter
4. Enable 3-legged OAuth

#### GitHub Login:
1. Create OAuth App at https://github.com/settings/developers
2. Get Client ID and Secret
3. Add to Firebase Console → Authentication → GitHub
4. Add callback URL

#### Phone Authentication:
1. Firebase Console → Authentication → Phone
2. Enable phone sign-in
3. Configure reCAPTCHA
4. May require Blaze plan for SMS

### Make Yourself Admin

1. **Sign up on your website**
2. **Get your Firebase UID:**
   - Firebase Console → Authentication → Users
   - Copy your UID
3. **Edit script.js:**
   ```javascript
   const ADMIN_UIDS = ['paste-your-uid-here'];
   ```
4. **Redeploy** and refresh
5. **Access Analytics** from dashboard!

## 🎨 Customize Your Site

### Change Colors:
Edit `style.css` (line 1-34):
```css
:root {
    --accent: #c9a961; /* Gold accent - change to your color */
    --bg-primary: #0a0a0a; /* Dark background */
}
```

### Add Your Content:
Edit `script.js` (line 50-180):
```javascript
const seriesData = [
    {
        id: 1,
        name: "Your Series Name",
        description: "Your description",
        // ... add your books and chapters
    }
];
```

### Add Your Logo:
Replace the title in `index.html` (line 19):
```html
<h1 class="app-title">Your Site Name</h1>
```

## 📱 Mobile Testing

- Open on your phone browser
- Test all authentication methods
- Try highlighting text
- Check dashboard on mobile
- Test portrait and landscape modes

## ⚠️ Troubleshooting

### Issue: "Auth domain not authorized"
**Solution:** Add your domain to Firebase Console → Authentication → Settings → Authorized domains

### Issue: "Popup blocked" error
**Solution:** The app uses redirect method which works better on mobile. Should not see this error.

### Issue: Users not staying logged in
**Solution:** Check that persistence is enabled (already done in script.js). Clear browser cache and try again.

### Issue: Comments not loading
**Solution:** Deploy Firestore rules and create the required indexes in Firebase Console.

### Issue: Avatar upload fails
**Solution:** Enable Firebase Storage and set up proper CORS rules.

## 🎯 What's Working

✅ All authentication providers
✅ Session persistence (stay logged in)
✅ Chapter progress tracking
✅ Bookmarks and highlights
✅ Like/dislike system
✅ Enhanced comments
✅ Reader polls
✅ User profiles with avatars
✅ Reading history
✅ Notifications system
✅ Dashboard with stats
✅ Admin analytics
✅ Responsive mobile design
✅ Enhanced views badge
✅ Offline support

## 🚀 Next Steps

1. **Add your content** to seriesData
2. **Customize colors** to match your brand
3. **Set up all auth providers** you want to use
4. **Make yourself admin** to access analytics
5. **Share your site** with readers!

## 📞 Need Help?

Check the console (F12) for error messages. Most issues are:
- Firebase configuration
- Missing Firestore rules
- Auth provider not enabled
- Domain not authorized

Happy reading! 📚
