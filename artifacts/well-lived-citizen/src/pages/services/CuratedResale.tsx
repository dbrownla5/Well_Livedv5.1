import { Link } from "wouter";

export default function CuratedResale() {
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">04 — Curated Resale & Consignment</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>Is it cool? Is it sellable? Will they even take it?</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>Piece-by-piece curation from someone who knows the platforms. For the things that still have value, story, or second-market potential — without asking you to become a part-time reseller.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "24px" }}>
            <p style={{ marginBottom: "16px" }}>This service is best for items that have been well cared for, still hold real market interest, or deserve thoughtful placement through story-led resale.</p>
            <p>It is not a donation pickup substitute, bulk textile recycling service, or a shortcut for things that are no longer in resellable condition.</p>
          </div>

          {/* Shop the closet */}
          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px", marginBottom: "40px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "8px" }}>Shop the closet</div>
            <div style={{ fontSize: "15px", fontWeight: 600, color: "var(--char)", marginBottom: "6px" }}>The Well Lived Closet</div>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.7, marginBottom: "14px" }}>Curated pieces with a life left in them — designer, vintage, and the occasional treasure. Photographed clean. Shipped in two days.</p>
            <div className="shop-buttons">
              <a href="https://posh.mk/HLUmmsrzq2b" target="_blank" rel="noopener noreferrer">Shop Poshmark →</a>
              <a href="https://ebay.us/m/cUjlUb" target="_blank" rel="noopener noreferrer" className="alt">Shop eBay →</a>
              <a href="https://instagram.com/thewelllivedcloset" target="_blank" rel="noopener noreferrer" className="alt">Follow the Closet on Instagram →</a>
            </div>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>The work is not just listing. It includes:</h2>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Pickup, intake, evaluation</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Photography</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Platform matching</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Buyer communication</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Routing and return logic</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Donation reroute when appropriate</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Monthly reporting and payout rhythm</li>
          </ul>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--char)", marginBottom: "40px", fontStyle: "italic" }}>The goal is to move the item into the right next life, not just the fastest sale.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Easy handoff and pickup</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>The handoff is intentionally easy. Depending on what makes the most sense for your week, items can move through:</p>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>City pickup</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Route-based stop-ins</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Uber Business courier</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Building desk drop</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>UPS Access Point</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Direct bag shipment or handoff during another project block</li>
          </ul>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "40px" }}>The philosophy is simple: why spend time coordinating a bag when it can be in my workflow and assessed for value by noon?</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Item standards</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>This is a resale and curation service. It is not waste removal, donation hauling, contaminated textile removal, a recycling substitute, or a "please get rid of this for me" service.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>The assumption is: these are things you took care of and know deserve another life. That is the spirit of this service.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Where items sell</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>Items are routed by category and market fit for maximum return:</p>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Poshmark (Poshmark Ambassador)</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>eBay</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Etsy</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Facebook Marketplace</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Chairish</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: "1px solid var(--linen)" }}>Vinted, Vestiaire, Grailed</li>
            <li style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0" }}>Vetted local high-end resale and private collector network</li>
          </ul>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginBottom: "40px" }}>The route depends on item type, buyer demand, story value, platform behavior, seasonality, and speed versus premium price goals.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Realistic resale timeline</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>This is a long game, not a fast-cash service. Most strong items sell within the first 90 days. Nearly everything with real demand finds its buyer within 6 to 9 months. The right expectation is: resale rewards patience, not urgency. If immediate cash is the priority, resale may not be the best route.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Commission structure</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Clothing & Accessories</td><td>55% Dayna / 45% client</td></tr>
              <tr><td>Designer</td><td>50 / 50</td></tr>
              <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
              <tr><td>Full Closet Liquidation</td><td>55 / 45</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.6 }}>Monthly report by the 1st · Payout by the 5th · Clean split of net proceeds after platform fees</p>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>Agreement required. No upfront cost. Commission calculated on net proceeds after platform fees.</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-dark">Schedule it</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
