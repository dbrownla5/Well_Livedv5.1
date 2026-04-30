import { useEffect } from "react";
import { Link } from "wouter";

export default function Legacy() {
  useEffect(() => {
    document.title = "Legacy Planning & Inventory Catalog — The Well Lived Citizen Co";
  }, []);

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">02 — Legacy Planning & Inventory Catalog</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Clarity without fear.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", fontStyle: "italic", maxWidth: "520px" }}>
            The operational side of a home, made visible again.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="service-body">
            <p>The lived-in layer of your home — the walls you spend your life within — needs clarity before it becomes a burden to you, your future self, your family, or the people you rely on. Most people are prepared for the things we're pressured to check off the list — good job, us. You may already have the estate planner, the will, and the paperwork.</p>
            <p>My work is the home itself — identifying what's still in use, what still has value (often hidden in cabinets), and what needs a clear plan while you can still decide what matters. When story matters, I document that too — so meaning isn't lost when objects change hands.</p>
            <p>I am not a legal estate planner or estate sale service. I focus on the meaning behind the life in your objects and how to preserve that, giving everything more value to you now, your family later, and the people who want your things. You have meaningful things attached to you — let's share them.</p>
          </div>

          <div className="service-pricing" style={{ marginTop: "40px" }}>$175/hr &middot; 2 hr minimum</div>
          <div className="service-flex-note">
            Flex pricing and project quotes covered on our <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
          </div>
          <Link href="/contact" className="btn btn-dark" style={{ marginTop: "16px" }}>Book your time</Link>
        </div>
      </section>

      <section style={{ padding: "48px 0 72px", borderTop: "1px solid var(--linen)", background: "var(--warm)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px" }}>
            Other Services
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <Link href="/services/home-organization" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Home Organization & Modern Move</Link>
            <Link href="/services/house-calls" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>House Calls</Link>
            <Link href="/services/resale" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Curated Resale & Consignment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
