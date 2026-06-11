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
              I have always been drawn to the life that lives inside people's most treasured possessions.
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.72)", lineHeight: 1.85 }}>
              The objects around which identity is formed — whether subtly or boldly. A jacket is never just clothing when it carries the memory of the woman who wore it. A record is never just vinyl when it still holds the rebellion and the moment that brought it into the world. A closed closet door is never simply storage when it still tells the story of a marriage, a career, a season of confidence.
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
                  My background wasn't in "home organization." It was in learning how entire systems function — from warehouse operations and product development to executive support, client services, logistics, and real-world problem solving.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  Over time, I realized the same skill kept showing up across every role: seeing where friction exists before it becomes a bigger problem, and figuring out how to make things work more smoothly in practical, grounded ways.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  The Well Lived Citizen grew out of that instinct. I help people navigate the operational side of life — the moves, belongings, resale decisions, storage units, unfinished projects, technology issues, vendor coordination, household resets, and all the small logistical realities that quietly shape how a home functions day to day.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  Sometimes that means organizing a room. Sometimes it means coordinating a move. Sometimes it means evaluating what's worth reselling. Sometimes it means helping an adult child manage things for a parent from another state.
                </p>

                <p className="body-lg" style={{ marginBottom: "2rem" }}>
                  The common thread is simple: helping people get things handled with competence, follow-through, and good judgment. Because often, what people actually need isn't a fancy service or a generic organizer.
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
                    "15+ years in retail operations and logistics",
                    "Resale active on 10+ platforms — Poshmark Ambassador, eBay, Vestiaire, Chairish, Grailed, and more",
                    "Apartment set up for intake, staging, photography, and fulfillment",
                    "Home organization, move support, vendor coordination",
                    "Based in Los Angeles · Serving greater LA",
                    "Est. 2020 · By appointment only",
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

      {/* ── THE FLOOD ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <span className="eyebrow eyebrow-light">How This Work Changed</span>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "2.5rem" }}>
                When it was my life in pieces.
              </h2>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                A few years ago, an unforeseen flood ran me through 13 temporary homes and Airbnbs in a short stretch of time. A lot of what I owned was damaged or lost — including things that couldn't be replaced.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                I'd spent my whole career being the capable one in the room. What that taught me is that being capable doesn't make you immune. Anyone can reach the point where there's no room left to think clearly about their own situation — not because they've lost the skill, but because they're carrying too much at once to use it.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                During that stretch I worked with someone who, on paper, would be called a home organizer.* What she actually did was step into the parts I couldn't get to — the decisions I was too depleted to make, the logistics I'd normally have handled in my sleep — and start moving them. She wasn't organizing. She was the reason things started working again.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "3rem" }}>
                That's the standard I built this around. Knowing where things go is the easy part. Being the person who can walk into someone else's stuck situation, take in the whole picture, and quietly get it moving — that's the actual work.
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
                "Someone is finally paying attention to the things that quietly matter."
              </p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", opacity: 0.75, lineHeight: 1.8, marginBottom: "2.5rem" }}>
                The work is never really about the object. It is about protecting the life it represents.
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
