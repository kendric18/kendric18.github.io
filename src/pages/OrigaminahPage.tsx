import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeContext } from "../App"

type C = React.ContextType<typeof ThemeContext>["C"]

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

function GalleryVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const enterFs = () => {
    const v = ref.current; if (!v) return
    if (v.requestFullscreen) v.requestFullscreen()
    else if ((v as any).webkitRequestFullscreen) (v as any).webkitRequestFullscreen()
  }
  return (
    <div style={{ borderRadius: 12, overflow: "hidden", position: "relative", aspectRatio: "16/9", background: "#000" }}>
      <video ref={ref} controls playsInline style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}>
        <source src={src} type="video/mp4" />
      </video>
      <FullscreenBtn onPress={enterFs} position="top-right" />
    </div>
  )
}

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
      <div style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.55)", color: "#fff", fontFamily: "Arial, sans-serif", fontSize: 10, padding: "3px 8px", borderRadius: 20, zIndex: 2 }}>
        {current + 1} / {images.length}
      </div>
      <FullscreenBtn onPress={enterFs} position="top-left" />
      <button onClick={() => setCurrent(c => Math.max(0, c - 1))} disabled={current === 0} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>←</button>
      <button onClick={() => setCurrent(c => Math.min(images.length - 1, c + 1))} disabled={current === images.length - 1} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", zIndex: 2, background: "rgba(255,255,255,0.92)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: current === images.length - 1 ? "not-allowed" : "pointer", opacity: current === images.length - 1 ? 0.3 : 1, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>→</button>
      <div style={{ position: "absolute", bottom: 10, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 6, zIndex: 2 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 18 : 6, height: 6, borderRadius: 3, background: i === current ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.2s" }} />
        ))}
      </div>
    </div>
  )
}

function StepLabel({ step, title, colors }: { step: string; title: string; colors: C }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: colors.primary, marginBottom: 8 }}>{step}</div>
      <h3 style={{ fontFamily: "Georgia, serif", fontSize: 24, fontWeight: 700, color: colors.text, margin: 0 }}>{title}</h3>
    </div>
  )
}

function Divider({ colors }: { colors: C }) {
  return <div style={{ height: 1, background: colors.border, margin: "72px 0" }} />
}

