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
            <Link href="/services" className="btn btn-dark">See the work</Link>
            <Link href="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* CONVERSION BLOCKS */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="conversion-grid">
            <div className="conversion-block">
              <div className="conversion-label">Ready to move on it?</div>
              <div className="conversion-body">Book the 4-Hour Practical Reset for the room, task list, move landing, or household overflow that needs to stop catching immediately.</div>
              <Link href="/contact" className="btn">Book 4-Hour Reset</Link>
            </div>

            <div className="conversion-block">
              <div className="conversion-label">Resale bag pickup.</div>
              <div className="conversion-body">
                Moving, closet cleanout, post-breakup, wardrobe reset — fill 2 to 4 totes and get them to me same day.
                <br /><br />
                Same-day pickup or courier handoff available.
              </div>
              <Link href="/contact" className="btn">Schedule Pickup</Link>
            </div>
          </div>

          <div className="conversion-fullwidth">
            <div className="conversion-label">Need to leave before everything is packed?</div>
            <div className="conversion-body">You go to the new city, the family home, the furnished rental, or the next place first. I stay behind to pack and close out the space — moving what should be stored, routing what should be sold, and shipping what you still need in labeled boxes. Start with a scoped project fee built from hourly work blocks. The move continues in flexible chunks without you carrying the urgency from the other end.</div>
            <Link href="/contact" className="btn btn-dark">Book the closeout</Link>
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
              <p>I cover the rooms and spaces. For the room that keeps collecting piles. The storage unit that keeps increasing rent and you only go every six months to ensure you weren't broken into or to take out that one outfit, or bike. The move where the boxes made it through the door, but nothing feels settled. The move where you had to leave before everything was fully packed, and someone still needs to close out what's left behind.</p>
              <p>The professional landing in Los Angeles the same day as their boxes and the first day on the job — knowing you'll come home to a boxed mattress, no phone charger, and a suit that needs steaming. No energy, takeout food, or forks. It's the 'oh my gosh, someone save me' situation. But you're happy — life is starting a new chapter — you just have to move through the hurdles of that part.</p>
            </div>
            <div className="service-pricing">$150/hr · 3 hr minimum</div>
            <div className="service-flex-note">Flex pricing and project quotes covered on the Pricing page.</div>
            <Link href="/services/home-organization" className="btn btn-outline">Book your session</Link>
          </div>

          {/* 02 */}
          <div className="service-card">
            <div className="service-num">02 — Legacy Planning & Inventory Catalog</div>
            <div className="service-title">Clarity without fear.</div>
            <div className="service-body">
              <p>The lived-in layer of your home — the walls you spend your life within — needs clarity before it becomes a burden to you, your future self, your family, or the people you rely on. Most people are prepared for the things you're pressured to check off the list. You may already have the estate planner, the will, and the paperwork.</p>
              <p>My work is the home itself — identifying what's still in use, what still has value (often hidden in cabinets), and what needs a clear plan while you can still decide what matters. When story matters, I document that too — so meaning isn't lost when objects change hands.</p>
              <p>I am not a legal estate planner or estate sale service. I focus on the meaning behind the life in your objects and how to preserve that, giving everything more value to you now, your family later, and the people who want your things.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">Flex pricing and project quotes covered on the Pricing page.</div>
            <Link href="/services/legacy" className="btn btn-outline">Book your time</Link>
          </div>

          {/* 03 */}
          <div className="service-card">
            <div className="service-num">03 — House Calls</div>
            <div className="service-title">For the things life leaves unfinished.</div>
            <div className="service-body">
              <p>For when the issue isn't the room — it's the person you used to have to call. Possibly my favorite service, and the spirit of this company.</p>
              <p>Once I know how your home works, it becomes easy for me to help keep it working — home check-ins, tech setup, hands-on home improvements, donation drop-offs, and the practical loose ends that make everyday life easier when someone trusted is paying attention.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">Flex pricing and project quotes covered on the Pricing page.</div>
            <Link href="/services/house-calls" className="btn btn-outline">Book me</Link>
          </div>

          {/* 04 */}
          <div className="service-card" style={{ borderBottom: "none" }}>
            <div className="service-num">04 — Curated Resale & Consignment</div>
            <div className="service-title">Is it cool? Is it sellable? Will they even take it?</div>
            <div className="service-body">
              <p>This is for clothing, designer bags, jewelry, and the pieces you know might still have value but do not want to spend hours platform-matching, measuring, negotiating, and managing yourself. With an established luxury and resale background, I go through it piece by piece, decide what is worth the effort, and match each item to the platform where it makes the most sense. I route clean, non-sellable items to donation as part of the process.</p>
              <p>You fill the waterproof bag, sign the agreement, and I handle the rest — pickup, styling, measurements, listing, buyer questions, returns, monthly check-ins, and payout on the agreed split.</p>
            </div>
            <div className="service-pricing">Commission-based · agreement required</div>
            <div className="service-flex-note">Commission structure and full terms covered on the Pricing page.</div>
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
            <div className="testimonial-attr">— Gayle, Seattle Client</div>
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
