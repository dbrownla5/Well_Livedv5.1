import { useState } from "react";

export default function FAQItem({ q, a, light = false }: { q: string; a: string; light?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ borderBottom: `1px solid ${light ? "rgba(248,244,227,0.15)" : "var(--warm-gray-lt)"}` }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.5rem 0",
          fontSize: "1rem",
          fontWeight: 600,
          color: light ? "var(--parchment)" : "var(--ink)",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          transition: "color 0.18s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--sage)"}
        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = light ? "var(--parchment)" : "var(--ink)"}
      >
        <span>{q}</span>
        <span style={{
          fontSize: "1.3rem",
          fontWeight: 300,
          color: "var(--sage)",
          transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
          transition: "transform 0.22s cubic-bezier(0.23, 1, 0.32, 1)",
          flexShrink: 0,
          lineHeight: 1,
        }}>+</span>
      </button>
      <div style={{
        maxHeight: isOpen ? 800 : 0,
        overflow: "hidden",
        transition: "max-height 0.35s cubic-bezier(0.23, 1, 0.32, 1)",
      }}>
        <p style={{
          paddingBottom: "1.5rem",
          fontSize: "0.95rem",
          fontWeight: 300,
          lineHeight: 1.75,
          color: light ? "rgba(248,244,227,0.65)" : "var(--sage-dark)",
          whiteSpace: "pre-line",
        }}>{a}</p>
      </div>
    </div>
  );
}
