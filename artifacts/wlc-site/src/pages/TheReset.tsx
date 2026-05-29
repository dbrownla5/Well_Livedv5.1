import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";
import FAQItem from "@/components/FAQItem";

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

export default function TheReset() {
  usePageMeta({
    title: "The 4-Hour Reset — $495 Flat | The Well Lived Citizen",
    description: "Four focused hours in the one space you keep meaning to fix. One flat rate. No hourly creep. Sorting, editing, placement, and routing — done in a single working session.",
    path: "/the-reset",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.4)" }}>Service 01</span>
            <div style={{ display: "inline-block", backgroundColor: "var(--sage)", padding: "0.3rem 0.8rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)" }}>Quick Book</span>
            </div>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>The 4-Hour Reset</h1>
            <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              There's a space in your home that's been silently accumulating pressure for longer than you want to admit. The closet that's quietly defeating you. The office that requires excavation every morning. The guest room that hasn't been a guest room in two years. The kitchen junk drawer that became a philosophy.
            </p>
            <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              The Reset is a focused, uninterrupted four-hour working session for exactly that space. One space, four hours, real results. I arrive prepared. I start immediately. I work until it's done.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-sage">Book a Reset</Link>
              <Link href="/pricing" className="btn btn-outline-light">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">How It Works</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "3rem", maxWidth: 440 }}>
              Simple to book. Real results when I leave.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "0" }}>
            {[
              { step: "01", title: "Tell me the space", body: "When you reach out, tell me what space you're working with and what's been happening there. A two-sentence description is enough — I'll ask any follow-up questions before I arrive." },
              { step: "02", title: "I arrive prepared", body: "I do any pre-planning on my own time. When I arrive, I'm ready to work — not to assess, consult, or discuss at length. I get oriented in the first few minutes and start immediately." },
              { step: "03", title: "Stay in the room or step back", body: "You can be present or not. If you want to make the decisions, I walk you through them quickly. If you'd rather let me work, I'll send you photos and flag anything that genuinely needs your input." },
              { step: "04", title: "The space works when I leave", body: "Four hours of uninterrupted, focused work. The goal is not a magazine-ready room — it's a room that functions the way your life actually works. You should feel the difference the moment I leave." },
            ].map((step, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{
                  padding: "2.5rem",
                  borderRight: i < 3 ? "1px solid var(--warm-gray-lt)" : "none",
                  borderBottom: "3px solid var(--sage)",
                }}>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--sage)", lineHeight: 1, marginBottom: "1rem", opacity: 0.3 }}>{step.step}</p>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>{step.title}</h3>
                  <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75 }}>{step.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>What's Included</span>
            <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "3rem", maxWidth: 440 }}>Everything needed to get the space working.</h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {[
              { title: "Pre-session coordination", body: "Any planning or preparation I do before I arrive is on my time — not yours. You're paying for the session, not the prep." },
              { title: "Tools and utility hardware", body: "Measuring tape, reusable sort bins, cord wraps, Velcro, adapters, shelf liner, and basic utility hardware included." },
              { title: "Setup, installation, label systems", body: "I set it up before I leave. Labels handwritten on-site. Printed label sets available for larger scopes." },
              { title: "Layout logic and space reasoning", body: "I think about how the space works spatially. Recommendations for what the room needs — before a single bin is purchased." },
              { title: "Responsible routing", body: "Donation items sorted and ready to go. Electronics and hazardous materials handled via proper channels. I know where everything goes." },
              { title: "Honest assessment", body: "If a space needs more than four hours, I'll tell you clearly and without pressure. If it needs a different service, I'll tell you that too." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 40}>
                <div style={{ backgroundColor: "rgba(248,244,227,0.06)", border: "1px solid rgba(248,244,227,0.12)", padding: "2rem" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--parchment)", marginBottom: "0.6rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── GOOD FOR ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow eyebrow-sage">What This Is Good For</span>
                <div style={{ marginTop: "1rem" }}>
                  {["The closet that has quietly defeated you", "The home office you're avoiding", "The garage or storage unit after a move", "Post-move rooms where nothing feels settled", "The kitchen that slows every morning down", "Pre-guest-arrival panic reset", "The spare room that became a holding zone", "The bathroom cabinet that needs an edit", "Any space you've been dreading for months"].map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "center", padding: "0.65rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                      <span style={{ width: 5, height: 5, backgroundColor: "var(--sage)", flexShrink: 0 }} />
                      <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)" }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="eyebrow eyebrow-sage">Pricing</span>
                <div style={{ marginTop: "1rem" }}>
                  {[
                    { label: "Session rate", value: "$495 flat" },
                    { label: "Additional time", value: "$150/hr" },
                    { label: "Session length", value: "4 hours" },
                    { label: "Travel", value: "Included within LA" },
                    { label: "Supplies and tools", value: "Included" },
                    { label: "Cancellation", value: "48-hour notice" },
                    { label: "Payment due", value: "At time of service" },
                    { label: "Accepted methods", value: "Venmo · Zelle · Check · Card" },
                  ].map((row, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 0", borderBottom: "1px solid var(--warm-gray-lt)", fontSize: "0.9rem" }}>
                      <span style={{ fontWeight: 300, color: "var(--sage-dark)" }}>{row.label}</span>
                      <span style={{ fontWeight: 600, color: "var(--ink)" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: "0.78rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.65, marginTop: "1.25rem" }}>
                  Payment is due at the time of service. Venmo, Zelle, or check.
                </p>
                <div style={{ marginTop: "1.5rem" }}>
                  <Link href="/contact" className="btn btn-ink">Book a Reset</Link>
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Before You Book</span>
            <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "2.5rem" }}>Common questions</h2>
          </FadeUp>
          <div style={{ maxWidth: 720 }}>
            {[
              { q: "What can realistically be accomplished in four hours?", a: "More than most people expect. A focused four-hour session can get a closet, a kitchen, an office, or a single problem room back to fully functional. The key is that I'm working, not planning. I start when I arrive." },
              { q: "Do I need to be home?", a: "You can be home or not — it's genuinely up to you. Some clients prefer to be present for the decision-making; others prefer to leave and come back to a finished space. I'll confirm what works best before I arrive." },
              { q: "What if four hours isn't enough?", a: "I'm not billing by the minute. If I'm 15 minutes from something great, I finish it. If it's a full hour away, I'll have a quick conversation about what makes sense — extend at the hourly rate or schedule a follow-up." },
              { q: "What about things I can't just throw away — electronics, batteries, old medications?", a: "There's a responsible process for everything. Electronics get wiped and routed to certified e-waste. Batteries, old devices, anything that can't go in the trash — I know where it goes and how to get it there. You don't have to figure that out." },
              { q: "Can I book this for someone else?", a: "Yes. Many clients book for a parent, sibling, or friend going through a transition. I also work with people navigating difficult situations — leaving a hard place, managing a move someone else can't face. These are handled with safety and discretion. No one who reaches out is left without support." },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 600 }}>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Ready to create some momentum?</h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Book a Reset and tell me what space has been quietly weighing on you. I'll take it from there.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Book a Reset</Link>
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
