// Blog-Beiträge ("mit Kind") — je Beitrag optional einem Reiseziel zugeordnet.
//
// Neuen Beitrag anlegen: Objekt in POSTS eintragen. `destination` ist der slug
// aus lib/destinations.ts (z. B. "kolberg"), dann erscheint der Beitrag
// automatisch auf der Ziel-Karte und verlinkt zurück auf das Ziel.
//
// Beispiel:
//   {
//     slug: "kolberg-mit-kind",
//     title: "Kołobrzeg mit Kind",
//     date: "2026-07-14",
//     excerpt: "Wie sich der Ostsee-Klassiker mit einem Kind im Bulli anfühlt.",
//     destination: "kolberg",
//     readingMinutes: 6,
//     body: [
//       { type: "p", text: "Erster Absatz …" },
//       { type: "h2", text: "Der Stellplatz" },
//       { type: "list", items: ["Punkt eins", "Punkt zwei"] },
//       { type: "quote", text: "Ein Satz, der hängen bleibt." },
//     ],
//   },

import { DESTINATIONS } from "./destinations";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  slug: string;
  title: string;
  /** ISO-Datum, z. B. "2026-07-14" */
  date: string;
  excerpt: string;
  /** slug eines Ziels aus lib/destinations.ts */
  destination?: string;
  readingMinutes?: number;
  body: Block[];
}

export const POSTS: BlogPost[] = [];

/** Beiträge, neueste zuerst. */
export function getPosts(): BlogPost[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string): BlogPost | undefined {
  return POSTS.find((p) => p.slug === slug);
}

/** Alle Beiträge zu einem Ziel. */
export function getPostsForDestination(destinationSlug: string): BlogPost[] {
  return getPosts().filter((p) => p.destination === destinationSlug);
}

/** Ziel-Objekt zu einem Beitrag (falls verknüpft). */
export function getDestinationForPost(post: BlogPost) {
  return post.destination
    ? DESTINATIONS.find((d) => d.slug === post.destination)
    : undefined;
}

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
