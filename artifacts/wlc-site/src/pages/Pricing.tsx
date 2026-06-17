import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";
import FAQItem from "@/components/FAQItem";
import { pricing, commission } from "@/content/brand";

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

export default function Pricing() {
  usePageMeta({
    title: "Pricing — The Well Lived Citizen",
    description: "Transparent pricing for every path to clarity: from focused 4-hour Resets to custom Legacy plans and commission-based Resale. No hidden fees – just straightforward support to uncover what's next for your home.",
    path: "/pricing",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Pricing</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
              Clear rates.<br />No surprises.
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
              Every rate is disclosed before work begins. If something changes, you'll know before it does. That's the standard.
            </p>
          </div>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                num: "01",
                service: "Four-Hour Reset",
                href: "/the-reset",
                price: pricing.reset4hr.split(" · ")[0],
                unit: "flat rate",
                description: "A focused 4-hour working session. One space. Real results. No hourly creep.",
                details: [
                  "4 hours of hands-on work",
                  "Pre-session intake questionnaire",
                  "Sorting, editing, and placement",
                  "Donation and resale routing",
                  "Post-session written summary",
                  `Additional hours at ${pricing.homeOrgHourly.split(" · ")[0]}`,
                ],
                cta: "Book a Reset",
                featured: true,
              },
              {
                num: "02",
                service: "Legacy Inventory & Cataloging",
                href: "/legacy-planning",
                price: pricing.legacyHourly.split("/hr")[0],
                unit: "per hour · scoped after walkthrough",
                description: "Hourly, with project scope set after a walkthrough. Retainer available for ongoing work. No fixed packages — you only pay for the work the home needs.",
                details: [
                  "Photo inventory and cataloging",
                  "Notes on history, value, and who things came from",
                  "Resale and value assessment",
                  "Distribution and downsizing plan",
                  "Walkthrough before any project scope",
                  "Retainer available for ongoing work",
                ],
                cta: "Schedule a Walkthrough",
                featured: false,
              },
              {
                num: "03",
                service: "House Calls",
                href: "/house-calls",
                price: pricing.houseCallsHourly.split("/hr")[0],
                unit: "per hour",
                description: "Flexible hourly help with the everyday running of a household. 2-hour minimum.",
                details: [
                  "2-hour minimum booking",
                  "Billed in full hours",
                  "No discovery call required",
                  "Technology, organization, the everyday stuff",
                  "Monthly retainer packages available",
                  "Cancellation: 24-hour notice",
                ],
                cta: "Schedule a House Call",
                featured: false,
              },
              {
                num: "04",
                service: "Resale & Consignment",
                href: "/resale-consignment",
                price: "Free",
                unit: "pickup · commission-only",
                description: "Free pickup. No payment up front. I evaluate, route, and list — you're paid from proceeds when items sell.",
                details: [
                  "Clothing, accessories, designer, and estate pieces",
                  "Quick Resale Pickup is the easy start for clothing",
                  "You agree to terms at intake, approve listings after evaluation",
                  "Custody transfers at pickup (in-person, UPS, or courier)",
                  "Commission split varies by category",
                  "For items where resale potential is minimal due to market factors: 35% to you · reviewed at intake",
                  "Report and payout every 30 days from your consent",
                ],
                cta: "See Resale Details",
                featured: false,
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{
                  backgroundColor: item.featured ? "var(--ink)" : "var(--parchment)",
                  border: item.featured ? "none" : "1.5px solid var(--warm-gray-lt)",
                  padding: "2.5rem",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: item.featured ? "8px 8px 0px var(--sage)" : "none",
                }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", color: "var(--sage)" }}>{item.num}</span>
                      {item.featured && (
                        <span style={{
                          fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
                          backgroundColor: "var(--sage)", color: "var(--parchment)", padding: "0.2rem 0.6rem",
                        }}>Most Booked</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: item.featured ? "var(--parchment)" : "var(--ink)", marginBottom: "0.5rem" }}>{item.service}</h3>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "1rem" }}>
                      <span style={{ fontSize: "2rem", fontWeight: 800, color: item.featured ? "var(--parchment)" : "var(--ink)", lineHeight: 1 }}>{item.price}</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 400, color: item.featured ? "rgba(248,244,227,0.5)" : "var(--sage-dark)" }}>{item.unit}</span>
                    </div>
                    <p style={{ fontSize: "0.88rem", fontWeight: 300, color: item.featured ? "rgba(248,244,227,0.7)" : "var(--sage-dark)", lineHeight: 1.65 }}>{item.description}</p>
                  </div>
                  <div style={{ flex: 1, marginBottom: "2rem" }}>
                    {item.details.map((d, j) => (
                      <div key={j} style={{
                        padding: "0.6rem 0",
                        borderBottom: `1px solid ${item.featured ? "rgba(248,244,227,0.1)" : "var(--warm-gray-lt)"}`,
                        fontSize: "0.82rem", fontWeight: 300,
                        color: item.featured ? "rgba(248,244,227,0.65)" : "var(--sage-dark)",
                        display: "flex", gap: "0.6rem", alignItems: "flex-start",
                      }}>
                        <span style={{ color: "var(--sage)", flexShrink: 0, marginTop: 1 }}>→</span>{d}
                      </div>
                    ))}
                  </div>
                  <Link href={item.href} className={`btn ${item.featured ? "btn-sage" : "btn-outline-ink"}`} style={{ textAlign: "center", justifyContent: "center" }}>
                    {item.cta}
                  </Link>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESALE COMMISSION STRUCTURE ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>Resale Commission</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>What you keep, by category.</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.75, opacity: 0.85, marginBottom: "1.5rem" }}>
                  Proceeds are split after platform fees and shipping are deducted. You agree to the resale terms when you book a pickup, and possession transfers when items reach me. After evaluation you approve the listings, and your 30-day reporting and payout cycle begins from that consent.
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.75, opacity: 0.9, marginBottom: "2rem" }}>
                  The Resale Agreement is yours to read up front — and you e-sign it at booking, before a single item ships.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <a href="/WLC-Resale-Agreement.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-ink">Read the Resale Agreement</a>
                  <Link href="/bag-pickup" className="btn btn-outline-ink">Schedule a Pickup</Link>
                </div>
              </div>
              <div>
                {commission.map((row, i) => (
                  <div key={i} style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(56,48,46,0.15)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ink)" }}>{row.category}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--sage-dark)", whiteSpace: "nowrap" }}>
                        {row.client} to you / {row.twlc} WLC
                      </span>
                    </div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 300, color: "var(--ink)", opacity: 0.65 }}>{row.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── HOW A RESET WORKS ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">The Reset · How It Works</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem", maxWidth: 520 }}>
              Solo, side by side, or you go first.
            </h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 560 }}>
              Most clients don't realize they have options here. These are the three ways a Reset can go — pick what works for you.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                mode: "You go, I work",
                tag: "Most common",
                body: "You leave. I come in, work through the space, and lock up when I'm done. You come back to a finished room. No hovering, no decisions you didn't sign up for. Works for closets, kitchens, overflow rooms, and post-move unpacking.",
              },
              {
                mode: "Side by side",
                tag: "For sentimental or complex spaces",
                body: "You stay. You make the calls — I handle the physical execution. Good for spaces where every item needs your eye on it: inherited things, items with history, anything where you need to be part of the decision.",
              },
              {
                mode: "Move Closeout",
                tag: "For whole-home moves",
                body: "You go through once and flag what stays. Everything else — donations, resale prep, packing, routing — gets handled after you leave. You don't have to be there for the hard part.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 60}>
                <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem", borderTop: "3px solid var(--sage)" }}>
                  <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.5rem" }}>{item.tag}</p>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1rem" }}>{item.mode}</h3>
                  <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75 }}>{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp delay={200}>
            <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--sage-dark)", marginTop: "2rem", lineHeight: 1.7 }}>
              All three options are {pricing.reset4hr.split(" · ")[0]} flat for 4 hours. Additional time at {pricing.homeOrgHourly.split(" · ")[0]}, always disclosed before I run over.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── WHAT'S NOT INCLUDED ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">What's Not Included</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem", maxWidth: 520 }}>
              I want you to know exactly what you're getting.
            </h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 560 }}>
              No surprises after the session. Here's what each service covers — and what it doesn't.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
            {[
              {
                service: "The Reset",
                included: ["Sorting, editing, and placement", "Donation routing and bag preparation", "Resale identification and routing", "Post-session written summary"],
                notIncluded: ["Cleaning or deep cleaning", "Painting, repairs, or handyman work", "Furniture removal or hauling", "Shopping or purchasing new items"],
              },
              {
                service: "House Calls",
                included: ["Technology setup and troubleshooting", "Vendor coordination and oversight", "Donation and return routing", "Home safety and accessibility updates"],
                notIncluded: ["Electrical or plumbing work", "Caregiving or medical support", "Cleaning services", "Same-day service (2-hr notice minimum)"],
              },
              {
                service: "Legacy Inventory",
                included: ["Photo inventory of the things that matter", "Notes on history and who things came from", "Value assessment and appraisal routing", "Distribution and downsizing plan"],
                notIncluded: ["Estate law, wills, or legal documents", "Financial or tax advice", "Physical removal or hauling of items", "Insurance appraisals (referrals available)"],
              },
              {
                service: "Resale & Consignment",
                included: ["Pickup within service area (complimentary)", "Platform matching and listing", "Buyer communication", "Sales report every 30 days, payout every 30 days from signing"],
                notIncluded: ["Guaranteed sale or timeline", "Items outside category/condition threshold", "Junk removal or disposal", "Same-week payouts (30-day cycle)"],
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem" }}>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "var(--ink)", marginBottom: "1.5rem", paddingBottom: "0.75rem", borderBottom: "2px solid var(--sage)" }}>
                    {item.service}
                  </h3>
                  <div style={{ marginBottom: "1.25rem" }}>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.75rem" }}>Included</p>
                    {item.included.map((line, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.6rem", padding: "0.35rem 0", fontSize: "0.82rem", fontWeight: 300, color: "var(--ink-soft)" }}>
                        <span style={{ color: "var(--sage)", flexShrink: 0 }}>✓</span>{line}
                      </div>
                    ))}
                  </div>
                  <div>
                    <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--warm-gray-md)", marginBottom: "0.75rem" }}>Not included</p>
                    {item.notIncluded.map((line, j) => (
                      <div key={j} style={{ display: "flex", gap: "0.6rem", padding: "0.35rem 0", fontSize: "0.82rem", fontWeight: 300, color: "var(--sage-dark)" }}>
                        <span style={{ color: "var(--warm-gray-md)", flexShrink: 0 }}>—</span>{line}
                      </div>
                    ))}
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FLEX BLOCKS ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Flex Blocks</span>
            <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "0.75rem", maxWidth: 520 }}>
              Flex Blocks &amp; Hourly Rates
            </h2>
            <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: 560 }}>
              Flex Blocks are reserved work blocks you can book for Home Organization, House Calls, and Legacy Inventory. Book by the session, or pre-buy a discounted 10 or 25-hour block to use as you need them. Flex-block hours never expire.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>

            {/* Session Booking */}
            <FadeUp>
              <div style={{ backgroundColor: "rgba(248,244,227,0.05)", border: "1px solid rgba(248,244,227,0.12)", padding: "2.5rem", height: "100%" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.75rem" }}>
                  Session Booking
                </p>
                <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Reserved in standard session blocks based on your project size. You only pay for the time you need.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { label: "Home Organization & Move Support", rate: pricing.homeOrgHourly, note: "Reserved in 4 or 6-hour blocks" },
                    { label: "House Calls", rate: pricing.houseCallsHourly, note: "Reserved in 2, 4, or 6-hour blocks" },
                    { label: "Legacy Inventory & Cataloging", rate: pricing.legacyHourly, note: "Reserved in 2, 4, or 6-hour blocks" },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "1rem 0", borderBottom: "1px solid rgba(248,244,227,0.1)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.2rem" }}>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--parchment)" }}>{row.label}</p>
                        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--sage)" }}>{row.rate.split(" · ")[0]}</p>
                      </div>
                      <p style={{ fontSize: "0.72rem", fontWeight: 300, color: "rgba(248,244,227,0.4)" }}>{row.note} · {row.rate.includes(" · ") ? row.rate.split(" · ")[1] : ""}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

            {/* Prepaid Discounted Packages */}
            <FadeUp delay={100}>
              <div style={{ backgroundColor: "rgba(248,244,227,0.05)", border: "1px solid rgba(248,244,227,0.12)", padding: "2.5rem", height: "100%" }}>
                <p style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.75rem" }}>
                  Pre-Buy Flex Packages
                </p>
                <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Pre-buy hours for general use (e.g., 2 hours at storage, 4 hours in the closet, etc.) and save on standard hourly rates.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {[
                    { label: "Home Organization (10-Hour Block)", rate: pricing.homeOrgFlex10h, note: "Saves $25/hr over standard rate" },
                    { label: "Home Organization (25-Hour Block)", rate: pricing.homeOrgFlex25h, note: "Our best value for large organization projects" },
                    { label: "Legacy & House Calls (10-Hour Block)", rate: pricing.legacyFlex10h, note: "Saves $25/hr over standard rate" },
                    { label: "Legacy & House Calls (25-Hour Block)", rate: pricing.legacyFlex25h, note: "Ideal for ongoing legacy inventory work" },
                  ].map((row, i) => (
                    <div key={i} style={{
                      padding: "1rem 0", borderBottom: "1px solid rgba(248,244,227,0.1)",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.2rem" }}>
                        <p style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--parchment)" }}>{row.label}</p>
                        <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--sage)" }}>{row.rate}</p>
                      </div>
                      <p style={{ fontSize: "0.72rem", fontWeight: 300, color: "rgba(248,244,227,0.4)" }}>{row.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ── MONTHLY RETAINER ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "center" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>Monthly Retainer</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>
                  A standing presence, on a monthly cadence.
                </h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.75, marginBottom: "1.5rem", opacity: 0.8 }}>
                  Some clients benefit from having consistent, scheduled support rather than booking individual sessions. Monthly retainer packages are available for clients who want a reliable presence — someone who knows their home, their preferences, and their priorities.
                </p>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.75, marginBottom: "2rem", opacity: 0.8 }}>
                  Retainer pricing is individualized based on frequency, scope, and service mix. I'll discuss what makes sense for your situation during your call.
                </p>
                <Link href="/contact" className="btn btn-ink">Ask About Retainer Options</Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { label: "Pricing", value: "Custom quoted" },
                  { label: "Frequency", value: "Weekly, bi-weekly, or monthly" },
                  { label: "Scope", value: "Tailored to your home" },
                  { label: "Services included", value: "Any combination of services" },
                  { label: "Commitment", value: "Month-to-month available" },
                ].map((row, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", padding: "0.85rem 0",
                    borderBottom: "1px solid rgba(28,25,23,0.12)", fontSize: "0.9rem",
                  }}>
                    <span style={{ fontWeight: 300, color: "var(--sage-dark)" }}>{row.label}</span>
                    <span style={{ fontWeight: 600, color: "var(--ink)" }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── POLICIES ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Policies</span>
            <h2 className="display-sm" style={{ color: "var(--parchment)", marginBottom: "3rem", maxWidth: 480 }}>
              How I handle the practical stuff.
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              {
                title: "Cancellation",
                body: "The Reset: 48-hour notice required. House Calls: 24-hour notice. Late cancellations may incur a fee equal to 50% of the session rate. I understand life happens — please just communicate.",
              },
              {
                title: "Payment",
                body: "For services (The Reset, House Calls, Legacy), payment is due at the time of service. I accept Venmo, Zelle, and check. For Resale & Consignment and Quick Resale Pickup, there is no upfront payment — you're paid from proceeds after items sell. Retainer clients are billed monthly. Payment handles are confirmed when we lock the booking.",
              },
              {
                title: "Travel",
                body: "Travel within my primary Los Angeles service area is included. Extended travel (outside a 30-mile radius) may incur a small fee, always disclosed before booking.",
              },
              {
                title: "Rescheduling",
                body: "I'd rather you tell me you're overwhelmed and need to reschedule than ghost the appointment — I genuinely won't be weird about it. Just let me know.",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 50}>
                <div style={{ backgroundColor: "rgba(248,244,227,0.06)", border: "1px solid rgba(248,244,227,0.12)", padding: "2rem" }}>
                  <h3 style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--parchment)", marginBottom: "0.75rem" }}>{item.title}</h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.7 }}>{item.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Pricing Questions</span>
            <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "2.5rem" }}>Common questions about rates</h2>
          </FadeUp>
          <div style={{ maxWidth: 680 }}>
            {[
              {
                q: "Are there any hidden fees?",
                a: "No. Every rate is disclosed before work begins. If something changes mid-session — like the space needs more time than anticipated — I'll tell you before I continue, not after.",
              },
              {
                q: "Can I combine services in a single session?",
                a: "Yes. A Reset session can include resale routing, donation prep, and photography as part of the four hours. House Calls can address multiple tasks in a single session. I'll discuss what makes sense for your situation.",
              },
              {
                q: "Do you offer discounts for multiple bookings?",
                a: "Monthly retainer packages offer better per-hour value for clients who want consistent support. For one-time bookings, rates are as listed. I don't negotiate individual session rates.",
              },
              {
                q: "What if I need to add time to a Reset session?",
                a: "If the space needs more than four hours, I'll tell you before I run over. Additional time is billed at $150/hr. You always have the option to stop at four hours and schedule a follow-up.",
              },
              {
                q: "Is there a consultation fee?",
                a: "No. The initial call is complimentary. It's a brief conversation to understand your situation and determine what makes the most sense. There's no obligation.",
              },
            ].map((item, i) => (
              <FAQItem key={i} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <h2 className="display-sm" style={{ color: "var(--parchment)", marginBottom: "0.75rem" }}>Questions about pricing?</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "rgba(248,244,227,0.65)" }}>Schedule a call. I'll talk through what makes sense for your situation.</p>
              </div>
              <Link href="/contact" className="btn btn-sage">Schedule a Call</Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
