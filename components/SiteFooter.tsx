import Link from "next/link";
import { theme } from "@/lib/theme";

export default function SiteFooter() {
  return (
    <footer
      className="border-t-[3px] px-6 py-8"
      style={{ background: theme.bg1, borderColor: theme.ink }}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm">
        <span style={{ color: theme.sand }}>© Vanlifemum · vanlifemum.de</span>
        <nav className="flex flex-wrap gap-x-5 gap-y-1">
          <Link href="/ziele" className="no-underline" style={{ color: theme.sand }}>
            Reiseziele
          </Link>
          <Link href="/blog" className="no-underline" style={{ color: theme.sand }}>
            Blog
          </Link>
          <Link
            href="/mit-kleinen-fuessen"
            className="no-underline"
            style={{ color: theme.sand }}
          >
            Mit kleinen Füßen
          </Link>
        </nav>
      </div>
    </footer>
  );
}
