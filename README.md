# Detailing Riga — Shop

## Quick Start (local dev)

```bash
npm install
npm run dev
```

Open `http://localhost:4321/shop/`

## Deploy to Netlify

### 1. Create GitHub repo

```bash
git init
git add .
git commit -m "init shop"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2. Connect to Netlify

1. Go to [app.netlify.com](https://app.netlify.com)
2. "Add new site" → "Import an existing project" → select your GitHub repo
3. Build settings are auto-detected from `netlify.toml` — no changes needed
4. Click "Deploy"

### 3. Set environment variables

In Netlify dashboard → Site settings → Environment variables, add:

| Variable | Value |
|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_...` (from Stripe Dashboard → Developers → API keys) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (from Stripe Dashboard → Developers → Webhooks) |
| `SITE` | `https://your-site.netlify.app` (your Netlify URL or custom domain) |

### 4. Set up Stripe webhook

1. Stripe Dashboard → Developers → Webhooks → "Add endpoint"
2. URL: `https://your-site.netlify.app/api/webhook`
3. Events: select `checkout.session.completed`
4. Copy the signing secret → paste as `STRIPE_WEBHOOK_SECRET` in Netlify

### 5. Enable Stripe email receipts

Stripe Dashboard → Settings → Emails → Enable "Successful payments"

### 6. Add your products

1. Create products in Stripe Dashboard → Products
2. Copy each Price ID (`price_...`)
3. Update `src/data/products.ts` with your real products and Price IDs
4. Add product images to `src/assets/images/shop/`
5. Push to GitHub — Netlify auto-deploys

### 7. Go live

1. In Stripe Dashboard, switch from Test to Live mode
2. Update `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` in Netlify with live keys
3. Update `SITE` if using a custom domain

## Project structure

```
src/
  pages/
    shop/              — all shop pages
    api/               — serverless functions (checkout, webhook)
  components/          — Astro + Preact components
  data/products.ts     — product catalog (edit this)
  stores/cart.ts       — cart state (Nano Stores)
  layouts/Layout.astro — global layout + styles
```
