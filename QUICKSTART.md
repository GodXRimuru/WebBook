# 🚀 QUICK START GUIDE

## ⚡ Get Your Site Running in 5 Minutes

### Step 1: Create Support Email (2 minutes)

1. Go to https://gmail.com
2. Click "Create account"
3. Create email like: `tensurabooks.support@gmail.com`
4. Save the login details somewhere safe!

### Step 2: Update Support Email in Files (1 minute)

Open these 3 files and replace `support@tensurabooks.com` with your new email:

1. **terms.html** - Find and replace the email
2. **privacy.html** - Find and replace the email  
3. **data-deletion.html** - Find and replace the email

### Step 3: Upload to GitHub Pages (2 minutes)

#### If you already have a GitHub account:
1. Go to https://github.com/new
2. Name it: `tensura-webbooks`
3. Make it Public
4. Upload ALL the files from this ZIP
5. Go to Settings → Pages
6. Source: Deploy from main branch
7. Click Save
8. Your site will be live at: `https://[your-username].github.io/tensura-webbooks/`

#### Don't have GitHub?
Use Netlify instead (even easier!):
1. Go to https://www.netlify.com
2. Sign up (free)
3. Drag and drop this entire folder onto Netlify
4. Done! Your site is live!

## ✅ What's Already Done For You

- ✅ Firebase is set up and configured
- ✅ Authentication is ready (Google, GitHub, Facebook, Twitter)
- ✅ Comments system works
- ✅ View counter works
- ✅ Password reset emails work (handled by Firebase)
- ✅ All bugs are fixed
- ✅ Mobile responsive design
- ✅ Legal pages (Terms, Privacy, Data Deletion)

## 🎯 What You Need to Do

### Must Do (Required):
1. ✅ Create support email
2. ✅ Update support email in 3 files (terms.html, privacy.html, data-deletion.html)
3. ✅ Upload to hosting (GitHub Pages/Netlify)

### Should Do (Recommended):
4. ⚠️ Add your own book content (edit `seriesData` in script.js)
5. ⚠️ Add your book cover images to `assets/images/`
6. ⚠️ Customize colors in `style.css` if desired

### Can Do (Optional):
7. 💡 Add Google Analytics
8. 💡 Set up custom domain
9. 💡 Customize email templates in Firebase Console

## 📧 Firebase Password Reset - BUILT IN!

**Good news**: Firebase handles password reset emails automatically!

When users click "Forgot Password?":
1. They enter their email
2. Firebase sends them a password reset link
3. They click the link in email
4. They set a new password
5. Done!

### To Customize Reset Email:
1. Go to https://console.firebase.google.com
2. Select your project (webbook-9d8ec)
3. Authentication → Templates
4. Click "Password reset"
5. Edit the template
6. Add your app name/logo
7. Save

**No coding needed! Firebase does everything for password reset!**

---

See README-FIXES.md for complete documentation.
