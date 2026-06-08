#!/bin/bash
# This script helps you test if your Supabase keep-alive setup is working

# Color codes for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "=========================================="
echo "Supabase Keep-Alive Test Script"
echo "=========================================="
echo ""

# Check if secrets are set
if [ -z "$SUPABASE_URL" ] || [ -z "$SUPABASE_KEY" ]; then
    echo -e "${YELLOW}⚠️  GitHub Secrets not detected in environment${NC}"
    echo "You can test manually by setting these environment variables:"
    echo "export SUPABASE_URL=your-project-id"
    echo "export SUPABASE_KEY=your-anon-key"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓ Secrets detected${NC}"
echo ""

# Test 1: Health Check
echo "Test 1: Health Check Endpoint"
response=$(curl -s -w "\n%{http_code}" -X GET "https://${SUPABASE_URL}.supabase.co/health" \
  -H "apikey: ${SUPABASE_KEY}" \
  --connect-timeout 5 --max-time 10)
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Health check successful (HTTP $http_code)${NC}"
else
    echo -e "${RED}✗ Health check failed (HTTP $http_code)${NC}"
fi
echo ""

# Test 2: Table Read Query
echo "Test 2: Database Read Query (Ticket table)"
response=$(curl -s -w "\n%{http_code}" -X GET "https://${SUPABASE_URL}.supabase.co/rest/v1/Ticket?select=*&limit=1" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  --connect-timeout 5 --max-time 10)
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Database read query successful (HTTP $http_code)${NC}"
else
    echo -e "${RED}✗ Database read query failed (HTTP $http_code)${NC}"
fi
echo ""

# Test 3: Count Query
echo "Test 3: Count Query"
response=$(curl -s -w "\n%{http_code}" -X GET "https://${SUPABASE_URL}.supabase.co/rest/v1/Ticket?select=count" \
  -H "apikey: ${SUPABASE_KEY}" \
  -H "Authorization: Bearer ${SUPABASE_KEY}" \
  -H "Content-Type: application/json" \
  -H "Prefer: count=exact" \
  --connect-timeout 5 --max-time 10)
http_code=$(echo "$response" | tail -n1)
if [ "$http_code" = "200" ]; then
    echo -e "${GREEN}✓ Count query successful (HTTP $http_code)${NC}"
else
    echo -e "${RED}✗ Count query failed (HTTP $http_code)${NC}"
fi
echo ""

echo "=========================================="
echo "Test Results Summary"
echo "=========================================="
echo "If all tests passed, your Supabase connectivity is working!"
echo ""
echo "Next steps:"
echo "1. Make sure GitHub Secrets are configured in your repo"
echo "2. Check GitHub Actions to verify workflows are running"
echo "3. Monitor Supabase dashboard for activity logs"
echo ""
echo "For UptimeRobot setup, see SUPABASE_KEEP_ALIVE_SOLUTION.md"
