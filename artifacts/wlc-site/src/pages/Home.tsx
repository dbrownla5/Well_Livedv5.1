import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";
import { hero } from "@/content/brand";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
}

export default function Home() {
  usePageMeta({
    title: "The Well Lived Citizen — Professional Problem Solver for Modern Life · Los Angeles",
    description: "One person for the move, the resale, the storage unit, and the other thing currently ruining your week. Home resets, house calls, legacy inventory, and curated resale in greater Los Angeles.",
    path: "/",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "9rem 0 5rem" }}>
        <div className="container" style={{ width: "100%" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>

            {/* Left — headline */}
            <div>
              <span className="eyebrow eyebrow-light" style={{ marginBottom: "2rem" }}>The Well Lived Citizen · Los Angeles</span>
              <h1 style={{
                color: "var(--parchment)",
                fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                marginBottom: "2rem",
              }}>
                {hero.headline}
              </h1>
              <p style={{
                fontSize: "clamp(0.95rem, 1.8vw, 1.15rem)",
                fontWeight: 300,
                color: "rgba(248,244,227,0.65)",
                lineHeight: 1.75,
                marginBottom: "2.5rem",
                maxWidth: 540,
              }}>
                {hero.subhead}
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Schedule a Call</Link>
                <Link href="/services" className="btn btn-outline-light">See All Services</Link>
              </div>
            </div>

            {/* Right — service manifest */}
            <div style={{ borderLeft: "1px solid rgba(248,244,227,0.12)", paddingLeft: "3rem" }}>
              {[
                { num: "01", name: "Home Reset & Move Support", price: "$495 flat · $150/hr ongoing", href: "/home-reset-move-support" },
                { num: "02", name: "Legacy Planning & Inventory", price: "Scoped after walkthrough", href: "/legacy-planning" },
                { num: "03", name: "House Calls", price: "$175/hr · 2-hr minimum", href: "/house-calls-pillar" },
                { num: "04", name: "Curated Resale & Consignment", price: "Commission-based · free pickup", href: "/curated-resale-consignment" },
              ].map((s, i) => (
                <Link key={i} href={s.href} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "1.5rem 0", borderBottom: "1px solid rgba(248,244,227,0.08)",
                    transition: "opacity 0.15s ease", cursor: "pointer",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                  >
                    <div>
                      <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.35rem" }}>{s.num}</p>
                      <p style={{ fontSize: "1rem", fontWeight: 600, color: "var(--parchment)", marginBottom: "0.25rem" }}>{s.name}</p>
                      <p style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(248,244,227,0.45)" }}>{s.price}</p>
                    </div>
                    <span style={{ color: "var(--sage)", fontSize: "1rem", flexShrink: 0, marginLeft: "1rem" }}>→</span>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── IF ANY OF THESE RESONATE ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6.5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              <span className="eyebrow eyebrow-sage">If any of these sound familiar</span>
              <h2 className="display-md" style={{ color: "var(--ink)", maxWidth: 600, marginBottom: "2.5rem", marginTop: "0.5rem" }}>
                You don't need a name for it. You just want it handled.
              </h2>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.5rem", display: "grid", gap: "1px", backgroundColor: "var(--warm-gray-lt)", border: "1px solid var(--warm-gray-lt)" }}>
                {[
                  "The new phone, laptop, or TV that came in the box and never got set up.",
                  "The room that became a staging area and just… stayed that way.",
                  "The closet full of good things you keep meaning to sell.",
                  "The move that technically happened, but never fully landed.",
                  "The pile of stuff that needs to go somewhere — thoughtfully, not in a panic.",
                  "The errands, vendors, and little fixes that keep getting pushed to next week.",
                  "The thing you could do yourself. You just… haven't.",
                ].map((line, i) => (
                  <li key={i} style={{ backgroundColor: "var(--parchment)", fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6, padding: "1rem 1.25rem" }}>
                    {line}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.85, marginBottom: "0.75rem" }}>
                If any of these resonate, you're in the right place. Most people don't need four different services and a group text — they need one capable person who sees the whole picture and gets things moving again.
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.85 }}>
                Below are three easy ways to start right now. The deeper, project-level work is in Core Services further down. ↓
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── START HERE ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Start here</span>
            <h2 className="display-md" style={{ color: "var(--ink)", maxWidth: 600, marginBottom: "0.75rem" }}>Three things I can take off your plate this week.</h2>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--sage-dark)", maxWidth: 640, lineHeight: 1.85, marginBottom: "3.5rem" }}>
              Not every job is a whole project. Pick one. Booked and handled, usually within a few days.
            </p>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5px", backgroundColor: "var(--warm-gray-lt)" }}>
            <FadeUp delay={0}>
              <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem", height: "100%" }}>
                <div className="underlay-tag underlay-tag-sage" style={{ marginBottom: "1.5rem" }}>01 — The Reset</div>
                <h3 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1rem" }}>The 4-Hour Reset</h3>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "2rem" }}>
                  One space, four hours, done. The closet you stop opening. The kitchen drawer everyone gave up on. The room that became a staging area eighteen months ago. I show up with a plan and leave it functional.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/the-reset" className="btn btn-ink">Book a Reset</Link>
                  <span style={{ fontSize: "0.8rem", color: "var(--sage-dark)", fontWeight: 500 }}>$495 flat rate</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={60}>
              <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem", height: "100%" }}>
                <div className="underlay-tag" style={{ marginBottom: "1.5rem" }}>02 — House Calls</div>
                <h3 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1rem" }}>The 2-Hour House Call</h3>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "2rem" }}>
                  The short list of things that keep getting pushed: the smoke detector, the printer that hates everyone, the donation pile, the vendor who needs to be let in. Two-hour minimum, hourly after that.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/house-calls" className="btn btn-ink">Book a House Call</Link>
                  <span style={{ fontSize: "0.8rem", color: "var(--sage-dark)", fontWeight: 500 }}>$175/hr · 2-hr min</span>
                </div>
              </div>
            </FadeUp>

            <FadeUp delay={120}>
              <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem", height: "100%" }}>
                <div className="underlay-tag" style={{ marginBottom: "1.5rem" }}>03 — Curated Resale</div>
                <h3 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1rem" }}>Fast Bag Fill</h3>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "2rem" }}>
                  Fill a bag with clothing and accessories you're done with. I pick up, evaluate, route to the platform where the right buyer is, and list. You stop tripping over it. Free pickup in LA.
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/fast-bag-fill" className="btn btn-ink">Schedule a Pickup</Link>
                  <span style={{ fontSize: "0.8rem", color: "var(--sage-dark)", fontWeight: 500 }}>Commission-based</span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── HOUSE CALLS PITCH ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
            <FadeUp>
              <span className="eyebrow eyebrow-sage">House Calls</span>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.25rem", lineHeight: 1.15 }}>
                The list you keep meaning to get to.
              </h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.72)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                The technology that stopped working. The safety items that have been on the list for months. The room that's slowly become harder to move through. The vendor who needs supervising. The donation drop nobody's making.
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.72)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Not crisis. Not caregiving. Just the practical, unglamorous work of keeping a household running — handled by someone who actually likes figuring it out.
              </p>
              <Link href="/house-calls" className="btn btn-sage">Learn About House Calls</Link>
            </FadeUp>
            <FadeUp delay={100}>
              <div style={{ backgroundColor: "var(--sage)", padding: "3rem", boxShadow: "6px 6px 0px rgba(248,244,227,0.15)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.55, marginBottom: "1.5rem" }}>Client · House Calls</p>
                <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                  "I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. My clothes are arranged by item and color, my purses on two long shelves and two short ones — I can see what I have and choose accordingly. My shoes are on four shelves where I can easily see them. The heat is set perfectly. The TV is set up with only one clicker to get to all the channels I want. Thank you for making life easier for me."
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", opacity: 0.6, letterSpacing: "0.08em" }}>— Gayle Williams · Seattle Client</p>
                <div style={{ borderTop: "1px solid rgba(56,48,46,0.2)", paddingTop: "1.5rem", marginTop: "2rem" }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.65, marginBottom: "1rem" }}>
                    A House Call might include
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    {["Technology setup & troubleshooting", "Home safety updates", "Reorganizing for easier access", "Resale & donation preparation", "Remote family check-ins", "Post-move settling"].map(item => (
                      <li key={item} style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--ink)", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                        <span style={{ color: "var(--ink)", opacity: 0.4, flexShrink: 0, marginTop: "0.15rem" }}>—</span>{item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Four Pillars</span>
            <h2 className="display-md" style={{ color: "var(--ink)", maxWidth: 520, marginBottom: "1rem" }}>One person.</h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", maxWidth: 600, lineHeight: 1.8, marginBottom: "3.5rem" }}>
              The work splits cleanly into four categories. Most clients use two or three of them at once.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
            {[
              { num: "01", name: "Home Reset & Move Support", desc: "Organization, unpacking, room functionality, post-move setup. The 4-Hour Reset lives here. Ongoing support billed hourly when projects run longer.", href: "/home-reset-move-support" },
              { num: "02", name: "Legacy Planning & Inventory Catalog", desc: "Inventory and documentation of the belongings and stories families don't want to lose track of — before a move, a downsize, or a transition forces the decisions in a hurry.", href: "/legacy-planning" },
              { num: "03", name: "House Calls", desc: "Hourly household support for busy professionals, independent older adults, and families managing a parent's home from a distance. The 2-Hour House Call lives here.", href: "/house-calls-pillar" },
              { num: "04", name: "Curated Resale & Consignment", desc: "Drop off or schedule a pickup. I sort, evaluate, route, list, and ship. You recover value from things you no longer want to manage. The Fast Bag Fill lives here.", href: "/curated-resale-consignment" },
            ].map((s, i) => (
              <FadeUp key={s.num} delay={i * 40}>
                <Link href={s.href}>
                  <div style={{
                    backgroundColor: "var(--parchment)", padding: "2rem 2.5rem",
                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem",
                    transition: "background-color 0.18s ease", cursor: "pointer",
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment-mid)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment)"}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem" }}>
                      <span className="service-num" style={{ paddingTop: "0.2rem", flexShrink: 0 }}>{s.num}</span>
                      <div>
                        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.35rem" }}>{s.name}</h3>
                        <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.65, maxWidth: 480 }}>{s.desc}</p>
                      </div>
                    </div>
                    <span style={{ color: "var(--sage)", fontSize: "1.2rem", fontWeight: 300, flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={200}>
            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
              <Link href="/services" className="btn btn-outline-ink">All Services</Link>
              <Link href="/pricing" className="btn btn-outline-ink">Pricing</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
            <FadeUp>
              <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>Dayna Brown · Founder</span>
              <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1.25rem", lineHeight: 1.2 }}>
                15+ years in retail and operations. My whole career was about knowing where things go.
              </h2>
              <Link href="/about" className="btn btn-ink">About Dayna</Link>
            </FadeUp>
            <FadeUp delay={80}>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.85, opacity: 0.85 }}>
                I built this because there's a category of help nobody offers cleanly — too specific for a big company, too complex for a quick hire. The closet that needs editing, the parent who needs someone local to actually show up, the inherited furniture nobody knows what to do with. One person who can be all of it.
              </p>
            </FadeUp>
            <FadeUp delay={140}>
              <img
                src="/assets/dayna-headshot-portrait.jpg"
                alt="Dayna Brown, Founder"
                style={{
                  width: "100%",
                  maxWidth: 420,
                  aspectRatio: "3 / 4",
                  objectFit: "cover",
                  objectPosition: "top center",
                  borderRadius: 0,
                  display: "block",
                }}
              />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
              <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Ready to start?</span>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.25rem" }}>
                Tell me what's been quietly weighing on you.
              </h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                I'll take it from there.
              </p>
              <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
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
