import Link from "next/link";
import { notFound } from "next/navigation";
import {
  POSTS,
  getPost,
  getDestinationForPost,
  formatDate,
  type Block,
} from "@/lib/posts";
import { theme } from "@/lib/theme";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) return { title: "Beitrag nicht gefunden" };
  return { title: `${post.title} — Vanlife mit Mama & Kind`, description: post.excerpt };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const dest = getDestinationForPost(post);

  return (
    <main
      className="min-h-screen"
      style={{
        background: `radial-gradient(1100px 620px at 70% 10%, rgba(224,71,154,.28), transparent 60%), linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`,
      }}
    >
      <div className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold"
          style={{ color: theme.magentaLight }}
        >
          ← Alle Beiträge
        </Link>

        <article
          className="mt-6 rounded-2xl px-7 py-8 sm:px-10 sm:py-10"
          style={{
            background: theme.creme,
            border: `3px solid ${theme.ink}`,
            boxShadow: theme.stickerShadow,
          }}
        >
          {dest && (
            <Link
              href={`/ziele#${dest.slug}`}
              className="inline-block rounded-full px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] no-underline"
              style={{ background: theme.magenta, color: theme.creme }}
            >
              {dest.flag} {dest.name}
            </Link>
          )}

          <h1
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{
              color: theme.ink,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            {post.title}
          </h1>

          <p
            className="mt-2 text-[0.8rem] font-semibold uppercase tracking-[0.08em]"
            style={{ color: theme.muted }}
          >
            {formatDate(post.date)}
            {post.readingMinutes ? ` · ${post.readingMinutes} Min. Lesezeit` : ""}
          </p>

          {post.hero && (
            <figure className="mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.hero.src}
                alt={post.hero.alt}
                className="w-full rounded-xl"
                style={{ border: `3px solid ${theme.ink}` }}
              />
              {post.hero.caption && (
                <figcaption
                  className="mt-2 text-sm italic"
                  style={{ color: theme.muted }}
                >
                  {post.hero.caption}
                </figcaption>
              )}
            </figure>
          )}

          <div className="mt-7 flex flex-col gap-4">
            {post.body.map((block, i) => (
              <Prose key={i} block={block} />
            ))}
          </div>

          {dest && (
            <div
              className="mt-9 border-t pt-5 text-sm"
              style={{ borderColor: theme.sand, color: theme.muted }}
            >
              Mehr zu diesem Ort:{" "}
              <Link
                href={`/ziele#${dest.slug}`}
                className="font-bold"
                style={{ color: theme.magenta }}
              >
                {dest.name} bei den Reisezielen →
              </Link>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}

function Prose({ block }: { block: Block }) {
  switch (block.type) {
    case "h2":
      return (
        <h2
          className="mt-3 text-xl font-bold"
          style={{
            color: theme.ink,
            fontFamily: '"Georgia", "Times New Roman", serif',
          }}
        >
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote
          className="border-l-4 pl-4 text-lg italic"
          style={{ borderColor: theme.magenta, color: theme.ink }}
        >
          {block.text}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            className="w-full rounded-xl"
            style={{ border: `3px solid ${theme.ink}` }}
          />
          {block.caption && (
            <figcaption
              className="mt-2 text-sm italic"
              style={{ color: theme.muted }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "links":
      return (
        <ul className="grid gap-2">
          {block.items.map((it, i) => (
            <li key={i}>
              <a
                href={it.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
                style={{ color: theme.magenta }}
              >
                {it.label} ↗
              </a>
            </li>
          ))}
        </ul>
      );
    case "list":
      return (
        <ul className="ml-5 list-disc space-y-1" style={{ color: theme.muted }}>
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    default:
      return (
        <p className="leading-relaxed" style={{ color: theme.muted }}>
          {block.text}
        </p>
      );
  }
}
