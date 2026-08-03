# Scroll Morph Hero

A scroll-driven **morphing hero animation** built with Next.js (App Router),
TypeScript, Tailwind CSS, and Framer Motion.

Scrolling inside the hero frame scrubs the animation forward and backward:
a gradient blob rotates and rescales, a grid drifts in parallax, and a stack of
words morph into one another with blur/scale/opacity transitions.

## Getting started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) and scroll inside the
framed preview.

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server               |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Run ESLint (`next lint`)           |

## Project structure

```
app/
  layout.tsx                  Root layout + metadata
  page.tsx                    Renders the <Demo /> preview
  globals.css                 Tailwind directives + base styles
components/
  Demo.tsx                    Fixed 800px frame that hosts the hero
  ui/
    scroll-morph-hero.tsx     IntroAnimation — the scroll-morph effect
```

## How it works

`IntroAnimation` (`components/ui/scroll-morph-hero.tsx`) is **self-contained**:
it owns an internal scroll container and drives every transform from that
container's scroll progress via Framer Motion's `useScroll` / `useTransform`.
Because it doesn't depend on window scroll, it works inside the fixed-height,
`overflow-hidden` frame defined in `components/Demo.tsx`.

The animation respects `prefers-reduced-motion`: when reduced motion is
requested, the morph is replaced by a static hero.

> **Note:** The original `scroll-morph-hero` source was not available, so
> `IntroAnimation` here is a clean-room implementation of the component the demo
> wrapper imports.
