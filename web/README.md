# 🔮 QuantumSim Web App

Interactive quantum computing simulator that runs in your browser.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`

## 🌐 Deploy to Vercel

### Option 1: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: GitHub Integration

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your `quantum-sim` repo
5. Vercel will auto-detect Vite settings
6. Click "Deploy"

### Option 3: Deploy Now

```bash
npm run build
vercel --prod
```

## 🔧 Custom Domain (quantumsim.dev)

After deploying to Vercel:

1. Go to your project settings
2. Click "Domains"
3. Add `quantumsim.dev`
4. Follow DNS setup instructions
5. Wait for SSL certificate (automatic)

**DNS Records needed:**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

OR

- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

## ✨ Features

- **Circuit Builder** - Drag-and-drop quantum gates
- **State Visualization** - Real-time probability distributions
- **Complex Amplitudes** - See the quantum state
- **Multiple Qubits** - Simulate up to 5 qubits
- **Beautiful UI** - Modern gradient design
- **Responsive** - Works on mobile & desktop

## 🎨 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **CSS3** - Styling with gradients
- **Vercel** - Hosting & deployment

## 📦 Build for Production

```bash
npm run build
```

Output in `dist/` folder.

## 🔗 Links

- Live Demo: [quantumsim.dev](https://quantumsim.dev)
- GitHub: [neilyneilynig/quantum-sim](https://github.com/neilyneilynig/quantum-sim)

## 📄 License

MIT
