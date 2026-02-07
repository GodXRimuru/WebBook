# 📋 Supabase Storage Policies - Quick Reference Card

## ⚡ Ultra-Quick Setup

### 1️⃣ Create Bucket
```
Name: avatars
Public: ✅ YES
```

### 2️⃣ Create 4 Policies (in Storage → Policies → New Policy)

---

## Policy 1: PUBLIC READ 👁️

```yaml
Name: Public can view all avatars
Operation: ☑ SELECT
Expression: bucket_id = 'avatars'
```

---

## Policy 2: USER UPLOAD ⬆️

```yaml
Name: Users can upload their own avatars
Operation: ☑ INSERT
Expression: bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## Policy 3: USER UPDATE ✏️

```yaml
Name: Users can update their own avatars
Operation: ☑ UPDATE (SELECT auto-checks ✓)
Expression: bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## Policy 4: USER DELETE 🗑️

```yaml
Name: Users can delete their own avatars
Operation: ☑ DELETE
Expression: bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## 🎯 Copy-Paste Expressions

**For public read:**
```
bucket_id = 'avatars'
```

**For user-specific (INSERT/UPDATE/DELETE):**
```
bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text
```

---

## ⚠️ Common Mistakes

❌ **DON'T** paste this:
```sql
CREATE POLICY "name" ON storage.objects FOR SELECT USING (...)
```

✅ **DO** paste this:
```sql
bucket_id = 'avatars'
```

❌ **DON'T** forget to make bucket PUBLIC  
✅ **DO** toggle "Public bucket" to ON

❌ **DON'T** create only 3 policies  
✅ **DO** create all 4 policies

---

## 🔍 Verify Setup

After creating all policies, you should see in Storage → Policies:

1. ✅ Public can view all avatars (SELECT)
2. ✅ Users can upload their own avatars (INSERT)
3. ✅ Users can update their own avatars (UPDATE, SELECT)
4. ✅ Users can delete their own avatars (DELETE)

**Total: 4 policies**

---

## 🆘 Quick Troubleshooting

**Error: "Cursor not showing in Policy name"**
→ Click another field first, then click back
→ Try Tab key to navigate
→ Use SQL Editor instead (see full guide)

**Error: "new row violates row-level security policy"**
→ Is bucket PUBLIC? ✅
→ Are all 4 policies created? ✅
→ Are you logged in? ✅
→ Check file path format: `${userId}/avatar.webp` ✅

**UPDATE auto-selects SELECT?**
→ This is normal! ✅ UPDATE needs SELECT permission

---

## 📚 Full Documentation

For detailed instructions, see:
- **SUPABASE-POLICY-UI-GUIDE.md** - Complete step-by-step guide
- **supabase-storage-policies.sql** - SQL alternative method

---

## 🎉 That's It!

4 policies + 1 public bucket = Avatar system ready! 🚀
