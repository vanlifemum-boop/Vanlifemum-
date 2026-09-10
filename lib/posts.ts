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
  | { type: "list"; items: string[] }
  | { type: "links"; items: { label: string; href: string }[] };

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
    "slug": "breslau-zwergensuche-mit-kind",
    "title": "Breslau mit Kind: Auf Zwergenjagd durch die Altstadt",
    "date": "2026-09-11",
    "excerpt": "Über tausend bronzene Zwerge verstecken sich in Breslaus Gassen. Mit Suchkarte und App wird daraus die beste Stadtführung, die ein Kind sich wünschen kann.",
    "destination": "breslau",
    "category": "reise",
    "readingMinutes": 8,
    "hero": {
      "src": "/bilder/breslau-drei-zwerge.jpg",
      "alt": "Kind in Löwenmütze zeigt auf drei bronzene Zwerge auf dem Kopfsteinpflaster der Breslauer Altstadt.",
      "caption": "Einmal entdeckt, sieht man sie überall."
    },
    "body": [
      {
        "type": "p",
        "text": "Es gibt Städte, die muss man mit einem Kind anders angehen. Breslau ist so eine. Denn hier lebt, versteckt zwischen Kopfsteinpflaster, Hauswänden und Blumenkübeln, ein ganzes Volk aus Bronze: die Zwerge. Auf Polnisch: krasnale. Sie sind kaum kniehoch, manche keine Handspanne groß — und sobald du den ersten entdeckt hast, siehst du plötzlich überall welche."
      },
      {
        "type": "p",
        "text": "Aus einem Stadtrundgang wird damit eine Schatzsuche. Und ein Kind, das in einer Altstadt nach zwanzig Minuten „wie weit noch?“ fragt, läuft auf einmal stundenlang mit gesenktem Blick durch die Gassen und ruft alle fünf Meter: „Da ist noch einer!“"
      },
      {
        "type": "h2",
        "text": "Warum überhaupt Zwerge?"
      },
      {
        "type": "p",
        "text": "Die Geschichte dahinter ist besser als jede Touristenattraktion. In den Nächten des 30. und 31. August 1982 malte Waldemar „Major“ Fydrych kleine Zwerge auf Breslauer Hauswände — genauer gesagt auf die Farbflecken, mit denen das kommunistische Regime regimekritische Parolen übermalt hatte. Seine Bewegung, die Pomarańczowa Alternatywa (Orange Alternative), machte sich mit absurdem Humor über das System lustig. Man kann Menschen für Parolen verhaften. Aber für Zwerge?"
      },
      {
        "type": "p",
        "text": "2001 wurde daraus Bronze: Am 1. Juni stellte die Stadt in der ulica Świdnicka den „Papa Krasnal“ auf, ein Denkmal für die Orange Alternative. Er war der erste. Seitdem sind unaufhörlich neue dazugekommen — gestiftet von Läden, Vereinen, Institutionen, jeder mit einer eigenen kleinen Geschichte."
      },
      {
        "type": "quote",
        "text": "Ein Kind muss die Diktatur nicht verstehen, um den Witz zu begreifen: Die Erwachsenen wollten etwas verbieten — und dann kamen die Zwerge."
      },
      {
        "type": "h2",
        "text": "Wie viele sind es?"
      },
      {
        "type": "p",
        "text": "Die ehrliche Antwort: Es werden ständig mehr. Anfang 2026 lag die Zahl im Stadtgebiet bei rund 1.040 Figuren. Vollständigkeit ist also kein realistisches Ziel — und genau das nimmt den Druck raus. Es geht nicht darum, alle zu finden. Es geht darum, den nächsten zu finden."
      },
      {
        "type": "h2",
        "text": "Karte aus Papier oder App? Wir hatten beides dabei"
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnale-fliegenpilze-karte.jpg",
        "alt": "Kind mit gehäkelter Löwenmütze steht neben zwei großen roten Fliegenpilz-Figuren auf einem Weihnachtsmarkt und hält die Zwergen-Suchkarte in der Hand.",
        "caption": "Die Ausrüstung: Löwenmütze, Suchkarte um den Hals, Tüte in der Hand. Startklar."
      },
      {
        "type": "p",
        "text": "Am Anfang steht die Ausrüstung, und die ist Teil des Spaßes. Es gibt eine gedruckte Suchkarte mit Stadtplan, Aufklebern und Stempelfeldern — für ungefähr 17 Złoty in den Läden und Buden der Altstadt. Um den Hals gehängt, ist sie Landkarte, Sammelalbum und Jägerausweis in einem. Für ein Kind schlägt dieses Stück Papier jede App, weil man etwas in der Hand hält, etwas einkleben und abhaken kann."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-blumenkuebel.jpg",
        "alt": "Kind zeigt auf einen kleinen bronzenen Zwerg, der neben einem großen Blumenkübel vor einem Schaufenster sitzt; auf dem Rücken der Suchkarte ist der illustrierte Stadtplan zu sehen.",
        "caption": "Rückseite der Karte: der illustrierte Altstadtplan. Vorne wird gestempelt, hinten navigiert."
      },
      {
        "type": "p",
        "text": "Praktisch schlauer ist trotzdem die App. Sie kennt über tausend Figuren, zeigt sie auf einer Karte samt Standort und macht per Geolocation ein Stadtspiel daraus — inklusive Zwergenerkennung per Foto und Punkten. Unser Rhythmus war: Die App sagt, in welche Gasse wir müssen. Das Kind findet den Zwerg. Die Papierkarte bekommt den Stempel."
      },
      {
        "type": "links",
        "items": [
          {
            "label": "Krasnal Wrocław — offizielle Karte & App (krasnalwroclaw.pl)",
            "href": "https://www.krasnalwroclaw.pl/de"
          },
          {
            "label": "„Breslau Zwerge: Karte“ im App Store",
            "href": "https://apps.apple.com/de/app/breslau-zwerge-karte/id6752708842"
          },
          {
            "label": "„Go Zwerge von Wrocław“ — kostenlose App der Stadt",
            "href": "https://www.wroclaw.pl/de/go-zwerge-von-wroclaw-kostenlose-app"
          },
          {
            "label": "Wromap — Liste und Karte aller Zwerge",
            "href": "https://wromap.pl/de/"
          }
        ]
      },
      {
        "type": "h2",
        "text": "Die Zwerge, die wir gefunden haben"
      },
      {
        "type": "p",
        "text": "Jeder Zwerg hat einen Namen und einen Grund, warum er genau dort steht. Man muss die Namen nicht kennen — aber die Motive erzählen sich von selbst, und Kinder lesen sie sofort."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-drei-zwerge.jpg",
        "alt": "Kind zeigt auf drei bronzene Zwerge, die in einer Reihe auf dem Kopfsteinpflaster vor einer Backsteinwand stehen; einer stützt sich auf einen Stock, einer schiebt einen Wagen.",
        "caption": "Gleich drei auf einmal. Einer mit Gehstock, einer mit Wagen — jeder mit eigener Aufgabe."
      },
      {
        "type": "p",
        "text": "Manche stehen in Gruppen, als hätten sie gerade etwas zu besprechen. Andere findet man nur, wenn man wirklich langsam geht und in die Ecken schaut, in die Erwachsene nie schauen."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-becher.jpg",
        "alt": "Kind zeigt auf einen bronzenen Zwerg, der mit einem Becher in der Hand an einer terrakottafarbenen Hauswand sitzt.",
        "caption": "Sitzt gemütlich an der Wand, Becher in der Hand. Pause hat er sich verdient."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-wasserpumpe.jpg",
        "alt": "Kind in Löwenmütze berührt einen bronzenen Zwerg, der auf einer alten grünen Wasserpumpe sitzt und ein Joch mit zwei Eimern über der Schulter trägt.",
        "caption": "Der Wasserträger auf der alten Pumpe — mit Joch und zwei Eimern."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-kirchenmodell.jpg",
        "alt": "Kind zeigt auf einen kleinen Zwerg am Fuß eines Steinsockels, auf dem ein bronzenes Modell einer gotischen Kirche steht.",
        "caption": "Unter dem Bronzemodell der Kirche wohnt auch einer. Das Modell selbst ist zum Ertasten gedacht."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-an-der-wand.jpg",
        "alt": "Kind zeigt auf einen bronzenen Zwerg, der an einer Steinwand befestigt ist und zu klettern scheint; darüber sitzt ein kleiner bronzener Vogel.",
        "caption": "Nicht alle stehen am Boden: Dieser klettert die Wand hoch, mit Vogel als Begleitung."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-souvenirladen.jpg",
        "alt": "Kind steht breitbeinig über einem bronzenen Zwerg auf dem Kopfsteinpflaster vor einem Souvenirladen mit bunten Lampen im Schaufenster.",
        "caption": "Viele sitzen direkt vor den Läden, die sie gestiftet haben."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-postkartenstaender.jpg",
        "alt": "Kind zeigt auf einen bronzenen Zwerg neben einem Ständer mit Magneten und Postkarten; auf den Magneten sind ebenfalls Zwerge abgebildet.",
        "caption": "Zwerg vor dem Magnetständer — auf dem lauter Zwerge kleben."
      },
      {
        "type": "p",
        "text": "Unser Lieblingsfund hatte sogar eine eigene Landkarte unter den Füßen: WOTuś, ein Zwerg in Uniform mit Gewehr, der auf einer Bronzeplatte mit den Umrissen Niederschlesiens steht — Głogów, Wrocław, Wałbrzych sind eingraviert."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-wotus.jpg",
        "alt": "Lachendes Kind in Löwenmütze steht neben dem Zwerg WOTuś, einer Uniformfigur mit Gewehr, am Fuß eines schwarzen Laternenmastes.",
        "caption": "WOTuś — und die passende Reaktion darauf."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-krasnal-wotus-plakette.jpg",
        "alt": "Nahaufnahme des Zwergs WOTuś auf einer Bronzeplatte mit der Umrisskarte Niederschlesiens und den Ortsnamen Głogów, Wrocław und Wałbrzych.",
        "caption": "Unter ihm die Karte Niederschlesiens — Zwerg mit Zuständigkeitsgebiet."
      },
      {
        "type": "h2",
        "text": "Wenn zwischendurch die Konzentration nachlässt"
      },
      {
        "type": "p",
        "text": "Irgendwann ist auch der beste Zwergenjäger satt. Dann hilft, dass die Altstadt noch anderes zu bieten hat — und im Advent sowieso."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-wroclovek-fotowand.jpg",
        "alt": "Kind steckt lachend den Kopf durch das Gesichtsloch einer bemalten Zwergen-Fotowand mit der Aufschrift WROCLOVEK.",
        "caption": "Kurz selbst zum Zwerg werden."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-sklepik-magiczny.jpg",
        "alt": "Kind steht von hinten vor dem Schaufenster des Ladens Sklepik Magiczny; im Fenster hängt ein Harry-Potter-Fahndungsplakat.",
        "caption": "Der Zauberladen. Hier wollte jemand nicht mehr weiter."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-weihnachtsmarkt-fotoecke.jpg",
        "alt": "Kind sitzt in einem alten Sessel in einer weihnachtlich dekorierten Fotoecke des Weihnachtsmarkts, daneben ein roter Briefkasten für Briefe an den Weihnachtsmann.",
        "caption": "Thron mit Briefkasten für Wunschzettel."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-weihnachtsmarkt-selfie-pyramide.jpg",
        "alt": "Selfie von Mutter mit pinker Mütze und Kind mit Löwenmütze auf dem Weihnachtsmarkt, dahinter eine beleuchtete Weihnachtspyramide und die Häuser des Marktplatzes.",
        "caption": "Der Breslauer Weihnachtsmarkt liegt mitten auf dem Rynek — Zwergensuche und Glühwein in einem Radius von 200 Metern."
      },
      {
        "type": "image",
        "src": "/bilder/breslau-weihnachtsbaum-rynek.jpg",
        "alt": "Selfie von Mutter und Kind vor dem großen geschmückten Weihnachtsbaum auf dem Breslauer Marktplatz mit den bunten Bürgerhäusern im Hintergrund.",
        "caption": "Rynek mit Baum. Die bunten Giebelhäuser gibt es gratis dazu."
      },
      {
        "type": "h2",
        "text": "Was wir gelernt haben"
      },
      {
        "type": "list",
        "items": [
          "Karte UND App: Die App findet, die Papierkarte belohnt. Beides zusammen trägt einen ganzen Tag.",
          "Kein Vollständigkeitsanspruch. Bei über tausend Figuren ist „alle finden“ unmöglich — sag das dem Kind vorher, dann ist jeder Fund ein Gewinn statt einer Restaufgabe.",
          "Das Kind führt. Wer sucht, bestimmt das Tempo und die Richtung. Genau das macht müde Beine erstaunlich langlebig.",
          "Nach unten schauen lohnt sich, nach oben auch: Manche kleben an Wänden, sitzen auf Pumpen oder hängen über Türen.",
          "Winter geht sehr gut. Die Zwerge sind ganzjährig da, der Weihnachtsmarkt auf dem Rynek macht die Pausen leicht — Mütze und dicke Schuhe vorausgesetzt.",
          "Feste Schuhe: Das Kopfsteinpflaster der Altstadt ist uneben und über Stunden anstrengend."
        ]
      },
      {
        "type": "quote",
        "text": "Breslau ist die einzige Stadt, in der mein Kind mich durch die Altstadt gezogen hat statt umgekehrt."
      }
    ]
  },
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
