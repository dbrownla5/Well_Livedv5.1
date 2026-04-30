import { useEffect } from "react";
import { Link } from "wouter";

export default function CuratedResale() {
  useEffect(() => {
    document.title = "Curated Resale & Consignment — The Well Lived Citizen Co";
  }, []);

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">04 — Curated Resale & Consignment</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Is it cool? Is it sellable? Will they even take it?
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", fontStyle: "italic", maxWidth: "520px" }}>
            Trust-forward thoughtful curation.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="service-body">
            <p>This is for clothing, designer bags, jewelry, and the pieces you know might still have value but do not want to spend hours platform-matching, measuring, negotiating, and managing yourself. With an established luxury and resale background, I go through it piece by piece, decide what is worth the effort, and match each item to the platform where it makes the most sense. Clean, non-sellable items can be responsibly donated as part of the process.</p>
            <p>You fill the waterproof bag, sign the agreement, and I handle the rest — pickup, styling, measurements, listing, buyer questions, returns, monthly check-ins, and payout on the agreed split.</p>
          </div>

          <div className="service-pricing" style={{ marginTop: "40px" }}>Commission-based &middot; agreement required</div>
          <div className="service-flex-note">
            Commission structure and full terms covered on our <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
          </div>
          <Link href="/contact" className="btn btn-dark" style={{ marginTop: "16px" }}>Schedule it</Link>
        </div>
      </section>

      <section style={{ padding: "48px 0 72px", borderTop: "1px solid var(--linen)", background: "var(--warm)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px" }}>
            Other Services
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <Link href="/services/home-organization" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Home Organization & Modern Move</Link>
            <Link href="/services/legacy" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Legacy Planning & Inventory Catalog</Link>
            <Link href="/services/house-calls" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>House Calls</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
