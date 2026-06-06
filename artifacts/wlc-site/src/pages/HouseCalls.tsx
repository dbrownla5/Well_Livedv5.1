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

export default function HouseCalls() {
  usePageMeta({
    title: "Two-Hour House Call — $175/hr | The Well Lived Citizen",
    description: "Practical hourly help with the everyday running of a household. Technology, safety, organization, transitions. 2-hour minimum. Los Angeles.",
    path: "/house-calls",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 680 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.4)" }}>Service 02</span>
            <div style={{ display: "inline-block", backgroundColor: "var(--sage)", padding: "0.3rem 0.8rem", marginBottom: "1.5rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink)" }}>Quick Entry</span>
            </div>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Two-Hour House Call</h1>
            <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              There used to be a person you could call. Not a professional service — a person. The neighbor who knew who to hire. The partner who kept track of all the passwords. The friend who just came over and figured it out with you.
            </p>
            <p style={{ fontSize: "1.15rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.75, marginBottom: "2.5rem" }}>
              That is the role. Not caregiving, not cleaning, not a fancy service with a clipboard. Practical, available, and capable — for the operational side of life that keeps piling up. Anyone can book it: for yourself, for a parent, for someone who needs a person on the ground.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link href="/contact" className="btn btn-sage">Schedule a House Call</Link>
              <span style={{ fontSize: "0.8rem", fontWeight: 300, color: "rgba(248,244,227,0.45)" }}>$175/hr · 2-hour minimum</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "start" }}>
            <FadeUp>
              <span className="eyebrow eyebrow-sage">What It Is</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>
                Practical support for the things nobody really has a person for.
              </h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                That might mean changing a smoke detector on a high ceiling, troubleshooting household technology, coordinating vendors, reorganizing a space that stopped functioning well, setting up a room after a move, preparing items for resale, handling donation drop-offs, helping a parent reset their home after a transition, or checking in on a storage unit that's gotten out of control.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                There's no discovery call required. You tell me what needs attention, I show up and handle it. Two-hour minimum, billed hourly after that.
              </p>
              <p className="body-lg">
                Some clients book a House Call once. Others build it into their monthly rhythm. Both are fine.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ backgroundColor: "var(--ink)", padding: "2rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                  <p className="pull-quote" style={{ color: "rgba(248,244,227,0.85)", fontSize: "1rem" }}>
                    "The most common thing I hear after a House Call is: 'I can't believe I waited this long.' That's not a complaint. It's relief."
                  </p>
                  <p style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage)", marginTop: "1.25rem" }}>— Dayna Brown</p>
                </div>
                <div style={{ backgroundColor: "var(--sage)", padding: "1.75rem" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.7 }}>
                    <strong>No judgment about the state of things.</strong> House Calls are not an audit. I'm not here to assess how you've been living. I'm here to help you get things working again.
                  </p>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WHAT I HANDLE ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>What I Handle</span>
            <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "3rem", maxWidth: 500 }}>The list is longer than you'd expect.</h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0" }}>
            {[
              { category: "Technology & Setup", items: ["Printer, router, and device setup", "Phone and computer troubleshooting", "Smart home device installation", "Cable management and organization", "Streaming and TV setup"] },
              { category: "Home Safety & Maintenance", items: ["Smoke and CO detector updates", "Light bulb and battery replacement", "Safety assessment walk-through", "High bulb changes and similar tasks", "Handyperson coordination"] },
              { category: "Organization & Sorting", items: ["Paperwork and mail sorting", "Medicine cabinet and bathroom edit", "Garage and storage unit sorting", "Donation routing and drop-off", "Pre-move or post-move sorting"] },
              { category: "Transitions & Support", items: ["Post-move settling and unpacking", "Support after loss or major change", "Preparing a home for a new resident", "Downsizing assistance", "Post-loss household coordination"] },
              { category: "Ongoing Household", items: ["Recurring household tasks", "Seasonal organization", "Pre-event or pre-guest preparation", "Home re-entry resets after travel", "Whatever the household needs"] },
              { category: "Resale & Documentation", items: ["Item photography and cataloguing", "Heirloom identification", "Storage inventory", "Donation coordination", "Routing items to the right next place"] },
            ].map((cat, i) => (
              <FadeUp key={i} delay={i * 40}>
                <div style={{
                  padding: "2rem",
                  borderBottom: "1px solid rgba(248,244,227,0.1)",
                  borderRight: i % 2 === 0 ? "1px solid rgba(248,244,227,0.1)" : "none",
                }}>
                  <h3 style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "1.25rem" }}>{cat.category}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {cat.items.map((item, j) => (
                      <p key={j} style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.5 }}>{item}</p>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow eyebrow-sage">Pricing</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1rem" }}>$175/hr.<br />2-hour minimum.</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "2rem" }}>
                  Monthly retainer packages available for clients who want consistent, scheduled support.
                </p>
                <Link href="/contact" className="btn btn-ink">Schedule a House Call</Link>
                <p style={{ fontSize: "0.78rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.65, marginTop: "1.25rem" }}>
                  Payment is due at the time of service. Venmo, Zelle, or check.
                </p>
              </div>
              <div>
                {[
                  { label: "Hourly rate", value: "$175/hr" },
                  { label: "Minimum", value: "2 hours ($350)" },
                  { label: "Cancellation", value: "24-hour notice" },
                  { label: "Retainer", value: "Available — ask on call" },
                  { label: "Travel", value: "Included within LA" },
                  { label: "Quick Entry", value: "Two-Hour House Call" },
                  { label: "Payment due", value: "At time of service" },
                  { label: "Accepted methods", value: "Venmo · Zelle · Check · Card" },
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
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Before You Book</span>
            <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "2.5rem" }}>Common questions</h2>
          </FadeUp>
          <div style={{ maxWidth: 720 }}>
            {[
              { q: "What's the difference between a House Call and The Reset?", a: "The Reset is a focused session for a single space. House Calls are flexible, hourly sessions for the broader running-the-household stuff — technology, home safety, errands, vendor coordination, transitions. House Calls have a 2-hour minimum." },
              { q: "Can I book recurring House Calls?", a: "Yes. Monthly retainer packages are available for clients who want consistent, scheduled support. These are priced individually based on frequency and scope. Ask about them during your call." },
              { q: "Do you work with older adults?", a: "Yes. I work with people who want support maintaining their homes and their autonomy. The pace is set by the person, not me — and the goal is always to make the operational parts easier without getting in the way of how they already live." },
              { q: "What if the task takes less than 2 hours?", a: "The 2-hour minimum is the booking unit. If I finish early, I'll use the remaining time on whatever else would be useful — a quick tech check, a donation sort, whatever makes sense." },
              { q: "What kinds of tech issues can you handle?", a: "Phone setup and transfers, Wi-Fi troubleshooting, smart home devices, TV and streaming setup, password organization, and navigating telecom billing issues. If it's a home tech problem, I can usually get in the weeds and resolve it." },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 600 }}>
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Ready to get some things handled?</h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Book a House Call and tell me what's been sitting on the list. I'll take it from there.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-sage">Schedule a House Call</Link>
                <Link href="/pricing" className="btn btn-outline-light">See Pricing</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 640 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.5rem" }}>Client Story</p>
              <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.35rem)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.55, marginBottom: "1.5rem" }}>
                "I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. My clothes are arranged by item and color, my purses on two long shelves and two short ones — I can see what I have and choose accordingly. My shoes are on four shelves where I can easily see them. The heat is set perfectly. The TV is set up with only one clicker to get to all the channels I want. Thank you for making life easier for me."
              </p>
              <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--ink)", opacity: 0.65, letterSpacing: "0.08em", marginBottom: "2.5rem" }}>— Gayle · Seattle · House Calls</p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.8, opacity: 0.8 }}>
                This is what House Calls looks like in real life. Not a makeover, not a project — just someone who came in, got the TV working, set up the lamps, arranged the closet so everything is visible and reachable. The small stuff matters because the small stuff is daily life.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
