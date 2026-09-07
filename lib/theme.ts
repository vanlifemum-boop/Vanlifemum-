// Shared WowMoman "Aubergine & Magenta" palette (from vanlifemum-boop/WowMoman-).
// Single source of truth for colours used across the hero and the destination cards.

export const theme = {
  bg1: "#2a1030",
  bg2: "#3d1745",
  bg3: "#532057",
  violet: "#7b3fa0",
  violetLight: "#9b59c0",
  magenta: "#e0479a",
  magentaLight: "#ec6fb1",
  creme: "#f8f3f9",
  sand: "#efe2f0",
  ink: "#221226",
  muted: "#6d5a73",
  ease: "cubic-bezier(0.22, 1, 0.36, 1)",
  stickerShadow: "0.28rem 0.28rem 0 rgba(34,18,38,0.9)",
} as const;

// Card-head colour keys (mapped from tussy-van's bg-* classes) → on-brand gradients.
export const headGradients: Record<string, string> = {
  "bg-blue": "linear-gradient(135deg, #7b3fa0, #532057)",
  "bg-deep": "linear-gradient(135deg, #532057, #2a1030)",
  "bg-army": "linear-gradient(135deg, #e0479a, #b5327a)",
  "bg-terra": "linear-gradient(135deg, #ec6fb1, #c94f92)",
  "bg-camel": "linear-gradient(135deg, #9b59c0, #7b3fa0)",
};
