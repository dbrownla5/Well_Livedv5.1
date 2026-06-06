import { useEffect, useRef, useState } from "react";
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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-trigger" onClick={() => setOpen(!open)}>
        <span>{q}</span>
        <span style={{ fontSize: "1.2rem", fontWeight: 300, flexShrink: 0, color: "var(--sage)" }}>{open ? "−" : "+"}</span>
      </button>
      <div className="faq-content" style={{ maxHeight: open ? 500 : 0 }}>
        <div className="faq-body">{a}</div>
      </div>
    </div>
  );
}

export default function LegacyPillar() {
  usePageMeta({
    title: "Legacy Inventory & Cataloging — Pillar 02 | The Well Lived Citizen",
    description: "Inventory and cataloging for the things that quietly accumulate in a house — downsizing prep, collection documentation, and resale planning. Decided while there's still time. Los Angeles.",
    path: "/legacy-planning",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 740 }}>
            <span className="eyebrow eyebrow-light">Pillar 02</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
              Legacy Inventory<br />&amp; Cataloging
            </h1>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              The things that live quietly inside a house while a life is being lived in it.
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              The unopened candles. The linens still in plastic. The china nobody wants. The box marked important. Deciding what's kept, gifted, sold, donated, or documented — while you still have the time, the energy, and the stories to decide.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-sage">Schedule a Consultation</Link>
              <Link href="/pricing" className="btn btn-outline-light">View Pricing</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── THE FRICTION ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "start" }}>
            <FadeUp>
              <span className="eyebrow eyebrow-sage">The Friction</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>
                The drawer of unopened candles. The china nobody wants.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                Every house has them — the things too important to throw out but never urgent enough to deal with. The good linens still in their plastic. The box in the closet marked important. The collection someone spent years building. The decision that's been quietly deferred for a decade.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                None of it is important enough for a will. All of it is too important to just disappear. So it stays where it is, and the decision gets handed down — usually to whoever is left to sort through the house later, with no idea what anything is, who it came from, or what should happen to it. Unpaid archaeologists, working without the one person who could have told them.
              </p>
              <p className="body-lg">
                This isn't estate law, insurance, or appraisal. It's the work of going through those things now — deciding what's kept, gifted, sold, donated, or documented — while the person who knows the stories is still here to tell them. Some people do this proactively. Others call when a situation has already arrived. Both are the right time.
              </p>
            </FadeUp>

            <FadeUp delay={80}>
              <div style={{ backgroundColor: "var(--parchment-mid)", padding: "2.5rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.5rem" }}>What Gets Inventoried &amp; Cataloged</p>
                {[
                  "Furniture, art, and the bigger home pieces",
                  "China, crystal, silver, and the sets nobody uses",
                  "Jewelry and personal accessories",
                  "Collections, antiques, and the things with a story",
                  "Photographs, papers, and archival materials",
                  "Warranties, certificates, and home records",
                  "Sentimental things, with notes on who they came from",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.7rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                    <span style={{ width: 5, height: 5, backgroundColor: "var(--sage)", flexShrink: 0, marginTop: "0.45rem" }} />
                    <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── THE WORK ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">The Work</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "3rem", maxWidth: 500 }}>Room by room. Object by object.</h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "2rem" }}>
            {[
              { step: "01", title: "The Walkthrough", body: "We start by walking the house together. I get a sense of what's there, which rooms to start with, and which things you already have feelings about. You point, you tell me the stories, I take notes." },
              { step: "02", title: "Inventory & Cataloging", body: "The things that matter get photographed and cataloged — condition, where it came from, who it's tied to, any history you want kept. What comes out the other side is a record the family can actually use, instead of a houseful of guesses." },
              { step: "03", title: "Value & Resale Planning", body: "Anything that might be worth real money gets flagged. I work with trusted appraisers when something needs a real number, and I plan out what's worth listing for resale. I don't guess at value, and nothing leaves the house without a record." },
              { step: "04", title: "Keep, Gift, Sell, Donate", body: "Once it's all down on paper, we go through it — what stays in the family, what gets sold, what gets donated, what gets documented and kept. You make the calls. I handle the logistics so it actually happens." },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem" }}>
                  <p style={{ fontSize: "2.5rem", fontWeight: 800, color: "var(--sage)", lineHeight: 1, marginBottom: "1rem", opacity: 0.35 }}>{item.step}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75 }}>{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO THIS IS FOR ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 700 }}>
              <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>Why People Call</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>
                The china came out at a family dinner. And you realized.
              </h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.85, marginBottom: "1.5rem", opacity: 0.88 }}>
                The set has missing pieces. Some things are chipped. Your kids have their own china now — nobody's inheriting a broken set. But you can't sell it as-is, and it doesn't feel right to just put it in a donation bag. So it stays in the hutch.
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.85, marginBottom: "1.5rem", opacity: 0.88 }}>
                I'm not an estate planner. I don't do wills or estate law. What I do is come in and look at what's actually in the drawers. The extra bedsheets, still in plastic. The unopened china that hasn't been touched in 30 years. The pieces that can be sold individually on eBay — because the right buyer is out there for each one, even when the set is gone. Your kids don't want it. You've already decided it isn't going to anyone specific. So let's make sure it goes somewhere, and that it means something on the way out.
              </p>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.85, marginBottom: "2rem", opacity: 0.88 }}>
                That's what this work is. A thoughtful process, a partner who cares about the details, and the time to do it right — while you can still tell me what everything is and why it mattered.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.65, fontStyle: "italic" }}>
                "Let's make sure your life has value and meaning. And that you get a real partner in the process."
              </p>
              <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", opacity: 0.55, marginTop: "0.75rem" }}>— Dayna Brown, Founder</p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow eyebrow-sage">Pricing</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1rem" }}>Scoped by project.<br />Always disclosed upfront.</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  Legacy work is $175/hr with a 2-hour minimum, scoped after a walkthrough call. The price depends on the size of the home, how much there is to go through, and how much cataloging you want.
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "2rem", fontStyle: "italic" }}>
                  It's careful, specialized work, and the rate reflects the time it takes to do it right.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-ink">Schedule a Consultation</Link>
                  <Link href="/pricing" className="btn btn-outline-ink">Full Pricing Guide</Link>
                </div>
              </div>
              <div>
                {[
                  { label: "Engagement type", value: "Project-based" },
                  { label: "Starting point", value: "Walkthrough consultation" },
                  { label: "Deliverable", value: "Full digital catalog + photos" },
                  { label: "Appraisal coordination", value: "Available (third-party)" },
                  { label: "Distribution planning", value: "Included" },
                  { label: "Service area", value: "Los Angeles + surrounding" },
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 0", borderBottom: "1px solid var(--warm-gray-lt)", fontSize: "0.9rem" }}>
                    <span style={{ fontWeight: 300, color: "var(--sage-dark)" }}>{row.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Common Questions</span>
            <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "2.5rem" }}>Before you book</h2>
          </FadeUp>
          <div style={{ maxWidth: 720 }}>
            {[
              { q: "Does the person whose home it is need to be present?", a: "Ideally yes, especially for the first session — their knowledge of the items is irreplaceable. But I can work independently once the scope is established, and I'll document questions to bring back to them." },
              { q: "What if I don't know what's valuable?", a: "That's exactly why this service exists. I flag items that may have value and coordinate with trusted appraisers. You don't need to know in advance — that's my job." },
              { q: "Can this be done remotely if I'm managing a parent's home from another city?", a: "Yes. I can conduct the walkthrough and catalog independently, send photos and documentation in real time, and coordinate with you remotely throughout the project." },
              { q: "What happens after the catalog is complete?", a: "I'll walk you through a distribution plan — what goes to family, what goes to resale, what gets donated. The decisions are yours. I handle the logistics." },
              { q: "Is this only for estates?", a: "No. Many clients do this proactively — before any transition happens. It's actually easier and more thorough when there's no urgency. The best time to do this work is before you need it." },
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
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Ready to create the record?</h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Schedule a consultation and I'll walk through the scope with you. The sooner this gets done, the easier it is.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Schedule a Consultation</Link>
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
