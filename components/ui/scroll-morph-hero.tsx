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
 * The component is fully self-contained: it owns an internal scroll container,
 * so the effect works even when placed inside a fixed-height, `overflow-hidden`
 * wrapper (see `components/Demo.tsx`). Scroll progress inside the frame scrubs
 * the animation forward and backward.
 *
 * NOTE: The original `scroll-morph-hero` source was not provided, so this is a
 * clean-room implementation of the `IntroAnimation` default export the demo
 * imports.
 */

const WORDS = ["DESIGN", "MORPH", "MOTION", "SCROLL"];

export default function IntroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  // Background blob transforms.
  const blobRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const blobScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.5, 1.05]);
  const blobHue = useTransform(scrollYProgress, [0, 0.5, 1], [230, 300, 190]);
  const blobFilter = useTransform(
    blobHue,
    (h) => `blur(60px) hue-rotate(${h - 230}deg)`,
  );

  // Foreground grid drift + progress bar.
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const barScaleX = scrollYProgress;
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      className="scroll-morph-scroll relative h-full w-full overflow-y-auto overflow-x-hidden bg-[#05050a]"
    >
      {/* Pinned stage */}
      <div className="pointer-events-none sticky top-0 flex h-full w-full items-center justify-center overflow-hidden">
        {/* Animated background blob */}
        <motion.div
          aria-hidden
          style={
            prefersReducedMotion
              ? undefined
              : { rotate: blobRotate, scale: blobScale, filter: blobFilter }
          }
          className="absolute h-[420px] w-[420px] rounded-[38%] bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-70"
        />

        {/* Drifting grid overlay */}
        <motion.div
          aria-hidden
          style={prefersReducedMotion ? undefined : { y: gridY }}
          className="absolute inset-0 opacity-[0.12]"
        >
          <div className="h-[150%] w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </motion.div>

        {/* Morphing words */}
        <div className="relative flex h-40 items-center justify-center">
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

        {/* Scroll hint */}
        <motion.div
          style={prefersReducedMotion ? undefined : { opacity: hintOpacity }}
          className="absolute bottom-8 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50"
        >
          <span>Scroll</span>
          <span className="block h-8 w-px bg-gradient-to-b from-white/60 to-transparent" />
        </motion.div>

        {/* Progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-white/5">
          <motion.div
            style={{ scaleX: barScaleX, transformOrigin: "left" }}
            className="h-full w-full bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-300"
          />
        </div>
      </div>

      {/* Scroll spacer — provides the scroll distance the effect scrubs across */}
      <div aria-hidden className="h-[260%]" />
    </div>
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

  // First word is visible immediately; others fade in from their window start.
  const opacity = useTransform(
    progress,
    [
      Math.max(0, start - (isFirst ? 0 : fade)),
      start,
      end - fade,
      Math.min(1, end),
    ],
    [isFirst ? 1 : 0, 1, 1, index === total - 1 ? 1 : 0],
  );
  const blur = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 0 : 14, 0, 0, index === total - 1 ? 0 : 14],
  );
  const y = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 0 : 40, 0, 0, index === total - 1 ? 0 : -40],
  );
  const scale = useTransform(
    progress,
    [start, start + fade, end - fade, end],
    [isFirst ? 1 : 0.85, 1, 1, index === total - 1 ? 1 : 1.15],
  );
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  if (reduced) {
    return (
      <span
        className="absolute select-none text-6xl font-black tracking-tight text-white sm:text-7xl"
        style={{ opacity: isFirst ? 1 : 0 }}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      style={{ opacity, y, scale, filter }}
      className="absolute select-none bg-gradient-to-b from-white to-white/60 bg-clip-text text-6xl font-black tracking-tight text-transparent sm:text-7xl"
    >
      {children}
    </motion.span>
  );
}
