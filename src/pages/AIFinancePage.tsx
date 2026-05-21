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

const FEATURES = [
  "Ten uniquely-programmed senior analyst agents debating in real time",
  "Live price data via yfinance and current news via NewsAPI",
  "Analysts covering growth, macro, value, sector, risk, ESG, quant, behavioral, ops, and final verdict",
  "Tiered verdicts: Strong Buy, Buy, Hold, or Avoid with vote thresholds",
  "Improvement Manager meta-agent backtests past calls every Sunday at 8 AM",
  "Performance feedback loop refines analyst reasoning over time",
  "Owner dashboard surfaces numbered improvement notes automatically",
  "Entire debate pipeline runs within seconds",
]

export default function AIFinancePage() {
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
            Mini AI Finance Equity Analysis
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 64px" }}>
            KenFinance — AI-powered equity analysis dashboard
          </p>
        </FadeUp>

        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 72, marginBottom: 100 }}>
          <FadeUp>
            {/* Video */}
            <div style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}`, marginBottom: 40, boxShadow: "0 8px 40px rgba(0,0,0,0.12)" }}>
              <video
                controls
                playsInline
                src="/AI-stock/Video%20Project%203.mp4"
                style={{ width: "100%", display: "block" }}
              />
            </div>

            {/* Title */}
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 6px" }}>
              KenFinance
            </h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.primary, margin: "0 0 28px" }}>
              AI-Powered Equity Analysis Dashboard
            </p>

            {/* Two-col layout */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 48, alignItems: "start" }}>
              {/* Body text */}
              <div>
                <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, margin: "0 0 14px" }}>
                  What It Does &amp; How It Works
                </h3>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, lineHeight: 1.9, margin: "0 0 32px" }}>
                  KenFinance is an AI-powered equity analysis dashboard that deploys a team of ten uniquely-programmed senior analysts, each modeled after real-world archetypes from Goldman Sachs, JPMorgan, Morgan Stanley, BlackRock, and HSBC, to debate any publicly-traded stock in real time. When a user submits a ticker, the system pulls live price data via yfinance and current news via NewsAPI, then routes that intelligence to all ten analysts simultaneously. Each analyst, covering growth, macro, value, sector, risk, ESG, quant, behavioral finance, operations, and final verdict, argues their position through the Claude AI API, with perspectives shaped by their firm background and specialty. Votes are tallied and translated into a clear, tiered verdict: Strong Buy, Buy, Hold, or Avoid, with Strong Buy requiring at least seven of the ten analysts in agreement. Built on a Python FastAPI backend, React 18 frontend, and SQLite database, the entire debate pipeline runs within seconds and surfaces a richly reasoned recommendation rather than a single algorithmic score.
                </p>

                <h3 style={{ fontFamily: "Arial, sans-serif", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, margin: "0 0 14px" }}>
                  Who It Helps &amp; How It Auto-Improves
                </h3>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, lineHeight: 1.9, margin: 0 }}>
                  KenFinance is built for self-directed retail investors, finance students, and research-minded individuals who want institutional-grade thinking without the price tag of a Bloomberg terminal or a private analyst team. Instead of trusting one opinion or a raw data feed, users get a structured multi-perspective debate that mirrors how professional investment committees actually operate. What separates KenFinance from a static tool is its Improvement Manager, a meta-agent that runs automatically every Sunday at 8 AM. It backtests every past Strong Buy and Buy recommendation against actual market prices, measures how those calls performed, and generates numbered improvement notes delivered directly to the owner's dashboard. Over time, this feedback loop tightens the analysts' reasoning frameworks, surfaces blind spots across the team's historical calls, and produces a living performance record. The result is a system that does not just recommend stocks, it learns from its own track record and continuously refines how it thinks.
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
                    {FEATURES.map((f, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                        <span style={{ color: C.primary, flexShrink: 0, marginTop: 2 }}>→</span>
                        <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: C.muted, lineHeight: 1.6 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeUp>
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
