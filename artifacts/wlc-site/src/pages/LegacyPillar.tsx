import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";
import { pricing } from "@/content/brand";

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

/** Content restored verbatim from Dayna's prior build. The Legacy 10-Hour Flex
 *  Block price (cut off in the screenshot) is taken from the canonical
 *  SERVICES-PRICING doc ($1,500), not invented. */
const WHO = [
  "The divorced mom who moved into a condo and suddenly had to see, for the first time, how much had actually been accumulated over a marriage — and had to agree to how it all gets split",
  "The person who lived in the same apartment for ten years and had no idea how much had quietly gathered in the back of every closet",
  "The career change that revealed a hundred film-industry cords, gear, and references for a life that isn't the current one anymore",
  "The person who wants to decide what stays, what moves on, and what gets remembered — while they are the one making the decisions",
];

const LAYER = [
  "The drawers",
  "The backup bedding",
  "The linen closets stacked with care",
  "The vintage pieces with story",
  "The everyday things with future value",
  "The candles tucked away because the house was always tidy enough",
  "The designer pieces in sizes the family doesn't share",
];

const OUTPUTS = [
  "Digital inventory", "Photo documentation",
  "Room-by-room item notes", "Family distribution references",
  "Sentiment and story preservation", "Resale-ready routing notes",
  "Donation pathways", "Second-home and storage references",
  "Transition roadmap", "Printable copies",
  "Bound family binders", "Duplicate family copies",
  "Digital or web-based workflows",
];

const PRICING = [
  { label: "10-Hour Flex Block", value: pricing.legacyFlex10h },
  { label: "25-Hour Flex Block", value: pricing.legacyFlex25h },
  { label: "Legacy Project", value: "From $3,500 / 20–30 hrs" },
  { label: "Whole home", value: pricing.legacyWholeHome },
  { label: "Ongoing Continuity", value: pricing.retainerFrom },
];

export default function LegacyPillar() {
  usePageMeta({
    title: "Legacy Planning & Inventory Catalog | The Well Lived Citizen",
    description: "Clarity without fear — the operational side of a home, made visible again. Inventory, photo documentation, story preservation, and resale routing before urgency forces the decisions. Los Angeles.",
    path: "/legacy-planning",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow eyebrow-light">02 · Legacy Planning &amp; Inventory Catalog</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.25rem" }}>Clarity without fear.</h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8 }}>
              The operational side of a home, made visible again.
            </p>
          </div>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                This is for the part of life most people don't realize has been quietly building for years — the things inside a home that became part of how life worked, long before anyone stopped to look at them.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5, marginBottom: "0.4rem" }}>It is not estate planning.</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5, marginBottom: "0.4rem" }}>It is not asset planning.</p>
              <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5, marginBottom: "1.5rem" }}>It is planning the actual pieces of a life.</p>
              <p className="body-lg">
                Not the will, not the paperwork, not the part a lawyer handles. The part that lives inside the walls.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 820 }}>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Who this is for</h2>
              <p className="body-lg" style={{ marginBottom: "2.5rem", maxWidth: 680 }}>
                The operational side of a home shows up for almost everyone, eventually. Sometimes it's a life change. Sometimes it's a move. Sometimes it's a quiet morning where the drawers, closets, and storage spaces stop matching the person living there.
              </p>
              {WHO.map((item, i) => (
                <div key={i} style={{ padding: "1.25rem 0", borderBottom: "1px solid var(--warm-gray-lt)", display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: "0.15rem", fontWeight: 700 }}>—</span>
                  <span style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE CHINA STORY ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <div style={{ borderLeft: "3px solid var(--sage)", paddingLeft: "1.75rem", marginBottom: "2.5rem" }}>
                <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                  It's a holiday dinner, looking at china that hasn't been used in years. You wonder if it ever will, knowing three plates are missing, broken in memorable moments over lifetimes. What happens to a set of china passed down two generations, incomplete but once made a new couple feel whole? It can't be worthless, but can't be sold incomplete. Your kids live in small apartments and said, "That's sweet, but we can't take it." So, what happens to something you thought would be with your family forever?
                </p>
                <p className="body-lg" style={{ margin: 0 }}>
                  I help. I look at everything in your home — practical, sentimental, and holding memories — and I listen to them, for as long or as little as you want to tell me their stories. We'll find a way to ensure the things you felt were special — incomplete and all — make it to hands that collect, treasure, and find value in them, sharing in the story a little longer.
                </p>
              </div>
              <p style={{ fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.35 }}>
                This service is the person who can see what is actually there.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHAT THIS WORK ACTUALLY IS ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "0.75rem" }}>What this work actually is</h2>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.6)", marginBottom: "2.5rem", maxWidth: 620 }}>
              The operational side of a home is the layer that quietly adds up over time:
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "0.5rem 3rem", maxWidth: 860 }}>
              {LAYER.map((item, i) => (
                <div key={i} style={{ padding: "0.85rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)", fontSize: "0.98rem", fontWeight: 300, color: "rgba(248,244,227,0.8)" }}>
                  {item}
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POSSIBLE OUTPUTS ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Possible outputs include</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", backgroundColor: "var(--warm-gray-lt)", marginTop: "1.25rem" }}>
              {OUTPUTS.map((item, i) => (
                <div key={i} style={{ backgroundColor: "var(--parchment)", padding: "1.1rem 1.5rem", fontSize: "0.9rem", fontWeight: 400, color: "var(--ink)" }}>
                  {item}
                </div>
              ))}
            </div>
            <p className="body-lg" style={{ marginTop: "2.5rem", maxWidth: 740 }}>
              When a piece has a story worth keeping with it, that history is documented too. That is the quiet bridge between Legacy Planning and resale. Items identified for sale during catalog work can route directly into <Link href="/resale-consignment" style={{ color: "var(--sage-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Resale &amp; Consignment</Link> without restarting the process — and when story matters, the story travels with them.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── TIMELINES + PRICING ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.25rem" }}>How project timelines work</h2>
              <p className="body-lg" style={{ marginBottom: "3rem" }}>
                Larger projects are completed across focused work sessions over a shared timeline, rather than continuous daily presence. A two-week catalog may look like three focused 11–4 sessions, with off-site documentation, resale routing, and continuity work completed between visits.
              </p>

              <span className="eyebrow eyebrow-sage">Pricing</span>
              <div style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}>
                {PRICING.map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5rem", padding: "1.25rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)" }}>{row.label}</span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
                Larger estates quoted after walkthrough only — no fixed tier. Flex blocks never expire.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-ink">Book Your Time</Link>
                <Link href="/services" className="btn btn-outline-ink">← All Services</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
