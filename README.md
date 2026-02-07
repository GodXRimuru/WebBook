# TENSURA WebBooks - Fixed Production Version

A modern web-based reading platform with authentication, comments, reactions, and admin features.

## ✨ What's New in This Version

This is the **FIXED** production version with the following improvements:

✅ **Login/Register UI**: Completely redesigned for mobile and desktop  
✅ **Footer Layout**: Fixed positioning and styling  
✅ **Comment System**: Added retry logic, better error handling  
✅ **Storage Migration**: Replaced Firebase Storage with Supabase  
✅ **Admin Panel**: Fixed visibility for admin users  
✅ **Mobile Experience**: Improved responsive design throughout  

## 🚀 Quick Start

1. **Clone/Download** this repository
2. **Setup Supabase** (see SETUP-GUIDE.md)
3. **Update** `supabase-config.js` with your credentials
4. **Deploy** to GitHub Pages
5. **Done!** Your site is live

## 📋 Prerequisites

- GitHub account (for hosting)
- Firebase project (already configured)
- Supabase account (free tier is fine)
- Basic understanding of web development

## 🔧 Setup Instructions

Detailed setup instructions are in **[SETUP-GUIDE.md](SETUP-GUIDE.md)**

Quick overview:
1. Create Supabase project
2. Create `avatars` bucket (public)
3. Apply SQL policies
4. Update configuration files
5. Deploy to GitHub Pages

## 📁 Project Structure

```
├── index.html                      # Main page
├── admin-enhanced.html            # Admin panel
├── style.css                      # Main styles (FIXED)
├── script.js                      # Main logic
├── supabase-config.js            # Supabase setup (UPDATE THIS!)
├── user-profile.js               # Profiles with Supabase
├── comment-system-fixed-final.js # Comments (FIXED)
└── SETUP-GUIDE.md                # Complete setup guide
```

## 🎯 Features

### User Features
- 📖 Read books and chapters
- 👍 Like/Dislike chapters
- 💬 Comment system with spoiler tags
- 👤 User profiles with avatars
- 🔐 Firebase authentication (email, Google, GitHub, etc.)

### Admin Features
- 📌 Pin important comments
- 🗑️ Delete inappropriate comments
- 🎨 Admin badge on comments
- 🔧 Admin panel access

### Technical Features
- 📱 Fully responsive design
- 🖼️ WebP image conversion
- 🔄 Real-time comment updates
- ⚡ Fast CDN-powered assets
- 🔒 Secure Supabase storage

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Storage**: Supabase Storage (for avatars)
- **Hosting**: GitHub Pages

## 📝 Configuration

### Admin Emails
Edit `script.js` (lines 33-38):
```javascript
const ADMIN_EMAILS = [
    'your-admin@gmail.com',
    // Add more...
];
```

### Supabase
Edit `supabase-config.js`:
```javascript
const SUPABASE_URL = 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key';
```

## 🐛 Troubleshooting

### Login modal broken?
- Clear cache and reload
- Check that `style.css` loaded correctly
- Verify mobile viewport settings

### Admin panel not showing?
- Ensure you're logged in with admin email
- Check console for "Admin check" logs
- Verify email matches exactly in ADMIN_EMAILS

### Avatar upload failing?
- Check Supabase bucket is PUBLIC
- Verify SQL policies are applied
- Check credentials in `supabase-config.js`

### Comments not loading?
- Click the retry button
- Check internet connection
- Verify Firestore rules allow read access

## 📄 Documentation

- **[SETUP-GUIDE.md](SETUP-GUIDE.md)**: Complete setup instructions
- **[CHANGELOG.md](CHANGELOG.md)**: Detailed list of changes
- **[supabase-storage-policies.sql](supabase-storage-policies.sql)**: SQL policies

## 🔒 Security

- ✅ Supabase RLS policies for storage
- ✅ Firebase security rules for Firestore
- ✅ No delete permission on avatars
- ✅ Admin-only features properly gated
- ✅ XSS protection on comments

## 📱 Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅
- Mobile browsers ✅

## 🤝 Contributing

This is a fixed production version. For bug reports:
1. Check existing issues
2. Provide browser/device info
3. Include console errors
4. Describe steps to reproduce

## 📜 License

This project is provided as-is for educational and personal use.

## 🙏 Credits

- Firebase by Google
- Supabase
- Font: Cormorant Garamond, Crimson Pro

## 📞 Support

If you need help:
1. Read SETUP-GUIDE.md thoroughly
2. Check browser console for errors  
3. Verify all configuration is correct
4. Test on different browsers

---

**Made with ❤️ for web novel readers**

For detailed changes, see [CHANGELOG.md](CHANGELOG.md)  
For setup help, see [SETUP-GUIDE.md](SETUP-GUIDE.md)
