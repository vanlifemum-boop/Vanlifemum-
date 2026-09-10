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

export const POSTS: BlogPost[] = [
  // Auftakt-Beitrag — gern ersetzen oder löschen, sobald der erste echte
  // Reisebericht steht. (Mindestens ein Beitrag muss existieren, damit der
  // statische Export die Route /blog/[slug] erzeugen kann.)
  {
    slug: "willkommen",
    title: "Was dich hier erwartet",
    date: "2026-09-10",
    excerpt:
      "Zu jedem Reiseziel ein Beitrag darüber, wie es sich mit Kind anfühlt — ehrlich, ohne Hochglanz.",
    readingMinutes: 1,
    body: [
      {
        type: "p",
        text: "Hier entsteht nach und nach zu jedem Reiseziel ein Beitrag: wie der Ort mit Kind wirklich funktioniert, was wir uns gespart hätten und was wir wieder genauso machen würden.",
      },
      { type: "h2", text: "Worum es geht" },
      {
        type: "list",
        items: [
          "Stellplätze, die mit Kind entspannt sind — und welche nicht",
          "Was der Tagesablauf unterwegs mit Kind wirklich hergibt",
          "Ehrliche Einschätzung statt Reiseprospekt",
        ],
      },
      {
        type: "quote",
        text: "Reisen mit Kind ist kein kleineres Abenteuer. Nur ein anderes.",
      },
      {
        type: "p",
        text: "Die Ziele findest du schon jetzt in der Übersicht — die Beiträge kommen Stück für Stück dazu.",
      },
    ],
  },
];

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
