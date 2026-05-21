import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeContext } from "../App"

// ── Types ──────────────────────────────────────────────────────────────────────
type C = React.ContextType<typeof ThemeContext>["C"]

// ── FadeUp helper ─────────────────────────────────────────────────────────────
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

// ── Fullscreen icon button (shared) ───────────────────────────────────────────
function FullscreenBtn({ onPress, position = "top-right" }: { onPress: () => void; position?: "top-right" | "top-left" }) {
  const coords = position === "top-right" ? { top: 10, right: 10 } : { top: 10, left: 10 }
  return (
    <button
      onClick={onPress}
      title="View fullscreen"
      style={{
        position: "absolute", zIndex: 3, ...coords,
        background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
        border: "none", borderRadius: 6, width: 32, height: 32,
        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M1 1h5v1.5H2.5V5H1V1zm9 0h5v4h-1.5V2.5H10V1zM1 10h1.5v2.5H5V14H1v-4zm11.5 2.5V10H14v4h-4v-1.5h2.5z" />
      </svg>
    </button>
  )
}

// ── Gallery video block ───────────────────────────────────────────────────────
function GalleryVideo({ mp4, mov }: { mp4?: string; mov?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const enterFs = () => {
    const v = ref.current; if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if ((v as any).webkitRequestFullscreen) (v as any).webkitRequestFullscreen()
  }
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "#000" }}>
      <video ref={ref} controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
        {mp4 && <source src={mp4} type="video/mp4" />}
        {mov && <source src={mov} type="video/quicktime" />}
      </video>
      <FullscreenBtn onPress={enterFs} position="top-right" />
    </div>
  )
}

// ── Photo block (standalone image + fullscreen) ───────────────────────────────
// contain=true shows the full image without cropping (used in gallery)
function PhotoBlock({ src, alt, contain = false }: { src: string; alt: string; contain?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const [isFs, setIsFs] = useState(false)

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === ref.current)
    document.addEventListener("fullscreenchange", onChange)
    document.addEventListener("webkitfullscreenchange", onChange)
    return () => {
      document.removeEventListener("fullscreenchange", onChange)
      document.removeEventListener("webkitfullscreenchange", onChange)
    }
  }, [])

  const enterFs = () => {
    const el = ref.current; if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen()
  }
  return (
    <div ref={ref} style={{ borderRadius: isFs ? 0 : 12, overflow: "hidden", position: "relative", background: "#000", ...(!contain && !isFs ? { aspectRatio: "4/3" } : {}), ...(isFs ? { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" } : {}) }}>
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: contain ? 1 : 1.04 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ width: "100%", height: isFs || contain ? "auto" : "100%", objectFit: isFs ? "contain" : contain ? undefined : "cover", display: "block", maxHeight: isFs ? "100vh" : undefined }}
      />
      <FullscreenBtn onPress={enterFs} position="top-right" />
    </div>
  )
}

// ── Video Hero ─────────────────────────────────────────────────────────────────
function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  const handleFullscreen = () => {
    const v = videoRef.current
    if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if ((v as any).webkitRequestFullscreen) (v as any).webkitRequestFullscreen()
    else if ((v as any).mozRequestFullScreen) (v as any).mozRequestFullScreen()
  }

  return (
    <div style={{ position: "relative", width: "100%", background: "#000", overflow: "hidden", maxHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "100%", maxHeight: "60vh", objectFit: "cover", display: "block" }}
        controls
        playsInline
      >
        <source src="/lifty/hero.mp4" type="video/mp4" />
        <source src="/lifty/hero.mov" type="video/quicktime" />
      </video>
      {/* Custom fullscreen button — top-right corner, doesn't overlap browser controls */}
      <button
        onClick={handleFullscreen}
        title="Enter fullscreen"
        style={{
          position: "absolute", top: 12, right: 12,
          background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)",
          border: "none", borderRadius: 6, width: 34, height: 34,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 10,
        }}
      >
        <svg width="15" height="15" viewBox="0 0 16 16" fill="white">
          <path fillRule="evenodd" clipRule="evenodd" d="M1 1h5v1.5H2.5V5H1V1zm9 0h5v4h-1.5V2.5H10V1zM1 10h1.5v2.5H5V14H1v-4zm11.5 2.5V10H14v4h-4v-1.5h2.5z" />
        </svg>
      </button>
    </div>
  )
}

