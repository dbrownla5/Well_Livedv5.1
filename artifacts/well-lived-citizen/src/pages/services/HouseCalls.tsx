import { Link } from "wouter";

export default function HouseCalls() {
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">03 — House Calls</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>For the things life leaves unfinished.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>For when the issue isn't the room — it's the person you used to have to call.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "40px" }}>
            <p style={{ marginBottom: "16px", fontStyle: "italic", fontSize: "16px" }}>Possibly my favorite service, and the spirit of this company.</p>
            <p style={{ marginBottom: "16px" }}>The world changed, the process got heavier, and no one can be expected to keep up with every new layer alone. House Calls fills the missing person role back into real life: the partner who handled it, the nearby parent, the neighbor, the adult child in another city, the friend who always knew how to make the day still work.</p>
            <p style={{ marginBottom: "16px" }}>Once I know how your home works, it becomes easy to help keep it working — home check-ins, tech setup, hands-on improvements, donation drop-offs, and the practical loose ends that make everyday life feel less heavy when someone trusted is paying attention.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Who House Calls is for</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "16px" }}>For the people who suddenly find themselves handling the parts of home life someone else used to quietly carry.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>The bill that used to auto-resolve because your partner handled it. The appliance install that feels different when you're home alone. The digital login that somehow became intimidating overnight. The package, pickup, repair, donation, or appointment that shouldn't be a big deal but suddenly feels heavier than it should.</p>
          <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600, marginBottom: "16px" }}>House Calls exists for the private, practical things people don't always want to say out loud.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "24px" }}>The goal is not to make life look perfect. The goal is to make everyday life feel safe, manageable, and less isolating when the normal support system has changed.</p>

          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {["Newly divorced","Recently widowed","First time living alone","Partner travels constantly","Adult children supporting from another city","Practical aftermath no one stays to help with","Moments where the original plan stopped working and you still need the day to happen"].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Ways to use House Calls</h2>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {["One-time practical resets","Weekly support","Monthly continuity","Seasonal resets","Remote family check-ins","Post-project upkeep","Vendor days","Donation and return routing","Home re-entry after travel","Guest and event resets","The 4-hour practical reset"].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "32px", margin: "40px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>Real-Life Example</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>The 8-month pregnant woman with a beautiful baby shower, hundreds of gifts, duplicate baby gear, no time, and no energy to turn a mountain of love into something functional.</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>I step in for the 4-hour practical reset: unwrap and sort everything, organize by month and size and first-use timeline, separate immediate essentials, identify duplicates, create return and resale routes, donate what will never realistically be used, clear packaging and gift-wrap chaos, order thank-you cards, export addresses to print, reset the room so it actually works for day one.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.8, fontStyle: "italic" }}>Everyone helps celebrate the moment — I help make it livable afterward. That's House Calls.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>Vendor & project oversight</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>When needed, House Calls also covers:</p>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {["Movers, haulers, cleaners, installers, contractors","Storage teams and donation pickups","Resale buyer coordination","Shipping and courier","Building and concierge protocol, service appointment access"].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Service area</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>LA base but not radius-limited. Travel by project logic, with route-based efficiency and stops built into the flow. Quick asks can often be absorbed into an existing route. Urgent timing and transition-sensitive requests are prioritized whenever possible.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Hourly</td><td>$175/hr · 2 hr minimum</td></tr>
              <tr><td>Continuity retainer</td><td>Available for repeat clients</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>No membership. No subscription. Ease comes from relationship, not a forced plan.</p>

          <p style={{ fontSize: "14px", color: "var(--stone)", fontStyle: "italic", marginBottom: "32px" }}>Sometimes there isn't a perfect way around the problem. There's just the person who knows how to make the day work anyway. That's where House Calls is most useful.</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
