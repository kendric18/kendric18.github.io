import React, { useContext, useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { ThemeContext } from "../App"

const BASE = "/3D%20Visualisation/"
const img = (filename: string) => BASE + encodeURIComponent(filename)

const ALL_IMAGES = [
  "WhatsApp Image 2024-04-18 at 12.51.04 PM-客厅-20260521-000918.jpg",
  "WhatsApp Image 2024-04-18 at 12.51.04 PM-客厅-20260521-000923.jpg",
  "WhatsApp Image 2024-04-18 at 12.51.04 PM-客厅-20260521-000934.jpg",
  "WhatsApp Image 2024-04-18 at 12.51.04 PM-客厅-20260521-000938.jpg",
  "WhatsApp Image 2024-04-18 at 12.51.04 PM-客厅-20260521-000944.jpg",
  "Blk 776 Pasir Ris ST 71-Living Hall-20260520-234738.jpg",
  "Blk 776 Pasir Ris ST 71-Master Bedroom-20260520-234753.jpg",
  "Blk 776 Pasir Ris ST 71-Balcony-20260520-234755.jpg",
  "kendric2-未命名-20260520-235024.jpg",
  "kendric2-未命名-20260520-235146.jpg",
  "kendric2-未命名-20260520-235151.jpg",
  "kendric2-未命名-20260520-235202.jpg",
  "ken-未命名-20260521-000748.jpg",
  "ken-未命名-20260521-000757.jpg",
  "ken-未命名-20260521-000800.jpg",
  "未命名方案-未命名-20260521-000550.jpg",
  "未命名方案-未命名-20260521-000629.jpg",
  "Blk403Woodlands#04-114-副本-未命名-20260521-000506.jpg",
  "senja 606 - ken-卧室-20260521-000828.jpg",
  "senja 606 - ken-卧室-20260521-000839.jpg",
  "_279C Sengkang East Ave  - OPTION 2-Living-20260521-001433.jpg",
  "_279C Sengkang East Ave  - OPTION 2-Living-20260521-001437.jpg",
  "_279C Sengkang East Ave  - OPTION 2-Living-20260521-001440.jpg",
  "_279C Sengkang East Ave  - OPTION 2-未命名-20260521-001451.jpg",
  "_279C Sengkang East Ave  - OPTION 2-未命名-20260521-001454.jpg",
  "_279C Sengkang East Ave  - OPTION 2-Main Bedroom-20260521-001516.jpg",
  "_279C Sengkang East Ave  - OPTION 2-Common bathroom-20260521-001512.jpg",
  "Letrice Dopamine Decor - 20260416-自定义-20260521-001652.jpg",
  "Letrice Dopamine Decor - 20260416-卫生间-20260521-001656.jpg",
  "Letrice Dopamine Decor - 20260416-卫生间-20260521-001704.jpg",
  "Letrice Dopamine Decor - 20260416-卫生间-20260521-001710.jpg",
  "Letrice Dopamine Decor - 副本-自定义-20260521-002533.jpg",
  "Letrice shop-未命名-20260521-001839.jpg",
  "Kendric's in camp (sir)-未命名-20260521-001031.jpg",
  "sphere.jpg",
  "_f.jpg",
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

function GalleryPhoto({ src, alt }: { src: string; alt: string }) {
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
    <div
      ref={ref}
      style={{
        borderRadius: isFs ? 0 : 10,
        overflow: "hidden",
        position: "relative",
        background: "#000",
        cursor: "pointer",
        ...(isFs
          ? { display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%" }
          : { aspectRatio: "4/3" }),
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: 1.03 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{
          width: "100%",
          height: isFs ? "auto" : "100%",
          objectFit: isFs ? "contain" : "cover",
          display: "block",
          maxHeight: isFs ? "100vh" : undefined,
        }}
      />
      <button
        onClick={enterFs}
        title="View fullscreen"
        style={{
          position: "absolute", top: 10, right: 10, zIndex: 3,
          background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)",
          border: "none", borderRadius: 6, width: 32, height: 32,
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 16 16" fill="white">
          <path fillRule="evenodd" clipRule="evenodd" d="M1 1h5v1.5H2.5V5H1V1zm9 0h5v4h-1.5V2.5H10V1zM1 10h1.5v2.5H5V14H1v-4zm11.5 2.5V10H14v4h-4v-1.5h2.5z" />
        </svg>
      </button>
    </div>
  )
}

export default function VisualisationPage() {
  const { C } = useContext(ThemeContext)

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text }}>

      {/* Sticky nav */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, backdropFilter: "blur(12px)", backgroundColor: C.navBg, borderBottom: `1px solid ${C.border}`, padding: "16px 40px" }}>
        <Link to="/" style={{ fontFamily: "Arial, sans-serif", fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", color: C.muted, textDecoration: "none" }}>
          ← Back
        </Link>
      </div>

      {/* Hero video — autoplay, loop, muted */}
      <div style={{ width: "100%", background: "#000", overflow: "hidden" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ width: "100%", maxHeight: "60vh", objectFit: "cover", display: "block" }}
        >
          <source src="/3D%20Visualisation/trim.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Header */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "60px 40px 0" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 16 }}>
            Interior Design · 3D Drafting
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 700, color: C.text, margin: "0 0 12px", lineHeight: 1.1 }}>
            3D Visualisation
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 15, color: C.muted, margin: "0 0 40px" }}>
            The Wood Creation · Edgeline Planners
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.muted, lineHeight: 1.9, maxWidth: 720, margin: 0 }}>
            I love to design — and more than anything, I love bringing design to life. As a freelance part-time drafter at The Wood Creation and Edgeline Planners, my work centred on 3D visualisation for carpentry and interior design firms: creating renders that let customers truly see and feel their future homes before a single nail was hammered. Beyond the visuals, this work built a precise, practical understanding of space — working to the millimetre on spatial calculations, and developing deep knowledge of how interior design and carpentry systems actually go together. Every project sharpened my ability to translate a client's vision into something buildable, beautiful, and exactly right.
          </p>
        </FadeUp>

        {/* Metadata */}
        <FadeUp delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, paddingTop: 56, paddingBottom: 60, borderBottom: `1px solid ${C.border}`, marginBottom: 80 }}>
            {[
              { label: "Role", value: "Freelance Part-time Drafter" },
              { label: "Companies", value: "The Wood Creation · Edgeline Planners" },
              { label: "Tools", value: "AutoCAD · 3D Rendering" },
              { label: "Focus", value: "Spatial Precision · ID & Carpentry" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: C.primary, marginBottom: 8 }}>{label}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 14, color: C.text }}>{value}</div>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* Gallery */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 40px 100px" }}>
        <FadeUp>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 9, letterSpacing: "3px", textTransform: "uppercase", color: C.primary, marginBottom: 12 }}>Gallery</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 28, fontWeight: 700, color: C.text, margin: "0 0 40px" }}>Project Renders</h2>
        </FadeUp>
        <div style={{ columns: "2 300px", gap: 16 }}>
          {ALL_IMAGES.map((filename, i) => (
            <FadeUp key={filename} delay={Math.min(i * 0.03, 0.3)}>
              <div style={{ breakInside: "avoid", marginBottom: 16 }}>
                <GalleryPhoto src={img(filename)} alt={`3D visualisation ${i + 1}`} />
              </div>
            </FadeUp>
          ))}
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
