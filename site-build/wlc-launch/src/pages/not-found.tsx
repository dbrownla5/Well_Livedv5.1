import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "12rem", paddingBottom: "8rem" }}>
        <div className="container">
          <div style={{ maxWidth: 560 }}>
            <span style={{
              display: "block",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--sage)",
              marginBottom: "1.5rem",
            }}>404</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
              This page doesn't exist.
            </h1>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              It may have moved, or the link may be incorrect. Head back to the homepage or reach out directly.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/" className="btn btn-sage">Back to Home</Link>
              <Link href="/contact" className="btn btn-outline-light">Get in Touch</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
