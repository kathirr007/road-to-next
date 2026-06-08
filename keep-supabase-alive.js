// Optional: Node.js Keep-Alive Monitor Script
// Can be deployed to a free tier service (Railway, Render, Heroku) for extra redundancy
// Usage: node keep-supabase-alive.js

import fetch from 'node-fetch'

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const CHECK_INTERVAL = process.env.CHECK_INTERVAL || 21600000 // 6 hours default

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error('❌ Error: SUPABASE_URL and SUPABASE_KEY environment variables are required')
  console.error('Set them like: export SUPABASE_URL=your-project-id && export SUPABASE_KEY=your-key')
  process.exit(1)
}

const BASE_URL = `https://${SUPABASE_URL}.supabase.co`

const headers = {
  'apikey': SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type': 'application/json',
  'Prefer': 'count=exact',
}

async function performQuery(queryName, url) {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
      timeout: 10000,
    })

    const status = response.status
    const timestamp = new Date().toISOString()

    if (status === 200) {
      console.log(`✅ [${timestamp}] ${queryName}: SUCCESS (${status})`)
      return true
    }
    else {
      console.error(`⚠️  [${timestamp}] ${queryName}: Status ${status}`)
      return false
    }
  }
  catch (error) {
    console.error(`❌ [${new Date().toISOString()}] ${queryName}: ${error.message}`)
    return false
  }
}

async function runKeepAliveCheck() {
  console.log('\n🔄 Running Supabase Keep-Alive Check...')
  console.log(`📍 Project: ${SUPABASE_URL}`)
  console.log(`⏰ Time: ${new Date().toISOString()}`)
  console.log('─'.repeat(60))

  try {
    // Health check
    await performQuery(
      'Health Check',
      `${BASE_URL}/health`,
    )

    // Read operation
    await performQuery(
      'Table Read Query',
      `${BASE_URL}/rest/v1/Ticket?select=*&limit=1`,
    )

    // Count query
    await performQuery(
      'Count Query',
      `${BASE_URL}/rest/v1/Ticket?select=count`,
    )

    // Aggregation query
    await performQuery(
      'Aggregation Query',
      `${BASE_URL}/rest/v1/Ticket?select=status,count()`,
    )

    console.log('─'.repeat(60))
    console.log('✨ Keep-alive cycle completed\n')
  }
  catch (error) {
    console.error(`Fatal error: ${error.message}\n`)
  }
}

// Run immediately on start
runKeepAliveCheck()

// Run periodically
setInterval(() => {
  runKeepAliveCheck()
}, CHECK_INTERVAL)

console.log(`\n⏱️  Next check in ${(CHECK_INTERVAL / 1000 / 60 / 60).toFixed(1)} hours`)
console.log('Press Ctrl+C to stop\n')

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n👋 Shutting down...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n\n👋 Shutting down...')
  process.exit(0)
})
