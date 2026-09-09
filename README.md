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
  page.tsx                    Startseite: Hero + Links zu Zielen und Blog
  globals.css                 Tailwind directives + base styles
  ziele/page.tsx              Reiseziele mit Länderfilter
  blog/page.tsx               Blog-Übersicht
  blog/[slug]/page.tsx        Einzelner Beitrag
components/
  Demo.tsx                    Fixed 800px frame that hosts the hero
  DestinationCard.tsx         Sticker-Card für ein Reiseziel
  ui/
    scroll-morph-hero.tsx     IntroAnimation — the scroll-morph effect
lib/
  theme.ts                    Farbpalette (eine Quelle der Wahrheit)
  destinations.ts             39 Reiseziele
  posts.ts                    Blog-Beiträge
```

## Inhalte pflegen

**Reiseziel ändern/ergänzen** → `lib/destinations.ts`. Jedes Ziel braucht eine
eindeutige `id` (wird automatisch zum `slug` und damit zum Anker `/ziele#<slug>`).

**Blog-Beitrag anlegen** → Objekt in `POSTS` in `lib/posts.ts` eintragen:

```ts
{
  slug: "kolberg-mit-kind",        // wird zu /blog/kolberg-mit-kind
  title: "Kołobrzeg mit Kind",
  date: "2026-07-14",              // ISO, sortiert die Übersicht
  excerpt: "Kurzer Teaser für die Übersicht.",
  destination: "kolberg",          // slug aus destinations.ts (optional)
  readingMinutes: 6,               // optional
  body: [
    { type: "p", text: "Ein Absatz." },
    { type: "h2", text: "Eine Zwischenüberschrift" },
    { type: "list", items: ["Punkt eins", "Punkt zwei"] },
    { type: "quote", text: "Ein Satz, der hängen bleibt." },
  ],
}
```

Sobald `destination` gesetzt ist, verlinken sich Ziel und Beitrag **automatisch in
beide Richtungen**: die Ziel-Karte zeigt den Beitrag, der Beitrag verlinkt zurück
auf `/ziele#<slug>`. Solange es zu einem Ziel keinen Beitrag gibt, steht dort
„Beitrag ‚mit Kind' folgt".

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
