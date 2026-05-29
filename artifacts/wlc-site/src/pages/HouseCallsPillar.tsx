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

export default function HouseCallsPillar() {
  usePageMeta({
    title: "House Calls — Practical Help for the Generational Gap | The Well Lived Citizen",
    description: "When a parent in LA needs the modern layer of the home navigated and the adult child is in another city. House Calls fills the missing person role. $175/hr, 2-hour minimum.",
    path: "/house-calls-pillar",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 740 }}>
            <span className="eyebrow eyebrow-light">Pillar 03</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>House Calls</h1>
            <p style={{ fontSize: "1.2rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              For the things life leaves unfinished.
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              For when the issue isn't the room — it's the person you used to have to call.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-sage">Book Practical Help</Link>
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
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>The world changed. The process got heavier.</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                No one can be expected to keep up with every new layer alone. House Calls fills the missing person role in real life: the partner who handled it, the nearby parent, the neighbor, the adult child in another city, the friend who always knew how to make the day still work.
              </p>
              <p className="body-lg">
                It is for the people who suddenly find themselves handling the parts of home life someone else used to quietly carry. The bill that used to auto-resolve. The appliance install that feels different when you're home alone. The digital login that became intimidating overnight. The package, pickup, repair, donation, or appointment that shouldn't be a big deal but suddenly feels heavier than it should.
              </p>
            </FadeUp>

            <FadeUp delay={80}>
              <div style={{ backgroundColor: "var(--parchment-mid)", padding: "2.5rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.5rem" }}>Ways to Use House Calls</p>
                {[
                  "Tech and device setup (phones, Wi-Fi, smart home troubleshooting)",
                  "Home check-ins and remote family updates",
                  "Hands-on home improvements (changing high bulbs, swapping smoke detectors)",
                  "Donation and return routing",
                  "Vendor oversight and access days",
                  "Home re-entry resets after travel",
                  "Event prep, logistical setup, and post-event breakdown",
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

      {/* ── THE GENERATIONAL GAP ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 720 }}>
              <span className="eyebrow eyebrow-sage">The Generational Gap</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>It's not about capability. It's about bandwidth.</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                Consider the fiercely independent parent who still cooks every meal, walks every day, and manages their own life perfectly — but whose adult children live in another city. The challenge isn't their capability. It's the modern layer of the home nobody was taught to navigate.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                When the Wi-Fi repeater drops. When the telecom company quietly changes an emergency landline to Wi-Fi and suddenly charges $300 for extra channels. The issue isn't intelligence — it's a generational gap in technology and systems. And supportive adult children cannot always get in the weeds with a tech rep on a Tuesday afternoon.
              </p>
              <p className="body-lg" style={{ fontWeight: 500, color: "var(--ink)" }}>
                That is exactly where House Calls steps in.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE PRACTICAL RESOLUTION ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 680 }}>
              <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>The Practical Resolution</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>I become the person who handles it.</h2>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.8, marginBottom: "1.5rem", opacity: 0.85 }}>
                I become the companion, the password organizer, the tech support, the vendor proxy, and the hands-on help. I get in the weeds to fight the battles that shouldn't have to be carried alone.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.75, fontStyle: "italic" }}>
                "Once I know how your home works, it becomes easy for me to help keep it working."
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
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1rem" }}>$175/hr.<br />2-hour minimum.</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  Ongoing continuity available for repeat clients.
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "2rem", fontStyle: "italic" }}>
                  No membership. No subscription. Ease comes from relationship, not a forced plan.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/contact" className="btn btn-ink">Book Practical Help</Link>
                  <Link href="/pricing" className="btn btn-outline-ink">Full Pricing Guide</Link>
                </div>
              </div>
              <div>
                {[
                  { label: "Hourly rate", value: "$175/hr" },
                  { label: "Minimum", value: "2 hours" },
                  { label: "Ongoing continuity", value: "Retainer available" },
                  { label: "Membership required", value: "No" },
                  { label: "Service area", value: "Los Angeles + surrounding" },
                  { label: "Quick Book entry", value: "The 2-Hour House Call" },
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
              { q: "Is this designed for a specific type of client?", a: "Not at all. House Calls is for anyone who needs trusted, practical help at home — a professional who travels constantly, someone managing a parent's home from another city, or anyone who just needs an extra set of capable hands." },
              { q: "Can I book this for a family member?", a: "Yes. Many clients book House Calls on behalf of a parent or relative. I handle the coordination and make sure the session is tailored to what that person actually needs." },
              { q: "What if the task takes less than 2 hours?", a: "The 2-hour minimum is the booking unit. If I finish early, I'll use the remaining time on whatever else would be useful — a quick tech check, a donation sort, whatever makes sense." },
              { q: "Can I set up ongoing support?", a: "Yes. Retainer continuity is available for clients who want regular, scheduled support. No membership, no subscription — just a consistent relationship built around how your home actually works." },
              { q: "What kinds of tech issues can you handle?", a: "Phone setup and transfers, Wi-Fi troubleshooting, smart home devices, TV and streaming setup, password organization, and navigating telecom billing issues. If it's a home tech problem, I can usually get in the weeds and resolve it." },
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
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Ready to get some things handled?</h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Book a House Call and tell me what's been sitting on the list. I'll take it from there.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Book Practical Help</Link>
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
