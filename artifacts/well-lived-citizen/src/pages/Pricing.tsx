import { Link } from "wouter";

export default function Pricing() {
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
          {/* 01 Home Org */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">01 — Home Organization & Modern Move</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$150/hr · 3 hr minimum</td></tr>
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
                <tr><td>Hourly</td><td>$175/hr · 2 hr minimum</td></tr>
                <tr><td>4-Hour Practical Reset</td><td>Available</td></tr>
                <tr><td>Continuity Retainer</td><td>$500/mo</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>No membership. No subscription. Ease comes from relationship, not a forced plan.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 04 Resale */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">04 — Curated Resale & Consignment · The Well Lived Closet</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Clothing & Accessories</td><td>55% Dayna / 45% client</td></tr>
                <tr><td>Designer</td><td>50 / 50</td></tr>
                <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
                <tr><td>Full Closet Liquidation</td><td>55 / 45</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.6 }}>Monthly report by the 1st · Payout by the 5th · Clean split of net proceeds after platform fees</p>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Agreement required. Commission is calculated on net proceeds after platform fees.</p>
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

            {/* In-person visits: warm, neighborly voice */}
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>If we have a visit on the books</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "32px" }}>
              <p style={{ marginBottom: "16px" }}>
                Life happens. If you need to move our visit, just <Link href="/contact" style={{ color: "var(--rust)" }}>send me a note</Link> — the earlier the better. Anything 48 hours out or more, no problem at all, we'll find a new time.
              </p>
              <p style={{ marginBottom: "16px" }}>Inside 48 hours I ask that the booked time be paid for, because that slot was held for you and I usually can't refill it last-minute. Same for no-shows. I'd rather you tell me you're overwhelmed and we reschedule than ghost the appointment — I genuinely won't be weird about it.</p>
              <p style={{ marginBottom: 0 }}>Hourly sessions and flex blocks are paid at booking. Flex-block hours don't expire — they sit there until you need them. If something about a visit didn't sit right, message me within a week and we'll talk it through directly.</p>
            </div>

            {/* Resale / online buyers: strict */}
            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>Resale, consignment & online buyers</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75 }}>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>All resale sales are final.</strong> Items are sold as-described with photos, measurements, and condition notes. No returns, no refunds, no exchanges, no chargebacks. Buyers are responsible for reading the listing in full before purchasing.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Authenticity & condition.</strong> Designer items are inspected and described in good faith. If you have questions about authenticity or condition, ask before you buy — not after. Once an item ships, the sale is closed.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Shipping & risk.</strong> Items ship insured when value warrants it. Risk of loss transfers to the buyer at hand-off to the carrier. Claims for lost or damaged shipments are filed with the carrier, not with The Well Lived Citizen.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Consignment (seller side).</strong> Curated Resale is a service performed on behalf of the client. The client retains ownership of items until sold. Commission is calculated on net proceeds after platform and processing fees, per the signed resale agreement. Payouts follow the schedule in that agreement.</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: "var(--char)" }}>Chargebacks & disputes.</strong> Buyers who file a chargeback without first contacting me to resolve the issue will be reported to the platform and blocked from future purchases. Disputes are handled by message or email first — that's almost always faster than a bank.</p>
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
