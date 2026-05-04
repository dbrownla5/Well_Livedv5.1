import { Link } from "wouter";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function HomeOrganization() {
  usePageMeta({
    title: "Home Organization & Modern Move",
    description: "Your home, made to work for how you actually live. Concierge home organization and move support in Los Angeles.",
  });
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
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "40px" }}>
            <p>The issue here is the space itself. The room, layout, volume, or systems are no longer supporting the way you naturally move through your day. I come in, find the friction, and make the space work around your real habits.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>How we can work together</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "12px" }}>Projects can be:</p>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            {[
              "Side-by-side guided sessions",
              "Hybrid decision blocks",
              "Full key handoff",
              "Solo resets while you're away",
              "Packing and move prep with or without you",
              "Closet and system continuity after landing",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "14px", color: "var(--stone)", fontStyle: "italic", marginBottom: "40px" }}>The right style is the one that creates the easiest lasting outcome.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>What's included</h2>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            {[
              "Intake call, prior coordination, and any pre-planning — or an on-site, task-focused immediate dive in, depending on what the project needs",
              "Layout logic",
              "Sourcing recommendations",
              "Setup and install",
              "Label systems",
              "Pre-order coordination",
              "Workflow tools and install basics",
              "Measuring tools and reusable sort bins",
              "Cord wraps, Velcro, adapters, and utility hardware",
              "Problem-solving tools that become necessary once the room opens up",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginBottom: "40px" }}>For deeper spaces like closets, offices, storage rooms, and linen systems, product support is quoted after walkthrough based on hidden volume and actual dimensions.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Hourly</td><td>$150/hr · 3 hr minimum</td></tr>
              <tr><td>10-hour Flex Block</td><td>$1,250 ($125/hr)</td></tr>
              <tr><td>25-hour Flex Block</td><td>$3,125 ($125/hr)</td></tr>
              <tr><td>Studio / 1BR Move Reset</td><td>$1,200 flat — up to 8 hours straight</td></tr>
              <tr><td>Larger homes & multi-room projects</td><td>Quoted after call</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "56px" }}>Flex blocks never expire. The $1,200 flat rate is reserved for studio and 1-bedroom moves only — footprints that can realistically be packed, landed, or reset in a single uninterrupted day. Larger homes scope as projects.</p>

          {/* Gayle testimonial */}
          <div style={{ borderTop: "1px solid var(--linen)", paddingTop: "48px" }}>
            <blockquote style={{ borderLeft: "3px solid var(--rust)", paddingLeft: "28px", margin: 0 }}>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>I was thinking about the ease of my life here since you streamlined my environment.</p>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. Then I go in to shower and my wonderful shower head makes it so easy — it beats down on me but doesn't get to the very back of the tub, which makes clean up easier.</p>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>Then I go to the bedroom closet. All my clothes are arranged by item and color, and my purses are arranged on two long shelves and two short ones so I can see what I have and choose accordingly. My shoes are arranged on four shelves where I can easily see them. So much easier for me.</p>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>Then I go to the living room where the heat is set perfectly and keeps the house warmed the way I want.</p>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>Thank you for making life easier for me.</p>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "20px" }}>P.S. I forgot to mention the TV. It is set up perfectly for me to get to all the channels I want with only one clicker.</p>
              <footer style={{ fontSize: "13px", fontWeight: 700, color: "var(--rust)", letterSpacing: "0.06em" }}>— Gayle</footer>
            </blockquote>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "56px" }}>
            <Link href="/contact?service=home-org" className="btn btn-dark">Book your session</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
