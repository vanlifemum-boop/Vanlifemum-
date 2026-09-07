"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { DESTINATIONS, COUNTRIES, type CountryKey } from "@/lib/destinations";
import DestinationCard from "@/components/DestinationCard";
import { theme } from "@/lib/theme";

type Filter = CountryKey | "alle";

export default function ZielePage() {
  const [filter, setFilter] = useState<Filter>("alle");

  const visible = useMemo(
    () =>
      filter === "alle"
        ? DESTINATIONS
        : DESTINATIONS.filter((d) => d.country === filter),
    [filter],
  );

  // Only show country chips that actually have destinations.
  const countries = COUNTRIES.filter((c) =>
    DESTINATIONS.some((d) => d.country === c.key),
  );

  return (
    <main
      className="min-h-screen"
      style={{
        background: `radial-gradient(1100px 620px at 70% 10%, rgba(224,71,154,.28), transparent 60%), linear-gradient(135deg, ${theme.bg1}, ${theme.bg2})`,
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-16">
        <header className="space-y-3">
          <Link
            href="/"
            className="text-sm font-semibold"
            style={{ color: theme.magentaLight }}
          >
            ← Zurück
          </Link>
          <p
            className="text-sm font-bold uppercase tracking-[0.28em]"
            style={{ color: theme.magenta }}
          >
            Reiseziele
          </p>
          <h1
            className="text-4xl font-bold sm:text-5xl"
            style={{
              color: theme.creme,
              fontFamily: '"Georgia", "Times New Roman", serif',
            }}
          >
            Unterwegs mit Mama &amp; Kind.
          </h1>
          <p className="max-w-2xl" style={{ color: theme.sand }}>
            {DESTINATIONS.length} Ziele in Europa — mit Stellplatz, bester
            Reisezeit und persönlichem Tipp. Zu jedem Ziel folgt ein
            Blog-Beitrag darüber, wie es sich <em>mit Kind</em> anfühlt.
          </p>
        </header>

        {/* Country filter */}
        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Nach Land filtern"
        >
          <Chip
            active={filter === "alle"}
            onClick={() => setFilter("alle")}
            label={`Alle (${DESTINATIONS.length})`}
          />
          {countries.map((c) => (
            <Chip
              key={c.key}
              active={filter === c.key}
              onClick={() => setFilter(c.key)}
              label={`${c.flag} ${c.label}`}
            />
          ))}
        </div>

        <p className="mt-4 text-sm" style={{ color: theme.sand }}>
          {visible.length} {visible.length === 1 ? "Ziel" : "Ziele"}
        </p>

        {/* Grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((d) => (
            <DestinationCard key={d.slug} dest={d} />
          ))}
        </div>
      </div>
    </main>
  );
}

function Chip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className="rounded-full px-4 py-2 text-sm font-bold transition-transform"
      style={{
        border: `3px solid ${theme.ink}`,
        background: active ? theme.magenta : theme.creme,
        color: active ? theme.creme : theme.ink,
        boxShadow: theme.stickerShadow,
        transitionTimingFunction: theme.ease,
      }}
    >
      {label}
    </button>
  );
}
