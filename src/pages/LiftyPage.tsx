import { useContext } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ThemeContext } from "../App"

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Research & Discovery",
    description:
      "Conducted on-site observations at SUTD to understand how students and staff interact with cleaning robots. Interviewed LionsBot engineers to map technical constraints, and benchmarked competitor products to identify gaps in usability and human-robot interaction.",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=900&q=80",
    alt: "Research session with sticky notes",
  },
  {
    step: "02",
    title: "Ideation & Sketching",
    description:
      "Generated over 60 concept sketches exploring different form factors, interaction models, and emotional registers for the robot. Ran a rapid design sprint with the team to converge on three distinct directions before selecting the 'companion' concept — a form language that feels approachable rather than industrial.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=900&q=80",
    alt: "Concept sketches",
  },
  {
    step: "03",
    title: "CAD & Prototyping",
    description:
      "Modelled the chosen concept in Fusion 360, iterating on proportions and internal component clearances in close collaboration with LionsBot's mechanical team. Produced foam and FDM 3D-printed mock-ups at 1:1 scale to test ergonomics and visual presence in corridor spaces.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
    alt: "CAD and 3D prototyping",
  },
  {
    step: "04",
    title: "Testing & Iteration",
    description:
      "Placed low-fidelity prototypes in SUTD corridors and observed unprompted reactions from passersby. Collected structured feedback on perceived safety, personality, and trust. Insights drove two major form revisions — softening the top profile and adding an expressive LED ring that signals intent.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=900&q=80",
    alt: "User testing in corridor",
  },
]

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

export default function LiftyPage() {
  const { C } = useContext(ThemeContext)

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>
      {/* ── Top bar ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}`, padding: "16px 40px" }}>
        <Link
          to="/"
          style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}
        >
          ← Back
        </Link>
      </div>

      {/* ── Hero image ── */}
      <div style={{ width: "100%", height: "60vh", overflow: "hidden", background: C.border }}>
        <motion.img
          src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1400&q=85"
          alt="Lifty robot"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* ── Header ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 40px 0" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 16 }}>
            Product Design · Hardware
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
            Lifty
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 40px" }}>
            SUTD × LionsBot International
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.muted, lineHeight: 1.9, maxWidth: 680, margin: "0 0 80px" }}>
            Lifty is an autonomous cleaning robot designed to feel like a campus companion rather than a piece of industrial equipment. Working alongside LionsBot International — Singapore's leading commercial cleaning robot manufacturer — the goal was to redesign the human-facing shell and interaction model of an existing platform so it could operate confidently in SUTD's human-dense corridors.
          </p>
        </FadeUp>

        {/* ── Metadata row ── */}
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, paddingBottom: 60, borderBottom: `1px solid ${C.border}`, marginBottom: 80 }}>
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "SUTD Design Team × LionsBot Eng." },
              { label: "Tools", value: "Fusion 360 · Figma · Arduino" },
              { label: "Duration", value: "Jan – Apr 2026" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text }}>{value}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* ── Process ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 120px" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Process</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 64px" }}>How it was made</h2>
        </FadeUp>

        <div style={{ display: "flex", flexDirection: "column", gap: 100 }}>
          {PROCESS_STEPS.map((step, i) => (
            <FadeUp key={step.step} delay={0.05}>
              <div style={{ display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr", gap: 48, alignItems: "center" }}>
                {/* Text — alternates left/right */}
                <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", color: C.primary, marginBottom: 12 }}>{step.step}</div>
                  <h3 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 16px" }}>{step.title}</h3>
                  <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, lineHeight: 1.85, margin: 0 }}>{step.description}</p>
                </div>
                {/* Image */}
                <div style={{ order: i % 2 === 0 ? 1 : 0, borderRadius: 12, overflow: "hidden", aspectRatio: "4/3", background: C.border }}>
                  <motion.img
                    src={step.image}
                    alt={step.alt}
                    initial={{ scale: 1.04 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* ── Footer nav ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "40px", textAlign: "center" }}>
        <Link
          to="/"
          style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}
        >
          ← Back to portfolio
        </Link>
      </div>
    </div>
  )
}
