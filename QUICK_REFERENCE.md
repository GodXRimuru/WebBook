# Quick Reference Guide

## Common Tasks

### Adding a New OAuth Provider
1. Configure provider in Firebase Console
2. Add provider initialization in `auth-enhanced.js`
3. Add sign-in function
4. Add button in `initializeOAuthButtons()`
5. Add button styles in `features-styles.css`

### Changing Reading Progress Colors
File: `features-styles.css` (line ~75)
```css
.reading-progress-fill {
    background: linear-gradient(90deg, #YOUR_COLOR_1 0%, #YOUR_COLOR_2 100%);
}
```

### Modifying Emoji Reactions
File: `reader-features.js` (line ~180)
```javascript
this.reactions = ['❤️', '🔥', '😭', '🤯', '😈']; // Edit these
```

### Changing Comment Character Limit
File: `index.html` (line ~161)
```html
<textarea id="comment-input" placeholder="..." maxlength="1000"></textarea>
```

File: `firestore-updated.rules` (line ~32)
```javascript
&& request.resource.data.text.size() <= 1000
```

### Adjusting Max Pinned Comments
File: `comment-system.js` (line ~130)
```javascript
if (this.pinnedComments.size >= 3) { // Change 3 to your limit
```

### Removing a Feature Completely

#### Remove OAuth:
- Delete `auth-enhanced.js`
- Remove its script tag from `index.html`

#### Remove View Counter:
- Delete `view-counter.js`
- Remove its script tag
- Remove view counter calls from `script.js`

#### Remove Enhanced Comments:
- Delete `comment-system.js`
- Remove its script tag
- Revert to original comment loading in `script.js`

#### Remove Reader Features:
- Delete `reader-features.js`
- Remove its script tag
- Remove `initializeReaderFeatures()` calls

### Testing Checklist

```bash
# Before committing changes:
□ Test in Chrome
□ Test in Firefox
□ Test in Safari
□ Test on mobile (actual device)
□ Test all OAuth providers
□ Test logged-out experience
□ Test view counter (refresh, new browser)
□ Test comment posting
□ Test spoiler toggle
□ Test bookmark save/remove
□ Test emoji reactions
□ Test progress bar scroll
□ Check browser console for errors
□ Verify Firestore rules prevent unauthorized access
```

### Firebase Console Quick Links

- **Authentication**: https://console.firebase.google.com/project/webbook-9d8ec/authentication
- **Firestore**: https://console.firebase.google.com/project/webbook-9d8ec/firestore
- **Rules**: https://console.firebase.google.com/project/webbook-9d8ec/firestore/rules

### Debugging Tips

#### OAuth Issues:
```javascript
// Add to browser console
firebase.auth().getRedirectResult().then(console.log).catch(console.error);
```

#### View Counter:
```javascript
// Check viewed chapters
console.log(localStorage.getItem('viewedChapters'));

// Check if chapter was viewed
window.viewCounter.hasViewed(1, 1, 1); // seriesId, bookId, chapterId
```

#### Comment System:
```javascript
// Check active listener
console.log(window.commentSystem.commentsListener);

// Check pinned comments
console.log(window.commentSystem.pinnedComments);
```

#### Reader Features:
```javascript
// Check bookmarks
console.log(window.bookmarkManager.bookmarks);

// Check reading progress
console.log(window.progressTracker.getProgress(1, 1, 1));
```

### Performance Optimization

#### Lazy Load Features:
Instead of loading all features on page load, load them when needed:
```javascript
// In script.js, only load reader features when on chapter page
if (pageId === 'chapter-page' && currentUser) {
    if (!window.readerFeaturesLoaded) {
        const script = document.createElement('script');
        script.src = 'reader-features.js';
        document.body.appendChild(script);
        window.readerFeaturesLoaded = true;
    }
}
```

#### Reduce Firestore Reads:
```javascript
// Cache chapter data locally
const cacheKey = `chapter_s${seriesId}_b${bookId}_c${chapterId}`;
const cached = sessionStorage.getItem(cacheKey);
if (cached) {
    return JSON.parse(cached);
}
// ... fetch from Firestore and cache
```

### Security Best Practices

1. **Never expose API keys in client code** - Firebase allows this for web
2. **Use Firestore rules** - Don't rely on client-side validation alone
3. **Validate all inputs** - Both client and server (Firestore rules)
4. **Rate limit** - Use Firebase App Check for production
5. **Monitor usage** - Check Firebase Console regularly

### Common Errors & Solutions

| Error | Solution |
|-------|----------|
| "popup_blocked_by_browser" | Add site to allowed pop-ups |
| "Missing permissions" | Update Firestore rules |
| "Index required" | Create index via link in console error |
| "Network error" | Check Firebase config is correct |
| "Auth domain not authorized" | Add domain in Firebase Console |

### Code Snippets

#### Add Custom User Role Check:
```javascript
// In firestore rules
function isAdmin() {
    return isAuthenticated() && 
           get(/databases/$(database)/documents/admins/$(request.auth.uid)).data.isAdmin == true;
}
```

#### Display User's Reading Stats:
```javascript
async function getUserStats() {
    if (!currentUser) return null;
    
    const views = await db.collection('userViews')
        .where('userId', '==', currentUser.uid)
        .get();
    
    const bookmarks = await db.collection('bookmarks')
        .where('userId', '==', currentUser.uid)
        .get();
    
    return {
        chaptersRead: views.size,
        bookmarksCount: bookmarks.size
    };
}
```

#### Export User Data (GDPR):
```javascript
async function exportUserData() {
    if (!currentUser) return;
    
    const collections = ['comments', 'bookmarks', 'highlights', 'userViews', 'chapterReactions'];
    const userData = {};
    
    for (const collection of collections) {
        const snapshot = await db.collection(collection)
            .where('userId', '==', currentUser.uid)
            .get();
        userData[collection] = snapshot.docs.map(doc => doc.data());
    }
    
    // Download as JSON
    const blob = new Blob([JSON.stringify(userData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-data.json';
    a.click();
}
```

### Monitoring & Analytics

#### Track Feature Usage:
```javascript
// Add to each feature function
function trackFeatureUse(featureName) {
    db.collection('analytics').add({
        feature: featureName,
        userId: currentUser?.uid || 'anonymous',
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
}

// Usage
trackFeatureUse('bookmark_added');
trackFeatureUse('comment_posted');
```

#### View Most Popular Chapters:
```javascript
async function getPopularChapters(limit = 10) {
    const snapshot = await db.collection('chapters')
        .orderBy('views', 'desc')
        .limit(limit)
        .get();
    
    return snapshot.docs.map(doc => ({
        id: doc.id,
        views: doc.data().views
    }));
}
```
