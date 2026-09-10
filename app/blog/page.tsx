import Link from "next/link";
import { getPostsByCategory, getDestinationForPost, formatDate } from "@/lib/posts";
import { theme } from "@/lib/theme";

export const metadata = {
  title: "Blog — Vanlife mit Mama & Kind",
  description:
    "Beiträge über das Reisen im Van mit Kind — zu jedem Reiseziel ehrlich aufgeschrieben.",
};

export default function BlogIndex() {
  const posts = getPostsByCategory("reise");

  return (
    <main
      className="min-h-screen"
      style={{
        background: `radial-gradient(1100px 620px at 70% 10%, rgba(224,71,154,.28), transparent 60%), linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`,
      }}
    >
      <div className="mx-auto max-w-5xl px-6 py-16">
        <header className="space-y-3">
          <p
            className="text-sm font-bold uppercase tracking-[0.28em]"
            style={{ color: theme.magenta }}
          >
            Blog
          </p>
          <h1
            className="text-4xl font-bold sm:text-5xl"
            style={{
              color: theme.creme,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Mit Kind unterwegs.
          </h1>
          <p className="max-w-2xl" style={{ color: theme.sand }}>
            Ehrliche Beiträge zu den Reisezielen — was mit Kind funktioniert,
            was nicht, und was ich beim nächsten Mal anders mache.
          </p>
          <Link
            href="/mit-kleinen-fuessen"
            className="inline-block text-sm font-bold"
            style={{ color: theme.magentaLight }}
          >
            👣 Lieber Geschichten? Mit kleinen Füßen →
          </Link>
        </header>

        {posts.length === 0 ? (
          <div
            className="mt-10 rounded-2xl px-8 py-12 text-center"
            style={{
              background: theme.creme,
              border: `3px solid ${theme.ink}`,
              boxShadow: theme.stickerShadow,
            }}
          >
            <p className="text-4xl">👩‍👧</p>
            <h2
              className="mt-3 text-2xl font-bold"
              style={{
                color: theme.ink,
                fontFamily: '"Georgia", "Times New Roman", serif',
              }}
            >
              Die ersten Beiträge sind in Arbeit.
            </h2>
            <p className="mx-auto mt-2 max-w-md" style={{ color: theme.muted }}>
              Bis dahin findest du alle Orte, über die geschrieben wird, schon
              bei den Reisezielen.
            </p>
            <Link
              href="/ziele"
              className="mt-6 inline-block rounded-full px-6 py-3 text-sm font-bold"
              style={{
                background: theme.magenta,
                color: theme.creme,
                border: `3px solid ${theme.ink}`,
                boxShadow: theme.stickerShadow,
              }}
            >
              Reiseziele ansehen →
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
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
                      className="-mx-6 -mt-6 mb-1 w-[calc(100%+3rem)] rounded-t-xl object-cover"
                      style={{ height: 180, borderBottom: `3px solid ${theme.ink}` }}
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
                  <h2
                    className="text-xl font-bold"
                    style={{
                      color: theme.ink,
                      fontFamily: '"Georgia", "Times New Roman", serif',
                    }}
                  >
                    {post.title}
                  </h2>
                  <p className="flex-1 text-[0.94rem]" style={{ color: theme.muted }}>
                    {post.excerpt}
                  </p>
                  <p
                    className="text-[0.78rem] font-semibold uppercase tracking-[0.08em]"
                    style={{ color: theme.muted }}
                  >
                    {formatDate(post.date)}
                    {post.readingMinutes ? ` · ${post.readingMinutes} Min.` : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
