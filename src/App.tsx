import { useState, useEffect, useContext, createContext } from "react"
import type { CSSProperties, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Routes, Route, Link } from "react-router-dom"
import { ShaderAnimation } from "./ShaderAnimation"
import { Scroller } from "@/components/ui/scroller-1"
import LiftyPage from "./pages/LiftyPage"
import OrigaminahPage from "./pages/OrigaminahPage"
import VisualisationPage from "./pages/VisualisationPage"
import MiniAppsPage from "./pages/MiniAppsPage"

// ─── COLOUR TOKENS ────────────────────────────────────────────────────────────
const LIGHT = {
  bg: "#F5F5F0",
  surface: "#F9F4EE",
  card: "#FFFFFF",
  accent: "#C3E41D",
  primary: "#C4573A",
  text: "#1A1A1A",
  muted: "#666666",
  placeholder: "#888888",
  border: "#E8E0D5",
  navBg: "rgba(245,245,240,0.85)",
}

const DARK = {
  bg: "#111110",
  surface: "#1A1A18",
  card: "#222220",
  accent: "#C3E41D",
  primary: "#D4694B",
  text: "#F0EFE8",
  muted: "#999990",
  placeholder: "#666660",
  border: "#2E2E2C",
  navBg: "rgba(17,17,16,0.88)",
}

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────
type Colors = typeof LIGHT
type ThemeCtx = { C: Colors; dark: boolean; toggle: () => void }
export const ThemeContext = createContext<ThemeCtx>({ C: LIGHT, dark: false, toggle: () => {} })
const useTheme = () => useContext(ThemeContext)

// ─── DATA ─────────────────────────────────────────────────────────────────────
const PHOTO_URL = "/kendric.jpg"

const PROJECTS = [
  { id: "lifty", category: "Product Design · Hardware", title: "Lifty", subtitle: "SUTD × LionsBot International", image: "/lifty/lifty-card.jpg", link: "/projects/lifty" },
  { id: "project-2", category: "Design Thinking and Innovation", title: "Origaminah", subtitle: "SUTD Studio project", image: "/Origaminah/Problem%20Staments.png", link: "/projects/origaminah" },
  { id: "project-3", category: "Interior Design · 3D Drafting", title: "3D Visualisation", subtitle: "The Wood Creation · Edgeline Planners", image: "/3D%20Visualisation/WhatsApp%20Image%202024-04-18%20at%2012.51.04%20PM-%E5%AE%A2%E5%8E%85-20260521-000918.jpg", link: "/projects/3d-visualisation" },
  { id: "project-4", category: "Vibe Coded · Personal Projects", title: "Mini Apps", subtitle: "Personal vibe-coded projects", image: "/personal-projects/Screenshot%202026-05-21%20153219.png", link: "/projects/mini-apps" },
]

const SKILLS = ["Product Design", "UX Research", "Figma / Framer", "Python / C++", "CAD / Fusion 360", "AutoCAD", "Electronics / Arduino", "AI / ML"]

const EXPERIENCE = [
  { role: "Product Design & Prototyping", org: "LionsBot International", years: "Jan – Apr 2026" },
  { role: "Customer Success Executive", org: "Edgeline Planners", years: "2026 – Present" },
  { role: "Electrical Engineer Intern", org: "Keppel (Infrastructure Division)", years: "2021 – 2022" },
  { role: "VP, Scratch Club", org: "SUTD", years: "2024 – Present" },
  { role: "Part-time Design Drafter", org: "The Wood Creation", years: "2020 – 2025" },
]

const NAV_LINKS = ["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"]

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function BlurText({ text }: { text: string }) {
  return (
    <span style={{ display: "inline-flex" }}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: "blur(12px)", y: -20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: "easeOut" }}
          style={{ display: "inline-block" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}

function FadeUp({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
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

function Eyebrow({ children, style: s }: { children: string; style?: CSSProperties }) {
  const { C } = useTheme()
  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12, ...s }}>
      {children}
    </div>
  )
}

function SkillPill({ children, highlight }: { children: string; highlight: boolean }) {
  const { C } = useTheme()
  const [hovered, setHovered] = useState(false)
  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: highlight ? C.primary : hovered ? C.primary : C.surface,
        color: highlight || hovered ? "#fff" : C.text,
        borderColor: highlight || hovered ? C.primary : C.border,
      }}
      transition={{ duration: 0.18 }}
      style={{ display: "inline-block", border: `1px solid ${C.border}`, borderRadius: 20, padding: "6px 14px", fontFamily: "Arial, sans-serif", fontSize: 11, cursor: "default" }}
    >
      {children}
    </motion.span>
  )
}

