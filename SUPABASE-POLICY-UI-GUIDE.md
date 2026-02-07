# Supabase Storage Policies - UI Setup Guide

## ⚠️ CRITICAL: How to Use the Supabase Policy UI

When creating policies in the Supabase Dashboard UI, **DO NOT** paste the full SQL `CREATE POLICY` statement. The UI already handles that part for you.

### ❌ WRONG (Will cause errors):
```sql
CREATE POLICY "Public avatars are viewable by everyone"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

### ✅ CORRECT (Only the boolean expression):
```sql
bucket_id = 'avatars'
```

---

## 📋 Step-by-Step Setup

### STEP 1: Create the Avatars Bucket

1. Go to your Supabase Dashboard
2. Click **Storage** in the left sidebar
3. Click **New bucket**
4. Name it: `avatars`
5. Toggle **Public bucket** to ON ✅
6. Click **Create bucket**

---

### STEP 2: Create Policy 1 - Public Read Access

1. Go to **Storage** → **Policies**
2. Click **New Policy**
3. Fill in the form:

**Policy name:**
```
Public can view all avatars
```

**Allowed operation:**
- ✅ Check **SELECT** only

**Target roles:**
- Leave as default (applies to all roles including public)

**Policy definition (USING clause):**
```
bucket_id = 'avatars'
```

4. Click **Review** then **Save policy**

---

### STEP 3: Create Policy 2 - Users Can Upload

1. Click **New Policy** again
2. Fill in the form:

**Policy name:**
```
Users can upload their own avatars
```

**Allowed operation:**
- ✅ Check **INSERT** only

**Target roles:**
- Select **authenticated** (or leave default)

**Policy definition (USING clause):**
```
bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

3. Click **Review** then **Save policy**

---

### STEP 4: Create Policy 3 - Users Can Update

1. Click **New Policy**
2. Fill in the form:

**Policy name:**
```
Users can update their own avatars
```

**Allowed operation:**
- ✅ Check **UPDATE** (SELECT will auto-check - this is normal!)

**Target roles:**
- Select **authenticated** (or leave default)

**Policy definition (USING clause):**
```
bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

3. Click **Review** then **Save policy**

---

### STEP 5: Create Policy 4 - Users Can Delete

1. Click **New Policy**
2. Fill in the form:

**Policy name:**
```
Users can delete their own avatars
```

**Allowed operation:**
- ✅ Check **DELETE** only

**Target roles:**
- Select **authenticated** (or leave default)

**Policy definition (USING clause):**
```
bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

3. Click **Review** then **Save policy**

---

## ✅ Verification

After creating all 4 policies, you should see them listed in **Storage** → **Policies**:

1. ✅ Public can view all avatars (SELECT)
2. ✅ Users can upload their own avatars (INSERT)
3. ✅ Users can update their own avatars (UPDATE, SELECT)
4. ✅ Users can delete their own avatars (DELETE)

---

## 🔧 Troubleshooting

### Issue: "Cursor not showing" or "Can't type in Policy name field"

**Solutions:**
1. Click on another field first, then click back
2. Press Tab to navigate to the field
3. Refresh the page and try again
4. Try a different browser (Chrome usually works best)
5. Clear browser cache
6. **Fallback:** Use the SQL Editor method instead (see below)

### Issue: "UPDATE auto-selects SELECT"

**This is normal!** UPDATE operations require SELECT permissions. Don't uncheck SELECT.

### Issue: "Error: new row violates row-level security policy"

**Check:**
1. Is the avatars bucket PUBLIC?
2. Are all 4 policies created and active?
3. Is the user authenticated when uploading?
4. Is your code using the correct path format: `${userId}/avatar.webp`?

---

## 🚀 Alternative: SQL Editor Method

If the UI gives you trouble, you can create policies directly using SQL:

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New query**
3. Paste the contents of `supabase-storage-policies.sql`
4. Click **Run**

This will create all 4 policies at once.

---

## 📝 Quick Reference: Policy Expressions

Copy these exact expressions into the "Policy definition" box:

### For public read (SELECT):
```
bucket_id = 'avatars'
```

### For user-specific operations (INSERT/UPDATE/DELETE):
```
bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## 🎯 What Each Policy Does

| Policy | Operation | Who Can Do It | What They Can Do |
|--------|-----------|---------------|------------------|
| Policy 1 | SELECT | Everyone (public) | View/download all avatars |
| Policy 2 | INSERT | Authenticated users | Upload to their own folder |
| Policy 3 | UPDATE | Authenticated users | Replace their own avatars |
| Policy 4 | DELETE | Authenticated users | Delete their own avatars |

---

## 📂 File Structure

Your avatar files will be stored like this:
```
avatars/
├── user-id-abc123/
│   └── avatar.webp
├── user-id-def456/
│   └── avatar.webp
└── user-id-ghi789/
    └── avatar.webp
```

Each user can only touch files in their own folder!

---

## 💡 Tips

1. **Always test with a real user login** - policies only work when authenticated
2. **Check browser console** for detailed error messages
3. **Verify bucket is PUBLIC** - this is the most common mistake
4. **Use the exact expressions** provided - don't modify them unless you know what you're doing
5. **Read error messages carefully** - they usually tell you exactly what's wrong

---

## 🆘 Still Having Issues?

1. Delete all existing policies and start fresh
2. Use the SQL Editor method instead of the UI
3. Check the Supabase documentation
4. Verify your Supabase project is on a plan that supports storage policies

---

## ✨ Success!

Once all policies are set up correctly:
- ✅ Users can upload profile pictures
- ✅ Everyone can see profile pictures
- ✅ Users can only modify their own pictures
- ✅ No one can touch other users' files

Your avatar system is now secure and functional! 🎉
