import Link from "next/link";
import Demo from "@/components/Demo";
import { DESTINATIONS } from "@/lib/destinations";
import { theme } from "@/lib/theme";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <p
          className="text-sm font-bold uppercase tracking-[0.28em]"
          style={{ color: theme.magenta }}
        >
          Vanlife mit Mama &amp; Kind
        </p>
        <h1
          className="text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          Reisen mit Kind — ehrlich erzählt.
        </h1>
        <p className="max-w-2xl text-white/60">
          {DESTINATIONS.length} Orte in Europa — jeder mit Stellplatz, bester
          Reisezeit und persönlichem Tipp. Zu jedem folgt ein Beitrag darüber,
          wie er sich mit Kind anfühlt.
        </p>
      </header>

      <Demo />

      <section className="flex flex-wrap items-center gap-4">
        <Link
          href="/ziele"
          className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
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
          className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
          style={{
            background: theme.creme,
            color: theme.ink,
            border: `3px solid ${theme.ink}`,
            boxShadow: theme.stickerShadow,
            transitionTimingFunction: theme.ease,
          }}
        >
          👩‍👧 Blog: mit Kind
        </Link>
        <Link
          href="/mit-kleinen-fuessen"
          className="rounded-full px-6 py-3 text-sm font-bold transition-transform hover:-translate-y-0.5"
          style={{
            background: theme.creme,
            color: theme.ink,
            border: `3px solid ${theme.ink}`,
            boxShadow: theme.stickerShadow,
            transitionTimingFunction: theme.ease,
          }}
        >
          👣 Mit kleinen Füßen
        </Link>
      </section>

      <footer className="pt-4 text-sm text-white/40">
        © Vanlifemum · vanlifemum.de
      </footer>
    </main>
  );
}
