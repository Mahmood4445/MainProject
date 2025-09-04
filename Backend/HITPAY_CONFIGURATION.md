# HitPay Payment Configuration Guide

## Environment Variables Setup

Create a `.env` file in the Backend directory with the following variables:

```env
# HitPay Configuration
HITPAY_API_KEY=your_hitpay_api_key_here
HITPAY_SALT=your_hitpay_salt_here
HITPAY_API_BASE=https://api.sandbox.hit-pay.com/v1

# Frontend URL (Your website domain)
# For development: http://localhost:5173
# For production: https://yourdomain.com
FRONTEND_URL=http://localhost:5173

# Backend URL (Your Django server)
# For development: http://localhost:8000
# For production: https://api.yourdomain.com
PUBLIC_BACKEND_URL=http://localhost:8000
```

## Important Notes:

### 1. Redirect URL Requirements
- HitPay requires a **publicly accessible URL** for redirects
- `localhost` URLs will NOT work in production
- Your domain must be accessible from the internet

### 2. Production Setup
When deploying to production, update these URLs:
```env
FRONTEND_URL=https://yourdomain.com
PUBLIC_BACKEND_URL=https://api.yourdomain.com
```

### 3. Payment Flow
1. User submits payment → Django creates HitPay request
2. User redirected to HitPay checkout
3. User completes payment on HitPay
4. HitPay redirects back to: `FRONTEND_URL/payment/status?reference_number=xxx`
5. Frontend shows payment status popup

### 4. Testing Locally
For local testing, you can use:
- ngrok: `ngrok http 5173` (for frontend)
- ngrok: `ngrok http 8000` (for backend)
- Then use the ngrok URLs in your .env file

### 5. Webhook Configuration
The webhook URL is automatically set to: `PUBLIC_BACKEND_URL/api/payments/hitpay/webhook/`

## Current Configuration Status:
✅ Backend redirect URL configured
✅ Frontend status page ready
✅ Payment flow implemented
✅ Webhook handling ready

## Next Steps:
1. Update your `.env` file with proper URLs
2. Test the payment flow
3. Deploy to production with public URLs
