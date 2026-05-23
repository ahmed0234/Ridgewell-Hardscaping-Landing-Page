"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Review {
  id: number;
  name: string;
  initials: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const reviews: Review[] = [
  {
    id: 1,
    name: "Amanda P.",
    initials: "AP",
    location: "Highlands Ranch, CO",
    rating: 5,
    text: "Our backyard was wasted space cracked concrete, pooling water, and a lawn we never used. Ridgewell designed a paver patio with a fire pit and built-in seating that completely changed how we live at home. We entertain outside constantly now. It looks and feels like a luxury resort, not a patch of grass we ignored.",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Kyle W.",
    initials: "KW",
    location: "Castle Rock, CO",
    rating: 5,
    text: "We had a sinking walkway, failing retaining wall, and drainage that turned the yard into mud every spring. Ridgewell rebuilt everything with premium pavers and proper base work. The crew was professional, fast, and left the property spotless. Curb appeal went up immediately — two neighbors have already asked who we used.",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Nina S.",
    initials: "NS",
    location: "Parker, CO",
    rating: 5,
    text: "No more fighting cracked concrete or a backyard we avoided. Our new patio looks incredible year-round and needs almost zero upkeep.",
    date: "3 weeks ago",
  },
  {
    id: 4,
    name: "Brad L.",
    initials: "BL",
    location: "Lone Tree, CO",
    rating: 5,
    text: "From design consult to final walkthrough, the process was seamless. Full patio and stonework install wrapped in under two weeks — and it still looks flawless after its first Colorado winter.",
    date: "6 weeks ago",
  },
  {
    id: 5,
    name: "Claire D.",
    initials: "CD",
    location: "Centennial, CO",
    rating: 5,
    text: "I didn't believe pavers and stonework could look this high-end. Our outdated backyard is now the nicest outdoor space on the block functional, modern, and built to last.",
    date: "2 months ago",
  },
];

// ─── Motion Variants ──────────────────────────────────────────────────────────
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Shared Sub-components ────────────────────────────────────────────────────
function Stars({ count, size = 14 }: { count: number; size?: number }) {
  return (
    <div
      className="flex items-center gap-[3px]"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 16 16"
          style={{ width: size, height: size }}
          fill={i < count ? "#E86240" : "rgba(244,222,191,0.18)"}
          aria-hidden="true"
        >
          <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" />
        </svg>
      ))}
    </div>
  );
}

