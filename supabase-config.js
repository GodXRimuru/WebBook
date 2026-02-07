// ==========================================
// SUPABASE CONFIGURATION
// ==========================================

// REPLACE THESE WITH YOUR ACTUAL SUPABASE CREDENTIALS
const SUPABASE_URL = 'https://svsabnqwkjnvgvewvrqc.supabase.co'; // e.g., https://xxxxx.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_CbI89CcDeCRxErTkT2LCYQ_7VFidbKP'; // Your public anon key

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Storage bucket name
const AVATAR_BUCKET = 'avatars';
