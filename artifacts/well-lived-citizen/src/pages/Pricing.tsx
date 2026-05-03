import { Link } from "wouter";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Pricing() {
  usePageMeta({
    title: "Pricing",
    description: "Flat-rate quick books (4x5, 2x3), hourly, flex blocks, projects, and continuity. Clear pricing for concierge home services in Los Angeles.",
  });
  return (
    <div className="page">
      <section style={{ padding: "80px 0 48px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">How I charge</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Pricing</h1>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>

          {/* Quick Booking */}
          <div style={{ marginBottom: "56px", background: "var(--char)", padding: "40px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "20px" }}>Quick Booking — Flat Rate</div>
            <table className="pricing-table pricing-table-dark">
              <tbody>
                <tr>
                  <td style={{ color: "var(--cream)", fontWeight: 600 }}>The 4x5 — 4-Hour Reset</td>
                  <td style={{ color: "var(--cream)" }}>$500 flat · no project scope, no hourly count</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--cream)", fontWeight: 600 }}>The 2x3 — 2-Hour House Call</td>
                  <td style={{ color: "var(--cream)" }}>$300 flat · fixed price, book directly</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--clay)", marginTop: "14px" }}>Flat-rate blocks are paid at booking. No estimate call required. You point to what needs handling — I bring the momentum.</p>
            <Link href="/contact" className="btn btn-rust" style={{ marginTop: "20px", display: "inline-block" }}>Book a flat-rate block</Link>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 01 Home Org */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">01 — Home Organization & Modern Move</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$150/hr · 3 hr minimum</td></tr>
                <tr><td>10-hour Flex Block</td><td>$1,250 ($125/hr)</td></tr>
                <tr><td>25-hour Flex Block</td><td>$3,125 ($125/hr)</td></tr>
                <tr><td>Studio / 1BR Move Reset</td><td>$1,200/day — flat rate, up to 8 hours straight</td></tr>
                <tr><td>Larger homes & multi-room projects</td><td>Quoted after call</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Flex blocks never expire. $1,200 flat rate is for studio and 1-bedroom moves only — footprints that can realistically be reset in a single uninterrupted day. Larger homes scope as projects.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 02 Legacy */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">02 — Legacy Planning & Inventory Catalog</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$175/hr · 2 hr minimum</td></tr>
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
                <tr><td>The 2x3 — 2-Hour House Call</td><td>$300 flat</td></tr>
                <tr><td>Hourly (beyond the 2x3)</td><td>$175/hr · 2 hr minimum</td></tr>
                <tr><td>The 4x5 — 4-Hour Practical Reset</td><td>$500 flat</td></tr>
                <tr><td>Continuity Retainer</td><td>$500/mo — ongoing access for recurring support</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>No membership. No subscription. Ease comes from relationship, not a forced plan. Retainer includes priority scheduling and dedicated continuity across sessions.</p>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Tech setup, troubleshooting, and bulk donation routing all fit inside a House Call — usually a 2x3 if it's contained, or a 4x5 if it's stacked with other practical loose ends.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 04 Resale */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">04 — Curated Resale & Consignment · The Well Lived Closet</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Clothing & Accessories</td><td>55% client / 45% Dayna</td></tr>
                <tr><td>Designer</td><td>50 / 50</td></tr>
                <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.6 }}>You keep the larger share. Monthly report by the 1st · Payout by the 5th · Clean split of net proceeds after platform fees.</p>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Agreement required. No upfront cost. Commission calculated on net proceeds after platform fees.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Flex Blocks */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">Flex Blocks</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "12px" }}>Reserved work time, when you need it.</h2>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "24px" }}>Flex Blocks are 2, 4, or 6-hour reserved blocks that can be used for focused task support, House Calls, continuity work, or the practical things that build up between bigger projects. Ideal when you know support will come up — even if you don't know exactly when.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "24px" }}>Best for: task lists that build over time, vendor access days, donation and return routing, guest and event prep, move follow-through, post-travel home re-entry, or the "I need a few hours with you this month" kind of ongoing relationship.</p>
            <p style={{ fontSize: "13px", color: "var(--stone)", fontStyle: "italic" }}>Flex block hours never expire. The point is simple: your time is already there when life needs it.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Projects */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">Projects</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "12px" }}>Heavier work, scoped and priced after a call.</h2>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "16px" }}>Work that needs straight-through momentum, multi-room lift, deeper decision-making, or full move support shifts into project pricing.</p>
            <ul style={{ listStyle: "none", marginBottom: "16px" }}>
              {["Whole-home resets","Packing and move days","Larger catalogs","Apartment landings","Staged downsizing","Multi-room continuity","Family transition work","Project-managed vendor sequences"].map((item, i, arr) => (
                <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
              ))}
            </ul>
            <p style={{ fontSize: "13px", color: "var(--stone)" }}>Projects are quoted by scope, timeline, and intensity of lift. <Link href="/contact" style={{ color: "var(--rust)" }}>Start with a conversation</Link>.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* How to Pay */}
          <div id="payment" style={{ marginBottom: "56px" }}>
            <div className="label">How to Pay</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "20px" }}>Payment</h2>
            <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px" }}>
              <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, marginBottom: "18px" }}>All bookings are paid via Zelle using the email below. Card payment options are arriving soon.</div>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "6px" }}>Zelle — Email</div>
                  <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "15px", fontWeight: 600, color: "var(--char)", textDecoration: "none" }}>dayna@thewelllivedcitizen.com</a>
                </div>
                <div style={{ fontSize: "12px", color: "var(--stone)", lineHeight: 1.6, paddingTop: "12px", borderTop: "1px solid var(--linen)" }}>
                  In the Zelle memo line, please include your <strong style={{ color: "var(--char)" }}>name</strong> and the <strong style={{ color: "var(--char)" }}>service</strong> being paid for (e.g., "Smith — Home Org 3 hr block").
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Policies */}
          <div id="policies" style={{ marginBottom: "56px" }}>
            <div className="label">Policies</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "32px" }}>How I work — visits, payment, resale</h2>

            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>If we have a visit on the books</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "32px" }}>
              <p style={{ marginBottom: "16px" }}>Life happens. If you need to move our visit, just <Link href="/contact" style={{ color: "var(--rust)" }}>send me a note</Link> — the earlier the better. Anything 48 hours out or more, no problem at all, we'll find a new time.</p>
              <p style={{ marginBottom: "16px" }}>Inside 48 hours I ask that the booked time be paid for, because that slot was held for you and I usually can't refill it last-minute. Same for no-shows. I'd rather you tell me you're overwhelmed and we reschedule than ghost the appointment — I genuinely won't be weird about it.</p>
              <p style={{ marginBottom: 0 }}>Hourly sessions and flex blocks are paid at booking. Flex-block hours don't expire — they sit there until you need them. If something about a visit didn't sit right, message me within a week and we'll talk it through directly.</p>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>Resale, consignment & online buyers</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75 }}>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>All resale sales are final.</strong> Items are sold as-described with photos, measurements, and condition notes. No returns, no refunds, no exchanges, no chargebacks. Buyers are responsible for reading the listing in full before purchasing.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Authenticity & condition.</strong> Designer items are inspected and described in good faith. If you have questions about authenticity or condition, ask before you buy — not after.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Shipping & risk.</strong> Items ship insured when value warrants it. Risk of loss transfers to the buyer at hand-off to the carrier.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Consignment (seller side).</strong> The client retains ownership of items until sold. Commission is calculated on net proceeds after platform fees, per the signed resale agreement.</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: "var(--char)" }}>Chargebacks & disputes.</strong> Buyers who file a chargeback without first contacting me to resolve the issue will be reported to the platform and blocked. Disputes are handled by message or email first — that's almost always faster than a bank.</p>
            </div>
          </div>

          <hr className="divider" style={{ marginBottom: "48px" }} />

          <div style={{ textAlign: "center", padding: "40px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
            <p style={{ fontSize: "16px", color: "var(--char)", fontWeight: 600, marginBottom: "8px" }}>Reach me through the form.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "28px" }}>The first conversation is always free.</p>
            <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
