import { useState, useEffect } from "react"
import type { CSSProperties, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

const C = {
  bg: "#F5F5F0",
  surface: "#F9F4EE",
  card: "#FFFFFF",
  accent: "#C3E41D",
  primary: "#C4573A",
  text: "#1A1A1A",
  muted: "#666666",
  placeholder: "#888888",
  border: "#E8E0D5",
}

const PHOTO_URL = "/kendric.jpg"

const PROJECTS = [
  {
    id: "lifty",
    category: "Product Design · Hardware",
    title: "Lifty",
    subtitle: "SUTD × LionsBot International",
    image: "",
  },
  {
    id: "project-2",
    category: "UX / AI",
    title: "Project 2",
    subtitle: "SUTD studio project",
    image: "",
  },
  {
    id: "project-3",
    category: "Design Systems",
    title: "Project 3",
    subtitle: "SUTD studio project",
    image: "",
  },
  {
    id: "project-4",
    category: "Research",
    title: "Project 4",
    subtitle: "SUTD studio project",
    image: "",
  },
]

const SKILLS = [
  "Product Design",
  "UX Research",
  "Figma / Framer",
  "Python / C++",
  "CAD / Fusion 360",
  "AutoCAD",
  "Electronics / Arduino",
  "AI / ML",
]

const EXPERIENCE = [
  { role: "Customer Success", org: "Edgeline Planners", years: "2024 – Present" },
  { role: "VP, Scratch Club", org: "SUTD", years: "2024 – Present" },
  { role: "Assistant Carpenter", org: "The Wood Creation", years: "2018 – 2024" },
]

const NAV_LINKS = ["HOME", "ABOUT", "PROJECTS", "EXPERIENCE", "CONTACT"]

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

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 32px",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(245,245,240,0.85)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <button
          onClick={() => setOpen(true)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
          aria-label="Open menu"
        >
          {[22, 22, 14].map((w, i) => (
            <div
              key={i}
              style={{ width: w, height: 2, borderRadius: 2, backgroundColor: "#999" }}
            />
          ))}
        </button>

        <div
          style={{
            width: 44,
            height: 24,
            background: "#ddd",
            borderRadius: 12,
            position: "relative",
            cursor: "pointer",
          }}
        >
          <div
            style={{
              width: 18,
              height: 18,
              background: "#aaa",
              borderRadius: "50%",
              position: "absolute",
              top: 3,
              left: 3,
            }}
          />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.25)",
                zIndex: 200,
              }}
            />
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                bottom: 0,
                width: 280,
                background: C.surface,
                zIndex: 300,
                padding: "48px 40px",
                display: "flex",
                flexDirection: "column",
                gap: 32,
              }}
            >
              <button
                onClick={() => setOpen(false)}
                style={{
                  alignSelf: "flex-end",
                  background: "none",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: "#666",
                  lineHeight: 1,
                }}
                aria-label="Close menu"
              >
                ×
              </button>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: "Arial, sans-serif",
                    fontSize: 12,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    color: C.text,
                    textDecoration: "none",
                  }}
                >
                  {link}
                </a>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

function Hero() {
  const [bounce, setBounce] = useState(false)

  useEffect(() => {
    const id = setInterval(() => setBounce((b) => !b), 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background: C.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 80,
        paddingBottom: 40,
        position: "relative",
      }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <h1
          style={{
            fontFamily: "'Arial Black', 'Helvetica Neue', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(64px, 14vw, 148px)",
            color: C.accent,
            letterSpacing: "-4px",
            lineHeight: 0.9,
            textTransform: "uppercase",
            userSelect: "none",
            margin: 0,
          }}
        >
          <BlurText text="KENDRIC" />
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: "backOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 90,
            height: 150,
            borderRadius: 9999,
            overflow: "hidden",
            border: `3px solid ${C.bg}`,
            boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
            zIndex: 10,
          }}
        >
          <img
            src={PHOTO_URL}
            alt="Kendric"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        style={{
          marginTop: 36,
          fontFamily: "Georgia, serif",
          fontStyle: "italic",
          fontSize: 15,
          color: "#555",
          letterSpacing: "0.3px",
          textAlign: "center",
        }}
      >
        Designing human experiences in code.
      </motion.p>

      <motion.div
        animate={{ y: bounce ? 6 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ marginTop: 20, color: "#aaa", fontSize: 22, lineHeight: 1 }}
      >
        ⌄
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section
      id="about"
      style={{
        background: C.surface,
        padding: "80px 40px",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          gap: 56,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <FadeUp>
          <div style={{ flex: "1 1 320px" }}>
            <Eyebrow>About</Eyebrow>
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 22,
                fontWeight: 700,
                color: C.text,
                margin: "0 0 16px",
                lineHeight: 1.4,
              }}
            >
              From carpentry to code — always building.
            </h2>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 14,
                color: C.muted,
                lineHeight: 1.8,
                margin: "0 0 12px",
              }}
            >
              Started with a screwdriver and a saw. Then Interior Design at NAFA, EEE at SP — and
              now Design & AI at SUTD. Every pivot taught me to think across disciplines.
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: 14,
                color: C.muted,
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              VP of Scratch Club. Customer Success at Edgeline Planners. Open to internships in
              Singapore.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.15}>
          <div
            style={{
              width: 130,
              height: 165,
              borderRadius: 10,
              overflow: "hidden",
              flexShrink: 0,
              background: C.border,
            }}
          >
            <img
              src={PHOTO_URL}
              alt="Kendric"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: hovered ? -4 : 0,
        boxShadow: hovered
          ? "0 12px 32px rgba(0,0,0,0.10)"
          : "0 2px 8px rgba(0,0,0,0.04)",
      }}
      transition={{ duration: 0.2 }}
      style={{
        background: C.card,
        borderRadius: 8,
        overflow: "hidden",
        border: `1px solid ${C.border}`,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          height: 160,
          background: C.border,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#bbb",
          fontFamily: "Arial, sans-serif",
          fontSize: 11,
          overflow: "hidden",
        }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          "Image"
        )}
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 9,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: C.primary,
            marginBottom: 6,
          }}
        >
          {project.category}
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 16,
            fontWeight: 700,
            color: C.text,
            marginBottom: 4,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 12,
            color: C.placeholder,
            marginBottom: 14,
          }}
        >
          {project.subtitle}
        </div>
        <motion.span
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: 10,
            color: C.primary,
            display: "inline-block",
          }}
        >
          View Case Study →
        </motion.span>
      </div>
    </motion.div>
  )
}

