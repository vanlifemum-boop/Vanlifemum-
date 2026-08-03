import Demo from "@/components/Demo";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-16">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/40">
          Component preview
        </p>
        <h1 className="text-3xl font-semibold sm:text-4xl">Scroll Morph Hero</h1>
        <p className="max-w-2xl text-white/60">
          Scroll inside the frame below to scrub through the morphing intro
          animation. The effect is driven entirely by the container&apos;s scroll
          progress.
        </p>
      </header>

      <Demo />

      <footer className="pt-4 text-sm text-white/40">
        Built with Next.js, Tailwind CSS, and Framer Motion.
      </footer>
    </main>
  );
}
