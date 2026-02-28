# 🚀 Deployment Guide for quantumsim.dev

## Quick Deploy to Vercel

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy from web/ directory

```bash
cd web
vercel --prod
```

### Step 4: Add Custom Domain

1. Go to your Vercel dashboard
2. Select your quantum-sim project
3. Go to Settings → Domains
4. Add `quantumsim.dev`
5. Follow the DNS instructions

## DNS Configuration

**For quantumsim.dev domain:**

Add these records to your DNS provider:

```
Type: A
Name: @
Value: 76.76.21.21
```

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Automatic Deployments

Connect your GitHub repo to Vercel for automatic deployments:

1. Push code to GitHub
2. Import repo in Vercel
3. Every push to `main` auto-deploys

## Environment Variables

None needed! This is a static site.

## Build Settings (Auto-detected)

- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

### Build fails?
```bash
cd web
npm install
npm run build
```

### Preview locally before deploy?
```bash
npm run build
npx serve dist
```

### Domain not working?
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct
- SSL certificate can take up to 1 hour

## Done! 🎉

Your quantum simulator will be live at https://quantumsim.dev