function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: C.surface,
        padding: "80px 40px",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <FadeUp>
          <Eyebrow>Selected Work</Eyebrow>
          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: 22,
              fontWeight: 700,
              color: C.text,
              margin: "0 0 32px",
            }}
          >
            4 projects · 2023–2025
          </h2>
        </FadeUp>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}
        >
          {PROJECTS.map((p, i) => (
            <FadeUp key={p.id} delay={i * 0.08}>
              <ProjectCard project={p} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section
      id="experience"
      style={{
        background: C.surface,
        padding: "80px 40px",
        borderTop: `1px solid ${C.border}`,
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          gap: 56,
          flexWrap: "wrap",
        }}
      >
        <FadeUp>
          <div style={{ flex: "1 1 260px" }}>
            <Eyebrow>Skills</Eyebrow>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {SKILLS.map((skill) => (
                <SkillPill key={skill} highlight={skill === "AI / ML"}>
                  {skill}
                </SkillPill>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div style={{ flex: "1 1 260px" }}>
            <Eyebrow>Experience</Eyebrow>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {EXPERIENCE.map((e) => (
                <div key={e.role}>
                  <div
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: 13,
                      fontWeight: 600,
                      color: C.text,
                      marginBottom: 2,
                    }}
                  >
                    {e.role} · {e.org}
                  </div>
                  <div
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: 11,
                      color: C.placeholder,
                    }}
                  >
                    {e.years}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section
      id="contact"
      style={{
        background: C.surface,
        padding: "80px 40px 100px",
        borderTop: `1px solid ${C.border}`,
        textAlign: "center",
      }}
    >
      <FadeUp>
        <Eyebrow style={{ display: "block", marginBottom: 16 }}>Contact</Eyebrow>
        <h2
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 28,
            fontWeight: 700,
            color: C.text,
            margin: "0 0 12px",
          }}
        >
          Let's build something together.
        </h2>
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: 14,
            color: C.placeholder,
            margin: "0 0 32px",
          }}
        >
          Open to design + tech internships in Singapore.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <CTAButton href="mailto:kendrictjy@gmail.com" filled>
            kendrictjy@gmail.com
          </CTAButton>
          <CTAButton href="https://linkedin.com/in/kendrictoh" filled={false}>
            LinkedIn ↗
          </CTAButton>
        </div>
      </FadeUp>
    </section>
  )
}

function Eyebrow({ children, style: s }: { children: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        fontSize: 9,
        letterSpacing: "3px",
        textTransform: "uppercase",
        color: C.primary,
        marginBottom: 12,
        ...s,
      }}
    >
      {children}
    </div>
  )
}

function SkillPill({ children, highlight }: { children: string; highlight: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.span
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: highlight ? C.primary : hovered ? C.primary : C.surface,
        color: highlight || hovered ? "#fff" : "#444",
        borderColor: highlight || hovered ? C.primary : C.border,
      }}
      transition={{ duration: 0.18 }}
      style={{
        display: "inline-block",
        border: `1px solid ${C.border}`,
        borderRadius: 20,
        padding: "6px 14px",
        fontFamily: "Arial, sans-serif",
        fontSize: 11,
        cursor: "default",
      }}
    >
      {children}
    </motion.span>
  )
}

function CTAButton({
  children,
  href,
  filled,
}: {
  children: string
  href: string
  filled: boolean
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={href}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        backgroundColor: filled
          ? hovered
            ? "#a8412a"
            : C.primary
          : hovered
          ? C.border
          : "transparent",
      }}
      transition={{ duration: 0.18 }}
      style={{
        display: "inline-block",
        padding: "12px 24px",
        borderRadius: 5,
        fontFamily: "Arial, sans-serif",
        fontSize: 12,
        letterSpacing: "0.5px",
        textDecoration: "none",
        color: filled ? "#fff" : C.muted,
        border: filled ? "none" : `1px solid ${C.border}`,
        cursor: "pointer",
      }}
    >
      {children}
    </motion.a>
  )
}

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Georgia, serif",
        background: C.bg,
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </div>
  )
}
