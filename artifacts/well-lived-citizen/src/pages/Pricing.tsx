import { useEffect } from "react";
import { Link } from "wouter";

export default function Pricing() {
  useEffect(() => {
    document.title = "Pricing — The Well Lived Citizen Co";
  }, []);

  return (
    <div className="page">
      <section style={{ padding: "80px 0 48px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">How I charge</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            Pricing
          </h1>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          {/* 01 Home Org */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">01 — Home Organization & Modern Move</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$150/hr &middot; 3 hr minimum</td></tr>
                <tr><td>10-hour Flex Block</td><td>$1,250 ($125/hr)</td></tr>
                <tr><td>25-hour Flex Block</td><td>$3,150</td></tr>
                <tr><td>Studio / 1BR Move Reset</td><td>$1,200/day — flat rate, up to 8 hours straight</td></tr>
                <tr><td>Larger homes & multi-room projects</td><td>Quoted after call</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Flex blocks never expire.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 02 Legacy */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">02 — Legacy Planning & Inventory Catalog</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$175/hr &middot; 2 hr minimum</td></tr>
                <tr><td>10-hour Flex Block</td><td>$1,500 ($150/hr)</td></tr>
                <tr><td>25-hour Flex Block</td><td>$3,650</td></tr>
                <tr><td>Legacy Project</td><td>From $3,500 / 20–30 hrs</td></tr>
                <tr><td>Whole home</td><td>Quoted after walkthrough</td></tr>
                <tr><td>Ongoing Continuity</td><td>$500/mo</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Larger estates and whole-home projects are quoted after walkthrough only. No fixed tier. Flex blocks never expire.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 03 House Calls */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">03 — House Calls</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$175/hr &middot; 2 hr minimum</td></tr>
                <tr><td>4-Hour Practical Reset</td><td>Available</td></tr>
                <tr><td>Continuity Retainer</td><td>$500/mo</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>No membership. No subscription. Ease comes from relationship, not a forced plan.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 04 Resale */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">04 — Curated Resale & Consignment</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Clothing & Accessories</td><td>55% Dayna / 45% client</td></tr>
                <tr><td>Designer</td><td>50 / 50</td></tr>
                <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
                <tr><td>Full Closet Liquidation</td><td>55 / 45</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.6 }}>Monthly report by the 1st &middot; Payout by the 5th &middot; Clean split of net proceeds after platform fees</p>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Agreement required. Commission is calculated on net proceeds after platform fees.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "48px" }} />

          <div style={{ textAlign: "center", padding: "40px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
            <p style={{ fontSize: "16px", color: "var(--char)", fontWeight: 600, marginBottom: "8px" }}>Call or text (323) 433-1350.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "28px" }}>The first conversation is always free.</p>
            <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
