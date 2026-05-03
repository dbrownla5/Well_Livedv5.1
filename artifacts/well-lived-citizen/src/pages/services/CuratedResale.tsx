import { Link } from "wouter";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function CuratedResale() {
  usePageMeta({
    title: "Curated Resale & Consignment",
    description: "Trust-forward thoughtful curation. Pickup, evaluation, photography, platform matching, and payout — without making you a part-time reseller.",
  });
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">04 — Curated Resale & Consignment</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>Trust-forward thoughtful curation.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>For the things that still have value, story, or second-market potential — without asking you to become a part-time reseller.</p>
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
              <a href="https://instagram.com/thewelllivedcloset" target="_blank" rel="noopener noreferrer" className="alt">Follow on Instagram →</a>
            </div>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 8px" }}>This service is built for</h2>
          <ul style={{ listStyle: "none", marginBottom: "40px" }}>
            {[
              "Clothing and designer accessories",
              "Jewelry",
              "Home decor and furniture",
              "Art",
              "Rare textiles and story-rich vintage",
              "One-of-a-kind pieces with real buyer demand",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>The work is not just listing. It includes:</h2>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            {[
              "Pickup, intake, evaluation",
              "Photography",
              "Platform matching",
              "Pricing",
              "Buyer communication",
              "Routing and return logic",
              "Donation reroute when appropriate",
              "Monthly reporting and payout rhythm",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "15px", fontWeight: 600, color: "var(--char)", margin: "24px 0 40px", fontStyle: "italic" }}>The goal is to move the item into the right next life, not just the fastest sale.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Easy handoff and pickup</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>The handoff is intentionally easy. Depending on what makes the most sense for your week, items can move through:</p>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            {[
              "City pickup",
              "Route-based stop-ins",
              "Uber Business courier",
              "Building desk drop",
              "UPS Access Point",
              "Direct bag shipment or handoff during another project block",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "40px" }}>The longer we have worked together, the easier this becomes. The philosophy is simple: why spend time coordinating a bag when it can simply be in my hands by noon.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>What works best</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>No item count minimum. Fill what you have, send it when it's ready.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>For same-day pickup and courier handoff, I work with 60–90 quart totes — the size that fits an Uber courier cleanly and keeps the pickup easy on both ends. I keep them on hand and drop them with you, or ship them ahead from my business Amazon account.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>The strongest bags usually include a mix — contemporary designer, quality vintage, home décor, furniture, art, jewelry, or well-kept everyday brands. But I'll look at anything clean and in good faith.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>If it's not worth listing, I'll tell you. If it's borderline, I'll still try. Patience is the advantage here — things that don't move fast elsewhere often find their buyer because I'm willing to wait for the right one. Clean non-sellable items route directly into approved donation channels without requiring separate client sorting.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Item standards</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "16px" }}>This is a resale and curation service. It is not waste removal, donation hauling, contaminated textile removal, a recycling substitute, or a "please get rid of this for me" service.</p>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>The assumption is: these are things you took care of and know deserve another life. That is the spirit of this service.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Where items sell</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>Items are routed by category and market fit for maximum return:</p>
          <ul style={{ listStyle: "none", marginBottom: "16px" }}>
            {[
              "Poshmark (Poshmark Ambassador)",
              "eBay",
              "Etsy",
              "Facebook Marketplace",
              "Chairish",
              "Vinted, Vestiaire, Grailed",
              "Vetted local high-end resale and private collector network",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginBottom: "40px" }}>The route depends on item type, buyer demand, story value, platform behavior, seasonality, and speed versus premium price goals.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Intake review timing</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>Once items arrive, intake review typically takes 7–10 business days. Within that window you'll receive confirmation of what was received, what's accepted for sale, what may need hold timing, what may be rerouted, and what may not justify resale. If workload or project volume changes that timeline, I'll let you know.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>Realistic resale timeline</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>This is a long game, not a fast-cash service. Most strong items sell within the first 90 days. Nearly everything with real demand finds its buyer within 6 to 9 months. The right expectation is: resale rewards patience, not urgency. If immediate cash is the priority, resale may not be the best route.</p>

          <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "28px", marginBottom: "40px" }}>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "12px" }}>What makes this work is that I'm not simply uploading things. I'm deciding what deserves effort, what should wait, what gains value with story, what belongs in the collector world, what needs to leave fast, and what is better donated. I'm also choosing when emotional meaning in a listing creates the right buyer connection — and when it doesn't.</p>
            <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.8, fontStyle: "italic" }}>The point is not volume. The point is thoughtful curation that creates the best next life for the item and the most realistic return for the client.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Commission structure</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Clothing & Accessories</td><td>55% client / 45% Dayna</td></tr>
              <tr><td>Designer</td><td>50 / 50</td></tr>
              <tr><td>Furniture & Significant Home Pieces</td><td>50 / 50</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "16px", lineHeight: 1.6 }}>Monthly report by the 1st · Payout by the 5th · Clean split of net proceeds after platform fees</p>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>Agreement required. No upfront cost. Commission calculated on net proceeds after platform fees.</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact?service=resale" className="btn btn-dark">Schedule a Pickup</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
