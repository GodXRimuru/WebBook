// ==========================================
// FIREBASE CONFIGURATION
// ==========================================
const firebaseConfig = {
    apiKey: "AIzaSyCOPC2hi_P4F_8SdkpLOncymuGkgBQ5rJY",
    authDomain: "webbook-9d8ec.firebaseapp.com",
    projectId: "webbook-9d8ec",
    storageBucket: "webbook-9d8ec.firebasestorage.app",
    messagingSenderId: "744179746502",
    appId: "1:744179746502:web:730b71902076c43a5679c7",
    measurementId: "G-SW8CDMNDGY"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ==========================================
// DATA STRUCTURE
// ==========================================

const booksData = [
    {
        id: 1,
        title: "The Diary You Hold",
        description: "When Emily finds her husband's secret diary, she discovers that the man she married is not who she thought he was. Each page reveals a darker truth, and every revelation brings her closer to a terrifying question: Is she the victim or the villain?",
        chapters: [
            {
                id: 1,
                title: "The Discovery",
                content: `The diary was leather-bound, tucked beneath a loose floorboard in our bedroom closet. I wasn't snooping—at least, that's what I told myself. I was looking for the Christmas decorations, the ones Mark swore he'd stored there last January. Instead, my fingers found smooth leather where there should have been cardboard boxes.

I should have stopped. I should have pushed it back into its hiding place and pretended I'd never found it. But curiosity is a powerful thing, especially when you've been married for seven years and you think you know every corner of your spouse's mind.

The first entry was dated three years ago. Three years. I opened to a random page, my hands trembling as I read his handwriting—familiar yet suddenly foreign.

"She doesn't know what I've done. She smiles at me every morning, makes me coffee, asks about my day. Sometimes I wonder if she suspects anything. But then I see that look in her eyes, that complete trust, and I know I'm safe. For now."

My blood ran cold. What had he done? What secret was so terrible that he needed to hide it beneath our bedroom floor? I flipped through more pages, my heart pounding so hard I could hear it in my ears.

Each entry was worse than the last. References to "the incident" and "what happened that night." Mentions of someone named Sarah—a name I'd never heard him speak. And then, on a page near the end, something that made my stomach drop:

"I saw Emily looking at me differently today. Just for a moment, I thought she knew. But she can't know. No one can ever know what I did to her sister."

I dropped the diary. My sister Rachel had died five years ago. They said it was an accident. A tragic fall down the stairs in her apartment. Mark had been so supportive, so loving during my grief. He'd held me while I cried, helped me plan the funeral, never left my side.

The diary sat on the floor, its pages spread open like a confession waiting to be read. I picked it up again with shaking hands. I had to know the truth. I had to know what my husband had done.

And as I read on, I realized that the truth was far more terrible than I could have ever imagined.`
            },
            {
                id: 2,
                title: "The First Lie",
                content: `I couldn't sleep that night. Mark lay beside me, breathing softly, completely oblivious to the fact that I'd discovered his darkest secret. Every time I closed my eyes, I saw Rachel's face—her bright smile, her laugh, the way she'd always looked out for me.

We'd been close once, Rachel and I. Inseparable as children, best friends through college. But something had changed in the months before she died. She'd grown distant, stopped returning my calls, made excuses whenever I suggested we meet. At the time, I'd thought she was just busy with work, her new promotion demanding all her attention.

Now I wondered if there was another reason.

The diary was hidden in my car now, wrapped in a grocery bag and shoved under the passenger seat. I couldn't risk Mark finding it disturbed, couldn't let him know I'd discovered his hiding place. But I needed to read more. I needed to understand what had happened between him and Rachel.

The next morning, I made breakfast like always. Scrambled eggs, toast, fresh coffee. Mark came downstairs at seven-thirty sharp, kissed my cheek, asked if I'd slept well. I lied and said I had.

"You seem distracted," he said, studying my face over his coffee cup.

My heart skipped. "Just tired. Didn't sleep great."

"Bad dreams?"

"Something like that."

He reached across the table, took my hand. His touch, once comforting, now made my skin crawl. "You know you can talk to me about anything, right? We don't keep secrets."

The irony was almost too much. I forced a smile. "I know."

After he left for work, I sat in my car in the garage and opened the diary again. My hands were steadier today, my resolve harder. I needed to know everything.

I found the entries about Rachel quickly enough. They started innocuously—mentions of running into her at a coffee shop, a conversation at a party. But then the tone changed.

"She knows too much. I can see it in her eyes when she looks at me. Emily's so trusting, so naive, but Rachel sees through me. She's always been the smart one, the protective one. I need to do something before she ruins everything."

My vision blurred with tears. Rachel had known. She'd seen something in Mark that I'd been blind to. And she'd paid for that knowledge with her life.

I kept reading, page after page, as the morning turned to afternoon. The entries grew darker, more detailed. Plans and considerations. Ways to make it look like an accident. The calculations of a man who'd decided that murder was preferable to exposure.

And then, the entry from the day she died:

"It's done. She's gone. The police are calling it an accident, just like I knew they would. Emily is devastated, and I'm playing the supportive husband perfectly. She has no idea I was the last person to see her sister alive. She has no idea I pushed."

The diary fell from my hands. I sat in the dark garage, my world crumbling around me. My husband was a murderer. And I'd been sharing his bed for three years since he'd killed my sister.

The question now was: what was I going to do about it?`
            },
            {
                id: 3,
                title: "Reflections in Darkness",
                content: `Three days passed. Three days of pretending everything was normal. Three days of sitting across from a killer at dinner, lying beside him at night, accepting his kisses and his lies.

I was living in a horror movie, except I couldn't turn it off or walk away. This was my life now, a nightmare I couldn't wake from.

The diary had become my obsession. I read it during my lunch breaks at work, in parking lots, anywhere Mark wouldn't find me. Each entry revealed another layer of deception, another carefully constructed lie. Our entire relationship was built on a foundation of murder and manipulation.

I learned things I'd never suspected. The "business trip" to Seattle when we were dating? He'd been visiting a woman he'd met online, testing whether he could maintain multiple relationships without getting caught. The promotion at work he'd been so proud of? He'd sabotaged his colleague to get it, planting evidence of fraud that had gotten the man fired.

Mark wasn't just a murderer. He was a predator, a man who viewed other people as obstacles or tools to be used and discarded.

And I'd married him.

"You've been acting strange lately," Mark said one evening. We were sitting in the living room, me with a book I wasn't reading, him watching some crime documentary. The irony wasn't lost on me.

"I'm fine," I said automatically.

"You're not fine. You barely talk to me anymore. You flinch when I touch you." He muted the TV, turned to face me fully. "Did I do something wrong?"

Yes, I wanted to scream. You killed my sister. You've been lying to me for years. You're a monster.

Instead, I said, "I've just been stressed at work. The Morrison account is demanding."

He studied me for a long moment, and I saw something flicker in his eyes. Suspicion? Doubt? "You know you can tell me anything, right? We're a team."

"I know."

"Because if something was bothering you, really bothering you, I'd want to help. I'd want to fix it." His tone was gentle, concerned, but there was an edge to it that made my blood run cold. "That's what husbands do. They protect their wives. They keep them safe."

The implied threat hung in the air between us. I forced myself to meet his eyes, to smile. "I appreciate that. Really. But I'm okay. Just tired."

He nodded slowly, but I could see he didn't believe me. Mark had always been perceptive, always able to read people. It's what made him so good at his job, so successful at manipulating everyone around him. And now that skill was turned on me.

That night, I lay awake listening to him breathe. How long until he figured it out? How long until he realized I knew the truth? And when he did, would I end up like Rachel—another "accident," another tragedy for people to mourn?

I needed a plan. I needed evidence beyond the diary, something that would convince the police. Because if I went to them with just a handwritten journal, Mark would talk his way out of it. He'd say I was mentally unstable, grief-stricken, imagining things. He'd been so supportive after Rachel's death, after all. Everyone knew what a wonderful husband he was.

No, I needed more. I needed proof that couldn't be dismissed or explained away.

And I needed to be very, very careful.

Because the man sleeping beside me had killed before. And he wouldn't hesitate to do it again.`
            }
        ]
    },
    {
        id: 2,
        title: "The Truth You Stayed For",
        description: "Six months after discovering Mark's diary, Emily has been playing the perfect wife while secretly building her case. But when she finds evidence that Rachel might still be alive, everything she thought she knew shatters. The truth is never simple, and revenge comes with a price.",
        chapters: [
            {
                id: 1,
                title: "The Email",
                content: `The email arrived on a Tuesday morning at 3:47 AM. I know the exact time because I was awake, as I'd been most nights since finding the diary. Insomnia had become my constant companion, along with paranoia and a growing sense of dread.

The sender was listed as "RLovesE@protonmail.com" and the subject line read: "I'm sorry."

My hands trembled as I clicked it open.

"Emily, it's me. I know you think I'm dead. I need you to know the truth. Meet me at the old warehouse on Pier 49 tonight at midnight. Come alone. Don't tell Mark. Please, Em. Trust me one more time. -R"

Rachel's nickname for me. Em. Only she called me that.

I stared at the screen until the words blurred. This couldn't be real. Rachel was dead. I'd been to her funeral, watched them lower her casket into the ground, spent three years grieving her loss. The diary had confirmed it—Mark had killed her.

Hadn't he?

But what if he'd lied, even in his private writings? What if the diary was another manipulation, another layer to his deception? My mind raced through possibilities, each more terrible than the last.

I should have deleted the email. Should have gone to the police, shown them everything I'd gathered over the past six months. Instead, I found myself planning how to sneak out of the house at midnight without Mark noticing.

Because if there was even a chance—the smallest possibility—that Rachel was alive, I had to know.`
            },
            {
                id: 2,
                title: "Midnight Rendezvous",
                content: `The warehouse loomed before me, dark and abandoned, exactly the kind of place where horror movies reach their climax. I sat in my car for five minutes, watching the shadows, looking for any sign of movement. This was a trap. It had to be. Either Mark had discovered my investigation and this was his way of dealing with me, or someone else was playing a cruel game.

But I got out of the car anyway.

The warehouse door was unlocked, creaking open to reveal a cavernous space lit by a single bulb hanging from the ceiling. And beneath that light, sitting on a metal folding chair, was Rachel.

Or someone who looked exactly like her.

"Em." Her voice broke. "You came."

I couldn't move, couldn't speak. She stood, took a step toward me, and I saw it wasn't a trick of the light or my imagination. It was really her. Older, thinner, with shorter hair and shadows under her eyes, but unmistakably my sister.

"You're dead," I whispered.

"I'm sorry. I'm so sorry." Tears streamed down her face. "I had to let you think that. It was the only way to keep you safe."

"Safe from what? From Mark?" The words tumbled out. "I found his diary, Rachel. I know what he did to you. Or what he thought he did."

She closed her eyes. "The diary. God, I'd hoped you'd never find that."

"He wrote that he pushed you. That he killed you."

"He tried." Rachel touched her side, and I saw her wince. "He pushed me down those stairs, left me for dead. But I survived. Barely. And when I woke up in the hospital, I realized something: if Mark thought I was dead, I had a chance to disappear. To get away from him and keep you safe in the process."

"Keep me safe? Rachel, I married him! I've been living with him for seven years!"

"I know. And I've been watching, waiting for the right time to tell you the truth. But Em, it's so much worse than you think. Mark isn't just a murderer. He's part of something bigger, something dangerous. The diary you found—that's just the surface."

My legs gave out. I sat down hard on the concrete floor. "What are you talking about?"

Rachel knelt beside me. "That's why I needed to see you tonight. Because Mark knows. He's known for weeks that you have the diary. And he's been playing you, letting you think you're the one in control while he plans his next move."

"No. I've been careful. I've—"

"He's always been ten steps ahead of us, Em. Always." She gripped my hands. "But now we have a chance. Together, we can take him down. But you need to trust me. You need to do exactly what I say."

I looked into my sister's eyes, the eyes I'd thought I'd never see again, and made a choice that would change everything.

"What do we do?"

Rachel smiled, but it didn't reach her eyes. "First, you need to understand what Mark really is. And why the truth you've been looking for is actually the least of your problems."`
            }
        ]
    },
    {
        id: 3,
        title: "It Was Never Missing",
        description: "The final book in the trilogy reveals that Emily, Mark, and Rachel are all pawns in a much larger game. What Emily thought was Mark's diary was actually her own—a record of blackouts and actions she can't remember. The monster she's been hunting was inside her all along.",
        chapters: [
            {
                id: 1,
                title: "The Realization",
                content: `Dr. Sarah Chen sat across from me, her expression carefully neutral as I finished my story. The diary lay on her desk between us, the leather now worn from my constant handling over the past year.

"Emily," she said gently, "do you know why your husband brought you to me?"

"Because he thinks I'm crazy. But I'm not. Everything in that diary is true. Mark killed Rachel—or tried to. She's alive and—"

"There is no Rachel, Emily."

The words hit me like a physical blow. "What?"

Dr. Chen opened a file on her computer, turned the screen toward me. Medical records. Police reports. Death certificates. All bearing my name.

"You're an only child, Emily. You've always been an only child. Rachel is a dissociative identity you created after a traumatic event when you were seventeen."

"No. No, that's not true. I have memories of her. Childhood memories. We were best friends."

"Those memories are real to you, I don't doubt that. But Emily, the person you remember as Rachel is actually you. A part of you that split off to protect you from something you couldn't process."

I shook my head, but Dr. Chen continued, her voice calm and clinical.

"The diary you found isn't Mark's. It's yours. You've been writing in it during dissociative episodes for the past three years. Mark didn't kill Rachel. You are Rachel. And Emily. And sometimes, you're someone else entirely—someone who's done things that would terrify you if you remembered them."

"I don't believe you."

"I know. But let me show you something." She pulled out her phone, scrolled through until she found a video. "This is from a session three months ago. Watch."

The video showed me sitting in this same chair. But I wasn't moving like myself. My posture was different, my expression harder. And when I spoke, the voice was familiar in a way that made my skin crawl.

"She doesn't know yet, does she?" my own voice said, but it sounded like Rachel. "Emily. She still thinks I'm real. Still thinks Mark is the monster."

Dr. Chen's voice from off-camera: "When are you going to tell her the truth?"

"When she's ready. When she's ready to know that she's the one who's been planning everything. That Mark is innocent. That the diary was never missing because she's the one who's been writing it all along."

The video ended. I stared at my own face frozen on the screen, and slowly, horrifyingly, the pieces began to fall into place.

The blackouts. The missing time. The way Mark looked at me sometimes—not with guilt, but with fear.

"No," I whispered. "Please, no."

But Dr. Chen's expression told me everything I needed to know.

The truth I'd been searching for was the one truth I could never escape. Because the monster I'd been hunting wasn't Mark.

It was me. It had always been me.`
            }
        ]
    }
];

// ==========================================
// STATE MANAGEMENT
// ==========================================

let currentUser = null;
let currentBook = null;
let currentChapter = null;

// ==========================================
// FIREBASE AUTH HANDLERS
// ==========================================

// Monitor auth state
auth.onAuthStateChanged(user => {
    currentUser = user;
    updateAuthUI();
    if (user && currentChapter) {
        loadComments(currentBook.id, currentChapter.id);
    }
});

function updateAuthUI() {
    const authBtn = document.getElementById('auth-btn');
    const userDisplay = document.getElementById('user-display');
    const loginPrompt = document.getElementById('login-prompt');
    const commentForm = document.getElementById('comment-form');

    if (currentUser) {
        authBtn.textContent = 'Logout';
        authBtn.onclick = logout;
        userDisplay.textContent = currentUser.email;
        userDisplay.style.display = 'flex';
        if (loginPrompt) loginPrompt.style.display = 'none';
        if (commentForm) commentForm.style.display = 'block';
    } else {
        authBtn.textContent = 'Login';
        authBtn.onclick = showAuthModal;
        userDisplay.style.display = 'none';
        if (loginPrompt) loginPrompt.style.display = 'block';
        if (commentForm) commentForm.style.display = 'none';
    }
}

// Email/Password Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');

    try {
        await auth.signInWithEmailAndPassword(email, password);
        closeAuthModal();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});

