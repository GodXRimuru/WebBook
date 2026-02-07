-- ==========================================
-- SUPABASE STORAGE POLICIES FOR AVATARS BUCKET
-- ==========================================
-- Run these SQL commands in your Supabase SQL Editor

-- STEP 1: Create the avatars bucket (if it doesn't exist)
-- Go to Storage > Create bucket
-- Bucket name: avatars
-- Make it PUBLIC

-- STEP 2: Apply these RLS policies

-- Allow public read access to avatars
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow authenticated users to insert their own avatars
CREATE POLICY "Users can upload their own avatar"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Allow authenticated users to update their own avatars
CREATE POLICY "Users can update their own avatar"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
  bucket_id = 'avatars' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- NOTE: DELETE is intentionally NOT allowed
-- Avatars can only be overwritten, not deleted

-- ==========================================
-- ALTERNATIVE: Anonymous Upload Policy
-- ==========================================
-- If you're using Firebase Auth (not Supabase Auth),
-- you need to allow anonymous uploads since there's no auth.uid()
-- In this case, use these policies instead:

-- DROP the above policies first if you created them, then create these:

-- Allow public read
CREATE POLICY "Public read access to avatars"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- Allow anyone to INSERT (upload) avatars
CREATE POLICY "Anyone can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'avatars');

-- Allow anyone to UPDATE (overwrite) avatars  
CREATE POLICY "Anyone can update avatars"
ON storage.objects FOR UPDATE
USING (bucket_id = 'avatars')
WITH CHECK (bucket_id = 'avatars');

-- Still no DELETE policy - avatars cannot be deleted

-- ==========================================
-- SETUP INSTRUCTIONS
-- ==========================================
-- 1. Go to Supabase Dashboard > Storage
-- 2. Create a new bucket named "avatars"
-- 3. Make it PUBLIC (toggle the public option)
-- 4. Go to SQL Editor
-- 5. Run the appropriate policies above
-- 6. Update supabase-config.js with your credentials
