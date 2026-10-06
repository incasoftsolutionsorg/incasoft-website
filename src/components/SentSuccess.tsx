import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const PARTICLES = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = i % 2 === 0 ? 70 : 54;
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, size: i % 3 === 0 ? 7 : 5 };
});

/**
 * "Message sent" confirmation: a paper plane flies off, a ring draws in with a
 * checkmark, a small particle burst follows, then the text fades up.
 * Renders the final state immediately when the user prefers reduced motion.
 */
export function SentSuccess({
  title,
  children,
  action,
  className,
}: {
  title: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const t = (delay: number, duration = 0.5) => (reduce ? { duration: 0 } : { delay, duration, ease: "easeOut" as const });

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={t(0, 0.35)}
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-accent/30 bg-card p-8 text-center shadow-[0_24px_60px_-30px_rgba(11,35,64,0.3)] sm:p-12",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl" aria-hidden="true" />

      <div className="relative h-24 w-24" aria-hidden="true">
        {/* Paper plane takes off */}
        {!reduce && (
          <motion.span
            className="absolute inset-0 flex items-center justify-center text-accent"
            initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
            animate={{ x: 90, y: -70, opacity: 0, rotate: -12, scale: 0.6 }}
            transition={{ duration: 0.65, ease: [0.5, 0, 0.75, 0] }}
          >
            <Send className="h-9 w-9" />
          </motion.span>
        )}

        {/* Expanding pulse rings */}
        {!reduce &&
          [0, 0.25].map((d) => (
            <motion.span
              key={d}
              className="absolute inset-0 rounded-full border-2 border-accent/40"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.9, opacity: [0, 0.7, 0] }}
              transition={{ delay: 0.75 + d, duration: 1.1, ease: "easeOut" }}
            />
          ))}

        {/* Particle burst */}
        {!reduce &&
          PARTICLES.map((p, i) => (
            <motion.span
              key={i}
              className={cn("absolute left-1/2 top-1/2 rounded-full", i % 2 === 0 ? "bg-accent" : "bg-emerald-400")}
              style={{ width: p.size, height: p.size, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
              animate={{ x: p.x, y: p.y, opacity: [0, 1, 0], scale: [0.4, 1, 0.6] }}
              transition={{ delay: 0.85, duration: 0.9, ease: "easeOut" }}
            />
          ))}

        {/* Ring + checkmark draw */}
        <motion.svg
          viewBox="0 0 96 96"
          className="relative h-24 w-24"
          initial={reduce ? false : { scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={reduce ? { duration: 0 } : { delay: 0.55, type: "spring", stiffness: 260, damping: 16 }}
        >
          <circle cx="48" cy="48" r="44" className="fill-accent/10" />
          <motion.circle
            cx="48"
            cy="48"
            r="44"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            className="stroke-accent"
            style={{ rotate: -90, transformOrigin: "50% 50%" }}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={t(0.6, 0.6)}
          />
          <motion.path
            d="M30 49 L43 62 L67 36"
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-accent"
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={t(1.0, 0.4)}
          />
        </motion.svg>
      </div>

      <motion.h3
        className="relative mt-6 font-display text-2xl font-bold text-heading"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={t(1.15)}
      >
        {title}
      </motion.h3>

      {children && (
        <motion.div
          className="relative mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(1.3)}
        >
          {children}
        </motion.div>
      )}

      {action && (
        <motion.div
          className="relative mt-7"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={t(1.45)}
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}
