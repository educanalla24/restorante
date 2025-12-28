# 🚀 Deploy to Render - Step by Step Guide

## ✅ Code is already on GitHub!

Your code is now at: https://github.com/educanalla24/restorante.git

## 📋 Steps to Deploy on Render

### 1. Go to Render Dashboard
- Visit: https://dashboard.render.com
- Sign in or create an account (you can use GitHub to sign in)

### 2. Create New Web Service
- Click **"New +"** button (top right)
- Select **"Web Service"**

### 3. Connect Your Repository
- Click **"Connect account"** if you haven't connected GitHub
- Select **"Connect GitHub"** and authorize Render
- Find and select your repository: **`educanalla24/restorante`**
- Click **"Connect"**

### 4. Configure the Service

Fill in the following:

- **Name**: `restorante-pedidos` (or any name you prefer)
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main`
- **Root Directory**: Leave empty (or `./` if required)
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free` (or choose a paid plan)

### 5. Set Environment Variables

Click on **"Advanced"** → **"Add Environment Variable"** and add:

```
SUPABASE_URL = https://suwxhntjjuyvjuhhhupe.supabase.co
```

```
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1d3hobnRqanV5dmp1aGhodXBlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Njg2MzUwNiwiZXhwIjoyMDgyNDM5NTA2fQ.uVuliNKLxD7nEXAhAFPEBiNZR0W7kBYWoZqu0G2qdJk
```

```
NODE_ENV = production
```

**⚠️ Important**: 
- Use the exact variable names shown above
- Copy the values exactly as shown (no extra spaces)
- The `SUPABASE_SERVICE_ROLE_KEY` is the long JWT token

### 6. Deploy!

- Click **"Create Web Service"**
- Wait for the build to complete (usually 2-5 minutes)
- You'll see logs showing the build progress

### 7. Your App is Live! 🎉

Once deployed, you'll get a URL like:
- `https://restorante-pedidos.onrender.com` (or similar)

### 8. Access Your App

- **Main page**: `https://your-app.onrender.com`
- **Client (Table 1)**: `https://your-app.onrender.com/mesa?mesa=1`
- **Admin Panel**: `https://your-app.onrender.com/admin`

## 🔧 Before First Use

### Important: Run SQL Schema in Supabase

Before using the app, you MUST run the SQL schema:

1. Go to Supabase: https://supabase.com/dashboard/project/suwxhntjjuyvjuhhhupe
2. Click **SQL Editor** (left sidebar)
3. Open `supabase-schema.sql` from your project
4. Copy and paste ALL the content
5. Click **Run** (or Ctrl+Enter)

This creates the tables and sample menu data.

## 📱 Generate QR Codes for Tables

Once your app is deployed, generate QR codes pointing to:
- Table 1: `https://your-app.onrender.com/mesa?mesa=1`
- Table 2: `https://your-app.onrender.com/mesa?mesa=2`
- etc.

You can use any QR code generator like:
- https://www.qr-code-generator.com/
- https://qr.io/

## ⚠️ Important Notes

1. **Free Plan Limitations**:
   - Service "sleeps" after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds to wake up
   - Consider upgrading for production use

2. **Environment Variables**:
   - Never commit `.env` file (it's in `.gitignore`)
   - Always set variables in Render dashboard

3. **Database**:
   - Make sure SQL schema is run before first use
   - You can run `update-menu-to-english.sql` if you want English menu items

## 🐛 Troubleshooting

### Build Fails
- Check that `package.json` has correct dependencies
- Verify Node version in `package.json` (should be >=14.0.0)

### App Shows Errors
- Check Render logs (click on your service → Logs)
- Verify environment variables are set correctly
- Make sure SQL schema was run in Supabase

### Can't Connect to Database
- Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct
- Check Supabase project is active

## ✅ Success Checklist

- [ ] Code pushed to GitHub ✅
- [ ] Render account created
- [ ] Web service created
- [ ] Environment variables set
- [ ] Service deployed successfully
- [ ] SQL schema run in Supabase
- [ ] App accessible via URL
- [ ] QR codes generated for tables

---

**Need Help?** Check Render docs: https://render.com/docs

