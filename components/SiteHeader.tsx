import Link from "next/link";
import { theme } from "@/lib/theme";

const NAV = [
  { href: "/ziele", label: "Reiseziele" },
  { href: "/blog", label: "Blog" },
  { href: "/mit-kleinen-fuessen", label: "Mit kleinen Füßen" },
];

export default function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-50 border-b-[3px]"
      style={{ background: theme.bg1, borderColor: theme.ink }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-3">
        <Link
          href="/"
          className="text-lg font-bold no-underline"
          style={{
            color: theme.creme,
            fontFamily: '"Georgia", "Times New Roman", serif',
          }}
        >
          Vanlife<span style={{ color: theme.magenta }}>mum</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="no-underline hover:underline"
              style={{ color: theme.sand }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
