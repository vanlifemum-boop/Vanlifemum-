import Link from "next/link";
import RouteMap from "@/components/RouteMap";
import GlossyBalls from "@/components/GlossyBalls";
import { DESTINATIONS } from "@/lib/destinations";
import { getPosts, getDestinationForPost, formatDate } from "@/lib/posts";
import { theme } from "@/lib/theme";

export default function Home() {
  const posts = getPosts().slice(0, 3);

  return (
    <main style={{ background: theme.bg1 }}>
      {/* ---------- Hero ---------- */}
      <section
        className="relative overflow-hidden px-6 py-24 sm:py-32"
        style={{
          background: `radial-gradient(1100px 620px at 72% 26%, rgba(224,71,154,.30), transparent 60%), linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`,
        }}
      >
        <GlossyBalls />

        <div className="relative mx-auto max-w-6xl">
          <p
            className="text-sm font-bold uppercase tracking-[0.28em]"
            style={{ color: theme.magenta }}
          >
            Vanlife mit Mama &amp; Kind
          </p>
          <h1
            className="mt-4 max-w-3xl text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
            style={{
              color: theme.creme,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Reisen mit Kind
          </h1>
          <p className="mt-6 max-w-xl text-lg" style={{ color: theme.sand }}>
            Ehrlich erzählt: {DESTINATIONS.length} Orte in Europa, jeder mit
            Stellplatz, bester Reisezeit und persönlichem Tipp — und Beiträge
            darüber, wie sie sich mit Kind wirklich anfühlen.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/ziele"
              className="rounded-full px-7 py-3.5 text-sm font-bold no-underline transition-transform hover:-translate-y-0.5"
              style={{
                background: theme.magenta,
                color: theme.creme,
                border: `3px solid ${theme.ink}`,
                boxShadow: theme.stickerShadow,
                transitionTimingFunction: theme.ease,
              }}
            >
              Reiseziele entdecken →
            </Link>
            <Link
              href="/blog"
              className="rounded-full px-7 py-3.5 text-sm font-bold no-underline transition-transform hover:-translate-y-0.5"
              style={{
                background: theme.creme,
                color: theme.ink,
                border: `3px solid ${theme.ink}`,
                boxShadow: theme.stickerShadow,
                transitionTimingFunction: theme.ease,
              }}
            >
              👩‍👧 Zum Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Karte ---------- */}
      <section
        id="karte"
        className="px-6 py-20"
        style={{ background: theme.bg2 }}
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,26rem)_1fr]">
          <div>
            <p
              className="text-sm font-bold uppercase tracking-[0.28em]"
              style={{ color: theme.magenta }}
            >
              Die Route
            </p>
            <h2
              className="mt-3 text-4xl font-bold"
              style={{
                color: theme.creme,
                fontFamily: '"Georgia", "Times New Roman", serif',
              }}
            >
              Wo wir schon überall waren.
            </h2>
            <p className="mt-4" style={{ color: theme.sand }}>
              Von der Nordsee über Polen bis nach Italien und Spanien. Klick auf
              eine Station — dann siehst du, was uns dort erwartet hat, und
              kommst direkt zum Ziel oder zum Beitrag.
            </p>
            <p className="mt-4 text-sm" style={{ color: theme.violetLight }}>
              🖱️ Punkte anklicken
            </p>
            <Link
              href="/ziele"
              className="mt-7 inline-block rounded-full px-6 py-3 text-sm font-bold no-underline"
              style={{
                background: theme.magenta,
                color: theme.creme,
                border: `3px solid ${theme.ink}`,
                boxShadow: theme.stickerShadow,
              }}
            >
              Alle Reiseziele ansehen
            </Link>
          </div>

          <div
            className="overflow-hidden rounded-2xl"
            style={{
              border: `3px solid ${theme.ink}`,
              boxShadow: theme.stickerShadow,
            }}
          >
            <RouteMap />
          </div>
        </div>
      </section>

      {/* ---------- Neueste Beiträge ---------- */}
      <section className="px-6 py-20" style={{ background: theme.bg1 }}>
        <div className="mx-auto max-w-6xl">
          <p
            className="text-sm font-bold uppercase tracking-[0.28em]"
            style={{ color: theme.magenta }}
          >
            Aus dem Van
          </p>
          <h2
            className="mt-3 text-4xl font-bold"
            style={{
              color: theme.creme,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Neueste Beiträge
          </h2>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const dest = getDestinationForPost(post);
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="dest-card flex flex-col gap-3 overflow-hidden rounded-2xl px-6 py-6 no-underline"
                  style={{
                    background: theme.creme,
                    border: `3px solid ${theme.ink}`,
                    boxShadow: theme.stickerShadow,
                  }}
                >
                  {post.hero && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={post.hero.src}
                      alt={post.hero.alt}
                      className="-mx-6 -mt-6 mb-1 w-[calc(100%+3rem)] object-cover"
                      style={{
                        height: 180,
                        borderBottom: `3px solid ${theme.ink}`,
                      }}
                    />
                  )}
                  {dest && (
                    <span
                      className="self-start rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em]"
                      style={{ background: theme.magenta, color: theme.creme }}
                    >
                      {dest.flag} {dest.name}
                    </span>
                  )}
                  <h3
                    className="text-xl font-bold"
                    style={{
                      color: theme.ink,
                      fontFamily: '"Georgia", "Times New Roman", serif',
                    }}
                  >
                    {post.title}
                  </h3>
                  <p
                    className="flex-1 text-[0.94rem]"
                    style={{ color: theme.muted }}
                  >
                    {post.excerpt}
                  </p>
                  <p
                    className="text-[0.78rem] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: theme.muted }}
                  >
                    {formatDate(post.date)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- Mit kleinen Füßen ---------- */}
      <section className="px-6 py-20" style={{ background: theme.bg2 }}>
        <div
          className="mx-auto flex max-w-4xl flex-col items-center gap-4 rounded-2xl px-8 py-12 text-center"
          style={{
            background: theme.creme,
            border: `3px solid ${theme.ink}`,
            boxShadow: theme.stickerShadow,
          }}
        >
          <span className="text-4xl">👣</span>
          <h2
            className="text-3xl font-bold"
            style={{
              color: theme.ink,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Mit kleinen Füßen
          </h2>
          <p className="max-w-lg" style={{ color: theme.muted }}>
            Keine Stellplätze, keine Öffnungszeiten — die kleinen Momente
            unterwegs. Das erste Mal Meer, der Stein, der unbedingt mit nach
            Hause musste.
          </p>
          <Link
            href="/mit-kleinen-fuessen"
            className="mt-2 rounded-full px-6 py-3 text-sm font-bold no-underline"
            style={{
              background: theme.magenta,
              color: theme.creme,
              border: `3px solid ${theme.ink}`,
              boxShadow: theme.stickerShadow,
            }}
          >
            Zu den Geschichten →
          </Link>
        </div>
      </section>
    </main>
  );
}
