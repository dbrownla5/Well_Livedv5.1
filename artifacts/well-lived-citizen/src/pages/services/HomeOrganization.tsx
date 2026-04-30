import { Link } from "wouter";

export default function HomeOrganization() {
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">01 — Home Organization & Modern Move</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>The relief of the room.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>Your home, made to work for how you actually live. For the room that keeps collecting piles, the move that technically happened but never settled, the closet that no longer fits your life, or the spaces where everyday friction quietly steals time.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)" }}>
            <p style={{ marginBottom: "20px" }}>The issue here is the space itself. The room, layout, volume, or systems are no longer supporting the way you naturally move through your day. I come in, find the friction, and make the space work around your real habits.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>How we can work together</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "12px" }}>Projects can be:</p>
          <ul style={{ listStyle: "none", marginBottom: "24px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Side-by-side guided sessions</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Hybrid decision blocks</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Full key handoff</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Solo resets while you're away</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Packing and move prep with or without you</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Closet and system continuity after landing</li>
          </ul>
          <p style={{ fontSize: "14px", color: "var(--stone)", fontStyle: "italic", marginBottom: "40px" }}>The right style is the one that creates the easiest lasting outcome.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>What's included</h2>
          <ul style={{ listStyle: "none", marginBottom: "24px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Intake call, prior coordination, and any pre-planning on my end</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Layout logic</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Sourcing recommendations</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Setup and install</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Label systems</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Pre-order coordination</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Workflow tools and install basics</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Measuring tools, reusable sort bins</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Cord wraps, Velcro, adapters, and utility hardware</li>
          </ul>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginBottom: "40px" }}>For deeper spaces like closets, offices, storage rooms, and linen systems, product support is quoted after walkthrough based on hidden volume and actual dimensions.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Hourly</td><td>$150/hr · 3 hr minimum</td></tr>
              <tr><td>10-hour Flex Block</td><td>$1,250</td></tr>
              <tr><td>25-hour Flex Block</td><td>$3,150</td></tr>
              <tr><td>Studio / 1BR Move Reset</td><td>$1,200/day flat rate — up to 8 hours straight</td></tr>
              <tr><td>Larger homes & multi-room projects</td><td>Quoted after call</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>Flex blocks never expire. $1,200 flat rate is reserved for studio and 1-bedroom moves only. Larger homes scope as projects.</p>

          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "32px", marginBottom: "40px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>A Note on Labels</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8 }}>Labels are always included — handwritten on-site by default, and printed sets provided for larger project scopes. For efficiency, printed labels are usually handled as office work rather than billed hourly. I notate during the session, build the label set in my own app on my own time, print them, and bring them back to apply. This saves real money on hourly time that would otherwise be spent typing and cutting labels mid-session.</p>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-dark">Book your session</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
