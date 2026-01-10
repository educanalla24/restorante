# Stripe Payment Integration Setup

This guide will help you set up Stripe payments for your restaurant ordering system.

## Features

- ✅ Tap/Contactless payments (cards and phones)
- ✅ Apple Pay support
- ✅ Google Pay support
- ✅ Secure payment processing
- ✅ Payment confirmation before order creation

## Prerequisites

1. A Stripe account (sign up at https://stripe.com)
2. Your Stripe API keys (available in Stripe Dashboard)

## Setup Steps

### 1. Create Stripe Account

1. Go to https://stripe.com and sign up for an account
2. Complete the account setup (business details, bank account, etc.)
3. For testing, you can use test mode keys

### 2. Get Your Stripe Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Go to **Developers** → **API keys**
3. Copy your **Publishable key** (starts with `pk_`)
4. Copy your **Secret key** (starts with `sk_`)

**Important:**
- Use **Test mode** keys for development/testing
- Use **Live mode** keys for production
- Never expose your Secret key in client-side code!

### 3. Set Environment Variables

#### For Local Development

Create a `.env` file in the project root:

```env
STRIPE_SECRET_KEY=sk_test_...your_secret_key_here
STRIPE_PUBLISHABLE_KEY=pk_test_...your_publishable_key_here
```

#### For Production (Render)

1. Go to your Render dashboard
2. Select your service
3. Go to **Environment** tab
4. Add these environment variables:
   - `STRIPE_SECRET_KEY` = your live secret key
   - `STRIPE_PUBLISHABLE_KEY` = your live publishable key

### 4. Install Dependencies

Run this command to install Stripe:

```bash
npm install
```

This will install the `stripe` package that was added to `package.json`.

### 5. Update Supabase Schema (Optional)

If you want to track payment information in your database, add these columns to your `pedidos` table:

```sql
ALTER TABLE pedidos 
ADD COLUMN payment_intent_id TEXT,
ADD COLUMN payment_status TEXT DEFAULT 'pending';
```

Or run this SQL in Supabase:

```sql
ALTER TABLE pedidos 
ADD COLUMN IF NOT EXISTS payment_intent_id TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending';
```

### 6. Test the Integration

1. Start your server: `npm run dev`
2. Open the menu page
3. Add items to cart
4. Click "Confirm Order"
5. The payment modal should open
6. Use Stripe test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC
   - Any ZIP code

## How It Works

1. **Customer adds items to cart** → Cart is updated
2. **Customer clicks "Confirm Order"** → Payment modal opens
3. **Payment Intent is created** → Server creates a Stripe Payment Intent
4. **Customer enters payment details** → Stripe Elements handles the form
5. **Payment is processed** → Stripe processes the payment (supports tap, Apple Pay, Google Pay)
6. **Order is created** → Only after successful payment, order is saved to database
7. **Confirmation** → Customer sees success message, cart is cleared

## Payment Methods Supported

- 💳 Credit/Debit Cards (Visa, Mastercard, Amex, etc.)
- 📱 Tap/Contactless payments
- 🍎 Apple Pay (on iOS devices)
- 🤖 Google Pay (on Android devices)

## Security

- Payment processing happens securely through Stripe
- Card details never touch your server
- PCI compliance handled by Stripe
- 3D Secure authentication supported

## Troubleshooting

### Payment modal doesn't open
- Check browser console for errors
- Verify `STRIPE_PUBLISHABLE_KEY` is set correctly
- Check that Stripe.js is loaded (check Network tab)

### Payment fails
- Verify `STRIPE_SECRET_KEY` is set correctly
- Check Stripe Dashboard for error logs
- Ensure you're using correct keys (test vs live)

### Apple Pay/Google Pay not showing
- These only appear on supported devices
- Ensure HTTPS is enabled (required for Apple Pay/Google Pay)
- Check Stripe Dashboard → Settings → Payment methods

## Support

- Stripe Documentation: https://stripe.com/docs
- Stripe Support: https://support.stripe.com
- Stripe Test Cards: https://stripe.com/docs/testing

## Cost

Stripe charges:
- **Australia**: 1.75% + $0.30 AUD per successful card charge
- No monthly fees
- No setup fees
- Only pay when you get paid

## Next Steps

1. Complete Stripe account setup
2. Add your bank account details
3. Test with test mode keys
4. Switch to live keys when ready
5. Monitor payments in Stripe Dashboard

