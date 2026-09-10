import { theme } from "@/lib/theme";

/** Die glänzenden Kugeln aus der WowMoman-Farbwelt (farbmuster.html). */
const BALLS = [
  { top: "8%", left: "74%", size: 170, color: theme.magenta },
  { top: "62%", left: "88%", size: 120, color: theme.violet },
  { top: "76%", left: "12%", size: 110, color: theme.magentaLight },
  { top: "16%", left: "8%", size: 70, color: theme.violetLight },
  { top: "44%", left: "62%", size: 54, color: theme.violetLight },
];

function glossy(color: string) {
  return `radial-gradient(circle at 32% 26%, rgba(255,255,255,.92) 0%, ${color} 26%, rgba(0,0,0,.45) 120%)`;
}

export default function GlossyBalls() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {BALLS.map((b, i) => (
        <span
          key={i}
          className="absolute block -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: glossy(b.color),
            boxShadow:
              "inset -10px -12px 26px rgba(0,0,0,.35), 0 18px 40px rgba(0,0,0,.35)",
          }}
        />
      ))}
    </div>
  );
}