// Email/Password Register
document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    const errorDiv = document.getElementById('register-error');

    if (password !== confirm) {
        errorDiv.textContent = 'Passwords do not match';
        return;
    }

    try {
        await auth.createUserWithEmailAndPassword(email, password);
        closeAuthModal();
        errorDiv.textContent = '';
    } catch (error) {
        errorDiv.textContent = error.message;
    }
});

// Google Sign In
document.getElementById('google-login').addEventListener('click', async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
        await auth.signInWithPopup(provider);
        closeAuthModal();
    } catch (error) {
        console.error('Google sign in error:', error);
        alert('Google sign in failed: ' + error.message);
    }
});

// Logout
async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Logout error:', error);
    }
}

// ==========================================
// MODAL HANDLERS
// ==========================================

function showAuthModal() {
    document.getElementById('auth-modal').classList.add('active');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('auth-modal').addEventListener('click', (e) => {
    if (e.target.id === 'auth-modal') {
        closeAuthModal();
    }
});

// Auth tab switching
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        tab.classList.add('active');
        document.getElementById(`${targetTab}-form`).classList.add('active');
    });
});

// ==========================================
// NAVIGATION
// ==========================================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');

    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (pageId === 'homepage') {
        document.getElementById('home-btn').classList.add('active');
    }

    // Scroll to top
    window.scrollTo(0, 0);
}

