import { Link } from "wouter";

export default function Services() {
  return (
    <div className="page">
      <section style={{ padding: "80px 0 48px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">The Well Lived Citizen</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>Services & Pricing</h1>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="service-card">
            <div className="service-num">01</div>
            <div className="service-title">Home Organization & Modern Move</div>
            <div className="service-tagline">The relief of the room.</div>
            <div className="service-body">
              <p>Your home, made to work for how you actually live. For the room that keeps collecting piles, the move that technically happened but never settled, the closet that no longer fits your life, or the spaces where everyday friction quietly steals time.</p>
            </div>
            <div className="service-pricing">$150/hr · 3 hr minimum</div>
            <div className="service-flex-note">
              Flex pricing and project quotes covered on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
            </div>
            <Link href="/services/home-organization" className="btn btn-outline">Book your session</Link>
          </div>

          <div className="service-card">
            <div className="service-num">02</div>
            <div className="service-title">Legacy Planning & Inventory Catalog</div>
            <div className="service-tagline">Clarity without fear.</div>
            <div className="service-body">
              <p>The operational side of a home, made visible again. This is for the part of life most people don't realize has been quietly building for years — the things inside a home that became part of how life worked, long before anyone stopped to look at them. Not the will. Not the paperwork. Not the part a lawyer handles. The part that lives inside the walls.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">
              Flex pricing and project quotes covered on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
            </div>
            <Link href="/services/legacy" className="btn btn-outline">Book your time</Link>
          </div>

          <div className="service-card">
            <div className="service-num">03</div>
            <div className="service-title">House Calls</div>
            <div className="service-tagline">For the things life leaves unfinished.</div>
            <div className="service-body">
              <p>For when the issue isn't the room — it's the person you used to have to call. Possibly my favorite service, and the spirit of this company.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">
              Flex pricing and project quotes covered on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
            </div>
            <Link href="/services/house-calls" className="btn btn-outline">Book me</Link>
          </div>

          <div className="service-card" style={{ borderBottom: "none" }}>
            <div className="service-num">04</div>
            <div className="service-title">Curated Resale & Consignment</div>
            <div className="service-tagline">Piece-by-piece curation from someone who knows the platforms.</div>
            <div className="service-body">
              <p>For the things that still have value, story, or second-market potential — without asking you to become a part-time reseller. No item count minimum. Fill what you have and send it when it's ready.</p>
            </div>
            <div className="service-pricing">Commission-based · agreement required</div>
            <div className="service-flex-note">
              Commission structure and full terms covered on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
            </div>
            <Link href="/services/resale" className="btn btn-outline">Schedule it</Link>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section style={{ padding: "48px 0 72px", borderTop: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "var(--stone)", marginBottom: "24px" }}>Not sure where to start? Start with what is most real right now.</p>
          <p style={{ fontSize: "14px", color: "var(--clay)", lineHeight: 1.75, marginBottom: "32px", maxWidth: "520px", marginLeft: "auto", marginRight: "auto" }}>Most clients naturally move between these four services over time, and the work is designed to follow real life instead of forcing you into a rigid category.</p>
          <Link href="/contact" className="btn btn-dark">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
