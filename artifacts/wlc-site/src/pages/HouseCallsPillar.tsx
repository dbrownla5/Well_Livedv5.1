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

/** Content restored verbatim from Dayna's prior build. One seam (the list of
 *  "missing person" roles) spanned a screenshot crop; reconstructed from her
 *  own existing copy, not invented. */
const FOR_LIST = [
  "Newly divorced",
  "Recently widowed",
  "First time living alone",
  "Partner travels constantly",
  "Adult children supporting from another city",
  "Practical aftermath no one stays to help with",
  "Moments where the original plan stopped working and you still need the day to happen",
];

const WAYS = [
  "One-time practical resets",
  "Remote family check-ins",
  "Post-project upkeep",
  "Vendor days",
  "Donation and return routing",
  "Home re-entry after travel",
  "Guest and event resets",
];

const OVERSIGHT = [
  "Movers, haulers, cleaners, installers, contractors",
  "Storage teams and donation pickups",
  "Resale buyer coordination",
  "Building and concierge protocol, service appointment access",
];

const PRICING = [
  { label: "Hourly (beyond the House Call)", value: "$175/hr · 2 hr minimum" },
  { label: "4-Hour Practical Reset", value: "Available" },
  { label: "Continuity Retainer", value: "$500/mo" },
];

export default function HouseCallsPillar() {
  usePageMeta({
    title: "House Calls — Two-Hour House Call, $350 | The Well Lived Citizen",
    description: "The person you used to be able to call. Tech setup, vendor days, donation routing, and the practical loose ends of running a household. Fixed-price two-hour House Call, $350. Los Angeles.",
    path: "/house-calls-pillar",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 760 }}>
            <span className="eyebrow eyebrow-light">03 · House Calls</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.25rem" }}>
              Two-Hour House Call — $350. Book this week.
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8, marginBottom: "2.25rem" }}>
              Fixed price. No quote, no estimate call. The fastest way to get me on your calendar this week.
            </p>
            <div style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}>
              <a href="tel:3234331350" className="btn btn-sage">Call or text (323) 433-1350</a>
              <span style={{ fontSize: "0.9rem", fontWeight: 300, color: "rgba(248,244,227,0.6)" }}>
                Tell me what you'd like handled and I'll confirm the slot.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOFT-LAUNCH OFFER ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "4rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ border: "1.5px solid var(--warm-gray-lt)", borderLeft: "3px solid var(--sage)", padding: "2rem 2.25rem", maxWidth: 760 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>Soft-Launch Offer</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                <strong style={{ fontWeight: 700 }}>Two-Hour House Call — $350.</strong> One flat price. Book this week.
              </p>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                Tech setup, donation drop-offs, vendor day, the practical loose ends that have been catching all week — whatever you'd hand to the friend you don't have anymore. Text a few sentences about what's on your plate and we'll lock the slot.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── THE SPIRIT ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 740 }}>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem" }}>For the things life leaves unfinished.</h2>
              <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
                For when the issue isn't the room — it's the person you used to have to call.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 500, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.7, marginBottom: "2rem" }}>
                Possibly my favorite service, and the spirit of this company.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.75rem" }}>
                The world changed, the process got heavier, and no one can be expected to keep up with every new layer alone. House Calls fills the missing person role in real life: the partner who handled it, the nearby parent, the neighbor, the adult child in another city, the friend who always knew how to make the day work — the kind of help I wish I could give everyone, eventually. But right now, the need is there for each person I can reach.
              </p>
              <p className="body-lg">
                Once I know how your home works, it becomes easy for me to help keep it working — home check-ins, tech setup, hands-on home improvements, donation drop-offs, and the practical loose ends that make everyday life easier when someone trusted is paying attention.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4.5rem", alignItems: "start" }}>
            <FadeUp>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.75rem" }}>Who House Calls is for</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                For the people who suddenly find themselves handling the parts of home life someone else used to quietly carry.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                The bill that used to auto-resolve because your partner handled it. The appliance install that feels different when you're home alone. The digital login that somehow became intimidating overnight. The package, pickup, repair, donation, or appointment that shouldn't be a big deal but suddenly feels heavier than it should.
              </p>
              <p className="body-lg" style={{ fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                House Calls exists for the private, practical things people don't always want to say out loud.
              </p>
              <p className="body-lg">
                The goal is not to make life look perfect. The goal is to make everyday life feel safe, manageable, and less isolating when the normal support system changed.
              </p>
            </FadeUp>
            <FadeUp delay={80}>
              <div>
                {FOR_LIST.map((item, i) => (
                  <div key={i} style={{ padding: "0.9rem 0", borderBottom: "1px solid var(--warm-gray-lt)", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: "0.1rem" }}>—</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── WAYS + EXAMPLE ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-light">Ways to use House Calls</span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.5rem 3rem", maxWidth: 820, marginBottom: "3.5rem" }}>
              {WAYS.map((item, i) => (
                <div key={i} style={{ padding: "0.85rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)", fontSize: "0.95rem", fontWeight: 300, color: "rgba(248,244,227,0.78)" }}>
                  {item}
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: "rgba(248,244,227,0.06)", border: "1px solid rgba(248,244,227,0.12)", padding: "2.25rem", maxWidth: 760 }}>
              <p style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "1rem" }}>Real-life example</p>
              <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.82)", lineHeight: 1.8, marginBottom: "1rem" }}>
                The 8-month pregnant woman with a beautiful baby shower, hundreds of gifts, duplicate baby gear, no time, and no energy to turn a mountain of love into something functional.
              </p>
              <p style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--parchment)", lineHeight: 1.7 }}>
                The point is simple: everyone helps celebrate the moment — I help make it livable afterward. That's House Calls.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── VENDOR OVERSIGHT + SERVICE AREA ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.25rem" }}>Vendor &amp; project oversight</h2>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", marginBottom: "1.5rem" }}>When needed, House Calls also covers:</p>
              {OVERSIGHT.map((item, i) => (
                <div key={i} style={{ padding: "0.85rem 0", borderBottom: "1px solid var(--warm-gray-lt)", fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)" }}>
                  {item}
                </div>
              ))}
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", margin: "2.5rem 0 0.75rem" }}>Service area</h3>
              <p className="body-lg">
                Los Angeles and surrounding areas. Quick asks can often be absorbed into an existing route. Urgent and time-sensitive requests are prioritized whenever possible.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              <span className="eyebrow eyebrow-sage">Pricing</span>
              <div style={{ marginTop: "0.5rem", marginBottom: "1.75rem" }}>
                {PRICING.map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "1.5rem", padding: "1.25rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                    <span style={{ fontSize: "1.05rem", fontWeight: 400, color: "var(--ink)" }}>{row.label}</span>
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)", whiteSpace: "nowrap" }}>{row.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: "2rem" }}>
                No membership. No subscription. Ease comes from relationship, not a forced plan.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 400, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 640 }}>
                Sometimes there isn't a perfect way around the problem. There's just the person who knows how to make the day work anyway. That's where House Calls is most useful.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/contact" className="btn btn-ink">Book a House Call</Link>
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