function CTAButton({ children, href, filled }: { children: string; href: string; filled: boolean }) {
  const { C } = useTheme()
  const [hovered, setHovered] = useState(false)
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: filled ? (hovered ? "#a8412a" : C.primary) : hovered ? C.border : "transparent",
      }}
      transition={{ duration: 0.18 }}
      style={{ display: "inline-block", padding: "12px 24px", borderRadius: 5, fontFamily: "Arial, sans-serif", fontSize: 12, letterSpacing: "0.5px", textDecoration: "none", color: filled ? "#fff" : C.muted, border: filled ? "none" : `1px solid ${C.border}`, cursor: "pointer" }}
    >
      {children}
    </motion.a>
  )
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const { C, dark, toggle } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}` }}>
        <button
          onClick={() => setOpen(true)}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
          aria-label="Open menu"
        >
          {[22, 22, 14].map((w, i) => (
            <div key={i} style={{ width: w, height: 2, borderRadius: 2, backgroundColor: C.muted }} />
          ))}
        </button>

        {/* Dark/light toggle */}
        <motion.div
          onClick={toggle}
          animate={{ backgroundColor: dark ? C.accent : "#ddd" }}
          transition={{ duration: 0.3 }}
          style={{ width: 44, height: 24, borderRadius: 12, position: "relative", cursor: "pointer", flexShrink: 0 }}
          aria-label="Toggle dark mode"
        >
          <motion.div
            animate={{ left: dark ? 23 : 3 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            style={{ width: 18, height: 18, background: dark ? "#111" : "#fff", borderRadius: "50%", position: "absolute", top: 3, boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }}
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200 }} />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              style={{ position: "fixed", top: 0, left: 0, bottom: 0, width: 280, background: C.surface, zIndex: 300, padding: "48px 40px", display: "flex", flexDirection: "column", gap: 32 }}
            >
              <button onClick={() => setOpen(false)} style={{ alignSelf: "flex-end", background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.muted, lineHeight: 1 }} aria-label="Close menu">×</button>
              {NAV_LINKS.map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setOpen(false)
                    setTimeout(() => {
                      document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
                    }, 300) // wait for drawer close animation
                  }}
                  style={{ fontFamily: "Arial, sans-serif", fontSize: 12, letterSpacing: "1px", textTransform: "uppercase", color: C.text, textDecoration: "none", background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}
                >
                  {link}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { C } = useTheme()
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setBounce((b) => !b), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="home" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 40, position: "relative" }}>
      <ShaderAnimation />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "backOut" }}
          style={{ width: 110, height: 150, borderRadius: 9999, overflow: "hidden", border: `3px solid ${C.bg}`, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", marginBottom: 28 }}
        >
          <img src={PHOTO_URL} alt="Kendric" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", display: "block" }} />
        </motion.div>

        <h1 style={{ fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif", fontWeight: 900, fontSize: "clamp(64px, 14vw, 148px)", color: C.accent, letterSpacing: "-4px", lineHeight: 0.9, textTransform: "uppercase", userSelect: "none", margin: 0, textAlign: "center" }}>
          <BlurText text="KENDRIC" />
        </h1>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} style={{ marginTop: 36, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 15, color: C.muted, letterSpacing: "0.3px", textAlign: "center" }}>
          Design-led. Craft-driven.
        </motion.p>

        <motion.div animate={{ y: bounce ? 6 : 0 }} transition={{ duration: 0.6, ease: "easeInOut" }} style={{ marginTop: 20, color: C.placeholder, fontSize: 22, lineHeight: 1 }}>
          ⌄
        </motion.div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  const { C } = useTheme()
  return (
    <section id="about" style={{ background: C.surface, padding: "80px 40px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
        <FadeUp>
          <div>
            <Eyebrow>About</Eyebrow>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 16px", lineHeight: 1.4 }}>From carpentry to code — always building.</h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: "0 0 12px" }}>
              Started with a screwdriver and a saw. Then Interior Design at NAFA, EEE at SP — and now Design & AI at SUTD. Every pivot taught me to think across disciplines.
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: "0 0 12px" }}>
              Design & AI undergraduate at SUTD, bridging human-centered design with engineering. Skilled in product design, CAD modelling, and hardware prototyping. Passionate about using AI to build meaningful, people-first products. Aspiring entrepreneur with a builder's mindset, focused on creating things that genuinely improve lives.
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.8, margin: 0 }}>
              BSc Design and AI (DAI) at SUTD | VP of Scratch Club | Customer Success at Edgeline Planners
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div style={{ width: "66%", aspectRatio: "3 / 4", borderRadius: 16, overflow: "hidden", background: C.border, margin: "0 auto" }}>
            <img src={PHOTO_URL} alt="Kendric" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 15%", display: "block" }} />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const { C } = useTheme()
  const [hovered, setHovered] = useState(false)

  const isInternal = project.link.startsWith("/")
  const cardStyle = { background: C.card, borderRadius: 8, overflow: "hidden", border: `1px solid ${C.border}`, cursor: "pointer", display: "block", textDecoration: "none", width: 280, flexShrink: 0 as const }
  const inner = (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -4 : 0, boxShadow: hovered ? "0 12px 32px rgba(0,0,0,0.14)" : "0 2px 8px rgba(0,0,0,0.04)" }}
      transition={{ duration: 0.2 }}
      style={cardStyle}
    >
      <div style={{ height: 190, background: C.border, overflow: "hidden" }}>
        <img src={project.image} alt={project.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: 2, textTransform: "uppercase", color: C.primary, marginBottom: 6 }}>{project.category}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 4 }}>{project.title}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: C.placeholder, marginBottom: 14 }}>{project.subtitle}</div>
        <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }} style={{ fontFamily: "Arial, sans-serif", fontSize: 10, color: C.primary, display: "inline-block" }}>
          View Case Study →
        </motion.span>
      </div>
    </motion.div>
  )

  return isInternal
    ? <Link to={project.link} style={{ textDecoration: "none" }}>{inner}</Link>
    : <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>{inner}</a>
}

function Projects() {
  const { C } = useTheme()
  return (
    <section id="projects" style={{ background: C.surface, padding: "80px 40px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeUp>
          <Eyebrow>Selected Work</Eyebrow>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 22, fontWeight: 700, color: C.text, margin: "0 0 32px" }}>Projects</h2>
        </FadeUp>
        <Scroller overflow="x" width="100%" height="auto" bgColor={C.surface} noOverflowHidden withButtons childrenContainerClassName="gap-5 pb-4 pt-1">
          {PROJECTS.map((p) => <ProjectCard key={p.id} project={p} />)}
        </Scroller>
      </div>
    </section>
  )
}

// ─── SKILLS + EXPERIENCE ──────────────────────────────────────────────────────
function Skills() {
  const { C } = useTheme()
  return (
    <section id="experience" style={{ background: C.surface, padding: "80px 40px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", gap: 56, flexWrap: "wrap" }}>
        <FadeUp>
          <div style={{ flex: "1 1 260px" }}>
            <Eyebrow>Skills</Eyebrow>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map((skill) => <SkillPill key={skill} highlight={false}>{skill}</SkillPill>)}
            </div>
          </div>
        </FadeUp>
        <FadeUp delay={0.12}>
          <div style={{ flex: "1 1 260px" }}>
            <Eyebrow>Experience</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {EXPERIENCE.map((e) => (
                <div key={e.role}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{e.role} · {e.org}</div>
                  <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: C.placeholder }}>{e.years}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

// ─── CONTACT ─────────────────────────────────────────────────────────────────
function Contact() {
  const { C } = useTheme()
  return (
    <section id="contact" style={{ background: C.surface, padding: "80px 40px 100px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
      <FadeUp>
        <Eyebrow style={{ display: "block", marginBottom: 16 }}>Contact</Eyebrow>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 12px" }}>Let's build something together.</h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.placeholder, margin: "0 0 32px" }}>Open to design + tech internships in Singapore.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton href="mailto:kendrictjy@gmail.com" filled>kendrictjy@gmail.com</CTAButton>
          <CTAButton href="https://www.linkedin.com/in/kendric-toh-338757212/" filled={false}>LinkedIn ↗</CTAButton>
        </div>
      </FadeUp>
    </section>
  )
}

// ─── PORTFOLIO (main page) ────────────────────────────────────────────────────
function Portfolio() {
  const { C } = useTheme()
  return (
    <div style={{ fontFamily: "Georgia, serif", background: C.bg, minHeight: "100vh", overflowX: "hidden" }}>
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(false)
  const theme = { C: dark ? DARK : LIGHT, dark, toggle: () => setDark((d) => !d) }

  return (
    <ThemeContext.Provider value={theme}>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects/lifty" element={<LiftyPage />} />
        <Route path="/projects/origaminah" element={<OrigaminahPage />} />
        <Route path="/projects/3d-visualisation" element={<VisualisationPage />} />
        <Route path="/projects/mini-apps" element={<MiniAppsPage />} />
      </Routes>
    </ThemeContext.Provider>
  )
}
