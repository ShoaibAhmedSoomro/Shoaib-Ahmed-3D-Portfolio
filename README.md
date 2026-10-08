# Shoaib Ahmed - 3D Portfolio Website

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://gsap.com/)

🔗 **Repository:** [github.com/ShoaibAhmedSoomro/Shoaib-Ahmed-3D-Portfolio](https://github.com/ShoaibAhmedSoomro/Shoaib-Ahmed-3D-Portfolio)

A high-performance, interactive portfolio website featuring 3D character animations, smooth scroll effects, and modern web technologies. Built with React, TypeScript, Three.js, and GSAP.

![Portfolio Preview](public/images/placeholder.webp)

---

## 🏷️ Topics / Keywords

```
react typescript threejs portfolio gsap vite three-fiber react-three-fiber web-development frontend 3d-portfolio interactive-portfolio developer-portfolio personal-website animations scroll-animations webgl javascript responsive-design nodejs fullstack-developer
```

---

## 🌟 Features

- **Interactive 3D Character** - Animated character model that responds to mouse/touch movements and follows scroll position
- **Smooth Scroll Experience** - GSAP ScrollSmoother provides butter-smooth scrolling with scroll-triggered animations
- **Horizontal Scroll Section** - Work portfolio section with horizontal scrolling effect
- **Physics-Based Tech Stack** - Interactive 3D spheres with physics simulation using React Three Fiber and Rapier
- **Dynamic Loading Screen** - Engaging loading experience with animated elements and progress tracking
- **Text Animations** - SplitText-powered character and word animations
- **Custom Cursor** - Enhanced cursor with magnetic effects on interactive elements
- **Responsive Design** - Fully responsive across desktop, tablet, and mobile devices
- **SEO Optimized** - Meta tags and semantic HTML for search engine visibility

---

## 🏗️ Architecture Overview

```
Portfolio-Website/
├── public/                     # Static assets
│   ├── images/                 # Image assets (logo, tech icons, placeholders)
│   ├── models/                 # 3D model files (.glb, .hdr)
│   ├── draco/                  # Draco decoder for compressed 3D models
│   └── resume/                 # Downloadable resume PDF
├── src/
│   ├── components/
│   │   ├── Character/          # 3D character scene and utilities
│   │   ├── sections/           # Page sections (Landing, About, Work, ...)
│   │   ├── ui/                 # Shared UI (Navbar, Cursor, Loading, ...)
│   │   └── MainContainer.tsx   # Section layout
│   ├── context/                # React context providers
│   ├── data/                   # Static data files
│   ├── styles/                 # All CSS
│   └── utils/                  # Animation and scroll utilities
├── index.html                  # HTML entry point
├── vite.config.ts              # Vite configuration
└── package.json                # Dependencies and scripts
```

---

## 📦 Component Breakdown

### Core Components

| Component | Purpose | Key Dependencies |
|-----------|---------|------------------|
| `App.tsx` | Root component, sets up providers and lazy loading | LoadingProvider |
| `MainContainer.tsx` | Main layout wrapper, renders all sections in order | All section components |
| `LoadingProvider.tsx` | Context provider for loading state management | React Context |

### Section Components

| Component | Purpose | Key Features |
|-----------|---------|--------------|
| `Landing.tsx` | Hero section with name and role display | Text loop animations |
| `About.tsx` | Personal introduction section | SplitText animations |
| `WhatIDo.tsx` | Skills showcase (Frontend & Backend) | Interactive skill cards |
| `Career.tsx` | Work experience timeline | Animated timeline with dots |
| `Work.tsx` | Portfolio projects with horizontal scroll | GSAP ScrollTrigger pinning |
| `TechStack.tsx` | Interactive 3D tech spheres | React Three Fiber, Rapier physics |
| `Contact.tsx` | Contact information and social links | Dynamic copyright year |

### UI Components

| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Fixed navigation with smooth scroll links |
| `Loading.tsx` | Loading screen with progress and welcome animation |
| `Cursor.tsx` | Custom cursor with magnetic effect |
| `SocialIcons.tsx` | Floating social media icons with resume download |
| `HoverLinks.tsx` | Animated hover effect for navigation links |
| `WorkImage.tsx` | Project image container with video support |

### 3D Character System

| File | Purpose |
|------|---------|
| `Character/Scene.tsx` | Main Three.js scene setup and render loop |
| `Character/utils/character.ts` | Character model loading (GLTF) |
| `Character/utils/lighting.ts` | Scene lighting configuration |
| `Character/utils/animationUtils.ts` | Character animation mixer |
| `Character/utils/mouseUtils.ts` | Mouse/touch input handling for head tracking |
| `Character/utils/resizeUtils.ts` | Responsive canvas resizing |

### Animation Utilities

| File | Purpose |
|------|---------|
| `utils/GsapScroll.ts` | Scroll-triggered animations for character and sections |
| `utils/splitText.ts` | Text splitting and reveal animations |
| `utils/initialFX.ts` | Initial page load animations |

---

## 🔄 Data Flow & Processing

### Loading Sequence

```
1. App.tsx renders LoadingProvider
   └── LoadingProvider shows Loading.tsx
       └── Scene.tsx starts loading 3D model
           └── setProgress() tracks loading percentage
               └── When 100%, triggers initialFX()
                   └── Plays intro animations
                       └── Sets isLoading=false, hides loader
```

### Scroll Animation Pipeline

```
1. User scrolls page
   └── ScrollSmoother intercepts scroll (smooth: 1.7)
       └── ScrollTrigger detects section positions
           └── Timeline animations execute based on scroll progress
               ├── Character transforms (rotation, position)
               ├── Section opacity/transform changes
               └── Element stagger animations
```

### 3D Character Interaction

```
1. Mouse/Touch event detected
   └── handleMouseMove() normalizes coordinates
       └── handleHeadRotation() calculates target rotation
           └── THREE.MathUtils.lerp() smooths movement
               └── Bone rotation applied each frame
```

---

## 🔗 Component Relationships

```mermaid
graph TD
    A[App.tsx] --> B[LoadingProvider]
    B --> C[Loading.tsx]
    B --> D[MainContainer.tsx]
    D --> E[Navbar.tsx]
    D --> F[SocialIcons.tsx]
    D --> G[Cursor.tsx]
    D --> H[Landing.tsx]
    D --> I[About.tsx]
    D --> J[WhatIDo.tsx]
    D --> K[Career.tsx]
    D --> L[Work.tsx]
    D --> M[TechStack.tsx]
    D --> N[Contact.tsx]
    H --> O[Character/Scene.tsx]
    O --> P[character.ts]
    O --> Q[lighting.ts]
    O --> R[animationUtils.ts]
    E --> S[ScrollSmoother]
    L --> T[WorkImage.tsx]
```

---

## ⚙️ Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `react` | ^18.3.1 | UI framework |
| `three` | ^0.168.0 | 3D graphics library |
| `@react-three/fiber` | ^8.17.10 | React renderer for Three.js |
| `@react-three/drei` | ^9.120.4 | Three.js helpers and abstractions |
| `@react-three/rapier` | ^1.5.0 | Physics engine for 3D |
| `gsap` | ^3.12.7 | Animation library (includes ScrollSmoother, SplitText - now free!) |
| `react-fast-marquee` | ^1.6.5 | Marquee text component |
| `react-icons` | ^5.3.0 | Icon library |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ShoaibAhmedSoomro/Shoaib-Ahmed-3D-Portfolio.git

# Navigate to project directory
cd Shoaib-Ahmed-3D-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

---

## 📁 Static Assets

### Images (`public/images/`)
- `logo.webp` - Site logo and favicon
- `react2.webp`, `next2.webp`, etc. - Tech stack sphere textures
- `placeholder.webp` - Project placeholder image

### 3D Models (`public/models/`)
- Character model (`.glb` format with Draco compression)
- Environment HDR for realistic lighting

### Resume (`public/resume/`)
- `Shoaib_Ahmed.pdf` - Downloadable resume

---

## 🎨 Styling Architecture

- **CSS Variables** - Global theming via `:root` variables
- **Component CSS** - Each component has dedicated `.css` file
- **Responsive Breakpoints**: 500px, 900px, 1024px, 1200px, 1400px, 1600px
- **Dark Theme** - Default dark color scheme (`--backgroundColor: #0b080c`)

---

## 🔧 Configuration Files

| File | Purpose |
|------|---------|
| `vite.config.ts` | Vite bundler configuration |
| `tsconfig.json` | TypeScript configuration |
| `eslint.config.js` | ESLint rules for code quality |
| `gsap-plugins.d.ts` | TypeScript declarations for GSAP premium plugins |

---

## 📈 Performance Optimizations

1. **Lazy Loading** - CharacterModel and MainContainer are lazy-loaded
2. **Suspense Boundaries** - Prevents layout shifts during loading
3. **Draco Compression** - 3D models compressed for faster loading
4. **WebP Images** - Optimized image format for faster loading
5. **Code Splitting** - Vite automatically splits chunks
6. **GPU Acceleration** - CSS transforms use `translateZ(0)`

---

## 📘 Maintenance Guide

**Update content**
| What | Where |
|------|-------|
| Job titles / timeline | `src/data/career.ts` (and re-export `public/resume/Shoaib_Ahmed.pdf`) |
| Projects | `src/data/projects.ts` |
| About text and quick facts | `src/components/sections/About.tsx` |
| Skills tags | `src/components/sections/WhatIDo.tsx` |

**Theming** — dark is the default; light mode is a token swap, not a second stylesheet. Semantic tokens (`--backgroundColor`, `--fg`, `--fgMute`, `--line`, `--surface`, ...) live in `src/styles/index.css`, with the light overrides under `:root[data-theme="light"]`. Never hard-code colours in component CSS; use a token. The inline script in `index.html` (and `public/theme.js` for static pages) applies the saved or OS theme before first paint; `src/utils/theme.ts` and `ThemeToggle` handle the switch.

**Icons** — brand logos come from Simple Icons via `react-icons/si` (also rendered to the 3D tech-stack balls in `TechStack.tsx`); UI icons use Lucide (`react-icons/lu`). Add a tech ball by appending to the `techs` array.

**Extra sections** — `Process`, `Credentials` and `Cta` (`src/components/sections/`, styles in `Extra.css`) sit around Career/Work and do not touch the character scroll timelines.

**Fonts** (loaded in `index.html`, tokens in `src/styles/index.css`): Bricolage Grotesque for headings (`--font-head`), Plus Jakarta Sans for body (`--font-body`), JetBrains Mono for labels (`--font-mono`).

**Icons & branding** — the logo is an "S" inside curly braces, a developer and server-rack motif (`public/favicon.svg`, concepts in `logos/`). Derived files: `favicon.ico`, `favicon-16/32.png`, `apple-touch-icon.png`, `icon-192/512.png`, `icon-maskable-512.png`, `og-image.png` (1200×630) and the white `images/logo.webp` used in the navbar/loader. Regenerate them all if the logo changes.

**SEO checklist** (domain `https://shoaibahmedsoomro.eu.cc`; `www.` redirects to it via `vercel.json`)
- `index.html`: title, description, canonical, Open Graph/Twitter, JSON-LD (`WebSite` + `Person`)
- `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`, `public/site.webmanifest`
- When the domain or job title changes, update all of the above plus `public/*.html`.

**Static pages** — `public/privacy.html`, `terms.html`, `disclaimer.html` and `404.html` share `public/legal.css`; Vercel serves them at `/privacy`, `/terms`, `/disclaimer` (`cleanUrls`) and uses `404.html` for unknown URLs. Add new ones to `sitemap.xml`.

**Deploy** — push to `main`; Vercel builds with `npm run build` (output `dist/`).

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shoaib Ahmed**

- Email: [soomro.shoaibahmed@gmail.com](mailto:soomro.shoaibahmed@gmail.com)
- LinkedIn: [linkedin.com/in/shoaibaofficial](https://linkedin.com/in/shoaibaofficial)
- GitHub: [github.com/ShoaibAhmedSoomro](https://github.com/ShoaibAhmedSoomro)
- Instagram: [instagram.com/Shoaib_AhmedSoomro](https://instagram.com/Shoaib_AhmedSoomro)
- Facebook: [facebook.com/shoaibahmedsoomroofficial](https://facebook.com/shoaibahmedsoomroofficial)

---

## 🙏 Acknowledgments

- Original template inspiration
- Three.js and React Three Fiber communities
- GSAP for powerful animation capabilities
