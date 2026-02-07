// ==========================================
// ENHANCED REACTIONS WITH ANIMATIONS
// ==========================================

// Add this to your existing script.js or include as separate file

// Enhanced toggle like with animation
async function toggleLikeAnimated() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const btn = document.getElementById('like-btn');
    const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const currentReaction = userReactions[chapterKey];
    const newReaction = currentReaction === 'like' ? null : 'like';
    
    // Add animation classes
    btn.classList.add('count-change');
    if (newReaction === 'like') {
        btn.classList.add('liked');
    } else {
        btn.classList.remove('liked');
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        btn.classList.remove('count-change');
    }, 400);
    
    await updateReaction(currentSeries.id, currentBook.id, currentChapter.id, newReaction, currentReaction);
}

// Enhanced toggle dislike with animation
async function toggleDislikeAnimated() {
    if (!currentUser) {
        showAuthModal();
        return;
    }

    const btn = document.getElementById('dislike-btn');
    const chapterKey = `s${currentSeries.id}_b${currentBook.id}_c${currentChapter.id}`;
    const currentReaction = userReactions[chapterKey];
    const newReaction = currentReaction === 'dislike' ? null : 'dislike';
    
    // Add animation classes
    btn.classList.add('count-change');
    if (newReaction === 'dislike') {
        btn.classList.add('disliked');
    } else {
        btn.classList.remove('disliked');
    }
    
    // Remove animation class after animation completes
    setTimeout(() => {
        btn.classList.remove('count-change');
    }, 400);
    
    await updateReaction(currentSeries.id, currentBook.id, currentChapter.id, newReaction, currentReaction);
}

// Update the reaction buttons to reflect current state
function updateReactionButtonsAnimated(currentReaction) {
    const likeBtn = document.getElementById('like-btn');
    const dislikeBtn = document.getElementById('dislike-btn');
    
    if (!likeBtn || !dislikeBtn) return;
    
    // Remove all reaction classes
    likeBtn.classList.remove('liked');
    dislikeBtn.classList.remove('disliked');
    
    // Add appropriate class based on current reaction
    if (currentReaction === 'like') {
        likeBtn.classList.add('liked');
    } else if (currentReaction === 'dislike') {
        dislikeBtn.classList.add('disliked');
    }
}

// Export functions
window.toggleLikeAnimated = toggleLikeAnimated;
window.toggleDislikeAnimated = toggleDislikeAnimated;
window.updateReactionButtonsAnimated = updateReactionButtonsAnimated;
