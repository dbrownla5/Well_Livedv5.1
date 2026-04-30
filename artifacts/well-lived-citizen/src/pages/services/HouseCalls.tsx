import { Link } from "wouter";

export default function HouseCalls() {
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">03 — House Calls</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>2-hour House Call &mdash; $350. Book this week.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px", marginBottom: "24px" }}>Fixed price. No quote, no estimate call. The fastest way to get me on your calendar this week.</p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/contact" className="btn btn-dark" style={{ fontSize: "15px" }}>Get in Touch</Link>
            <span style={{ fontSize: "13px", color: "var(--clay)" }}>Tell me what you'd like handled and I'll confirm the slot.</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "48px 0 8px" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "10px" }}>Soft-launch offer</div>
            <p style={{ fontSize: "15px", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 8px" }}>
              <strong style={{ color: "var(--char)" }}>2-hour House Call &mdash; $350.</strong> One flat price. Book this week.
            </p>
            <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, margin: 0 }}>Tech setup, donation drop-offs, vendor day, the practical loose ends that have been catching all week &mdash; whatever you'd hand to the friend you don't have anymore. Send a few sentences about what's on your plate and we'll lock the slot.</p>
          </div>
        </div>
      </section>

      <section style={{ padding: "32px 0 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "8px" }}>For the things life leaves unfinished.</h2>
          <p style={{ fontSize: "16px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>For when the issue isn't the room &mdash; it's the person you used to have to call.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "40px" }}>
            <p style={{ marginBottom: "16px", fontStyle: "italic", fontSize: "16px" }}>Possibly my favorite service, and the spirit of this company.</p>
            <p style={{ marginBottom: "16px" }}>The world changed, the process got heavier, and no one can be expected to keep up with every new layer alone. House Calls fills the missing person role in real life: the partner who handled it, the nearby parent, the neighbor, the adult child in another city, the friend who always knew how to make the day still work.</p>
            <p style={{ marginBottom: "16px" }}>As we get more efficient, this gap gets harder to navigate. Solving it is something I may be able to do for everyone eventually — but right now, the need is there for each person I can reach.</p>
            <p>Once I know how your home works, it becomes easy for me to help keep it working — home check-ins, tech setup, hands-on home improvements, donation drop-offs, and the practical loose ends that make everyday life easier when someone trusted is paying attention.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Who House Calls is for</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "16px" }}>For the people who suddenly find themselves handling the parts of home life someone else used to quietly carry.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>The bill that used to auto-resolve because your partner handled it. The appliance install that feels different when you're home alone. The digital login that somehow became intimidating overnight. The package, pickup, repair, donation, or appointment that shouldn't be a big deal but suddenly feels heavier than it should.</p>
          <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600, marginBottom: "16px" }}>House Calls exists for the private, practical things people don't always want to say out loud.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "24px" }}>The goal is not to make life look perfect. The goal is to make everyday life feel safe, manageable, and less isolating when the normal support system changed.</p>

          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Newly divorced</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Recently widowed</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>First time living alone</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Partner travels constantly</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Adult children supporting from another city</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Practical aftermath no one stays to help with</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Moments where the original plan stopped working and you still need the day to happen</li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Ways to use House Calls</h2>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>One-time practical resets</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Weekly support</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Monthly continuity</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Seasonal resets</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Remote family check-ins</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Post-project upkeep</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Vendor days</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Donation and return routing</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Home re-entry after travel</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Guest and event resets</li>
          </ul>

          {/* Real-life example */}
          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "32px", margin: "40px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>Real-Life Example</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>The 8-month pregnant woman with a beautiful baby shower, hundreds of gifts, duplicate baby gear, no time, and no energy to turn a mountain of love into something functional.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.8 }}>The point is simple: everyone helps celebrate the moment — I help make it livable afterward. That's House Calls.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>Vendor & project oversight</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>When needed, House Calls also covers:</p>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Movers, haulers, cleaners, installers, contractors</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Storage teams and donation pickups</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Resale buyer coordination</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Building and concierge protocol, service appointment access</li>
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Service area</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>Los Angeles and surrounding areas. Quick asks can often be absorbed into an existing route. Urgent timing and transition-sensitive requests are prioritized whenever possible.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>2-Hour House Call</td><td>$350 flat &mdash; this week</td></tr>
              <tr><td>Hourly (beyond the House Call)</td><td>$175/hr · 2 hr minimum</td></tr>
              <tr><td>4-Hour Practical Reset</td><td>Available</td></tr>
              <tr><td>Continuity Retainer</td><td>$500/mo</td></tr>
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
