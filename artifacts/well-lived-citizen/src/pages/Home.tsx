import { Link } from "wouter";

export default function Home() {
  return (
    <div className="page">
      {/* HERO */}
      <section className="hero">
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="label fade-up fade-up-1">Los Angeles</div>
          <h1 className="hero-h1 fade-up fade-up-2">
            When <em>"there has to be an easier way"</em> becomes a business.
          </h1>
          <p className="hero-sub fade-up fade-up-2">
            Welcome to the concierge for the things you don't want to handle.
          </p>
          <p className="hero-body fade-up fade-up-3">
            My daily life already runs on shipping, logistics, tech fixes, resale, and the kind of real-world problem solving that doesn't slow down.
            I move fast where things are solvable, and when life gets stuck, I know how to move it through.
          </p>
          <p className="hero-kicker fade-up fade-up-3">I'm built for your chaos.</p>
          <div className="hero-cta fade-up fade-up-3">
            <Link href="/services" className="btn btn-dark">See the services</Link>
            <Link href="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* QUICK ENTRY BAND */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="conversion-band-header">
            Start here. Quick ways to get me in and get momentum.
          </div>
          <div className="conversion-grid-4">

            {/* Card 1 — The 4x5 */}
            <div className="conversion-block conversion-block-primary">
              <div className="conversion-price">4 hours · $500 flat</div>
              <div className="conversion-title">The 4x5</div>
              <div className="conversion-body">
                <p>This is my operational shorthand for four hours of focused, intentional work in your space.</p>
                <p>The closet that needs to finally be done. The guest room your mother-in-law is arriving for in three days. The move landing that technically happened. The event prep where everything needs to be in order before people arrive.</p>
                <p>Personal shopping, staging, sourcing — if it fits in four hours, it's on the table. You point to the friction. I bring the rest.</p>
              </div>
              <Link href="/contact?offer=4hour" className="btn btn-cream">Book the 4x5</Link>
            </div>

            {/* Card 2 — Resale Pickup */}
            <div className="conversion-block conversion-block-rust">
              <div className="conversion-price">Commission-based · pickup available</div>
              <div className="conversion-title">Resale Pickup Bag</div>
              <div className="conversion-body">
                <p>Closet cleanout, move-out, post-breakup, or just — this needs to go.</p>
                <p>Fill 2–4 bags. I handle the sorting, selling, donating, and getting anything with value where it belongs.</p>
                <p>Same-day pickup, route stop, or drop — whichever is easiest for your week.</p>
              </div>
              <Link href="/contact?offer=pickup" className="btn btn-cream">Schedule a Pickup</Link>
            </div>

            {/* Card 3 — The Move Closeout */}
            <div className="conversion-block conversion-block-dark">
              <div className="conversion-price">Starts as a 4-hour block</div>
              <div className="conversion-title">The Move Closeout</div>
              <div className="conversion-body">
                <p>Moving and not sure what's worth selling, storing, or letting go?</p>
                <p>I sort and route what stays, what sells, and what moves on — storage, shipping, and resale follow-through included.</p>
                <p>You keep going. I handle what's behind you.</p>
              </div>
              <Link href="/contact?offer=closeout" className="btn btn-cream">Start Move Support</Link>
            </div>

            {/* Card 4 — The 2x3 */}
            <div className="conversion-block conversion-block-light">
              <div className="conversion-price conversion-price-dark">2 hours · $300 flat</div>
              <div className="conversion-title conversion-title-dark">The 2x3</div>
              <div className="conversion-body conversion-body-dark">
                <p>Two hours for the things life leaves unfinished.</p>
                <p>The donation bags by the door. The vendor who needs letting in. The practical loose ends that have been on the list for two weeks.</p>
                <p>You used to have to call a friend for this. Now you just book a 2x3.</p>
              </div>
              <Link href="/contact?offer=housecall" className="btn btn-dark">Book the 2x3</Link>
            </div>

          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* SERVICES OVERVIEW */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">

          {/* 01 */}
          <div className="service-card">
            <div className="service-num">01 — Home Organization & Modern Move</div>
            <div className="service-title">Your home, made to work for how you actually live.</div>
            <div className="service-body">
              <p>For the room that keeps collecting piles. The move that technically happened but never settled. The closet that no longer fits your life. I come in, find the friction, and make the space work around how you naturally move through your day.</p>
            </div>
            <div className="service-pricing">$150/hr · 3 hr minimum</div>
            <div className="service-flex-note">Flex pricing and project quotes on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/home-organization" className="btn btn-outline">Book your session</Link>
          </div>

          {/* 02 */}
          <div className="service-card">
            <div className="service-num">02 — Legacy Planning & Inventory Catalog</div>
            <div className="service-title">Clarity without fear.</div>
            <div className="service-body">
              <p>The operational layer of what quietly adds up inside a home. You may already have the estate planner, the will, and the paperwork. My work lives in the operational middle — the things inside the walls that deserve a plan while you're still the one making decisions.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">Project quotes on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/legacy" className="btn btn-outline">Book your time</Link>
          </div>

          {/* 03 */}
          <div className="service-card">
            <div className="service-num">03 — House Calls</div>
            <div className="service-title">For the things life leaves unfinished.</div>
            <div className="service-body">
              <p>These are services that obviously should exist — but didn't come with a number to call. Not a company. Not a system. Just one person who shows up and handles it, one on one, in your space.</p>
              <p>For anyone in a gap: slammed professional, new-to-LA person, someone mid-transition, an adult navigating what used to just get handled.</p>
            </div>
            <div className="service-pricing">The 2x3 · $300 flat &nbsp;|&nbsp; The 4x5 · $500 flat &nbsp;|&nbsp; $175/hr</div>
            <div className="service-flex-note">Continuity retainer available. Details on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/house-calls" className="btn btn-outline">Book me</Link>
          </div>

          {/* 04 */}
          <div className="service-card" style={{ borderBottom: "none" }}>
            <div className="service-num">04 — Curated Resale & Consignment</div>
            <div className="service-title">Is it cool? Is it sellable? Will they even take it?</div>
            <div className="service-body">
              <p>For the things that still have value, story, or second-market potential — without asking you to become a part-time reseller. I go through it piece by piece, match each item to the right platform, and handle everything from pickup through payout.</p>
            </div>
            <div className="service-pricing">Commission-based · agreement required</div>
            <div className="service-flex-note">Commission structure and full terms on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/resale" className="btn btn-outline">Schedule it</Link>
          </div>

        </div>
      </section>

      <hr className="divider" />

      {/* TESTIMONIAL */}
      <section style={{ padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="testimonial-block">
            <div className="testimonial-quote">
              "I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. My clothes are arranged by item and color, my purses on two long shelves and two short ones — I can see what I have and choose accordingly. My shoes are on four shelves where I can easily see them. The heat is set perfectly. The TV is set up with only one clicker to get to all the channels I want. Thank you for making life easier for me."
            </div>
            <div className="testimonial-attr">— Gayle, Seattle &nbsp;·&nbsp; <Link href="/services/house-calls" style={{ color: "var(--rust)", fontWeight: 600 }}>House Calls</Link></div>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CLOSING CTA */}
      <section style={{ padding: "72px 0", background: "var(--char)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "16px" }}>Not sure where to start?</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 700, color: "var(--cream)", lineHeight: 1.2, marginBottom: "16px" }}>Start anywhere.</h2>
          <p style={{ fontSize: "15px", color: "var(--sand)", lineHeight: 1.75, marginBottom: "36px" }}>No pressure. The whole point is to make your life easier to navigate from here.</p>
          <Link href="/contact" className="btn btn-rust">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