function Avatar({
  initials,
  size = "md",
}: {
  initials: string;
  size?: "sm" | "md";
}) {
  const dim = size === "sm" ? "w-8 h-8 text-[11px]" : "w-10 h-10 text-[13px]";
  return (
    <div
      className={`${dim} rounded-full flex items-center justify-center flex-shrink-0 font-semibold tracking-wide text-[#F4DEBF]`}
      style={{
        background: "rgba(232,98,64,0.16)",
        border: "1px solid rgba(232,98,64,0.22)",
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

function GooglePill() {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[10px] font-medium tracking-[0.1em] uppercase"
      style={{ color: "rgba(244,222,191,0.38)" }}
    >
      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" aria-hidden="true">
        <circle
          cx="6"
          cy="6"
          r="5.5"
          fill="none"
          stroke="rgba(244,222,191,0.3)"
          strokeWidth="1"
        />
        <circle cx="6" cy="6" r="2" fill="rgba(244,222,191,0.3)" />
      </svg>
      Google
    </span>
  );
}

// ─── Card Variants ────────────────────────────────────────────────────────────

/** Hero card — spans 2 rows, large quote, full bio */
function HeroCard({ review }: { review: Review }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -4,
        boxShadow:
          "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(232,98,64,0.18)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative h-full rounded-2xl p-8 flex flex-col gap-5 cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(150deg, #4C2733 0%, #3d1e2a 60%, #461E2D 100%)",
        border: "1px solid rgba(244,222,191,0.1)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
      aria-label={`Featured review from ${review.name}`}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #E86240 40%, rgba(232,98,64,0.3) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Big quote */}
      <span
        className="absolute bottom-4 right-6 select-none pointer-events-none font-serif leading-none"
        style={{
          fontSize: "140px",
          color: "rgba(232,98,64,0.07)",
          lineHeight: 1,
        }}
        aria-hidden="true"
      >
        "
      </span>

      {/* Stars */}
      <Stars count={review.rating} size={15} />

      {/* Quote */}
      <blockquote className="flex-1">
        <p
          className="text-[19px] font-normal leading-[1.7] tracking-[-0.01em] font-sans"
          style={{ color: "rgba(244,222,191,0.9)" }}
        >
          {review.text}
        </p>
      </blockquote>

      {/* Footer */}
      <footer
        className="flex items-center gap-3 pt-5"
        style={{ borderTop: "1px solid rgba(244,222,191,0.08)" }}
      >
        <Avatar initials={review.initials} />
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-semibold text-[#F4DEBF] truncate font-sans">
            {review.name}
          </p>
          <p
            className="text-[13px] font-light truncate font-sans"
            style={{ color: "rgba(244,222,191,0.45)" }}
          >
            {review.location}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 font-sans">
          <GooglePill />
          <span
            className="text-[12px]"
            style={{ color: "rgba(244,222,191,0.28)" }}
          >
            {review.date}
          </span>
        </div>
      </footer>
    </motion.article>
  );
}

/** Wide card — spans 2 cols, medium quote */
function WideCard({ review }: { review: Review }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -3,
        boxShadow:
          "0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(232,98,64,0.14)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative h-full rounded-2xl p-7 flex flex-col gap-4 cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(76,39,51,0.85) 0%, rgba(70,30,45,0.92) 100%)",
        border: "1px solid rgba(244,222,191,0.09)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
      }}
      aria-label={`Review from ${review.name}`}
    >
      {/* Ember dot accent */}
      <div
        className="absolute top-5 right-5 w-1.5 h-1.5 rounded-full"
        style={{ background: "#E86240", opacity: 0.5 }}
        aria-hidden="true"
      />

      <Stars count={review.rating} size={13} />

      <blockquote className="flex-1">
        <p
          className="text-[18px] font-normal leading-[1.5] font-sans"
          style={{ color: "rgba(244,222,191,0.82)" }}
        >
          {review.text}
        </p>
      </blockquote>

      <footer className="flex items-center gap-3">
        <Avatar initials={review.initials} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-[16px] font-semibold text-[#F4DEBF] truncate font-sans">
            {review.name}
          </p>
          <p
            className="text-[13px] font-light truncate font-sans"
            style={{ color: "rgba(244,222,191,0.4)" }}
          >
            {review.location}
          </p>
        </div>
        <span
          className="text-[10px] flex-shrink-0"
          style={{ color: "rgba(244,222,191,0.28)" }}
        >
          {review.date}
        </span>
      </footer>
    </motion.article>
  );
}

/** Compact card — single cell, tight layout */
function CompactCard({ review }: { review: Review }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{
        y: -3,
        boxShadow:
          "0 12px 36px rgba(0,0,0,0.3), 0 0 0 1px rgba(232,98,64,0.12)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative h-full rounded-2xl p-6 flex flex-col gap-3.5 cursor-default"
      style={{
        background: "rgba(76,39,51,0.5)",
        border: "1px solid rgba(244,222,191,0.07)",
        boxShadow: "0 2px 16px rgba(0,0,0,0.2)",
      }}
      aria-label={`Review from ${review.name}`}
    >
      <Stars count={review.rating} size={12} />

      <blockquote className="flex-1">
        <p
          className="text-[16px] font-normal leading-[1.5] font-sans"
          style={{ color: "rgba(244,222,191,0.76)" }}
        >
          {review.text}
        </p>
      </blockquote>

      <footer
        className="flex items-center gap-2.5 pt-3"
        style={{ borderTop: "1px solid rgba(244,222,191,0.06)" }}
      >
        <Avatar initials={review.initials} size="sm" />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-[#F4DEBF] truncate font-sans">
            {review.name}
          </p>
          <p
            className="text-[13px] font-light truncate font-sans"
            style={{ color: "rgba(244,222,191,0.38)" }}
          >
            {review.location} · {review.date}
          </p>
        </div>
      </footer>
    </motion.article>
  );
}

/** Stats / social proof tile */
function StatsTile() {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{
        y: -3,
        boxShadow:
          "0 16px 48px rgba(232,98,64,0.15), 0 0 0 1px rgba(232,98,64,0.2)",
      }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative h-full rounded-2xl p-7 flex flex-col justify-between cursor-default overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #E86240 0%, rgba(232,98,64,0.82) 100%)",
        border: "1px solid rgba(232,98,64,0.3)",
        boxShadow: "0 8px 32px rgba(232,98,64,0.2)",
      }}
      aria-label="5 star average rating across hardscaping reviews"
    >
      {/* Decorative ring */}
      <div
        className="absolute -top-8 -right-8 w-32 h-32 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.12)" }}
        aria-hidden="true"
      />
      <div
        className="absolute -top-2 -right-2 w-16 h-16 rounded-full"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        aria-hidden="true"
      />

      <div>
        <p className="text-[11px] font-medium tracking-[0.16em] uppercase text-white/70 mb-3">
          Average Rating
        </p>
        <p className="text-[56px] font-bold leading-none text-white tracking-tight">
          5.0
        </p>
      </div>

      <div>
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 16 16"
              className="w-4 h-4"
              fill="white"
              aria-hidden="true"
            >
              <path d="M8 1l1.8 3.6L14 5.4l-3 2.9.7 4.1L8 10.3l-3.7 2.1.7-4.1-3-2.9 4.2-.8z" />
            </svg>
          ))}
        </div>
        <p className="text-[13px] font-medium text-white/80">
          9 Google Reviews · Hardscape Projects
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function ReviewsSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [r1, r2, r3, r4, r5] = reviews;

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(170deg, #461E2D 0%, #3a1824 45%, #4C2733 100%)",
      }}
      aria-labelledby="reviews-title"
    >
      {/* Noise texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Glow top-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 600px 500px at 85% 10%, rgba(232,98,64,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* ── Header ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] uppercase text-[#E86240] mb-4"
            >
              Client Stories
              <span
                className="block w-8 h-px opacity-60"
                style={{ background: "#E86240" }}
                aria-hidden="true"
              />
            </motion.p>
            <motion.h2
              id="reviews-title"
              variants={fadeUp}
              className="text-[clamp(30px,4.5vw,50px)] font-bold leading-[1.1] tracking-tight text-[#F4DEBF]"
            >
              Backyards They
              <br />
              Actually Live In
            </motion.h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="text-[18px] font-normal max-w-[350px] sm:text-right leading-tight font-sans"
            style={{ color: "rgba(244,222,191,0.48)" }}
          >
            Real homeowners. Real transformations from cracked concrete and
            unused yards to premium patios, stonework, and outdoor living
            built by Ridgewell.
          </motion.p>
        </motion.div>

        {/* ── Bento Grid ── */}
        {/*
          Desktop layout (4 cols, 2 rows):
          [  Hero (col 1–2, row 1–2)  ] [ Wide (col 3–4, row 1) ]
          [                           ] [ Compact3 ] [ Compact4  ] [ Stats ]  ← actually row 2 needs rethink
          
          True bento: 4-col grid, rows auto, explicit placements
          Row 1: Hero spans col1-2 rows1-2 | Wide spans col3-4 row1 | Stats spans col4 row2 (wait – we have 5 reviews + stats tile = 6 cells)
          
          Final layout:
          Col:   1          2          3          4
          Row1:  Hero(1-2, 1-3) ──────  Wide(3-4, 1)
          Row2:  Hero cont.             Compact(3,2)  Stats(4,2)
          Row3:  Compact(1,3) Compact(2,3) Wide2(3-4,3)
        */}
        <motion.div
          className="hidden lg:grid gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "auto auto auto",
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          {/* Hero — col 1-2, row 1-2 */}
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 3" }}>
            <HeroCard review={r1} />
          </div>

          {/* Wide top right — col 3-4, row 1 */}
          <div style={{ gridColumn: "3 / 5", gridRow: "1 / 2" }}>
            <WideCard review={r2} />
          </div>

          {/* Compact col 3, row 2 */}
          <div style={{ gridColumn: "3 / 4", gridRow: "2 / 3" }}>
            <CompactCard review={r3} />
          </div>

          {/* Stats tile — col 4, row 2 */}
          <div style={{ gridColumn: "4 / 5", gridRow: "2 / 3" }}>
            <StatsTile />
          </div>

          {/* Compact col 1, row 3 */}
          <div style={{ gridColumn: "1 / 2", gridRow: "3 / 4" }}>
            <CompactCard review={r4} />
          </div>

          {/* Compact col 2, row 3 */}
          <div style={{ gridColumn: "2 / 3", gridRow: "3 / 4" }}>
            <CompactCard review={r5} />
          </div>

          {/* Wide bottom right — col 3-4, row 3 */}
          <div style={{ gridColumn: "3 / 5", gridRow: "3 / 4" }}>
            <WideCard review={r3} />
          </div>
        </motion.div>

        {/* ── Mobile Stack ── */}
        <motion.div
          className="flex flex-col gap-4 lg:hidden"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={stagger}
        >
          <HeroCard review={r1} />
          <WideCard review={r2} />
          <div className="grid grid-cols-2 gap-4">
            <StatsTile />
            <CompactCard review={r3} />
          </div>
          <CompactCard review={r4} />
          <CompactCard review={r5} />
        </motion.div>

        {/* ── Footer trust line ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: "1px solid rgba(244,222,191,0.07)" }}
        >
          <p
            className="text-[16px] font-normal text-center sm:text-left font-sans"
            style={{ color: "rgba(244,222,191,0.45)" }}
          >
            Ready to turn wasted outdoor space into a{" "}
            <span className="font-medium text-[#E86240]">
              patio, fire pit, or full outdoor living upgrade
            </span>
            ? Start with a free design consultation.
          </p>

          <motion.a
            href="#consultation"
            whileHover={{
              y: -2,
              boxShadow:
                "0 8px 32px rgba(232,98,64,0.4), 0 0 0 3px rgba(232,98,64,0.12)",
            }}
            whileTap={{ scale: 0.975 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-sm text-[14px] font-semibold tracking-wide text-white no-underline flex-shrink-0"
            style={{
              background: "#E86240",
              boxShadow: "0 4px 20px rgba(232,98,64,0.25)",
            }}
          >
            Book Your Free Outdoor Living Consult
            <svg
              viewBox="0 0 16 16"
              className="w-3.5 h-3.5 stroke-white"
              strokeWidth="2"
              fill="none"
              aria-hidden="true"
            >
              <line x1="2" y1="8" x2="13" y2="8" />
              <polyline points="9,4 13,8 9,12" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
