"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

/**
 * IntroAnimation — a scroll-driven "morph" hero.
 *
 * Design sources (from the vanlifemum-boop repos):
 *  - Colours: WowMoman "Aubergine & Magenta" palette (assets/styles.css,
 *    farbmuster.html) — aubergine background, glossy spheres, magenta accent.
 *  - Card effect: tussy-van-website sticker card (css/site.css) — white card
 *    with a thick ink border, hard offset shadow, slight rotation and a
 *    neon-flash pulse, easing cubic-bezier(0.22, 1, 0.36, 1).
 *
 * The component is fully self-contained: it owns an internal scroll container,
 * so the effect works inside a fixed-height, `overflow-hidden` wrapper (see
 * `components/Demo.tsx`). Scroll progress inside the frame scrubs the animation.
 */

// WowMoman palette
const BG1 = "#2a1030";
const BG2 = "#3d1745";
const VIOLET = "#7b3fa0";
const VIOLET_LIGHT = "#9b59c0";
const MAGENTA = "#e0479a";
const MAGENTA_LIGHT = "#ec6fb1";
const CREME = "#f8f3f9";
const INK = "#221226";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// On-brand words ("Ich gehe jetzt leben!")
const WORDS = ["LEBEN", "MUT", "FREIHEIT", "JETZT"];

// Glossy sphere background (WowMoman farbmuster.html)
function glossy(color: string) {
  return `radial-gradient(circle at 32% 26%, rgba(255,255,255,.92) 0%, ${color} 26%, rgba(0,0,0,.45) 120%)`;
}

const BALLS = [
  { top: "12%", left: "72%", size: 150, color: MAGENTA },
  { top: "68%", left: "82%", size: 110, color: VIOLET },
  { top: "78%", left: "18%", size: 128, color: MAGENTA_LIGHT },
  { top: "22%", left: "14%", size: 72, color: VIOLET_LIGHT },
];

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Sticker card motion (tussy-van feel).
  const cardRotate = useTransform(scrollYProgress, [0, 0.5, 1], [-2.5, 1.5, -1]);
  const cardY = useTransform(scrollYProgress, [0, 0.5, 1], [16, -10, 0]);

  // Magenta neon-flash at each word hand-off.
  const seg = 1 / WORDS.length;
  const flashStops = [0];
  const flashValues = [0];
  for (let i = 1; i < WORDS.length; i++) {
    const p = i * seg;
    flashStops.push(p - 0.04, p, p + 0.04);
    flashValues.push(0, 1, 0);
  }
  flashStops.push(1);
  flashValues.push(0);
  const flash = useTransform(scrollYProgress, flashStops, flashValues);
  const cardShadow = useTransform(
    flash,
    (f) =>
      `0.28rem 0.28rem 0 rgba(34,18,38,0.9), 0 0 0 ${4 * f}px ${MAGENTA}`,
  );

  const barScaleX = scrollYProgress;
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="scroll-morph-scroll relative h-full w-full overflow-y-auto overflow-x-hidden"
      style={{
        background: `radial-gradient(1100px 620px at 70% 26%, rgba(224,71,154,.28), transparent 60%), linear-gradient(135deg, ${BG1}, ${BG2})`,
      }}
    >
      {/* Pinned stage */}
      <div className="pointer-events-none sticky top-0 flex h-full w-full items-center justify-center overflow-hidden">
        {/* Glossy background spheres (WowMoman) */}
        {BALLS.map((b, i) => (
          <Ball
            key={i}
            ball={b}
            progress={scrollYProgress}
            reduced={!!prefersReducedMotion}
            index={i}
          />
        ))}

        {/* Sticker card (tussy-van) holding the morphing words */}
        <motion.div
          style={
            prefersReducedMotion
              ? {
                  background: CREME,
                  border: `3px solid ${INK}`,
                  boxShadow: "0.28rem 0.28rem 0 rgba(34,18,38,0.9)",
                }
              : {
                  rotate: cardRotate,
                  y: cardY,
                  boxShadow: cardShadow,
                  background: CREME,
                  border: `3px solid ${INK}`,
                  transitionTimingFunction: EASE,
                }
          }
          className="relative flex h-44 w-[300px] items-center justify-center rounded-2xl sm:w-[360px]"
        >
          {/* corner tag */}
          <span
            className="absolute -top-3 left-5 rounded-full px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.22em]"
            style={{ background: MAGENTA, color: CREME }}
          >
            WowMoman
          </span>

          <div className="relative flex h-24 w-full items-center justify-center">
            {WORDS.map((word, i) => (
              <MorphWord
                key={word}
                progress={scrollYProgress}
                index={i}
                total={WORDS.length}
                reduced={!!prefersReducedMotion}
                isFirst={i === 0}
              >
                {word}
              </MorphWord>
            ))}
          </div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: hintOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em]"

        >
          <span style={{ color: CREME }}>Scroll</span>
          <span
            className="block h-8 w-px"
            style={{
              background: `linear-gradient(to bottom, ${MAGENTA_LIGHT}, transparent)`,
            }}
          />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/10">
          <motion.div
            style={{
              scaleX: barScaleX,
              transformOrigin: "left",
              background: `linear-gradient(to right, ${MAGENTA}, ${MAGENTA_LIGHT}, ${VIOLET_LIGHT})`,
            }}
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Scroll spacer — provides the scroll distance the effect scrubs across */}
      <div aria-hidden className="h-[260%]" />
    </div>
  );
}

function Ball({
  ball,
  progress,
  reduced,
  index,
}: {
  ball: { top: string; left: string; size: number; color: string };
  progress: MotionValue<number>;
  reduced: boolean;
  index: number;
}) {
  const dir = index % 2 === 0 ? 1 : -1;
  const y = useTransform(progress, [0, 1], [0, -60 * dir]);
  const rotate = useTransform(progress, [0, 1], [0, 40 * dir]);

  return (
    <motion.div
      aria-hidden
      style={{
        top: ball.top,
        left: ball.left,
        width: ball.size,
        height: ball.size,
        background: glossy(ball.color),
        boxShadow:
          "inset -10px -12px 26px rgba(0,0,0,.35), 0 18px 40px rgba(0,0,0,.35)",
        ...(reduced ? {} : { y, rotate }),
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
    />
  );
}

function MorphWord({
  progress,
  index,
  total,
  reduced,
  isFirst,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduced: boolean;
  isFirst: boolean;
  children: React.ReactNode;
}) {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const fade = seg * 0.35;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - (isFirst ? 0 : fade)), start, end - fade, Math.min(1, end)],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
  );
  const blur = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 0 : 14, 0, 0, isLast ? 0 : 14],
  );
  const y = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 0 : 34, 0, 0, isLast ? 0 : -34],
  );
  const scale = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 1 : 0.85, 1, 1, isLast ? 1 : 1.12],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  const serif = '"Georgia", "Times New Roman", serif';

  if (reduced) {
    return (
      <span
        className="absolute select-none text-5xl font-black tracking-tight sm:text-6xl"
        style={{
          opacity: isFirst ? 1 : 0,
          color: INK,
          fontFamily: serif,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      style={{
        opacity,
        y,
        scale,
        filter,
        fontFamily: serif,
        backgroundImage: `linear-gradient(180deg, ${INK} 0%, ${MAGENTA} 120%)`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      className="absolute select-none text-5xl font-black tracking-tight sm:text-6xl"
    >
      {children}
    </motion.span>
  );
}