export default function OrigaminahPage() {
  const { C } = useContext(ThemeContext)

  const step1Images = [
    { src: "/Origaminah/photo_2026-05-21_13-24-56.jpg", alt: "Birds in open canteen" },
    { src: "/Origaminah/photo_2026-05-21_13-24-59.jpg", alt: "Bird hygiene problem" },
    { src: "/Origaminah/Problem%20Staments%20(1).png", alt: "Problem statement" },
  ]

  const processImages = [
    { src: "/Origaminah/photo_2026-05-21_13-23-59.jpg", alt: "Origaminah process 1" },
    { src: "/Origaminah/photo_2026-05-21_13-24-30.jpg", alt: "Origaminah process 2" },
    { src: "/Origaminah/photo_2026-05-21_13-24-42.jpg", alt: "Origaminah process 3" },
  ]

  const outcomeImages = [
    { src: "/Origaminah/photo_2026-05-21_13-24-56.jpg", alt: "Origaminah outcome 1" },
    { src: "/Origaminah/photo_2026-05-21_13-24-59.jpg", alt: "Origaminah outcome 2" },
    { src: "/Origaminah/Problem%20Staments.png", alt: "Problem statements" },
  ]

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}`, padding: "16px 40px" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Hero video */}
      <div style={{ width: "100%", background: "#000", position: "relative" }}>
        <video
          controls
          playsInline
          style={{ width: "100%", maxHeight: "60vh", objectFit: "cover", display: "block" }}
        >
          <source src="/Origaminah/yuh.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 40px 0" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 16 }}>
            Design Thinking and Innovation
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
            Origaminah
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 32px" }}>
            SUTD Studio project
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.muted, lineHeight: 1.9, maxWidth: 720, margin: 0 }}>
            Origaminah is a design thinking project developed as part of SUTD's Design Thinking and Innovation studio. Drawing inspiration from the geometry and fold logic of origami, the project explores how modular spatial systems can adapt to human needs — redefining how people inhabit and move through shared spaces.
          </p>
        </FadeUp>

        {/* Metadata */}
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, paddingTop: 56, paddingBottom: 60, borderBottom: `1px solid ${C.border}`, marginBottom: 80 }}>
            {[
              { label: "Role", value: "Designer & Researcher" },
              { label: "Course", value: "Design Thinking & Innovation" },
              { label: "Tools", value: "Figma · Physical Prototyping" },
              { label: "Context", value: "SUTD Studio" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text }}>{value}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Process */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 120px" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Process</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 72px" }}>Design thinking in action</h2>
        </FadeUp>

        {/* 01 Empathise & Define */}
        <FadeUp>
          <StepLabel step="01" title="Empathise & Define" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Our research centred on open-air canteens and food courts in Singapore — spaces where diners regularly share their environment with birds. Through on-site observation, we found that birds frequently fly into these spaces and target unattended food, creating a serious hygiene concern.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Diners who leave their seats — to queue for food, use the restroom, or pay — return to find their meals contaminated or partially eaten. Beyond the obvious health risk, this erodes trust in these communal dining spaces and causes real distress, particularly for the elderly and families with young children.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  "Birds fly freely into open canteens and food courts",
                  "Unattended food is regularly contaminated or eaten by birds",
                  "Poses hygiene and food safety risks to diners",
                  "Problem is especially acute for vulnerable groups",
                ].map((point, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ color: C.primary, fontFamily: "Arial, sans-serif", fontSize: 13, marginTop: 1, flexShrink: 0 }}>→</span>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.7 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <ImageSlider images={step1Images} colors={C} />
          </div>
        </FadeUp>

        <Divider colors={C} />

        {/* 02 Ideate */}
        <FadeUp>
          <StepLabel step="02" title="Ideate" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <ImageSlider images={processImages} colors={C} />
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                The ideation phase centred on origami as a conceptual model — its ability to transform a flat plane into complex three-dimensional forms using only folds. We explored how this logic could translate into architectural space: panels that fold, pivot, and reconfigure to create different spatial conditions on demand.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Dozens of sketch concepts were rapidly explored, tested as paper models, and evaluated against our design criteria before converging on the Origaminah system — a modular panel grid that allows users to define and redefine their spatial boundaries.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  "Rapid sketching and paper prototyping",
                  "Origami-inspired folding geometries",
                  "Modular panel system concept",
                  "User flow and interaction mapping",
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

        {/* 03 Prototype & Test */}
        <FadeUp>
          <StepLabel step="03" title="Prototype & Test" colors={C} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
            <div>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: "0 0 20px" }}>
                Physical prototypes were built at 1:20 scale using card stock and laser-cut acrylic panels to test the folding mechanisms and spatial configurations. User testing sessions revealed how intuitively people could reconfigure the system, and what friction points existed in the assembly logic.
              </p>
              <p style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.muted, lineHeight: 1.85, margin: 0 }}>
                Iterations refined the connector geometry, improved the panel locking mechanism, and optimised the minimum unit size to ensure the system remained portable and practical for real-world deployment.
              </p>
            </div>
            <ImageSlider images={outcomeImages} colors={C} />
          </div>
        </FadeUp>
      </div>

      {/* Gallery */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 40px 100px" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Gallery</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 40px" }}>Project Media</h2>
        </FadeUp>
        <FadeUp delay={0.05}>
          <GalleryVideo src="/Origaminah/video_2026-05-21_13-34-55.mp4" />
        </FadeUp>
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            <PhotoBlock src="/Origaminah/photo_2026-05-21_13-24-42.jpg" alt="Origaminah photo 1" />
            <PhotoBlock src="/Origaminah/photo_2026-05-21_13-24-59.jpg" alt="Origaminah photo 2" />
          </div>
        </FadeUp>
        <FadeUp delay={0.15}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 }}>
            <PhotoBlock src="/Origaminah/photo_2026-05-21_13-23-59.jpg" alt="Origaminah photo 3" />
            <PhotoBlock src="/Origaminah/photo_2026-05-21_13-24-30.jpg" alt="Origaminah photo 4" />
          </div>
        </FadeUp>
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
