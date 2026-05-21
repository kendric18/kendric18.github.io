import React, { useContext } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ThemeContext } from "../App"

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}

function Tag({ children }: { children: string }) {
  const { C } = useContext(ThemeContext)
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "Arial, sans-serif",
      fontSize: 11,
      color: C.muted,
      border: `1px solid ${C.border}`,
      borderRadius: 20,
      padding: "4px 12px",
    }}>
      {children}
    </span>
  )
}

// ── Single project card ────────────────────────────────────────────────────────
interface Project {
  title: string
  subtitle: string
  screenshot: string
  p1: string
  p2: string
  stack: string[]
  features: string[]
}

function ProjectBlock({ project }: { project: Project }) {
  const { C } = useContext(ThemeContext)
  return (
    <FadeUp>
      <div style={{ marginBottom: 100 }}>
        {/* Screenshot */}
        <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 40, boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
          <img
            src={project.screenshot}
            alt={project.title}
            style={{ width: "100%", display: "block" }}
          />
        </div>

        {/* Title */}
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
          {project.title}
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.primary, margin: "0 0 28px" }}>
          {project.subtitle}
        </p>

        {/* Two-col layout: text left, details right */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}>
          {/* Body text */}
          <div>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, lineHeight: 1.9, margin: "0 0 20px" }}>
              {project.p1}
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, lineHeight: 1.9, margin: 0 }}>
              {project.p2}
            </p>
          </div>

          {/* Side panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* Stack */}
            <div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Tech Stack</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                <Tag>Vibe-coded with Claude.ai &amp; ChatGPT</Tag>
              </div>
            </div>

            {/* Key features */}
            <div>
              <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Key Features</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {project.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: C.primary, flexShrink: 0, marginTop: 2 }}>→</span>
                    <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </FadeUp>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    title: "SG Insurance Planner",
    subtitle: "Full-stack financial planning tool for Singapore insurance advisors",
    screenshot: "/personal-projects/Screenshot%202026-05-21%20153219.png",
    p1: "SG Insurance Planner is a full-stack financial planning web application built for Singapore-based insurance advisors. The app enables advisors to manage a book of clients, track policies across six coverage categories — Whole Life, Critical Illness, Hospitalisation, Disability Income, Accidental, and Wealth Accumulation — and visualise each client's protection portfolio through an interactive coverage timeline chart. Key features include a dynamic coverage gap analysis that benchmarks a client's current cover against recommended amounts, a multi-series chart that aggregates policies by type with per-policy toggles, rider tracking for Critical Illness, Early CI, and Accidental Death benefits, surrender value schedule interpolation, and investment projection modelling with best and worst case rates.",
    p2: "The application is designed for independent financial advisors who need a clean, centralised tool to prepare for client reviews and generate professional client-facing reports. At the click of a button, the app produces a branded PDF Policy Summary covering all active policies, a coverage gap table, and per-policy breakdowns of rider amounts and surrender values — eliminating the need for manual spreadsheets. Built with React and Vite on the frontend, Node.js and Express on the backend, and SQLite for lightweight data persistence, the app runs entirely locally to keep sensitive client data off third-party servers. PDF generation is handled server-side via Puppeteer, producing print-ready A4 documents styled to a professional advisory standard.",
    stack: ["React", "Vite", "Node.js", "Express", "SQLite", "Puppeteer"],
    features: [
      "Coverage gap analysis across 6 categories",
      "Interactive multi-series timeline chart",
      "Per-policy toggle and rider tracking",
      "Surrender value schedule interpolation",
      "Investment projection (best / worst case)",
      "One-click branded PDF Policy Summary",
      "Runs fully local — no third-party data exposure",
    ],
  },
]

export default function MiniAppsPage() {
  const { C } = useContext(ThemeContext)

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}`, padding: "16px 40px" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 40px 0" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 16 }}>
            Vibe Coded · Personal Projects
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
            Mini Apps
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 64px" }}>
            A collection of personal side projects — tools built fast, built to actually work.
          </p>
        </FadeUp>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 72 }}>
          {PROJECTS.map(p => <ProjectBlock key={p.title} project={p} />)}
        </div>
      </div>

      {/* Footer nav */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "40px", textAlign: "center" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back to portfolio
        </Link>
      </div>
    </div>
  )
}
