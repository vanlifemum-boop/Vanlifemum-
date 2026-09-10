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

/** Rubriken: Reiseberichte vs. die Geschichten "Mit kleinen Füßen". */
export type Category = "reise" | "kleine-fuesse";

export const CATEGORIES: Record<Category, { label: string; href: string }> = {
  reise: { label: "Reisebericht", href: "/blog" },
  "kleine-fuesse": { label: "Mit kleinen Füßen", href: "/mit-kleinen-fuessen" },
};

/** Ein Foto. `alt` ist Pflicht — Bildbeschreibung für Screenreader und Google. */
export interface PostImage {
  /** Pfad unter public/, z. B. "/bilder/danzig-sopot-strand.jpg" */
  src: string;
  alt: string;
  caption?: string;
}

export type Block =
  | { type: "p"; text: string }
  | { type: "image"; src: string; alt: string; caption?: string }
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
  /** Rubrik; ohne Angabe ein Reisebericht. */
  category?: Category;
  /** Aufmacherfoto oben im Beitrag und als Vorschau in den Listen. */
  hero?: PostImage;
  readingMinutes?: number;
  body: Block[];
}

export const POSTS: BlogPost[] = [
  {
    slug: "danzig-mit-kind",
    title: "Danzig mit Kind: Altstadt, Bernstein und der Strand von Sopot",
    date: "2026-09-11",
    excerpt:
      "Die Altstadt ist ein Traum, der Rest der Stadt ehrlich gesagt nicht. Warum sich die Dreistadt trotzdem lohnt \u2014 und was mit Kind gut funktioniert.",
    destination: "danzig",
    category: "reise",
    readingMinutes: 7,
    body: [
      {
        type: "p",
        text: "Wer an Danzig denkt, hat die Postkarte im Kopf: die restaurierten Patrizierh\u00e4user, das Krantor, das maritime Flair an der Mottlau. Und ja \u2014 die Altstadt ist traumhaft. Man schlendert durch die Gassen und kommt aus dem Schauen nicht raus.",
      },
      {
        type: "h2",
        text: "Der ehrliche Teil: Altstadt gro\u00dfartig, Rest grauer Beton",
      },
      {
        type: "p",
        text: "Ich bin bis heute zwiegespalten. Sobald man die historische Altstadt verl\u00e4sst, landet man in einer anderen Welt: grau, zweckm\u00e4\u00dfig, wenig spannend. Klar gibt es die gro\u00dfen Malls \u2014 aber eine Mall ist eine Mall. Wer Danzig auf die Altstadt plus einen Ausflug plant, macht nichts falsch.",
      },
      {
        type: "h2",
        text: "Das eigentliche Highlight: Sopot und Gdynia",
      },
      {
        type: "p",
        text: "Das Sch\u00f6nste an der Region ist f\u00fcr mich nicht Danzig allein, sondern die ganze Dreistadt. Sopot liegt zwei Zugstationen entfernt, der Bahnhof mitten im Ort \u2014 von dort sind es zwei bis f\u00fcnf Minuten zu Fu\u00df bis zum breiten Sandstrand. Gdynia ist vier bis f\u00fcnf Stationen weit und moderner, maritimer, mit viel Hafen.",
      },
      {
        type: "h2",
        text: "Bernsteinmuseum in der Gro\u00dfen M\u00fchle",
      },
      {
        type: "p",
        text: "Museen k\u00f6nnen trocken sein \u2014 dieses nicht. Es sitzt in der Wielki M\u0142yn, einer mittelalterlichen Backsteinm\u00fchle aus dem 14. Jahrhundert: au\u00dfen dicke, rohe Mauern, innen eine moderne, hell ausgeleuchtete Ausstellung. Die Ausstellung ist interaktiv, man taucht auch ohne langes Textelesen ein. Plane 1,5 bis 2 Stunden ein.",
      },
      {
        type: "list",
        items: [
          "Die Inklusen \u2014 Insekten, kleine Echsen und Pflanzenteile, Millionen Jahre im Harz eingeschlossen. Durch Lupen sieht man jedes Detail.",
          "Der Raum mit moderner Bernsteinkunst: komplett besetzte Kleider, Schiffsmodelle, Gitarren.",
          "Eines der gr\u00f6\u00dften Bernsteinst\u00fccke der Welt \u2014 ein Brocken von mehreren Kilo.",
        ],
      },
      {
        type: "p",
        text: "Danach durch die Frauengasse (Ulica Mariacka) schlendern, die sch\u00f6nste Gasse Danzigs, voller kleiner Bernstein-Ateliers. Nach dem Museum sieht man den Unterschied zwischen Touristen-Kitsch und echtem Handwerk sofort.",
      },
      {
        type: "h2",
        text: "Museum des Zweiten Weltkriegs \u2014 gro\u00dfartig, aber nicht f\u00fcr Kleine",
      },
      {
        type: "p",
        text: "Das beste Museum, in dem ich europaweit je war. Man l\u00e4uft durch rekonstruierte Vorkriegsstra\u00dfen, die sich in Tr\u00fcmmerw\u00fcsten verwandeln; im Mittelpunkt steht das Schicksal der Zivilbev\u00f6lkerung. Genau deshalb ist es nichts f\u00fcr kleine Kinder: Es ist emotional schwer, dunkel und laut. F\u00fcr \u00e4ltere Kinder, die das einordnen k\u00f6nnen, ist es dagegen eine der eindr\u00fccklichsten Geschichtsstunden \u00fcberhaupt.",
      },
      { type: "h2", text: "Mit Kind: was hier gut funktioniert" },
      {
        type: "list",
        items: [
          "Kurze Wege: Sopot sind zwei Zugstationen, dann zwei bis f\u00fcnf Minuten zu Fu\u00df \u2014 Strand ohne langen Anmarsch, gut planbar mit m\u00fcden Beinen.",
          "Der Zug ist das Verkehrsmittel der Wahl. Den Van am Stellplatz Richtung Strand (Brze\u017ano/Stogi) stehen lassen und mit Tram oder Zug fahren.",
          "Bernsteinmuseum vor dem Weltkriegsmuseum: Erst das Leichte und Funkelnde, dann \u2014 wenn \u00fcberhaupt \u2014 das Schwere.",
          "Die Inklusen sind der Kinder-Magnet: echte Insekten im Stein, durch Lupen betrachtet. Daf\u00fcr braucht es keine Vorkenntnisse.",
          "Weihnachtsmarkt im Advent: Danzig lohnt sich auch au\u00dferhalb der Sommersaison, und das Flair ist wirklich besonders.",
        ],
      },
      {
        type: "quote",
        text: "Danzig ist keine Stadt zum Abhaken. Es ist eine Stadt, die man teilen muss: Altstadt, Museum, Strand \u2014 und dazwischen Pausen.",
      },
    ],
  },
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

/** Beiträge einer Rubrik, neueste zuerst. */
export function getPostsByCategory(category: Category): BlogPost[] {
  return getPosts().filter((p) => (p.category ?? "reise") === category);
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
