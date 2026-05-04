import { Link } from "wouter";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function HouseCalls() {
  usePageMeta({
    title: "House Calls",
    description: "For the things life leaves unfinished. Fixed rate, hourly, and continuity — concierge house calls in Los Angeles.",
  });
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">03 — House Calls</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>For the things life leaves unfinished.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>The person you used to be able to call. This is that — offered as a real service, by someone who is genuinely good at it.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>

          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "40px" }}>
            <p style={{ marginBottom: "16px", fontStyle: "italic", fontSize: "16px" }}>Possibly my favorite service, and the spirit of this company.</p>
            <p style={{ marginBottom: "16px" }}>For when the issue isn't the room — it's the person you used to have to call.</p>
            <p>The world changed, the process got heavier, and no one can be expected to keep up with every new layer alone. House Calls fills the missing person role in real life: the partner who handled it, the nearby parent, the neighbor, the adult child in another city, the friend who always knew how to make the day still work.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Ways to use House Calls</h2>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {[
              "One-time practical resets",
              "Weekly support",
              "Monthly continuity",
              "Seasonal resets",
              "Remote family check-ins",
              "Post-project upkeep",
              "Vendor days",
              "Donation and return routing",
              "Home re-entry after travel",
              "Guest and event resets",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          {/* Gayle story */}
          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", borderLeft: "3px solid var(--rust)", padding: "32px 36px", margin: "48px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "20px" }}>This is why House Calls exists.</div>
            <blockquote style={{ margin: 0 }}>
              <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>
                "I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. My clothes are arranged by item and color, my purses on two long shelves and two short ones — I can see what I have and choose accordingly. My shoes are on four shelves where I can easily see them. The heat is set perfectly. The TV is set up with only one clicker to get to all the channels I want. Thank you for making life easier for me."
              </p>
              <footer style={{ fontSize: "13px", fontWeight: 700, color: "var(--rust)", letterSpacing: "0.06em" }}>— Gayle, Seattle</footer>
            </blockquote>
            <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, marginTop: "20px", fontStyle: "italic" }}>Gayle didn't need a project. She needed someone to show up and make her home work like it should. That's House Calls.</p>
          </div>

          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "32px", margin: "40px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>Real-Life Example</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>The 8-month pregnant woman with a beautiful baby shower, hundreds of gifts, duplicate baby gear, no time, and no energy to turn a mountain of love into something functional.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.8, fontStyle: "italic" }}>Everyone helps celebrate the moment — I help make it livable afterward. That's House Calls.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>Vendor & project oversight</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>When needed, House Calls also covers:</p>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {["Movers, haulers, cleaners, installers, contractors", "Storage teams and donation pickups", "Resale buyer coordination", "Building and concierge protocol, service appointment access"].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>2-Hour House Call</td><td>$350 flat</td></tr>
              <tr><td>4-Hour Practical Reset</td><td>$500 flat</td></tr>
              <tr><td>Hourly (beyond a flat block)</td><td>$175/hr · 2 hr minimum</td></tr>
              <tr><td>Continuity Retainer</td><td>$500/mo</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "48px" }}>No membership. No subscription. Ease comes from relationship, not a forced plan. Retainer includes priority scheduling and dedicated continuity across sessions.</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact?offer=housecall" className="btn btn-dark">Book a House Call</Link>
            <Link href="/contact?offer=4hour" className="btn btn-outline">Book a 4-Hour Reset</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
