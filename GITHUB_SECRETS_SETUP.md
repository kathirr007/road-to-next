# GitHub Secrets Verification Checklist

## Required Secrets for Keep-Alive Workflows

Your GitHub workflows need two secrets to function properly:

### 1. `SUPABASE_URL`
- **What it is**: Your Supabase project ID (NOT the full URL)
- **Format**: `xxxxxxxxxxxxxxxxxxxx` (just the alphanumeric project ID)
- **Example**: `cxfmjmnmxtsdrpgboncd`
- **Where to find it**: 
  - Go to Supabase Dashboard → Settings → General
  - Look for "Reference ID" or project ID in the connection string
  - Extract just the ID part from URLs like: `https://cxfmjmnmxtsdrpgboncd.supabase.co`

### 2. `SUPABASE_KEY`
- **What it is**: Your Supabase anonymous/public API key
- **Format**: Long string starting with `eyJ...`
- **Where to find it**:
  - Go to Supabase Dashboard → Settings → API
  - Copy "anon public" or "service_role" key
  - Use the **anon key** for public access (recommended for keep-alive)

---

## How to Add Secrets to GitHub

### Step 1: Go to GitHub Repository
1. Navigate to your GitHub repo: `github.com/kathirr007/road-to-next`
2. Click **Settings** tab

### Step 2: Add Repository Secrets
1. Left sidebar → **Secrets and variables** → **Actions**
2. Click **New repository secret**

### Step 3: Add `SUPABASE_URL`
1. **Name**: `SUPABASE_URL`
2. **Value**: Your project ID (e.g., `cxfmjmnmxtsdrpgboncd`)
3. Click **Add secret**

### Step 4: Add `SUPABASE_KEY`
1. **Name**: `SUPABASE_KEY`
2. **Value**: Your anon API key (starts with `eyJ...`)
3. Click **Add secret**

### Step 5: Verify Secrets Are Set
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. You should see both secrets listed (values are hidden)

---

## Testing the Secrets

After adding secrets, test the workflows:

1. Go to **Actions** tab in GitHub
2. Select either workflow:
   - "Keep Supabase Active - Every 6 Hours"
   - "Supabase Database Activity - Every 4 Hours"
3. Click **Run workflow** → **Run workflow**
4. Wait 30 seconds and refresh
5. Click the running workflow to view logs
6. Check for ✅ success indicators

### Expected Log Output
```
Query 1 completed
Aggregation query completed
Connectivity check completed
```

---

## Troubleshooting Secrets

### ❌ Error: "The server responded with status 401"
- **Cause**: `SUPABASE_KEY` is incorrect or revoked
- **Fix**: 
  - Copy the correct anon key from Supabase Dashboard
  - Make sure you're using the **anon key**, not service role key
  - Update the secret in GitHub

### ❌ Error: "host not found" or "unable to resolve domain"
- **Cause**: `SUPABASE_URL` is malformed
- **Fix**:
  - Ensure it's just the project ID: `cxfmjmnmxtsdrpgboncd`
  - NOT the full URL
  - NOT `cxfmjmnmxtsdrpgboncd.supabase.co`

### ❌ Error: "curl: command not found"
- **Cause**: Workflow runner environment issue
- **Fix**: This shouldn't happen on GitHub Actions Ubuntu runners, contact GitHub support

---

## Security Best Practices

⚠️ **IMPORTANT**: 
- ✅ GitHub Secrets are **encrypted** and only accessible to workflows
- ✅ Secrets are **never** logged in workflow output
- ✅ Only use **anon key** (not service role key) for keep-alive
- ❌ **NEVER** commit secrets to `.env` file that's in Git
- ❌ **NEVER** paste secrets in issues or PRs

---

## Verification Steps

Run through this checklist to ensure everything is set up correctly:

- [ ] `SUPABASE_URL` secret is set in GitHub
- [ ] `SUPABASE_KEY` secret is set in GitHub
- [ ] Manual workflow run completed successfully
- [ ] Workflow logs show all queries completed
- [ ] No HTTP 401 or 404 errors in logs
- [ ] Supabase Dashboard shows recent activity

---

## Still Not Working?

1. **Check workflow logs** in GitHub Actions
2. **Re-verify secrets** are correct (copy-paste from Supabase)
3. **Test locally** (run `test-supabase-keepalive.sh` with secrets exported)
4. **Check Supabase status page** - there might be outages
5. **Contact Supabase support** - there might be account-specific issues

---

## Next: Set Up UptimeRobot (Backup)

After secrets are working, add UptimeRobot for extra redundancy:
- See `SUPABASE_KEEP_ALIVE_SOLUTION.md` for UptimeRobot setup
