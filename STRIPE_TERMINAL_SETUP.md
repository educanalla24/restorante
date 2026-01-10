# Stripe Terminal Setup Guide

This guide will help you set up Stripe Terminal for in-person payments at your restaurant counter.

## What is Stripe Terminal?

Stripe Terminal allows you to accept in-person payments using physical card readers. Customers can:
- Tap their card or phone (contactless)
- Insert their card (chip)
- Swipe their card (magnetic stripe)

## Prerequisites

1. **Stripe Account**: You need an active Stripe account
2. **Terminal Hardware**: You need to order a Stripe Terminal reader
3. **Stripe Terminal API**: Already integrated in this application

## Hardware Options

Stripe offers several Terminal readers:

1. **Stripe Reader M2** (Recommended for restaurants)
   - Wireless, battery-powered
   - Supports tap, chip, and swipe
   - Works with iPad, iPhone, Android devices
   - Price: ~$249 AUD

2. **BBPOS WisePOS E** (Countertop)
   - Wired or wireless
   - Full POS system
   - Price: ~$399 AUD

3. **Verifone P400** (Countertop)
   - Wired
   - Large display
   - Price: ~$299 AUD

**Order hardware**: https://stripe.com/terminal/hardware

## Setup Steps

### 1. Order Terminal Hardware

1. Go to https://stripe.com/terminal/hardware
2. Choose a reader (M2 recommended for restaurants)
3. Complete the order
4. Wait for delivery (usually 1-2 weeks)

### 2. Register Your Terminal

Once you receive your hardware:

1. Log in to Stripe Dashboard: https://dashboard.stripe.com
2. Go to **Terminal** → **Readers**
3. Click **Register reader**
4. Follow the instructions to register your device
5. Note your **Location ID** (you'll need this for production)

### 3. Configure the Application

#### For Testing (Simulated Reader)

The application is currently configured to use a **simulated reader** for testing. This allows you to test the payment flow without physical hardware.

To test:
1. Open the Cashier Terminal page: `http://localhost:3000/cashier/`
2. Click "Connect Terminal Reader"
3. It will connect to a simulated reader
4. Select an order and process payment
5. Use test card: `4242 4242 4242 4242`

#### For Production (Real Hardware)

When you have your physical reader:

1. **Update `cashier.js`**:
   - Change `simulated: true` to `simulated: false`
   - Add your `location` ID if you have multiple locations

2. **Connect your reader**:
   - Turn on your Stripe Terminal reader
   - Make sure it's charged (if wireless)
   - Click "Connect Terminal Reader" in the cashier page
   - The app will discover and connect to your reader

### 4. Using the Cashier Terminal

1. **Open Cashier Page**: Navigate to `/cashier/` in your application
2. **View Pending Orders**: Orders with status "pendiente" will appear
3. **Select an Order**: Click on an order to select it for payment
4. **Connect Reader**: Click "Connect Terminal Reader" (if not already connected)
5. **Process Payment**: Click "Process Payment"
6. **Customer Pays**: Customer taps, inserts, or swipes their card
7. **Payment Complete**: Order is automatically updated with payment status

## How It Works

1. **Customer orders** → Order created with status "pendiente"
2. **Cashier selects order** → Order details displayed
3. **Terminal reader connects** → Stripe Terminal SDK connects to hardware
4. **Payment intent created** → Server creates PaymentIntent for Terminal
5. **Customer presents card** → Card read by Terminal hardware
6. **Payment processed** → Stripe processes the payment
7. **Order updated** → Order status updated with payment information

## Security

- All card data is encrypted
- Card details never touch your server
- PCI compliance handled by Stripe
- Payments are processed securely through Stripe's network

## Testing

### Test Cards

Use these test cards in **test mode**:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Insufficient funds**: `4000 0000 0000 9995`

### Test Mode vs Live Mode

- **Test Mode**: Use test cards, no real charges
- **Live Mode**: Real payments, real charges

Switch modes in Stripe Dashboard → **Developers** → **API keys**

## Troubleshooting

### Reader Not Found

- Make sure reader is turned on
- Check battery level (if wireless)
- Ensure reader is registered in Stripe Dashboard
- Try disconnecting and reconnecting

### Connection Failed

- Check internet connection
- Verify Stripe API keys are correct
- Check browser console for errors
- Ensure HTTPS is enabled (required for Terminal)

### Payment Failed

- Check Stripe Dashboard for error details
- Verify payment intent was created successfully
- Check that card was presented correctly
- Review error message in payment status

## Cost

Stripe Terminal charges:
- **Hardware**: One-time purchase (~$249-$399 AUD)
- **Transaction fees**: Same as online payments (1.75% + $0.30 AUD)
- **No monthly fees**
- **No setup fees**

## Support

- Stripe Terminal Docs: https://stripe.com/docs/terminal
- Stripe Support: https://support.stripe.com
- Terminal Hardware Support: Contact Stripe support

## Next Steps

1. Order Terminal hardware
2. Register reader in Stripe Dashboard
3. Test with simulated reader
4. Switch to production mode when ready
5. Train staff on using the cashier terminal

## Code Locations

- **Cashier Page**: `/public/cashier/index.html`
- **Cashier Logic**: `/public/cashier/cashier.js`
- **Terminal Endpoints**: `/server.js` (lines ~355-450)
- **Terminal SDK**: Loaded from Stripe CDN

