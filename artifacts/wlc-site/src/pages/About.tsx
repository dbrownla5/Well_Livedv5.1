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

export default function About() {
  usePageMeta({
    title: "About Dayna Brown — Founder of The Well Lived Citizen",
    description: "Dayna Brown's background is operations, logistics, and real-world problem solving. The Well Lived Citizen helps people get the operational side of life handled with competence and follow-through.",
    path: "/about",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow eyebrow-light">Meet Dayna</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "2rem" }}>
              Most people don't need another service. They need another capable person.
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.72)", lineHeight: 1.85 }}>
              I'm Dayna. I handle the operational side of life — the moves, the resale, the storage units, the household tech, the piles that quietly became a project. My job is to see the whole picture and start untangling what's actually stuck.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUNDER NARRATIVE ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "7rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "6rem", alignItems: "start" }}>

            <FadeUp>
              <div>
                <span className="eyebrow eyebrow-sage">Dayna Brown · Founder</span>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  My background was never "home organization." Before this, there was <strong>The Well Dressed Citizen</strong> — my styling company — and before that, men's suiting and fashion, starting young, at Nordstrom. Fashion, resale, and selling, built into years of executive operations: running warehouses, supporting leadership, and spotting the risk before it became the problem.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  The same instinct ran through all of it — seeing where things were about to break, and quietly handling them before they did. I was always the one building teams that actually cared how the customer was treated, the way Nordstrom used to.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  The Well Lived Citizen is the grown-up version of that same eye, pointed at people's homes and lives instead of companies — the moves, the belongings, the resale decisions, the storage units, the unfinished projects, the technology, the vendor coordination, and the small logistical realities that quietly decide how a home runs.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  Sometimes that means organizing a room. Sometimes it means deciding what's actually worth reselling. Sometimes it means helping an adult child handle things for a parent three states away.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  The thread is always the same: getting it handled, with follow-through and good judgment. Because most of the time, what people need isn't a fancy service or a generic organizer.
                </p>

                <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink)", borderLeft: "3px solid var(--sage)", paddingLeft: "1.25rem", lineHeight: 1.5, marginTop: "2.5rem", marginBottom: "0.5rem" }}>
                  They need another capable person.
                </p>
                <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--ink)", opacity: 0.55, paddingLeft: "1.55rem", letterSpacing: "0.08em" }}>
                  — Dayna Brown, Founder
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
                <img
                  src="/assets/dayna-headshot-primary.jpg"
                  alt="Dayna Brown, Founder of The Well Lived Citizen"
                  style={{
                    width: "100%",
                    maxWidth: 480,
                    aspectRatio: "1 / 1",
                    objectFit: "cover",
                    borderRadius: 0,
                    display: "block",
                  }}
                />
              <div style={{ backgroundColor: "var(--parchment-mid)", padding: "3rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.5rem" }}>
                  At a Glance
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    "Operations background — retail, warehousing, executive support",
                    "Active resale across Poshmark (Ambassador), eBay, Vestiaire, Chairish, Grailed, and more",
                    "Studio set up for intake, staging, photography, and fulfillment",
                    "Home organization, move support, vendor coordination",
                    "Based in Los Angeles · Serving greater LA",
                    "By appointment only",
                  ].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", paddingBottom: "0.75rem", borderBottom: i < 5 ? "1px solid var(--warm-gray-lt)" : "none" }}>
                      <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: "0.2rem", fontSize: "0.7rem" }}>—</span>
                      <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: "var(--ink)", padding: "2.5rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "1.25rem" }}>
                  The Unofficial Bio
                </p>
                <p style={{ fontSize: "0.98rem", fontWeight: 300, color: "rgba(248,244,227,0.82)", lineHeight: 1.75, marginBottom: "1rem" }}>
                  Chaos wrangler. Professional problem-solver. Unofficial founder of <em>there's an easier way to do that</em> — for your home, your life, and finding your good pajamas faster.
                </p>
                <p style={{ fontSize: "0.98rem", fontWeight: 300, color: "rgba(248,244,227,0.62)", lineHeight: 1.75 }}>
                  The long version is above. The short version: I'm the person you call when something should be simpler than it's quietly become.
                </p>
              </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── THE MARK (heritage logo, shown at full detail) ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <span className="eyebrow eyebrow-sage">The Mark · Est. 2020</span>
              <img
                src="/assets/wlc-hanger-logo-nobg.png"
                alt="Well Lived Citizen — the hanger mark. A Well Dressed Citizen Company, Est. 2020."
                style={{ width: "min(420px, 86vw)", height: "auto", display: "block", margin: "1.5rem 0 2rem" }}
              />
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, maxWidth: 560 }}>
                The hanger came first. <strong style={{ fontWeight: 600, color: "var(--ink)" }}>The Well Dressed Citizen</strong> — suiting, styling, resale — is where the eye was trained. The Well Lived Citizen is the same eye, pointed at the rest of life.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE FLOOD ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <span className="eyebrow eyebrow-light">What changed how I work</span>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "2.5rem" }}>
                Then it was my house in pieces.
              </h2>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                A few years ago, a flood took most of mine. Months moving through thirteen temporary places, sorting what survived from what didn't — a lot of it irreplaceable. I'm about as self-sufficient as people come, and even I couldn't hold all of it at once.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "3rem" }}>
                Someone stepped in. On paper, a home organizer.* What she actually did was make the decisions I was too depleted to make and handle logistics I'd normally solve in my sleep. Not therapy. Not hand-holding. A capable person taking real weight off the pile. That's the day I understood what this work is — and it's the bar I hold myself to now.
              </p>
              <p style={{ fontSize: "0.72rem", fontWeight: 400, color: "rgba(248,244,227,0.38)", lineHeight: 1.7, letterSpacing: "0.04em" }}>
                * Rachel Corwin · Spruce · Seattle, Washington
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE NEIGHBOR ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "center" }}>
              <div>
                <span className="eyebrow eyebrow-sage">Why This Exists</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>
                  Everyone deserves to have that person.
                </h2>
                <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                  A woman who once lived across the hall from me began as someone I simply greeted in passing. Over time, she became a close friend. She is one of the most independent, self-sufficient, quietly powerful women I have ever known.
                </p>
                <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                  At 84, after hip surgery and countless chapters of life behind her, she kept moving forward — not because life had become easy, but because she met it with fullness, curiosity, and grace. I found myself setting up new televisions. Making smart-home systems work. Adjusting thermostats. Quietly removing the small frictions so her days stayed comfortable and her independence stayed hers.
                </p>
                <p className="body-lg">
                  What stayed with me was not that she needed anyone. It was the realization that everyone deserves to have that person. The one who knows what to do. The one who steps in before inconvenience becomes overwhelm. Because not everyone has the network. Not everyone knows who to call.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
                {[
                  { label: "Your call", text: "You get to make decisions about your own things, on your own terms, without someone else's urgency rushing you." },
                  { label: "The story stays", text: "The things people have lived with carry meaning. That meaning deserves to be captured, not lost because nobody had time." },
                  { label: "Small things add up", text: "The smoke detector, the unreachable shelf, the tech that stopped working — they're not a big deal until they are." },
                  { label: "No crisis required", text: "Good support shouldn't have to wait for a bad moment. The best time to get ahead of things is before you need to." },
                ].map((item, i) => (
                  <div key={i} style={{ backgroundColor: "var(--parchment)", padding: "1.5rem 2rem" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{item.label}</p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7 }}>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHAT THIS IS / IS NOT ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow eyebrow-sage">What This Is Not</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                  {["Caregiving", "Medical advice", "Financial advice", "Therapy", "Cleaning", "Handyman work", "Estate law", "Forced minimalism", "The KonMari method"].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                      <span style={{ width: 6, height: 6, backgroundColor: "var(--warm-gray-md)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="eyebrow eyebrow-sage">What This Is</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "1rem" }}>
                  {[
                    "A consistent presence",
                    "Actually taking care of it",
                    "Seeing things before they become a problem",
                    "A home that works",
                    "Getting things done efficiently",
                    "Reading a room and a person",
                    "An eye for what sells and where",
                    "Seeing the whole picture",
                    "One person, not a company",
                  ].map((item) => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.6rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                      <span style={{ width: 6, height: 6, backgroundColor: "var(--sage)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--ink)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THESIS ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 680 }}>
              <p style={{ fontSize: "clamp(1.3rem, 3vw, 2rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, marginBottom: "2rem" }}>
                "Competence doesn't cancel out the need to be cared for."
              </p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", opacity: 0.75, lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Most of my clients are capable people. The operational side of life just got heavier than the time they had for it — and someone competent stepping in is the whole relief.
              </p>
              <Link href="/contact" className="btn btn-ink">Schedule a Call</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
