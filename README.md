# Ross Learned - Portfolio Website

A modern, immersive portfolio website featuring sophisticated 3D/spatial design combined with glassmorphism aesthetics. Built with React, Three.js, and Framer Motion.

![Portfolio Preview](./preview.png)

## 🚀 Features

- **Stunning 3D Hero Section** - Floating geometric shapes with real-time mouse parallax
- **Glassmorphism Design** - Modern frosted glass aesthetic throughout
- **Smooth Scroll Experience** - Buttery smooth scrolling with Lenis
- **Interactive 3D Cards** - Mouse-tracking tilt effects on all cards
- **Responsive Design** - Optimized for all devices
- **Custom Cursor** - Elegant cursor effects on desktop
- **Loading Animation** - Polished entrance experience
- **Dark Theme** - Deep navy/purple gradient aesthetic

## 🛠 Tech Stack

- **React** - Frontend framework
- **Vite** - Build tool
- **Three.js / React Three Fiber** - 3D graphics
- **Framer Motion** - Animations and transitions
- **GSAP** - Advanced animations
- **Lenis** - Smooth scrolling
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/rlearned/rosslearned-portfolio.git
cd rosslearned-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗 Build

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project to [Vercel](https://vercel.com)
3. Vercel will automatically detect the Vite framework
4. Deploy!

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Manual Deployment

The `vercel.json` configuration is already set up for optimal deployment.

## 📁 Project Structure

```
rosslearned-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── About.jsx          # About section with education & tech stack
│   │   ├── Contact.jsx        # Contact section with social links
│   │   ├── CustomCursor.jsx   # Custom cursor component
│   │   ├── Experience.jsx     # Work experience cards
│   │   ├── Hero.jsx           # Hero section with 3D background
│   │   ├── Loader.jsx         # Loading animation
│   │   ├── Navigation.jsx     # Hamburger menu navigation
│   │   ├── NoiseOverlay.jsx   # Grain texture overlay
│   │   └── Projects.jsx       # Projects section with modal
│   ├── App.jsx                # Main app component
│   ├── index.css              # Global styles & Tailwind
│   └── main.jsx               # Entry point
├── index.html                 # HTML template with meta tags
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── vercel.json                # Vercel deployment config
└── vite.config.js             # Vite configuration
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color palette:

```js
colors: {
  'deep-navy': '#0a0a1a',
  'deep-purple': '#1a0a2e',
  'accent-purple': '#8b5cf6',
  'accent-violet': '#a855f7',
}
```

### Content
Update the content in each component file:
- `Experience.jsx` - Work history
- `Projects.jsx` - Featured projects
- `About.jsx` - Bio and tech stack
- `Contact.jsx` - Contact information and social links

### 3D Elements
Customize 3D shapes in `Hero.jsx`:
- Adjust positions, colors, and animation speeds
- Add or remove geometric shapes
- Modify particle effects

## ⚡ Performance

- Lazy-loaded 3D elements
- GPU-accelerated animations using `transform` and `opacity`
- Code splitting with Vite
- Optimized asset loading
- Respects `prefers-reduced-motion` accessibility setting

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 👤 Author

**Ross Learned**
- LinkedIn: [ross-learned](https://linkedin.com/in/ross-learned)
- GitHub: [rlearned](https://github.com/rlearned)
- Email: ross.c.learned@gmail.com

---

Built with ❤️ using React, Three.js, and Framer Motion
