# Fotos

Hier kommen die Bilder für Blog und Reiseziele rein.

- Dateiname klein, mit Bindestrichen: `danzig-sopot-strand.jpg`
- Empfohlen: JPEG oder WebP, max. ~1600 px breit (hält das Repo klein)
- Im Beitrag referenziert als `/bilder/danzig-sopot-strand.jpg`

Verwendung in `lib/posts.ts`:

    hero: {
      src: "/bilder/danzig-sopot-strand.jpg",
      alt: "Breiter Sandstrand von Sopot mit Seebrücke im Hintergrund",
      caption: "Zwei Zugstationen von Danzig entfernt.",
    }

Oder als Bild mitten im Text:

    { type: "image", src: "/bilder/....jpg", alt: "…", caption: "…" }

`alt` ist Pflicht: die Bildbeschreibung für Screenreader und Suchmaschinen.
