# Supabase Keep-Alive Solution

## Problem
Supabase free tier pauses projects after **7 days of inactivity**. GitHub workflows alone may not always prevent this due to:
- Insufficient frequency of database queries
- Supabase not counting certain types of requests as "activity"
- Edge cases where workflows fail silently

## Solution Overview

### ✅ Primary Solution: Optimized GitHub Workflows
Your workflows have been updated to run **more frequently with better query patterns**:

#### Workflow Schedule
- **Health Check Workflow**: Runs every **6 hours** (4x per day) at 0, 6, 12, 18 UTC
- **Database Query Workflow**: Runs every **4 hours** at 15-minute offset (every 4h, staggered)
- **Additional Trigger**: Both workflows run on **every push to main branch**

#### Query Types
Each workflow makes multiple queries to ensure Supabase registers the activity:
1. **Read Operations** - Fetches data from Ticket table
2. **Aggregation Queries** - Forces database evaluation
3. **Health Checks** - Direct connectivity verification
4. **Count Queries** - Validates database access

### Why This Works
- **No gaps > 6 hours** between database interactions
- **Multiple query types** ensure at least one is counted as activity
- **REST API calls** directly interact with database servers
- **Error tolerance** - `continue-on-error: true` ensures workflow runs complete

---

## 🔄 Backup Solution: UptimeRobot (Recommended for Extra Safety)

UptimeRobot provides a **free tier** that can ping your database more reliably:

1. **Sign up** at [UptimeRobot](https://uptimerobot.com) (free tier available)

2. **Create HTTP(S) monitor**:
   - **URL**: `https://[your-project-id].supabase.co/rest/v1/Ticket?select=count`
   - **Method**: GET
   - **Headers** (add custom):
     - `apikey: [Your SUPABASE_KEY]`
     - `Authorization: Bearer [Your SUPABASE_KEY]`
   - **Interval**: Every 5 minutes
   - **Timeout**: 10 seconds

3. **Benefits**:
   - ✅ Runs every 5 minutes (more frequent than workflows)
   - ✅ Independent of GitHub infrastructure
   - ✅ Free tier includes 50+ monitors
   - ✅ Email/SMS alerts if database goes down
   - ✅ Status page monitoring

### UptimeRobot Configuration Example
```
Monitor Type: HTTP(s)
URL: https://your-project.supabase.co/rest/v1/Ticket?select=count
Method: GET
Timeout: 10 seconds
Interval: 5 minutes
Custom Headers:
  apikey: YOUR_SUPABASE_KEY
  Authorization: Bearer YOUR_SUPABASE_KEY
```

---

## 🚀 Long-term Solution: Migration Options

If inactivity pausing continues to be an issue, consider:

### Option 1: **Supabase Pro Plan** ($25/month)
- ✅ No auto-pause
- ✅ SLA guarantees
- ✅ Higher compute resources
- ✅ Better for production

### Option 2: **Alternative Databases**
- **Planetscale** (MySQL) - Free tier with reasonable limits
- **MongoDB Atlas** - Free tier (512MB storage)
- **Neon** (PostgreSQL) - Free tier with auto-sleep but manual wake
- **Railway** - Pay-as-you-go with free credits

### Option 3: **Hybrid Approach**
Use Supabase for development but keep data synced with a commercial database for production.

---

## 📋 Verification Checklist

- [ ] Check GitHub Secrets are set (`SUPABASE_URL` and `SUPABASE_KEY`)
- [ ] Manually run workflows from Actions tab to verify they work
- [ ] Check workflow logs for successful queries
- [ ] Monitor Supabase dashboard for activity in the past 24h
- [ ] Set up UptimeRobot as backup monitor (optional but recommended)

## ⏰ What Counts as Activity in Supabase

**✅ Counts as Activity:**
- REST API calls to `/rest/v1/` endpoints
- Direct database connections
- Authentication requests
- Any query that hits the database server

**❌ Does NOT Count:**
- Health check endpoints (only /health)
- CDN cache hits
- Dashboard views
- OAuth token refreshes without DB access

---

## 🔧 Manual Workflow Trigger

To manually keep your database active:
1. Go to GitHub repo → **Actions** tab
2. Select **"Keep Supabase Active - Every 6 Hours"** or **"Supabase Database Activity"**
3. Click **"Run workflow"** → **"Run workflow"**

This manually triggers immediate database activity.

---

## 📊 Recommended Setup

**For Maximum Uptime Safety:**
1. ✅ Keep GitHub workflows enabled (configured)
2. ✅ Add UptimeRobot monitor for redundancy
3. ⭐ Consider Supabase Pro if this is for production

**For Development/Testing:**
1. ✅ Use optimized GitHub workflows (current setup)
2. ✅ Manually run workflows if needed before 7 days
3. ✅ Upgrade to Pro only if project becomes production

---

## 🚨 Emergency Recovery

If your project gets paused:

1. **Check Supabase Dashboard**:
   - Sign in to Supabase
   - Navigate to your project
   - Look for pause notification
   - Click to resume (usually automatic within 24h after activity)

2. **Immediate Action**:
   - Manually trigger GitHub workflow
   - Visit UptimeRobot to verify monitoring is active
   - Wait 5-10 minutes for Supabase to detect activity

3. **Prevention**:
   - Enable both workflow + UptimeRobot
   - Set calendar reminder for every 3 days to manually trigger

---

## 📞 Support

If database is still pausing:
1. Check GitHub Actions logs for failures
2. Verify `SUPABASE_URL` and `SUPABASE_KEY` secrets are correct
3. Contact Supabase support with evidence of monitoring setup
4. Consider migration to Pro or alternative service
