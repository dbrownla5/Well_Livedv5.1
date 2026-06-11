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

/**
 * Dayna's REAL résumé — from her prior build, with the two previously-cropped
 * items now filled from her own experience PDF (DAYNABROWN_EXPERIENCE_V_2):
 *   - Nordstrom: Retail Division Manager, Full Line & Rack, LA · 2011–2014.
 *   - "Background" opener: tenure grounded in her real dates (2011–2025).
 * Never embellish, round up, or invent any of this.
 */
const COMPANIES: { name: string; role: string; brands?: string }[] = [
  { name: "SVP Worldwide", role: "Regional Retail Director, West & Central · 2023–2025", brands: "Singer, Husqvarna Viking, PFAFF" },
  { name: "evo", role: "Senior Regional Director, Pacific Northwest · 2020–2023" },
  { name: "The Collected Group", role: "Regional Brand Director, Southern California · 2016–2020", brands: "Joie, Equipment, Current/Elliott" },
  { name: "BCBG Max Azria Group", role: "District Manager, Los Angeles · 2016–2018" },
  { name: "Bonobos", role: "Guideshop Management, Southern California · 2014–2016" },
  { name: "Nordstrom", role: "Retail Division Manager, Full Line & Rack, Los Angeles · 2011–2014" },
];

const HIGHLIGHTS: { label: string; body: string }[] = [
  { label: "Patent", body: "Invented and patented an outdoor retail solution prototype during my time at evo." },
  { label: "Well Dressed Citizen LLC", body: "Founder & Principal, 2020–present. Parent LLC of The Well Lived Citizen." },
  { label: "MAGIC Las Vegas", body: "Keynote Speaker, 2023. The largest apparel and fashion trade show in the US." },
  { label: "Podcast", body: "Featured Guest on Retail in America with Ron Thurston — NRF speaker and bestselling author of Retail Pride." },
];

export default function About() {
  usePageMeta({
    title: "About Dayna Brown — The Well Lived Citizen",
    description: "Dayna Brown, founder of The Well Lived Citizen. A career leading retail operations for national brands, now bringing that operational eye — and a reverence for story and belonging — to people's homes and lives in Los Angeles.",
    path: "/about",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 820 }}>
            <span className="eyebrow eyebrow-light">Meet Dayna</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", margin: 0 }}>
              Competence does not eliminate the need to be cared for.
            </h1>
          </div>
        </div>
      </section>

      {/* ── FOUNDER · BACKGROUND · RÉSUMÉ ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4.5rem", alignItems: "start" }}>

            <FadeUp>
              <img
                src="/assets/dayna-headshot-primary.jpg"
                alt="Dayna Brown, Founder of The Well Lived Citizen"
                style={{ width: "100%", maxWidth: 380, aspectRatio: "4 / 5", objectFit: "cover", display: "block", marginBottom: "1.5rem" }}
              />
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.25rem" }}>Dayna Brown</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.5, marginBottom: "2.25rem" }}>
                Founder, The Well Lived Citizen<br />Los Angeles, CA
              </p>

              <div style={{ borderLeft: "3px solid var(--sage)", paddingLeft: "1.5rem" }}>
                <p className="eyebrow eyebrow-sage" style={{ marginBottom: "1rem" }}>Background</p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  More than a decade leading large-scale operations, teams, and transformation initiatives for national brands — designing systems that solve invisible friction before it becomes visible failure.
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  That same philosophy now lives inside The Well Lived Citizen.
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8 }}>
                  I bring together executive-level operational thinking, emotional discernment, resale and recoverable-value expertise, and a deep reverence for story, memory, and belonging.
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={80}>
              <p className="eyebrow eyebrow-sage" style={{ marginBottom: "1.25rem" }}>Companies</p>
              <div style={{ marginBottom: "2.5rem" }}>
                {COMPANIES.map((c, i) => (
                  <div key={i} style={{ padding: "1rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                    <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: c.role ? "0.2rem" : 0 }}>{c.name}</p>
                    {c.role && <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.5 }}>{c.role}</p>}
                    {c.brands && <p style={{ fontSize: "0.8rem", fontWeight: 300, color: "var(--sage-dark)", marginTop: "0.15rem" }}>{c.brands}</p>}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {HIGHLIGHTS.map((h, i) => (
                  <div key={i} style={{ backgroundColor: "var(--parchment-mid)", borderLeft: "3px solid var(--sage)", padding: "1.25rem 1.5rem" }}>
                    <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem" }}>{h.label}</p>
                    <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>{h.body}</p>
                  </div>
                ))}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── THE HEART OF THE WORK ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                I have always been drawn to the life that lives inside people's most treasured possessions — the objects around which identity is formed, whether subtly or boldly.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                A jacket is never just clothing when it carries the memory of the woman who wore it and the nights she spent wrapped in it beside the love of her life.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                A record is never just vinyl when it still holds the rebellion, risk, and moment that brought it into the world — an era in which music helped bring authority to its knees.
              </p>
              <p className="body-lg" style={{ marginBottom: "2rem" }}>
                Creating the time, space, and experience for people to discover the belongings that will become part of their own story has always felt deeply important to me.
              </p>
              <p style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, marginBottom: "2.5rem" }}>
                That is the heart of this work.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                I do not believe people simply need help getting rid of things. I believe they need help understanding what those things mean, what they are worth, what they still have left to do, and where the next chapter of those belongings belongs.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                Sometimes that means preserving. Sometimes it means cataloging, resale, or making sure a family story does not disappear into a donation pile.
              </p>
              <p className="body-lg" style={{ fontWeight: 500, color: "var(--ink)" }}>
                The work is never really about the object. It is about protecting the life it represents.
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
              {[
                "I came to understand the full weight of that truth in an entirely different way over the last year. After an unforeseen flood, I found myself moving through 13 temporary homes and Airbnbs, carrying only fragments of the life I thought I would always recognize.",
                "Years of belongings, valuables, and deeply personal objects were damaged or lost — many of them irreplaceable.",
                "What surprised me most was not only the grief of the loss itself, but the disorientation of living without the things that quietly reflect you back to yourself each day.",
                "When it was my life, my loss, my dog beside me in a storage unit, and no clear sense yet of what the next version of home would be, I came face to face with something essential.",
                "During that season, I was introduced to someone who, on paper, might have simply been called a home organizer. But what she offered was something far deeper. She stepped into the moments I couldn't hold alone.",
              ].map((p, i) => (
                <p key={i} style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.78)", lineHeight: 1.85, marginBottom: "1.75rem" }}>
                  {p}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LIVING SYSTEMS · CLOSE ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                That experience changed the way I understand this work. Because when it is your own life in pieces, even the most capable person can lose access to their usual clarity. And in those moments, what matters most is not simply having someone who knows where things go. It is having someone who can step into the emotional and operational weight of it and quietly help carry it with you.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                I do not see homes as projects. I see them as living systems shaped by identity, family, safety, and change.
              </p>
              <p className="body-lg" style={{ marginBottom: "2.5rem" }}>
                My role is to step into complexity with calm, create clarity around belongings, preserve what matters, recover hidden value, and build elegant systems that help people move forward without losing the story of how they got here.
              </p>
              <p style={{ fontSize: "clamp(1.3rem, 2.6vw, 1.85rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, marginBottom: "2.5rem" }}>
                At the core, I believe the most meaningful work is helping people feel truly taken care of. That is what this business was built to do.
              </p>
              <Link href="/contact" className="btn btn-ink">Get in Touch</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
