import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transitionDelay = `${delay}ms`;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.unobserve(el); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref} className="fade-up">{children}</div>;
}

const pillars = [
  {
    num: "01",
    name: "Home Reset & Move Support",
    tagline: "The relief of the room.",
    description: "Organization, unpacking, room functionality, closet editing, and post-move support. This is the work of getting a space to function around the way you actually live — not a showroom version of your life.",
    includes: ["Closet and storage editing", "Post-move unpacking and setup", "Room-by-room functionality reset", "Move coordination and vendor oversight", "The Closeout (you go first, I close out)", "The Professional Landing (same-day move-in setup)"],
    quickBook: { label: "The 4-Hour Reset", href: "/the-reset" },
    pillarHref: "/home-reset-move-support",
  },
  {
    num: "02",
    name: "Legacy Planning & Inventory Catalog",
    tagline: "The relief of the life in the hidden things.",
    description: "Most families don't know what they have until it's too late to ask. Legacy work is the process of finding out — assigning value, story, and meaning to the things a life accumulates, and making a plan while there's still time to choose how it goes. Proactive or urgent. Room by room. Object by object.",
    includes: ["Full-home photographic inventory", "Provenance and story documentation", "Valuation routing and appraisal coordination", "Distribution planning", "Archival material organization", "Estate transition support"],
    quickBook: null,
    pillarHref: "/legacy-planning",
  },
  {
    num: "03",
    name: "House Calls",
    tagline: "The person you used to be able to call.",
    description: "There's a person everyone used to have — or used to be. The neighbor who knew who to hire. The partner who kept track of everything. The friend who just came over and sorted it out. House Calls is that person, available to book — for yourself, for a parent, for someone who needs a capable human on the ground.",
    includes: ["Technology setup and troubleshooting", "Home safety updates", "Vendor oversight and access days", "Donation and return routing", "Remote family check-ins and updates", "Event prep and post-event breakdown"],
    quickBook: { label: "The 2-Hour House Call", href: "/house-calls" },
    pillarHref: "/house-calls-pillar",
  },
  {
    num: "04",
    name: "Curated Resale & Consignment",
    tagline: "It flows from everything else.",
    description: "A Reset surfaces what you're ready to part with. Legacy work uncovers what has real value sitting in storage. A move closeout routes what doesn't make the truck. The resale piece is already built into the other work — pickup, evaluation, and listing without asking you to become a part-time seller.",
    includes: ["Free pickup within service area", "Platform matching by item category", "Buyer communication and management", "Sales report and payout every 30 days from signing", "Donation rerouting for unsold items", "Designer, furniture, art, and clothing accepted"],
    quickBook: { label: "Fast Bag Fill", href: "/fast-bag-fill" },
    pillarHref: "/curated-resale-consignment",
  },
];

export default function Services() {
  usePageMeta({
    title: "Services — One Capable Person for What Piles Up | The Well Lived Citizen",
    description: "Four pillars and three Quick Books. Home resets, legacy planning, house calls, and curated resale in greater Los Angeles. One number, one person, one invoice.",
    path: "/services",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow eyebrow-light">Services</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "2rem" }}>
              Four pillars. One consistent practice.
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8 }}>
              The work splits cleanly into four categories. Most clients use two or three of them at once.
            </p>
          </div>
        </div>
      </section>

      {/* ── QUICK BOOKS ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Where Most People Start</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem" }}>Quick Books</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.8, marginBottom: "2.5rem", maxWidth: 560 }}>
              These are the three things clients book most. Easy to schedule, easy to see results.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
            {[
              { href: "/the-reset", num: "QB01", name: "The 4-Hour Reset", price: "$495 flat rate", desc: "Four focused hours in the one space you keep meaning to fix. I show up and get it done." },
              { href: "/house-calls", num: "QB02", name: "The 2-Hour House Call", price: "$175/hr · 2-hr min", desc: "Practical help for the things life accumulates faster than anyone has time to address. Technology, safety, organization, transitions." },
              { href: "/fast-bag-fill", num: "QB03", name: "The Fast Bag Fill", price: "Complimentary pickup", desc: "Fill a bag with clothing and accessories you're ready to part with. Pickup is complimentary — I handle evaluation, routing, and resale." },
            ].map((qb, i) => (
              <FadeUp key={i} delay={i * 60}>
                <Link href={qb.href}>
                  <div style={{
                    backgroundColor: "var(--parchment)", padding: "2.5rem", height: "100%",
                    transition: "background-color 0.18s ease", cursor: "pointer",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment-mid)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment)"}
                  >
                    <span className="service-num" style={{ display: "block", marginBottom: "1rem" }}>{qb.num}</span>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem" }}>{qb.name}</h3>
                    <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--sage)", marginBottom: "1rem" }}>{qb.price}</p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7, marginBottom: "1.5rem" }}>{qb.desc}</p>
                    <span style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-dark)" }}>Book Now →</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">The Four Pillars</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem" }}>Deep service, built around your household.</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 560 }}>
              Each pillar page goes deeper into the work — who it's for, what it involves, and how to get started.
            </p>
          </FadeUp>
          {pillars.map((pillar, i) => (
            <FadeUp key={i} delay={i * 50}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem",
                alignItems: "start", padding: "3.5rem 0", borderTop: "1px solid var(--warm-gray-lt)",
              }}>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1rem", marginBottom: "1rem" }}>
                    <span className="service-num">{pillar.num}</span>
                    <h3 className="display-sm" style={{ color: "var(--ink)" }}>{pillar.name}</h3>
                  </div>
                  <p style={{ fontSize: "1rem", fontStyle: "italic", color: "var(--sage-dark)", fontWeight: 300, marginBottom: "1rem" }}>{pillar.tagline}</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "1.5rem" }}>{pillar.description}</p>
                  <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                    <Link href={pillar.pillarHref} className="btn btn-ink" style={{ fontSize: "0.65rem", padding: "0.7rem 1.4rem" }}>Learn More</Link>
                    {pillar.quickBook && (
                      <Link href={pillar.quickBook.href} className="btn btn-outline-ink" style={{ fontSize: "0.65rem", padding: "0.7rem 1.4rem" }}>
                        {pillar.quickBook.label}
                      </Link>
                    )}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>Includes</p>
                  {pillar.includes.map((item, j) => (
                    <div key={j} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.6rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                      <span style={{ width: 5, height: 5, backgroundColor: "var(--sage)", flexShrink: 0, marginTop: "0.4rem" }} />
                      <span style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
              <div style={{ maxWidth: 480 }}>
                <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1rem" }}>Not sure where to start?</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.75 }}>
                  The initial call is complimentary. Tell me what's going on and I'll tell you honestly what makes the most sense.
                </p>
              </div>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Schedule a Call</Link>
                <Link href="/pricing" className="btn btn-outline-light">See Pricing</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
