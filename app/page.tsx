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
          Ich gehe jetzt leben.
        </h1>
        <p className="max-w-2xl text-white/60">
          Scrolle im Rahmen unten durch die Intro-Animation. Darunter geht es zu
          den Reisezielen — {DESTINATIONS.length} Orte in Europa, jeweils mit
          Stellplatz, bester Reisezeit und Tipp.
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
        <span className="text-sm text-white/50">
          👩‍👧 Zu jedem Ziel folgt ein Beitrag „mit Kind“.
        </span>
      </section>

      <footer className="pt-4 text-sm text-white/40">
        Built with Next.js, Tailwind CSS, and Framer Motion.
      </footer>
    </main>
  );
}
