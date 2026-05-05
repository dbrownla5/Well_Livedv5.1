import { Link } from "wouter";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Pricing() {
  usePageMeta({
    title: "Pricing",
    description: "Flat-rate quick books, hourly, flex blocks, add-ons, commission, and how it all works. Full pricing for concierge home services in Los Angeles.",
  });
  return (
    <div className="page">
      <section style={{ padding: "80px 0 48px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">How I charge</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>Pricing</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>Everything here, in one place. Rates, how the structures work, add-ons, commission, payment, and what happens if life interrupts.</p>
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
                  <td style={{ color: "var(--cream)", fontWeight: 600 }}>2-Hour House Call</td>
                  <td style={{ color: "var(--cream)" }}>$350 flat · fixed price, book directly</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--cream)", fontWeight: 600 }}>4-Hour Practical Reset</td>
                  <td style={{ color: "var(--cream)" }}>$500 flat · no project scope, no hourly count</td>
                </tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--clay)", marginTop: "14px" }}>Paid at booking. No estimate call. You point to what needs handling — I bring the momentum.</p>
            <Link href="/contact?offer=housecall" className="btn btn-rust" style={{ marginTop: "20px", display: "inline-block" }}>Book a flat-rate block</Link>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 01 Home Org */}
          <div style={{ marginBottom: "40px" }}>
            <div className="label">01 — Home Organization & Modern Move</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Hourly</td><td>$150/hr · 3 hr minimum</td></tr>
                <tr><td>10-hour Flex Block</td><td>$1,250 ($125/hr)</td></tr>
                <tr><td>25-hour Flex Block</td><td>$3,125 ($125/hr)</td></tr>
                <tr><td>Studio / 1BR Move Reset</td><td>$1,200 flat — up to 8 hours straight</td></tr>
                <tr><td>Larger homes & multi-room projects</td><td>Quoted after call</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "32px" }}>Flex blocks never expire. The $1,200 flat rate is for studio and 1-bedroom moves only — footprints that can realistically be packed, landed, or reset in a single uninterrupted day. Larger homes scope as projects.</p>
          </div>

          {/* Labels note */}
          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px", marginBottom: "40px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>A note on labels</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>Labels are always included — handwritten on-site by default, printed sets for larger project scopes.</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>Printed labels are handled as office work rather than billed hourly. I notate during the session, build the label set on my own time, print them, and bring them back to apply on the next visit or at the end of a multi-session project. It saves real money on hourly time that would otherwise be spent typing and cutting labels in the middle of active work.</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8 }}>If you want fully printed labels applied the same day, I'll bring the label maker on-site — just mention it during intake so it's built into the time estimate.</p>
          </div>

          {/* Landing bundles */}
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--char)", marginBottom: "8px" }}>First-Night & First-Week Supply Bundles</div>
            <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, marginBottom: "20px" }}>Optional product budgets that can be added to any session or day rate. So the home works before the first Target run.</p>
            {[
              {
                price: "$150 — Essentials Landing",
                body: "Toilet paper, paper towels, basic utensils, water glasses, a wine or whiskey tumbler, laundry and dish detergent, trash bags, trash bins, two bath towels, and two kitchen towels. The first-night basics so nothing has to be bought in a panic.",
              },
              {
                price: "$250 — Start-Up Landing",
                body: "Everything in Essentials, plus a starter dish set, dish soap, hamper, hangers, and entry-point setup — keys, mail, shoes, bag drop. Enough to make the kitchen functional and the front door feel like a real landing zone.",
              },
              {
                price: "$500 — Full Landing Bundle",
                body: "Everything in Start-Up, plus sheets, pillows, a steamer, and a duvet. The sleep, shower, eat, charge, and get dressed tonight bundle. Ideal for new-city arrivals, life transitions, furnished rentals, post-breakup moves, and temporary homes that still need to feel fully functional.",
              },
            ].map(({ price, body }, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--linen)", padding: "20px 0" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--char)", marginBottom: "8px" }}>{price}</div>
                <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8 }}>{body}</p>
              </div>
            ))}
          </div>

          {/* Org bundles */}
          <div style={{ marginBottom: "56px" }}>
            <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--char)", margin: "32px 0 8px" }}>Pre-Buy Org Bundles</div>
            <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, marginBottom: "20px" }}>For clients who want to front-load organizing supplies into the session. Item mix is adjusted during intake to fit the specific room — any item can be swapped for another of equal value.</p>
            {[
              {
                price: "$150 — Starter Org Bundle",
                body: "5 bins, 3 bin latches, and a rolling cart. Good for a single closet, pantry shelf, or one focused zone.",
              },
              {
                price: "$250 — Mid Org Bundle",
                body: "10 bins in mixed sizes, 6 bin latches, a rolling cart, 2 drawer divider sets, and a shelf riser or two. Covers a full closet, a small pantry, or a bathroom and linen combo.",
              },
              {
                price: "$500 — Full Org Bundle",
                body: "20 bins across multiple sizes, full latch set, rolling cart, 4 drawer divider sets, shelf risers, under-shelf baskets, hanger refresh, and a starter set of clear canisters or lazy susans for pantry or bath. Covers a full pantry, a primary closet and dresser, or a multi-zone reset in one session.",
              },
            ].map(({ price, body }, i) => (
              <div key={i} style={{ borderTop: "1px solid var(--linen)", padding: "20px 0" }}>
                <div style={{ fontSize: "14px", fontWeight: 700, color: "var(--char)", marginBottom: "8px" }}>{price}</div>
                <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8 }}>{body}</p>
              </div>
            ))}
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
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>Larger estates and whole-home projects are quoted after walkthrough only — there's no fixed tier for that scope because every home is different. Flex blocks never expire.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 03 House Calls */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">03 — House Calls</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>2-Hour House Call</td><td>$350 flat</td></tr>
                <tr><td>4-Hour Practical Reset</td><td>$500 flat</td></tr>
                <tr><td>Hourly (beyond a flat block)</td><td>$175/hr · 2 hr minimum</td></tr>
                <tr><td>Continuity Retainer</td><td>$500/mo</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px" }}>No membership required. The retainer is for people who want priority access and ongoing support without rebooking from scratch every time. Ease comes from relationship, not from a plan you're locked into. Tech setup, troubleshooting, and donation routing all fit inside a House Call block.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* 04 Resale */}
          <div id="resale" style={{ marginBottom: "56px" }}>
            <div className="label">04 — Curated Resale & Consignment · The Well Lived Closet</div>
            <table className="pricing-table">
              <tbody>
                <tr><td>Clothing & Accessories</td><td>55% client / 45% Dayna</td></tr>
                <tr><td>Designer</td><td>50 / 50</td></tr>
                <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
              </tbody>
            </table>
            <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.75, marginBottom: "8px" }}>You keep the larger share. Commission is calculated on net proceeds after platform fees — not on the original listing price.</p>
            <p style={{ fontSize: "12px", color: "var(--sand)", marginBottom: "16px" }}>Monthly report by the 1st. Payout by the 5th. No upfront cost. Agreement required before intake begins — it covers the commission structure, timeline expectations, and what happens with items that don't sell.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Flex Blocks */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">Flex Blocks</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "16px" }}>Reserved time, without a deadline on using it.</h2>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "20px" }}>Flex blocks exist because most clients need ongoing support — but not on a fixed schedule. Life doesn't organize itself in predictable weekly slots. A flex block is hours in the bank. You buy the time at a discount, and it's there when you need it: a vendor day that comes up, a donation run before a trip, a session you couldn't schedule three weeks ago but need this Thursday.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "20px" }}>They work best for task lists that build between projects, seasonal resets, vendor coordination, post-travel home re-entry, guest prep, and the kind of ongoing relationship where you want someone available without having to explain the context from scratch every time.</p>
            <p style={{ fontSize: "13px", color: "var(--stone)", fontStyle: "italic" }}>Flex block hours never expire. The point is that your time is already there when life needs it.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Projects */}
          <div style={{ marginBottom: "56px" }}>
            <div className="label">Projects</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "16px" }}>Heavier work, scoped and priced after a call.</h2>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "16px" }}>Work that needs straight-through momentum, multi-room lift, deeper decision-making, or full move support doesn't fit cleanly into an hourly estimate. These scope as projects — quoted after a conversation where I understand the actual footprint.</p>
            <ul style={{ listStyle: "none", marginBottom: "16px" }}>
              {["Whole-home resets", "Packing and move days", "Larger catalogs", "Apartment landings", "Staged downsizing", "Multi-room continuity", "Family transition work", "Project-managed vendor sequences"].map((item, i, arr) => (
                <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "7px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
              ))}
            </ul>
            <p style={{ fontSize: "13px", color: "var(--stone)" }}>Projects are quoted by scope, timeline, and intensity of lift. <Link href="/contact" style={{ color: "var(--rust)" }}>Start with a conversation</Link>.</p>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* How to Pay */}
          <div id="payment" style={{ marginBottom: "56px" }}>
            <div className="label">How to Pay</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "16px" }}>Payment</h2>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "20px" }}>All bookings are paid via Zelle. Card payment options are on the way.</p>
            <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px" }}>
              <div style={{ display: "grid", gap: "16px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "6px" }}>Zelle — Email</div>
                  <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "15px", fontWeight: 600, color: "var(--char)", textDecoration: "none" }}>dayna@thewelllivedcitizen.com</a>
                </div>
                <div style={{ fontSize: "12px", color: "var(--stone)", lineHeight: 1.6, paddingTop: "12px", borderTop: "1px solid var(--linen)" }}>
                  In the memo line, include your <strong style={{ color: "var(--char)" }}>name</strong> and the <strong style={{ color: "var(--char)" }}>service</strong> (e.g., "Smith — Home Org 3 hr block").
                </div>
              </div>
            </div>
          </div>

          <hr className="divider" style={{ marginBottom: "56px" }} />

          {/* Policies */}
          <div id="policies" style={{ marginBottom: "56px" }}>
            <div className="label">Policies</div>
            <h2 style={{ fontSize: "clamp(20px,2.4vw,28px)", fontWeight: 600, color: "var(--char)", lineHeight: 1.2, letterSpacing: "-0.01em", marginBottom: "32px" }}>How I work — visits, cancellations, resale</h2>

            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>If we have a visit on the books</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "32px" }}>
              <p style={{ marginBottom: "16px" }}>Life happens. If you need to move our visit, just <Link href="/contact" style={{ color: "var(--rust)" }}>send me a note</Link> — the earlier the better. Anything 48 hours out or more, no problem at all, we'll find a new time.</p>
              <p style={{ marginBottom: "16px" }}>Inside 48 hours I ask that the booked time be paid for, because that slot was held for you and I usually can't refill it last-minute. Same for no-shows. I'd rather you tell me you're overwhelmed and we reschedule than ghost the appointment — I genuinely won't be weird about it.</p>
              <p style={{ marginBottom: 0 }}>Hourly sessions and flex blocks are paid at booking. Flex-block hours don't expire — they sit there until you need them. If something about a visit didn't sit right, message me within a week and we'll talk it through directly.</p>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--char)", marginBottom: "12px" }}>Resale, consignment & online buyers</h3>
            <div style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75 }}>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>All resale sales are final.</strong> Items are sold as-described with photos, measurements, and condition notes. No returns, no refunds, no exchanges. Buyers are responsible for reading the listing in full before purchasing.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Authenticity & condition.</strong> Designer items are inspected and described in good faith. If you have questions about authenticity or condition, ask before you buy — not after.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Shipping & risk.</strong> Items ship insured when value warrants it. Risk of loss transfers to the buyer at hand-off to the carrier.</p>
              <p style={{ marginBottom: "16px" }}><strong style={{ color: "var(--char)" }}>Consignment (seller side).</strong> The client retains ownership of items until sold. Commission is calculated on net proceeds after platform fees, per the signed resale agreement.</p>
              <p style={{ marginBottom: 0 }}><strong style={{ color: "var(--char)" }}>Chargebacks & disputes.</strong> Buyers who file a chargeback without first contacting me to resolve the issue will be reported to the platform and blocked. Disputes are handled by message or email first — that's almost always faster than a bank.</p>
            </div>
          </div>

          <hr className="divider" style={{ marginBottom: "48px" }} />

          <div style={{ textAlign: "center", padding: "40px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
            <p style={{ fontSize: "16px", color: "var(--char)", fontWeight: 600, marginBottom: "8px" }}>The first conversation is always free.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "28px" }}>Reach me through the form.</p>
            <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
          </div>

        </div>
      </section>
    </div>
  );
}
