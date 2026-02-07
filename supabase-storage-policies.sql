-- ==========================================
-- SUPABASE STORAGE POLICIES FOR AVATARS BUCKET
-- ==========================================
-- UPDATED: February 2026
-- CONFIGURATION: Public viewing, users manage their own avatars

-- ==========================================
-- SETUP INSTRUCTIONS
-- ==========================================
-- STEP 1: Create the avatars bucket (if it doesn't exist)
--   1. Go to Storage > Create bucket
--   2. Bucket name: avatars
--   3. Make it PUBLIC (toggle the public option)
--
-- STEP 2: Apply these SQL policies
--   1. Go to SQL Editor in Supabase Dashboard
--   2. Copy and paste ALL the policies below
--   3. Click "Run" to execute them
--
-- STEP 3: Verify policies are active
--   1. Go to Storage > Policies
--   2. You should see 4 policies listed
--
-- ==========================================

-- ==========================================
-- POLICY 1: Public Read Access
-- ==========================================
-- Allows anyone (authenticated or not) to view/download all avatars
-- This is needed so profile pictures can be displayed publicly

CREATE POLICY "Public can view all avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- ==========================================
-- POLICY 2: Authenticated Users Can Upload
-- ==========================================
-- Only logged-in users can upload avatars
-- Files must be stored in their own user folder: avatars/{user_id}/filename

CREATE POLICY "Users can upload their own avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- POLICY 3: Users Can Update Their Own
-- ==========================================
-- Users can only update/replace avatars in their own folder
-- This allows the app to use upsert: true to replace old avatars

CREATE POLICY "Users can update their own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- POLICY 4: Users Can Delete Their Own
-- ==========================================
-- Users can delete avatars from their own folder
-- This gives users full control over their profile pictures

CREATE POLICY "Users can delete their own avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- ==========================================
-- HOW THESE POLICIES WORK TOGETHER
-- ==========================================
-- File structure: avatars/{user_id}/avatar.webp
-- 
-- Example:
-- - User ID: abc-123-def
-- - File path: avatars/abc-123-def/avatar.webp
--
-- What each user can do:
-- ✅ VIEW: All avatars (everyone's)
-- ✅ UPLOAD: Only to their own folder (avatars/{their_id}/)
-- ✅ UPDATE: Only their own files
-- ✅ DELETE: Only their own files
-- ❌ CANNOT: Touch other users' files
--
-- Security:
-- - (storage.foldername(name))[1] extracts the first folder from the path
-- - auth.uid()::text is the current user's ID
-- - These must match for INSERT/UPDATE/DELETE operations

-- ==========================================
-- TROUBLESHOOTING
-- ==========================================
-- If you get "new row violates row-level security policy" errors:
--
-- 1. Make sure the avatars bucket is PUBLIC
-- 2. Verify all 4 policies are created (check Storage > Policies)
-- 3. Check that your upload code uses the correct path format:
--    const fileName = `${userId}/avatar.webp`;
-- 4. Ensure the user is authenticated before uploading
--
-- To delete all policies and start fresh:
-- DROP POLICY IF EXISTS "Public can view all avatars" ON storage.objects;
-- DROP POLICY IF EXISTS "Users can upload their own avatars" ON storage.objects;
-- DROP POLICY IF EXISTS "Users can update their own avatars" ON storage.objects;
-- DROP POLICY IF EXISTS "Users can delete their own avatars" ON storage.objects;
--
-- Then re-run the CREATE POLICY statements above.

-- ==========================================
-- NOTES
-- ==========================================
-- - These policies work with Supabase Auth
-- - The app uses Firebase Auth + Supabase Storage
-- - user-profile.js handles the actual upload logic
-- - Files are automatically converted to WebP before upload
-- - Maximum file size: 2MB (enforced in JavaScript)
-- - The upsert: true option allows replacing existing avatars