// ── Image Slider ──────────────────────────────────────────────────────────────
function ImageSlider({ images, colors }: { images: { src: string; alt: string }[]; colors: C }) {
  const [current, setCurrent] = useState(0)
  const [isFs, setIsFs] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onChange = () => setIsFs(document.fullscreenElement === containerRef.current)
    document.addEventListener("fullscreenchange", onChange)
    document.addEventListener("webkitfullscreenchange", onChange)
    return () => {
      document.removeEventListener("fullscreenchange", onChange)
      document.removeEventListener("webkitfullscreenchange", onChange)
    }
  }, [])

  const enterFs = () => {
    const el = containerRef.current; if (!el) return
    if (el.requestFullscreen) el.requestFullscreen()
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen()
  }

  return (
    <div ref={containerRef} style={{ borderRadius: isFs ? 0 : 12, overflow: "hidden", background: "#000", position: "relative", ...(isFs ? { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" } : { aspectRatio: "4/3" }) }}>
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current].src}
          alt={images[current].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          style={isFs ? { maxWidth: "100%", maxHeight: "100vh", objectFit: "contain", display: "block" } : { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </AnimatePresence>

      {/* Counter badge — top-right */}
      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.55)", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: 10, padding: "3px 8px", borderRadius: 20, zIndex: 2 }}>
        {current + 1} / {images.length}
      </div>

      {/* Fullscreen button — top-left (avoids counter badge) */}
      <FullscreenBtn onPress={enterFs} position="top-left" />

      {/* Prev */}
      <button
        onClick={() => setCurrent(c => Math.max(0, c - 1))}
        disabled={current === 0}
        style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontFamily: "Arial, sans-serif" }}
      >←</button>

      {/* Next */}
      <button
        onClick={() => setCurrent(c => Math.min(images.length - 1, c + 1))}
        disabled={current === images.length - 1}
        style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: current === images.length - 1 ? "not-allowed" : "pointer", opacity: current === images.length - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontFamily: "Arial, sans-serif" }}
      >→</button>

      {/* Dot indicators */}
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 2 }}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{ width: i === current ? 18 : 6, height: 6, borderRadius: 3, background: i === current ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s" }}
          />
        ))}
      </div>
    </div>
  )
}

// ── Goals Table ───────────────────────────────────────────────────────────────
function GoalsTable({ colors }: { colors: C }) {
  const rows = [
    { goal: "Reduce Physical Strain", criteria: "Reduction in Physical Effort (measured via force gauge or user survey)" },
    { goal: "Improve Bed-Making Efficiency", criteria: "Time Reduction in Bed-Making (target: >30% time saved)" },
    { goal: "Enhance User Convenience & Adoption", criteria: "User Satisfaction & Adoption Rate (target: >70% positive feedback)" },
  ]
  return (
    <div style={{ margin: "32px 0 0", border: `1px solid ${colors.border}`, borderRadius: 10, overflow: "hidden" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: colors.surface }}>
        {["Primary Goals", "Success Criteria"].map(h => (
          <div key={h} style={{ padding: "12px 18px", fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: colors.primary, borderBottom: `1px solid ${colors.border}` }}>
            {h}
          </div>
        ))}
      </div>
      {rows.map(({ goal, criteria }, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: i < rows.length - 1 ? `1px solid ${colors.border}` : "none" }}>
          <div style={{ padding: "14px 18px", fontFamily: "Georgia, serif", fontSize: 14, color: colors.text, fontWeight: 600, borderRight: `1px solid ${colors.border}` }}>{goal}</div>
          <div style={{ padding: "14px 18px", fontFamily: "Georgia, serif", fontSize: 14, color: colors.muted }}>{criteria}</div>
        </div>
      ))}
    </div>
  )
}

// ── Step label ────────────────────────────────────────────────────────────────
function StepLabel({ step, title, colors }: { step: string; title: string; colors: C }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: colors.primary, marginBottom: 8 }}>{step}</div>
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{title}</h3>
    </div>
  )
}

// ── Divider ───────────────────────────────────────────────────────────────────
function Divider({ colors }: { colors: C }) {
  return <div style={{ height: 1, background: colors.border, margin: "72px 0" }} />
}