document.getElementById('home-btn').addEventListener('click', () => {
    showPage('homepage');
});

// ==========================================
// CONTENT LOADING
// ==========================================

function loadBooks() {
    const booksList = document.getElementById('books-list');
    booksList.innerHTML = '';

    booksData.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-number">Book ${book.id}</div>
            <h3 class="book-title">${book.title}</h3>
            <p class="book-description">${book.description}</p>
            <p class="book-meta">${book.chapters.length} chapters available</p>
        `;
        bookCard.addEventListener('click', () => loadBook(book.id));
        booksList.appendChild(bookCard);
    });
}

async function loadBook(bookId) {
    currentBook = booksData.find(b => b.id === bookId);
    if (!currentBook) return;

    document.getElementById('book-title').textContent = currentBook.title;
    
    const chaptersList = document.getElementById('chapters-list');
    chaptersList.innerHTML = '';

    for (const chapter of currentBook.chapters) {
        const views = await getChapterViews(bookId, chapter.id);
        
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.innerHTML = `
            <div class="chapter-info">
                <h3>Chapter ${chapter.id}: ${chapter.title}</h3>
                <p>Click to read</p>
            </div>
            <div class="chapter-views">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 3C4.5 3 1.73 5.61 1 9c.73 3.39 3.5 6 7 6s6.27-2.61 7-6c-.73-3.39-3.5-6-7-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-6.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z" fill="currentColor"/>
                </svg>
                ${views}
            </div>
        `;
        chapterItem.addEventListener('click', () => loadChapter(bookId, chapter.id));
        chaptersList.appendChild(chapterItem);
    }

    showPage('book-page');
}

async function loadChapter(bookId, chapterId) {
    currentBook = booksData.find(b => b.id === bookId);
    currentChapter = currentBook.chapters.find(c => c.id === chapterId);
    
    if (!currentChapter) return;

    // Update chapter content
    document.getElementById('chapter-title').textContent = `Chapter ${currentChapter.id}: ${currentChapter.title}`;
    
    const contentDiv = document.getElementById('chapter-content');
    contentDiv.innerHTML = '';
    
    const paragraphs = currentChapter.content.split('\n\n');
    paragraphs.forEach(para => {
        if (para.trim()) {
            const p = document.createElement('p');
            p.textContent = para.trim();
            contentDiv.appendChild(p);
        }
    });

    // Increment view count
    await incrementViews(bookId, chapterId);
    
    // Load view count
    const views = await getChapterViews(bookId, chapterId);
    document.getElementById('view-count-number').textContent = views;

    // Update navigation buttons
    const currentIndex = currentBook.chapters.findIndex(c => c.id === chapterId);
    const prevBtn = document.getElementById('prev-chapter-btn');
    const nextBtn = document.getElementById('next-chapter-btn');

    if (currentIndex > 0) {
        prevBtn.disabled = false;
        prevBtn.onclick = () => loadChapter(bookId, currentBook.chapters[currentIndex - 1].id);
    } else {
        prevBtn.disabled = true;
    }

    if (currentIndex < currentBook.chapters.length - 1) {
        nextBtn.disabled = false;
        nextBtn.onclick = () => loadChapter(bookId, currentBook.chapters[currentIndex + 1].id);
    } else {
        nextBtn.disabled = true;
    }

    // Set back button
    document.getElementById('back-to-book').onclick = () => loadBook(bookId);

    // Load comments
    loadComments(bookId, chapterId);

    showPage('chapter-page');
}

// ==========================================
// FIRESTORE - CHAPTER VIEWS
// ==========================================

async function incrementViews(bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`book${bookId}_chapter${chapterId}`);
    
    try {
        await db.runTransaction(async (transaction) => {
            const doc = await transaction.get(docRef);
            
            if (!doc.exists) {
                transaction.set(docRef, { views: 1 });
            } else {
                const newViews = (doc.data().views || 0) + 1;
                transaction.update(docRef, { views: newViews });
            }
        });
    } catch (error) {
        console.error('Error incrementing views:', error);
    }
}

async function getChapterViews(bookId, chapterId) {
    const docRef = db.collection('chapters').doc(`book${bookId}_chapter${chapterId}`);
    
    try {
        const doc = await docRef.get();
        return doc.exists ? (doc.data().views || 0) : 0;
    } catch (error) {
        console.error('Error getting views:', error);
        return 0;
    }
}

// ==========================================
// FIRESTORE - COMMENTS
// ==========================================

async function loadComments(bookId, chapterId) {
    const commentsList = document.getElementById('comments-list');
    commentsList.innerHTML = '<div class="loading">Loading comments...</div>';

    try {
        const snapshot = await db.collection('comments')
            .where('bookId', '==', bookId)
            .where('chapterId', '==', chapterId)
            .orderBy('timestamp', 'desc')
            .get();

        commentsList.innerHTML = '';

        if (snapshot.empty) {
            commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first to share your thoughts!</p>';
            return;
        }

        snapshot.forEach(doc => {
            const comment = doc.data();
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            
            const date = comment.timestamp ? comment.timestamp.toDate() : new Date();
            const dateStr = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            commentDiv.innerHTML = `
                <div class="comment-header">
                    <span class="comment-author">${comment.authorEmail}</span>
                    <span class="comment-date">${dateStr}</span>
                </div>
                <p class="comment-text">${escapeHtml(comment.text)}</p>
            `;
            commentsList.appendChild(commentDiv);
        });
    } catch (error) {
        console.error('Error loading comments:', error);
        commentsList.innerHTML = '<p class="no-comments">Error loading comments. Please try again.</p>';
    }
}

// Comment form submission
document.getElementById('comment-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!currentUser) {
        alert('Please sign in to comment');
        return;
    }

    const textarea = document.getElementById('comment-input');
    const text = textarea.value.trim();

    if (!text) return;

    try {
        await db.collection('comments').add({
            bookId: currentBook.id,
            chapterId: currentChapter.id,
            authorEmail: currentUser.email,
            text: text,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        textarea.value = '';
        document.getElementById('char-count').textContent = '0/1000';
        
        // Reload comments
        loadComments(currentBook.id, currentChapter.id);
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment. Please try again.');
    }
});

// Character counter for comment input
document.getElementById('comment-input').addEventListener('input', (e) => {
    const count = e.target.value.length;
    document.getElementById('char-count').textContent = `${count}/1000`;
});

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});
