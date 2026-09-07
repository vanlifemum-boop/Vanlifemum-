"use client";

import { theme, headGradients } from "@/lib/theme";
import type { Destination } from "@/lib/destinations";

/**
 * Sticker card (effect from tussy-van-website) in the WowMoman palette.
 * `id={slug}` makes each card a deep-link anchor (/ziele#kolberg) so the
 * upcoming "mit Kind" blog posts can point straight at a destination.
 */
export default function DestinationCard({ dest }: { dest: Destination }) {
  const hasPosts = !!dest.posts?.length;

  return (
    <article
      id={dest.slug}
      className="dest-card flex scroll-mt-24 flex-col overflow-hidden rounded-2xl"
      style={{
        background: theme.creme,
        border: `3px solid ${theme.ink}`,
        boxShadow: theme.stickerShadow,
      }}
    >
      <div
        className="relative border-b-[3px] px-6 pb-4 pt-6"
        style={{
          background: headGradients[dest.color],
          borderColor: theme.ink,
          color: theme.creme,
        }}
      >
        <span className="text-3xl leading-none">{dest.flag}</span>
        <h3
          className="mt-1 text-xl font-bold"
          style={{ fontFamily: '"Georgia", "Times New Roman", serif' }}
        >
          {dest.name}
        </h3>
        <span className="text-sm italic opacity-90">{dest.region}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-6 pb-6 pt-5">
        <p className="text-[0.94rem]" style={{ color: theme.muted }}>
          {dest.blurb}
        </p>

        <ul className="grid gap-2 text-[0.88rem]" style={{ color: theme.ink }}>
          <li className="flex gap-2">
            <b className="shrink-0">🅿️ Stellplatz:</b>
            <span style={{ color: theme.muted }}>{dest.stellplatz}</span>
          </li>
          <li className="flex gap-2">
            <b className="shrink-0">📅 Beste Zeit:</b>
            <span style={{ color: theme.muted }}>{dest.zeit}</span>
          </li>
          <li className="flex gap-2">
            <b className="shrink-0">💜 Mein Tipp:</b>
            <span style={{ color: theme.muted }}>{dest.tipp}</span>
          </li>
        </ul>

        {/* Mutter-Kind-Reisen: slot for the upcoming per-destination blog post */}
        <div
          className="mt-auto border-t pt-3 text-[0.82rem] font-semibold"
          style={{ borderColor: theme.sand }}
        >
          {hasPosts ? (
            <span style={{ color: theme.magenta }}>
              👩‍👧 {dest.posts!.length} Beitrag
              {dest.posts!.length > 1 ? "e" : ""} mit Kind
            </span>
          ) : (
            <span style={{ color: theme.muted }}>
              👩‍👧 Beitrag „mit Kind“ folgt
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
