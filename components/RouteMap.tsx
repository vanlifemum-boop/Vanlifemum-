"use client";

import { useState } from "react";
import Link from "next/link";
import { ROUTE_POINTS, MAP_VIEWBOX } from "@/lib/route-points";
import { DESTINATIONS } from "@/lib/destinations";
import { getPostsForDestination } from "@/lib/posts";
import { theme } from "@/lib/theme";

/**
 * Europakarte mit den Stationen — Vorbild: die map-section auf tussy-van.de.
 * Die SVG-Karte liegt als Bild darunter, die Route und die Punkte liegen als
 * eigenes SVG darüber (gleiche viewBox), damit sie klickbar und gefärbt sind.
 */
export default function RouteMap() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const points = ROUTE_POINTS.filter((p) =>
    DESTINATIONS.some((d) => d.slug === p.id),
  );
  const active = activeId
    ? DESTINATIONS.find((d) => d.slug === activeId)
    : undefined;
  const activePosts = active ? getPostsForDestination(active.slug) : [];
  const line = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div className="relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/karte/europe-map.svg"
        alt="Karte von Europa mit unseren Reisestationen"
        className="block w-full"
      />

      <svg
        viewBox={`0 0 ${MAP_VIEWBOX.w} ${MAP_VIEWBOX.h}`}
        className="absolute inset-0 h-full w-full"
        role="group"
        aria-label="Stationen auf der Karte"
      >
        <polyline
          points={line}
          fill="none"
          stroke={theme.magentaLight}
          strokeWidth={3}
          strokeDasharray="2 9"
          strokeLinecap="round"
          opacity={0.9}
        />
        {points.map((p) => {
          const isActive = p.id === activeId;
          return (
            <g
              key={p.id}
              onClick={() => setActiveId(isActive ? null : p.id)}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              aria-label={p.name}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(isActive ? null : p.id);
                }
              }}
            >
              {/* größere unsichtbare Trefferfläche für Finger */}
              <circle cx={p.x} cy={p.y} r={14} fill="transparent" />
              <circle
                cx={p.x}
                cy={p.y}
                r={isActive ? 8 : 5.5}
                fill={isActive ? theme.creme : theme.magenta}
                stroke={theme.ink}
                strokeWidth={2}
              />
            </g>
          );
        })}
      </svg>

      {/* Sticker-Card mit dem angeklickten Ziel */}
      {active && (
        <div
          className="absolute bottom-3 left-3 right-3 rounded-2xl px-5 py-4 sm:right-auto sm:max-w-sm"
          style={{
            background: theme.creme,
            border: `3px solid ${theme.ink}`,
            boxShadow: theme.stickerShadow,
            transform: "rotate(-1deg)",
          }}
        >
          <button
            type="button"
            onClick={() => setActiveId(null)}
            aria-label="Schließen"
            className="absolute right-3 top-2 text-lg font-bold leading-none"
            style={{ color: theme.muted }}
          >
            ×
          </button>
          <h3
            className="pr-6 text-lg font-bold"
            style={{
              color: theme.ink,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            {active.flag} {active.name}
          </h3>
          <p className="mt-1 text-sm" style={{ color: theme.muted }}>
            {active.blurb}
          </p>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-bold">
            <Link href={`/ziele#${active.slug}`} style={{ color: theme.magenta }}>
              Zum Ziel →
            </Link>
            {activePosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                style={{ color: theme.magenta }}
              >
                👩‍👧 Beitrag lesen →
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
