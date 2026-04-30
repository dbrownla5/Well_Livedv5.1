import { useEffect } from "react";
import { Link } from "wouter";

export default function HouseCalls() {
  useEffect(() => {
    document.title = "House Calls — The Well Lived Citizen Co";
  }, []);

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">03 — House Calls</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            For the things life leaves unfinished.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", fontStyle: "italic", maxWidth: "520px" }}>
            Route-based quick asks often absorbed into existing travel days.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="service-body">
            <p>Possibly my favorite service, and the spirit of this company.</p>
            <p>That's the thing friends used to do. The thing neighbors don't always have time for anymore. The thing adult children need when they're in another city.</p>
            <p>Once I know how your home works, it becomes easy for me to help keep it working — home check-ins, tech setup, hands-on home improvements, donation drop-offs, and the practical loose ends that make everyday life easier when someone trusted is paying attention.</p>
          </div>

          <div className="service-pricing" style={{ marginTop: "40px" }}>$175/hr &middot; 2 hr minimum</div>
          <div className="service-flex-note">
            Flex pricing and project quotes covered on our <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
          </div>
          <Link href="/contact" className="btn btn-dark" style={{ marginTop: "16px" }}>Book me</Link>
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
            <Link href="/services/resale" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Curated Resale & Consignment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
