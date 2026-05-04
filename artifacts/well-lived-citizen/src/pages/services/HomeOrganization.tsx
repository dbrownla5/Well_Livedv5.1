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
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)" }}>
            <p style={{ marginBottom: "20px" }}>The issue here is the space itself. The room, layout, volume, or systems are no longer supporting the way you naturally move through your day. I come in, find the friction, and make the space work around your real habits.</p>
          </div>

          <div style={{ background: "var(--char)", padding: "36px", margin: "40px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "14px" }}>Why this works.</div>
            <p style={{ fontSize: "15px", color: "var(--cream)", lineHeight: 1.8, marginBottom: "12px" }}>The same discipline that reorganized 150 retail stores across 14 states, that led a Seattle flagship to its highest sales year in company history, that rebuilt organizations from startup to scale — applied to the places where people actually live.</p>
            <p style={{ fontSize: "15px", color: "rgba(245,240,232,.78)", lineHeight: 1.8 }}>I know where systems break, where bottlenecks hide, and how to build something that holds. The result isn't a space that looks good for a day. It's a living system shaped around your real habits.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>How we can work together</h2>
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
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>Flex blocks never expire. The $1,200 flat rate is reserved for studio and 1-bedroom moves only — footprints that can realistically be packed, landed, or reset in a single uninterrupted day. Larger homes scope as projects.</p>

          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "32px", marginBottom: "56px" }}>
            <div style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>A Note on Labels</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>Labels are always included — handwritten on-site by default, and printed sets provided for larger project scopes.</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>For efficiency, printed labels are usually handled as office work rather than billed hourly. I notate during the session, build the label set in my own app on my own time, print them, and bring them back to apply on the next visit or at the end of a multi-session project. This saves real money on hourly time that would otherwise be spent typing and cutting labels in the middle of active work.</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8 }}>If you want fully printed labels applied the same day, I'm happy to bring the label maker on-site — just mention it during intake so it's built into the time estimate.</p>
          </div>

          {/* Add-Ons */}
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 8px" }}>Add-Ons & Landing Support</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "32px" }}>Optional product budgets that can be added to any session or day rate. Priced to cover real items, not estimated loosely.</p>

          <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--char)", marginBottom: "16px" }}>First-Night & First-Week Supply Bundles</div>
          <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7, marginBottom: "20px" }}>So the home works before the first Target run.</p>

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

          <div style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--char)", margin: "40px 0 16px" }}>Pre-Buy Org Bundles</div>
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

          {/* Gayle testimonial */}
          <div style={{ borderTop: "1px solid var(--linen)", margin: "56px 0 0", paddingTop: "48px" }}>
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