// ─────────────────────────────────────────────────────────────────────────────
export default function LiftyPage() {
  const { C } = useContext(ThemeContext)


  const researchImages = [
    { src: "/lifty/research-1.jpg", alt: "Research photo 1" },
    { src: "/lifty/research-2.jpg", alt: "Research photo 2" },
    { src: "/lifty/research-3.png", alt: "Research diagram" },
    { src: "/lifty/research-4.png", alt: "Research findings" },
  ]

  const cadImages = [
    { src: "/lifty/cad-1.png", alt: "CAD view 1" },
    { src: "/lifty/cad-2.png", alt: "CAD view 2" },
    { src: "/lifty/cad-3.png", alt: "CAD view 3" },
    { src: "/lifty/cad-4.png", alt: "CAD view 4" },
  ]

  const testImages = [
    { src: "/lifty/test-1.jpg", alt: "Testing iteration" },
    { src: "/lifty/test-2.png", alt: "Test results" },
    { src: "/lifty/test-3.png", alt: "Final test" },
  ]

  const protoImages = [
    { src: "/lifty/proto-1.png", alt: "3D printed slider variation 1" },
    { src: "/lifty/proto-2.png", alt: "3D printed slider variation 2" },
    { src: "/lifty/proto-3.png", alt: "3D printed slider variation 3" },
    { src: "/lifty/proto-4.jpg", alt: "Hands-on electrical wiring" },
  ]

  const researchPoints = [
    "Tasks are time-sensitive (20–40 mins per room) with pressure from guest turnover",
    "Workflow is interrupted by guests returning, causing rushed work",
    "High physical workload with low efficiency under time pressure",
    "Need for modular and deployable solutions",
  ]

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* ── Sticky nav bar ── */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}`, padding: "16px 40px" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* ── Hero video ── */}
      <VideoHero />

      {/* ── Header ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 40px 0" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 16 }}>
            Product Design · Hardware
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
            Lifty
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 32px" }}>
            SUTD × LionsBot International
          </p>

          {/* Overview */}
          <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.muted, lineHeight: 1.9, maxWidth: 720, margin: 0 }}>
            LIFTY is an assistive bed-making device developed by me and my teammates for LionsBot International Pte Ltd as part of the Product Design Studio 2026 module. The device aims to automate and assist in the bed-making process, reducing physical strain on users and improving efficiency in hospital or hospitality settings.
          </p>

          {/* Goals table */}
          <GoalsTable colors={C} />
        </FadeUp>

        {/* ── Metadata row ── */}
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, paddingTop: 56, paddingBottom: 60, borderBottom: `1px solid ${C.border}`, marginBottom: 80 }}>
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Team", value: "SUTD × LionsBot Eng." },
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
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 72px" }}>How it was made</h2>
        </FadeUp>

        {/* ── 01 Research & Discovery ── */}
        <FadeUp>
          <StepLabel step="01" title="Research & Discovery" colors={C} />

          {/* 2-col: persona + stats on left, slider on right */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Text */}
            <div>
              {/* Rajesh persona */}
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "20px 22px", marginBottom: 24 }}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 10 }}>User Persona</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 2 }}>Rajesh, 45</div>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 11, color: C.muted, marginBottom: 14 }}>Hotel Housekeeping Staff · Royce Residences</div>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: C.muted, lineHeight: 1.8, margin: "0 0 14px" }}>
                  Rajesh is an experienced housekeeping staff member who cleans rooms, changes bed linens, and maintains room quality under tight turnaround schedules. He experiences frequent back and knee pain from repetitive bending, finds tucking sheets and lifting mattress corners physically exhausting, and often works overtime due to understaffing.
                </p>
                <p style={{ fontFamily: "Georgia, serif", fontSize: 13, color: C.muted, fontStyle: "italic", borderLeft: `3px solid ${C.primary}`, paddingLeft: 12, margin: 0 }}>
                  "Bending over and tucking in bed sheets is very tiring… I also have to overtime when there's not enough manpower."
                </p>
              </div>

              {/* Stats */}
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: 0 }}>
                Bed-making is physically demanding, involving constant bending, lifting and tucking. Housekeepers perform <strong>250–600 bends</strong> and <strong>70–200 mattress lifts per day</strong>, clean 12–20 rooms, and walk 8–16 km per shift. Trunk flexion analysis shows bending past 90° is common, placing workers at very high risk of back injury. Up to <strong>70% of housekeepers</strong> develop musculoskeletal disorders. Lifting forces can reach 2,000–6,000 N per lift, accumulating to an estimated <strong>960,000 N/day</strong> on the lower back — equivalent to the weight of 20 adult elephants.
              </p>
            </div>

            {/* Slider */}
            <ImageSlider images={researchImages} colors={C} />
          </div>

          {/* Key findings — full width below the grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 32 }}>
            {researchPoints.map((point, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ color: C.primary, fontFamily: "Arial, sans-serif", fontSize: 13, marginTop: 1, flexShrink: 0 }}>→</span>
                <span style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{point}</span>
              </div>
            ))}
          </div>
        </FadeUp>

        <Divider colors={C} />

        {/* ── 02 Ideation & CADding ── */}
        <FadeUp>
          <StepLabel step="02" title="Ideation & CADding" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Slider first (alternates side) */}
            <ImageSlider images={cadImages} colors={C} />

            {/* Text */}
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                With the core mechanics defined, every assembly was built in Fusion 360 to millimetre precision. The design process was driven not just by aesthetics, but by the physical reality of fitting motors, drivers, and wiring into a compact chassis.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Battery placement was the first major constraint — the pack needed to sit low for centre-of-gravity stability while leaving clearance for the motor drivers and main controller board. A worm-gear drivetrain was selected for its self-locking property, preventing back-drive when the actuator is unpowered, and sized against the measured sheet-tucking force requirements.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Every cable run, motor driver mounting hole, and connector clearance was modelled explicitly in 3D — only by building the full wiring schematic into the CAD could we verify that the PCB stack, motor harness, and power bus would all fit within the chassis depth without interference.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Battery & power distribution layout",
                  "DC motor & worm gear placement",
                  "Motor driver PCB mounting",
                  "Wiring harness routing & clearances",
                  "Full wiring schematic in 3D",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, flexShrink: 0 }} />
                    <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: C.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <Divider colors={C} />

        {/* ── 03 Prototyping & Electrical ── */}
        <FadeUp>
          <StepLabel step="03" title="Prototyping & Electrical" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            {/* Slider */}
            <ImageSlider images={protoImages} colors={C} />

            {/* Text */}
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                One of the most iterative parts of the build was the sheet-tucker mechanism. We 3D printed many variations of the slider geometry — tweaking the angle, lip depth, and surface profile — to find the shape that could reliably tuck a bedsheet under a mattress without bunching or slipping.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                On the electrical side, I was responsible for the full wiring architecture: designing the schematics, planning the circuit layout, and thinking through how power would be distributed across the motor drivers, microcontroller, and sensors. I then built it hands-on — soldering connections, routing cables through the chassis, and verifying each sub-circuit before integration.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Multiple 3D-printed slider iterations tested for tuck reliability",
                  "Electrical schematic design and circuit planning",
                  "Hands-on wiring: soldering, cable routing, and sub-circuit testing",
                  "Motor driver and power distribution layout",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.primary, flexShrink: 0 }} />
                    <span style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: C.muted }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeUp>

        <Divider colors={C} />

        {/* ── 04 Testing & Iteration ── */}
        <FadeUp>
          <StepLabel step="04" title="Testing & Iteration" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <ImageSlider images={testImages} colors={C} />
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: 0 }}>
                The prototype went through 13 structured test iterations — starting with validating motor torque and actuator load capacity, confirming the chassis had enough space to house the battery, wiring, and motor drivers, and verifying the locking mechanism, scissor-lift, and wheel system. Subsequent iterations refined the slider's ability to glide smoothly under a mattress, validated LED and main power controls, and improved the overall ergonomics and ease of handling. The final iteration tested the fully integrated system — new exterior, buttons, actuator, wheels, slider, and grip design all operating together. LionsBot International was very pleased with the results.
              </p>
            </div>
          </div>
        </FadeUp>
      </div>

      {/* ── Gallery ── */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 100px" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Gallery</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 40px" }}>Project Media</h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          {/* Main demo video — full width */}
          <GalleryVideo mp4="/lifty/hero1.mp4" />
        </FadeUp>
        <FadeUp delay={0.1}>
          {/* Photo + secondary video side by side */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            <PhotoBlock src="/lifty/gallery-photo-1.jpg" alt="Lifty project photo" contain />
            <GalleryVideo mp4="/lifty/gallery-vid-2.mp4" />
          </div>
        </FadeUp>
      </div>

      {/* ── Footer nav ── */}
      <div style={{ borderTop: `1px solid ${C.border}`, padding: "40px", textAlign: "center" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back to portfolio
        </Link>
      </div>
    </div>
  )
}
