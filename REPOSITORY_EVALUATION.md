# Repository Evaluation Report — Shoaib Ahmed 3D Portfolio

**Repository:** `Shoaib-Ahmed-3D-Portfolio`
**Type:** Personal portfolio website (single-page application)
**Primary Stack:** React 18 + TypeScript + Vite + Three.js + GSAP
**Evaluated:** 2026-05-25

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Architecture Overview](#2-architecture-overview)
3. [Dependency Analysis](#3-dependency-analysis)
4. [File-by-File Breakdown](#4-file-by-file-breakdown)
   - 4.1 [Project Root](#41-project-root)
   - 4.2 [`src/` Entry & App Shell](#42-src-entry--app-shell)
   - 4.3 [`src/components/` Section Components](#43-srccomponents-section-components)
   - 4.4 [`src/components/` UI Components](#44-srccomponents-ui-components)
   - 4.5 [`src/components/Character/` 3D System](#45-srccomponentscharacter-3d-system)
   - 4.6 [`src/components/utils/` Animation Helpers](#46-srccomponentsutils-animation-helpers)
   - 4.7 [`src/context/` and `src/data/`](#47-srccontext-and-srcdata)
   - 4.8 [`public/` Static Assets](#48-public-static-assets)
5. [Strengths](#5-strengths)
6. [Weaknesses & Risks](#6-weaknesses--risks)
7. [Recommendations](#7-recommendations)
8. [Appendix — Severity Matrix](#8-appendix--severity-matrix)

---

## 1. Executive Summary

This is a **high-effort, visually rich personal portfolio** built around an interactive 3D character (Three.js GLTF) with heavy GSAP scroll choreography, a physics-driven tech-stack section (React Three Fiber + Rapier), a custom loading sequence, and a custom cursor. The code is delivered as a Vite-built SPA deployable on Netlify.

**Overall quality:** Solid product, mid-grade engineering. The visuals are well-executed and the architecture (lazy loading, context-based loading state, separation of character utilities) is reasonable. However the codebase shows several anti-patterns typical of organically-grown portfolio projects: imperative DOM access inside React components, a globally-mutable `smoother` export, useEffect handlers without proper cleanup, mixed responsibilities in `Scene.tsx`, weak typing in 3D code (`any`), and a "decrypt-the-model-on-the-client" pattern that provides no real security.

**Suitable for:** Portfolio/demo use. **Not suitable as-is for:** a template for production multi-developer apps without refactoring.

---

## 2. Architecture Overview

```
index.html
   └── src/main.tsx                 ── React root + StrictMode
        └── src/App.tsx             ── LoadingProvider + lazy Suspense boundaries
             ├── Loading.tsx        ── Splash + fake-progress animation
             └── MainContainer.tsx  ── Layout shell, responsive switch, GSAP smooth-scroll wrapper
                  ├── Cursor / Navbar / SocialIcons
                  ├── Landing → (renders Character on mobile)
                  ├── About / WhatIDo / Career / Work
                  ├── TechStack (lazy, R3F + Rapier physics)
                  └── Contact
        └── Character/Scene.tsx     ── Imperative Three.js scene (separate root, mounted into a div)
```

Two **parallel 3D renderers** run at the same time:
- A **hand-rolled Three.js scene** for the character (`Character/Scene.tsx`), driven by `useEffect` and `requestAnimationFrame`.
- A **React Three Fiber Canvas** for the tech-stack spheres (`TechStack.tsx`).

GSAP **ScrollSmoother** wraps `#smooth-wrapper`/`#smooth-content` and most section animations are wired via **ScrollTrigger** timelines defined in `utils/GsapScroll.ts`.

**Loading state** is centralised in `LoadingContext`. The character scene reports progress through a fake-progress generator (`setProgress` in `Loading.tsx`) instead of real GLTF loader progress events.

---

## 3. Dependency Analysis

| Package | Purpose | Notes |
|---|---|---|
| `react`, `react-dom` 18.3 | UI runtime | Standard. |
| `three` 0.168 + `three-stdlib` | Core 3D | Loose pin via caret. |
| `@react-three/fiber`, `drei`, `postprocessing` | R3F renderer + helpers | Only used by `TechStack.tsx`. |
| `@react-three/rapier` | Physics for tech sphere section | Heavy dep used in one component. |
| `@react-three/cannon` | (listed) | **Unused** — no `import` references found. Dead dependency. |
| `gsap` 3.12 | Animations + ScrollSmoother + SplitText | SplitText/ScrollSmoother now free. |
| `react-fast-marquee` | Loading marquee text | Single use. |
| `react-icons` | Social/UI icons | Standard. |
| `@vercel/analytics` | Analytics | **Imported nowhere** in source. Dead dependency. |
| `@types/three` | Three.js types | OK. |

**Bundle bloat risk:** `cannon`, `vercel/analytics`, and parts of `drei`/`postprocessing` likely ship to the client without being exercised. A bundle audit (`vite build --report`) would confirm.

---

## 4. File-by-File Breakdown

### 4.1 Project Root

| File | Purpose | Assessment |
|---|---|---|
| `index.html` | SPA entry. Mounts `#root`, loads `/src/main.tsx`. Includes basic SEO meta (description, keywords, author, favicon). | Minimal but adequate. **Missing**: Open Graph / Twitter Card tags, canonical URL, theme-color, language metadata beyond `lang="en"`. |
| `package.json` | Project manifest. Scripts: `dev`, `build` (`tsc -b && vite build`), `lint`, `preview`. | Standard. Contains **2 unused deps** (see §3). No `start`, no `test` script. |
| `package-lock.json` | npm lockfile. | OK. |
| `vite.config.ts` | Vite config — `react()` plugin only. | Bare-bones. No bundle splitting hints, no asset config, no `define` for env vars, no analyzer plugin. |
| `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` | TS project references. App config uses `strict: true`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. | Good strictness. Build artifacts `*.tsbuildinfo` are committed (should be in `.gitignore`). |
| `eslint.config.js` | Flat ESLint config with `@eslint/js` recommended + typescript-eslint recommended + react-hooks + react-refresh. | Good baseline. No custom rules for code style or import order. |
| `.gitignore` | Standard. | Not inspected in depth; build info files are committed alongside, suggesting it may miss them. |
| `netlify.toml` | Deployment config: `npm run build` → `dist/`, Node 18, SPA fallback redirect. | Correct for SPA. Node 18 is approaching EOL — bump to 20+. |
| `LICENSE` | MIT. | Fine. |
| `README.md` | Extensive feature/architecture doc, badges, mermaid diagram, recommendations checklist. | **Strong** — among the best-documented parts of the project. |
| `Shoaib_Ahmed.md` | Personal résumé in markdown. | Content file; not used by the app. |
| `test.js` | 17 lines referencing undefined `clickElement` and `video`. | **Dead/scratch code.** Should be deleted; not a real test. |
| `tsconfig.app.tsbuildinfo`, `tsconfig.node.tsbuildinfo` | Incremental TS build caches. | **Should not be committed.** Add to `.gitignore`. |
| `dist/` | Build output. | **Should not be committed.** Add to `.gitignore`. |

### 4.2 `src/` Entry & App Shell

| File | Purpose | Assessment |
|---|---|---|
| `main.tsx` | Mounts `<App>` into `#root` with `StrictMode`. | Idiomatic. |
| `App.tsx` | Wraps app in `LoadingProvider`, lazy-imports `MainContainer` and `CharacterModel`, nests them in `Suspense`. | Clean. **Weakness:** `<Suspense>` has no `fallback` (defaults to nothing) — there is no visual fallback if the lazy chunks are slow on a real network. |
| `App.css`, `index.css` | Global styles and resets. | Not inspected in depth. |
| `assets/react.svg` | Default Vite asset, appears unused. | Remove. |
| `vite-env.d.ts` | Vite's ambient types. | Standard. |
| `gsap-plugins.d.ts` | Hand-written declarations for `gsap/SplitText` and `gsap/ScrollSmoother`. | Reasonable since the official types may lag. Maintain alongside GSAP upgrades. |

### 4.3 `src/components/` Section Components

| File | Purpose | Assessment |
|---|---|---|
| `MainContainer.tsx` | Layout shell. Watches `window.innerWidth` to decide where to render the `children` (= 3D character): outside the smooth-scroll wrapper on desktop, *inside* `<Landing>` on mobile. Calls `setSplitText()` on resize. | Clear intent but **subtle bugs**: the `useEffect` lists `isDesktopView` as a dep, which causes it to re-attach the resize listener every time the breakpoint flips. The `resizeHandler` ref isn't stable across the two `add/removeEventListener` calls in different effect runs, so cleanup actually removes a *different* function than was added. Use a `useRef`'d handler. |
| `Landing.tsx` | Hero with name and looping `Developer/Engineer` text. | Simple, mostly markup. Class names are tightly coupled to GSAP selectors in `initialFX.ts` / `GsapScroll.ts` — refactors will silently break animations. |
| `About.tsx` | Static "About Me" copy with `.title`/`.para` classes consumed by `setSplitText`. | Pure presentational. Fine. |
| `WhatIDo.tsx` | Two skill cards (Frontend / Backend & Cloud). On touch devices, attaches click handlers to toggle `active` / `sibling` classes. | **Cleanup bug:** the `removeEventListener` in the cleanup uses a *new* arrow function — the listener never actually detaches. Save the handler in a ref. |
| `Career.tsx` | Static timeline of jobs. | Fine, hard-coded content. Should likely be data-driven (move to `src/data/`). |
| `Work.tsx` | Pinned horizontal-scroll project showcase, desktop only. Computes `translateX` from real DOM measurements. | Reasonable. Hard-coded project list; projects all point to a single GitHub *profile* URL with `placeholder.webp` thumbnails — content is clearly TODO. Cleanup is good (`timeline.kill()`). |
| `TechStack.tsx` | R3F scene with Rapier physics: ~30 (or 15 on mobile) textured spheres pulled toward origin; mouse acts as a kinematic pointer. Activates only after scrolling past `#work`. | Well-structured for an R3F component. **Issues**: (1) `textureLoader.load(...)` runs at module-eval time, so textures load before the component is needed — defeats lazy loading partially. (2) `useMemo` for `materials` depends on `textures` (module-level array), not declared — OK functionally but lint-noisy. (3) Per-frame `applyImpulse` allocates a `new THREE.Vector3` per sphere per frame. (4) Random material selection on every render: `materials[Math.floor(Math.random()*...)]` inside JSX — produces flicker on re-render. Move into the sphere data. |
| `Contact.tsx` | Static contact info + dynamic copyright year. | Fine. `target="_blank"` links lack `rel="noopener noreferrer"`. |

### 4.4 `src/components/` UI Components

| File | Purpose | Assessment |
|---|---|---|
| `Navbar.tsx` | Header with logo, email, nav links. **Side-effectful:** creates `ScrollSmoother`, exports a global `let smoother` consumed elsewhere. | **Anti-pattern.** Mutable module-scoped export creates an implicit dependency graph that's hard to test and easy to break. Use the loading context or a dedicated `useSmoother` hook. Also: the resize handler is added but never removed. |
| `Loading.tsx` | Splash screen with marquee, animated "loading" pong-style game, and "Welcome" reveal. Exports `setProgress` — a fake progress generator with two `setInterval` phases and a `loaded()` finalizer. | Visually nice. **Issues**: (1) `if (percent >= 100) { setTimeout(... setLoaded(true)) }` runs during render — calling setState during render triggers extra renders and can fire multiple timeouts. Move to `useEffect([percent])`. (2) "Progress" is a random walk, not real load progress. (3) `useEffect` re-imports `initialFX` on every `isLoaded` change rather than once. |
| `Cursor.tsx` | Custom cursor that lerps toward the mouse, with hover modes (`icons`, `disable`) read from `data-cursor` attributes. | Works, but **no cleanup**: `mousemove`, `requestAnimationFrame` loop, and the per-element `mouseover/mouseout` listeners are never removed. In StrictMode dev this causes double-binding. |
| `HoverLinks.tsx` | Tiny presentational component for the hover-reveal nav label effect. | Clean. |
| `SocialIcons.tsx` | Floating social icons with a magnetic-cursor effect + résumé download. | **Bugs**: (1) `getBoundingClientRect()` is captured once on mount and never refreshed on scroll/resize, so the "magnetic" math drifts as the page moves. (2) The internal `updatePosition` rAF loop has no cancellation — it runs forever, including after unmount. (3) Cleanup tries to `removeEventListener` from `elem` but the listener was added to `document`. |
| `WorkImage.tsx` | Image with optional hover-to-load video. | **Bug:** `fetch(\`src/assets/${props.video}\`)` uses a literal `src/...` path, which only works during dev with Vite serving the source tree. After build, `src/` doesn't exist on the server. Either import the asset (`new URL('./asset', import.meta.url)`) or move videos to `public/`. Also no error handling, no `revokeObjectURL`. |

### 4.5 `src/components/Character/` 3D System

| File | Purpose | Assessment |
|---|---|---|
| `index.tsx` | Tiny wrapper that returns `<Scene />`. | Unnecessary indirection — `Scene.tsx` could be the default export. |
| `Scene.tsx` | The heart of the 3D character: builds a `THREE.Scene`, `WebGLRenderer`, `PerspectiveCamera`, wires lighting, character load, animation mixer, mouse/touch input, head bone IK-ish rotation, and a per-frame `requestAnimationFrame` loop. | **Largest weak point** of the codebase. See detailed issues below. |
| `exports.ts` | Empty file. | Delete. |
| `utils/character.ts` | Loads GLTF via DRACO loader, after first AES-decrypting `/models/character.enc`. Compiles the model, sets shadow flags, kicks off GSAP scroll timelines, hard-codes foot Y positions. | Mixes **loading**, **post-processing**, and **scroll-animation registration** in one function. The post-process foot adjustment is a brittle hack. |
| `utils/decrypt.ts` | AES-CBC decrypt of an encrypted GLTF blob using a hard-coded password `"Character3D#@"`. | **Security theater.** The password ships in the JS bundle, so anyone can extract the model. Adds CPU + memory cost (decrypt → Blob → URL) for no real protection. Either drop the encryption or actually gate it server-side. |
| `utils/lighting.ts` | Sets up directional + point lights and HDR environment; exposes `turnOnLights()` (GSAP fade-in) and `setPointLight(screenLight)` (per-frame intensity from the character's "screenlight" material). | Reasonable. `setPointLight` reads `screenLight.material.opacity` without null-checking. Typed as `any`. |
| `utils/mouseUtils.ts` | Pure functions for mouse/touch → normalized coords and head-bone lerp logic. | Cleanest file in the 3D folder. Good separation. Magic numbers (rotations, lerps) could be extracted. |
| `utils/resizeUtils.ts` | On resize: updates renderer & camera, kills all ScrollTriggers (except `work`), and re-creates the timelines. | Aggressive but pragmatic. Killing/recreating triggers on every resize is expensive — debounce it. |
| `utils/animationUtils.ts` | Sets up the GLTF AnimationMixer, plays intro + ambient clips, builds **filtered** animation clips that drive specific bone subsets (typing, eyebrow). Hover handler on a div toggles eyebrow animation. | Good use of `AnimationClip` filtering. `hover()` accepts `gltf` again even though it has access in closure — minor. The `hover` cleanup returned from the function is **never called** by `Scene.tsx`. |

**Specific `Scene.tsx` issues:**

1. **Effect dependency array is `[]`** but the body reads `setLoading` from context — works only because the context value's identity changes don't matter here, but it's fragile.
2. **`document.addEventListener("mousemove", ...)`** uses an *inline* arrow, then the cleanup tries `removeEventListener("mousemove", onMouseMove)` with the *named* function — different references, listener leaks.
3. The `window.addEventListener("resize", () => handleResize(...))` cleanup again uses a *new* arrow — leak.
4. **`canvasDiv.current` is captured at the top but referenced again in the cleanup** — by then the React ref may have been nulled, causing the `removeChild` to throw silently.
5. State `character` is set but never read.
6. **Memory:** dispose pattern is incomplete — no geometry/material/texture disposal.

### 4.6 `src/components/utils/` Animation Helpers

| File | Purpose | Assessment |
|---|---|---|
| `GsapScroll.ts` | Defines the master scroll timelines (`setCharTimeline`, `setAllTimeline`) tying camera, character rotation, monitor material, screen-light flicker, etc. to `ScrollTrigger`s. | The animation choreography is impressive but the code is **brittle** — selectors are stringly-typed, `child.material.name === "Material.027"` hard-codes Blender export names, and `setInterval` for "intensity" runs forever (no cleanup). Materials are mutated globally. |
| `initialFX.ts` | Plays the intro SplitText/fade animations after loading. Imports the global `smoother` and un-pauses it. | Coupled to `Navbar`'s module-scoped `smoother`. Animations are stable and look good. |
| `splitText.ts` | Re-applies SplitText/ScrollTrigger animations to `.para` and `.title` elements on layout changes. Below 900px it short-circuits. | Calls `setSplitText()` recursively via `ScrollTrigger.addEventListener("refresh", ...)` — listener is added every call, so each resize multiplies the handlers exponentially. **Memory leak.** |

### 4.7 `src/context/` and `src/data/`

| File | Purpose | Assessment |
|---|---|---|
| `context/LoadingProvider.tsx` | Provides `{ isLoading, setIsLoading, setLoading }` to children. Renders `<Loading percent={loading} />` while loading. | Clean. The `useEffect(() => {}, [loading])` is dead — delete it. The `value as LoadingType` cast is unnecessary. |
| `data/boneData.ts` | Static lists of bone names used to filter the AnimationMixer's bone tracks (typing fingers, eyebrows). | Good separation — content lives outside logic. |

### 4.8 `public/` Static Assets

| Path | Notes |
|---|---|
| `public/draco/draco_decoder.{js,wasm}` | Draco decoder for compressed GLTF. Loaded by `dracoLoader.setDecoderPath("/draco/")`. Correct placement. |
| `public/models/character.glb` | Plain (un-encrypted) GLTF — *also* shipped alongside the `.enc`, defeating the encryption entirely. **Remove one.** |
| `public/models/character.enc` | AES-CBC-encrypted GLTF. |
| `public/models/char_enviorment.hdr` | Filename is misspelled ("enviorment"). Referenced by that name in code, so it works, but worth renaming. |
| `public/models/encrypt.cjs` | Build-time helper to produce `character.enc`. Not used at runtime; OK to keep but document. |
| `public/images/*.webp` | Tech-stack textures + logo + placeholder. WebP is the right choice. Many redundant numbered variants (`next.webp`, `next1.webp`, `next2.webp`, `nextBL.webp`) — clean up unused. |
| `public/resume/Shoaib_Ahmed.pdf` | Résumé download. |

---

## 5. Strengths

1. **Ambitious, polished visual design** — the 3D character, smooth scroll choreography, physics tech-stack, and bespoke loading screen are genuinely impressive for a portfolio.
2. **Good README/docs** — architecture diagram, component table, scripts, and a roadmap.
3. **TypeScript strict mode** is on (`strict`, `noUnusedLocals`, `noUnusedParameters`), and the project compiles under it.
4. **Reasonable separation of 3D concerns** — `Character/utils/*` splits character loading, lighting, mouse handling, and animations into separate files.
5. **Lazy loading** of `MainContainer`, `CharacterModel`, and `TechStack` (the three heaviest chunks).
6. **Draco-compressed GLTF + WebP** show attention to asset weight.
7. **Linting + flat ESLint config + react-hooks + react-refresh** baseline is in place.
8. **Responsive switching** — desktop vs mobile rendering paths are clearly separated.
9. **Netlify config is correct** for an SPA (with redirect fallback).

---

## 6. Weaknesses & Risks

### Code quality / correctness

- **Multiple event-listener leaks** (`Cursor.tsx`, `Scene.tsx`, `Navbar.tsx`, `SocialIcons.tsx`, `WhatIDo.tsx`) — handlers added with inline arrows but cleaned up with different references, or never cleaned up at all.
- **State-mutation-in-render** in `Loading.tsx` (the `if (percent >= 100) { setTimeout(setLoaded(true)) }` block).
- **`splitText.ts` registers a new `ScrollTrigger.refresh` listener on every call**, geometrically multiplying listeners over time.
- **`MainContainer.tsx` resize effect** re-attaches on every breakpoint flip, and cleanup doesn't remove the same handler instance.
- **`WorkImage.tsx` fetches from `src/assets/...`** which won't resolve in a production build.
- **`Scene.tsx` cleanup is incomplete** — geometries/materials/textures aren't disposed, and the `removeChild` call uses a possibly-null ref.
- **`Navbar.tsx` exports a mutable `smoother`** as a module-scoped `let`. Implicit global state.

### Architecture / design

- **Mixed paradigms in 3D code:** plain Three.js for the character, R3F for the tech stack. Increases cognitive load and bundle size.
- **`Scene.tsx` is ~160 lines doing 8 things at once** — should be split into smaller hooks or a controller class.
- **`GsapScroll.ts` is selector-driven** and tightly coupled to specific class names, Blender mesh names, and material names. Refactor-hostile.
- **Career and Work content is hard-coded** in JSX rather than data-driven.

### Security / privacy

- **`decrypt.ts` is security theater.** The password is in the bundle, and the plain `character.glb` is shipped alongside the `.enc`. Either remove the encryption or implement it server-side with auth.
- **External link `target="_blank"`** without `rel="noopener noreferrer"` is a minor reverse-tabnabbing risk.

### Performance

- **Module-level texture loading in `TechStack.tsx`** loads all sphere images at app start, partially defeating its own lazy boundary.
- **`setInterval(() => intensity = Math.random(), 200)`** in `GsapScroll.ts` runs forever, even when the character section is off-screen.
- **No `requestAnimationFrame` cancellation** anywhere (Cursor, Scene, SocialIcons).
- **Two simultaneous WebGL contexts** (Character + TechStack) on a single page taxes mid-range GPUs.
- **`new THREE.Vector3()` allocations per frame** in the sphere impulse code create GC pressure.

### Tooling / repo hygiene

- `dist/` and `*.tsbuildinfo` files are committed.
- `test.js` is dead scratch code referencing undefined globals.
- `src/assets/react.svg` (default Vite scaffold) and `Character/exports.ts` (empty file) are unused.
- Unused dependencies: `@react-three/cannon`, `@vercel/analytics`.
- Node 18 in `netlify.toml` is approaching EOL.
- No tests, no CI workflow, no Husky/lint-staged.

### Accessibility / SEO

- Most interactive elements (custom cursor, social hover, work cards) have **no keyboard support** and no ARIA labels.
- The custom cursor doesn't respect `prefers-reduced-motion`.
- `index.html` lacks Open Graph / Twitter meta, JSON-LD structured data, sitemap, robots.txt.

---

## 7. Recommendations

Ordered roughly by **impact ÷ effort**.

### Quick wins (≤1 day each)

1. **Delete dead code/files:** `test.js`, `src/assets/react.svg`, `src/components/Character/exports.ts`, the `useEffect(() => {}, [loading])` in `LoadingProvider`.
2. **Add `dist/`, `*.tsbuildinfo` to `.gitignore`** and remove tracked copies.
3. **Drop unused deps:** `@react-three/cannon`, `@vercel/analytics`.
4. **Add `rel="noopener noreferrer"`** to all `target="_blank"` anchors.
5. **Bump `NODE_VERSION` in `netlify.toml`** to `20`.
6. **Fix `WorkImage.tsx`** to load videos via `import.meta.url` or from `public/`.
7. **Either remove `character.glb`** (keep only `.enc`) or remove the decryption layer entirely.
8. **Resolve `data-cursor={!cursor && "disable"}`** in `HoverLinks.tsx` — this currently emits the literal string `"false"` when `cursor` is true.

### Correctness fixes (1–3 days)

9. **Fix every leaky listener / rAF**: store handlers in `useRef`, return matching cleanups, cancel rAF with `cancelAnimationFrame`.
10. **Move state mutation out of render** in `Loading.tsx`.
11. **Make `splitText.ts`'s `refresh` listener idempotent** (attach once at module init, not on every call).
12. **Stabilise `MainContainer.tsx`'s resize handler** with `useCallback`/`useRef`.
13. **Refactor `Navbar.tsx` to expose `smoother` via context**, not a module `let`.
14. **Properly dispose `Scene.tsx`** — traverse the scene and dispose geometries, materials, textures, plus call `renderer.forceContextLoss()` on unmount.

### Architecture improvements (1–2 weeks)

15. **Move Career and Work content into `src/data/`** as typed arrays; render via `.map`.
16. **Decouple GSAP timelines from DOM selectors** — pass refs in via props or a registry.
17. **Split `Scene.tsx`** into custom hooks: `useRenderer`, `useCharacter`, `useHeadTracking`, `useResize`.
18. **Stop animating offscreen** — pause the character's `requestAnimationFrame` loop with `IntersectionObserver`.
19. **Tighten 3D types** — remove `any` from lighting and animation utilities.

### Performance

20. **Lazy-load textures inside `TechStack.tsx`** rather than at module evaluation.
21. **Reuse a single `THREE.Vector3`** in the sphere impulse loop.
22. **Gate the second WebGL context** behind an `IntersectionObserver` so it doesn't initialize before the user scrolls there.
23. **Configure a Vite bundle visualizer** (`rollup-plugin-visualizer`) and trim chunks.

### A11y / SEO

24. Add ARIA labels to social, navbar, and resume links; ensure focus styles aren't suppressed.
25. Add `prefers-reduced-motion` short-circuits in `initialFX.ts`, `Cursor.tsx`, and the character idle loop.
26. Add Open Graph, Twitter, JSON-LD (`Person`), `robots.txt`, `sitemap.xml`.

### Process

27. **Add Vitest + React Testing Library** with at least smoke tests on `App` and pure utilities like `mouseUtils.ts`.
28. **Add a GitHub Actions workflow** running `npm run lint && npm run build`.
29. **Add Husky + lint-staged** for pre-commit lint/format.

---

## 8. Appendix — Severity Matrix

| Issue | Severity | Effort | File(s) |
|---|---|---|---|
| Event-listener leaks | High | Low–Med | `Scene.tsx`, `Cursor.tsx`, `Navbar.tsx`, `SocialIcons.tsx`, `WhatIDo.tsx` |
| `splitText.ts` exponential listeners | High | Low | `utils/splitText.ts` |
| `WorkImage.tsx` `src/assets/...` fetch breaks in prod | High | Low | `WorkImage.tsx` |
| Decryption provides no real security | Medium | Low | `Character/utils/decrypt.ts`, `public/models/*` |
| `setState` during render | Medium | Low | `Loading.tsx` |
| Mutable `smoother` export | Medium | Med | `Navbar.tsx`, `initialFX.ts` |
| Two simultaneous WebGL contexts | Medium | Med | `TechStack.tsx`, `Scene.tsx` |
| Hardcoded content in JSX | Low | Low | `Work.tsx`, `Career.tsx` |
| Dead deps & files | Low | Low | repo root |
| Missing a11y / reduced-motion | Medium | Med | many |
| Missing tests / CI | Medium | Med | repo |
| Missing OG/JSON-LD/sitemap | Low | Low | `index.html`, root |

---

*End of report.*
