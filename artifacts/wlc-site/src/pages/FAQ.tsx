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

const faqSections = [
  {
    title: "Getting Started",
    items: [
      { q: "How do I know which service is right for me?", a: "The easiest way is to schedule a brief call. I'll ask a few questions and tell you honestly what makes the most sense for your situation. If you're not sure, The Reset is usually the right starting point — it's focused, time-limited, and gives you a clear sense of what working together looks like." },
      { q: "Do I need to have everything sorted out before I reach out?", a: "No. Most clients reach out with a general sense of what needs attention — 'the office is a disaster' or 'I need help with my mom's house' — and I figure out the specifics from there. You don't need a plan before you call." },
      { q: "Is there a consultation fee?", a: "No. The initial call is complimentary. It's a brief conversation to understand your situation and determine whether and how I can help. There's no obligation." },
      { q: "How quickly can you get started?", a: "It depends on my current availability. For The Reset and House Calls, I can often schedule within 1–2 weeks. For Legacy Inventory, I'll discuss timeline at the consultation. Fast Bag Fill pickups can often happen within a few days." },
    ]
  },
  {
    title: "The Reset",
    items: [
      { q: "What can realistically be accomplished in four hours?", a: "More than most people expect. A focused four-hour session can get a closet, a kitchen, an office, or a single problem room back to fully functional. The key is that I'm working, not planning. I start when I arrive." },
      { q: "Do I need to be home?", a: "You can be home or not — it's genuinely up to you. Some clients prefer to be present for the decision-making; others prefer to leave and come back to a finished space. I'll talk through what works best before I arrive." },
      { q: "What if four hours isn't enough?", a: "I'm not billing by the minute. If I'm 15 minutes from something great, I finish it. If it's a full hour away, I'll have a quick conversation about what makes sense — extend at the hourly rate or schedule a follow-up. My standard is always fairness, and I ask the same in return." },
      { q: "Can I book a Reset for someone else?", a: "Yes. Many clients book for a parent, sibling, or friend going through a transition. I also work with people navigating more difficult situations — leaving a hard place, managing a move someone else can't face, or needing a trusted person to handle something privately. These are handled on a case-by-case basis, always with safety and discretion. No one who reaches out is left without support." },
      { q: "What about electronics, batteries, and things I can't just throw away?", a: "There's a responsible process for everything. Electronics get wiped and routed to certified e-waste handlers. Batteries, old devices, anything that can't go in the trash — I know where it goes and how to get it there affordably. You don't have to figure that out. That's already handled." },
    ]
  },
  {
    title: "House Calls",
    items: [
      { q: "What's the difference between a House Call and The Reset?", a: "The Reset is a focused session for a single space or problem area. House Calls are flexible, hourly sessions for the broader running-the-household stuff — technology, home safety, errands, vendor coordination, transitions, and whatever else needs attention. House Calls have a 2-hour minimum." },
      { q: "Can I book recurring House Calls?", a: "Yes. Monthly retainer packages are available for clients who want consistent, scheduled support. These are priced individually based on frequency and scope. Ask about them during your call." },
      { q: "Do you work with older adults?", a: "Yes. I work with people who want support maintaining their homes and their autonomy. The pace is set by the person, not me — and the goal is always to make the operational parts easier without getting in the way of how they already live." },
    ]
  },
  {
    title: "Resale & Fast Bag Fill",
    items: [
      { q: "What's the difference between Fast Bag Fill and full resale consignment?", a: "Fast Bag Fill is the easy way in for clothing and accessories — fill a bag, I come pick it up, I handle everything from there. Full resale consignment is a more deliberate process for items with significant value — designer pieces, collections, estate items, furniture, and home decor. Both can result in resale proceeds for you." },
      { q: "How quickly can items start selling?", a: "For standard items, listings can go live within 5–7 days of pickup. You could see items start selling within 10 days. Timelines vary by item and platform." },
      { q: "What if something doesn't sell?", a: "Items that don't sell within an agreed timeframe are returned to you or donated at your direction. I discuss this before I accept items so there are no surprises." },
      { q: "Do I need to clean or prep items before pickup?", a: "No. I handle the prep. Items should be in the condition they're in — I'll assess and handle what's needed." },
    ]
  },
  {
    title: "Legacy Inventory",
    items: [
      { q: "When is the right time to do a Legacy Inventory?", a: "Before you need to. The families who get the most from this service are the ones who do it proactively — not because a health crisis has arrived, but because they want to handle things thoughtfully. If you're already in an urgent situation, I can still help, but the process will be different." },
      { q: "What do I receive at the end?", a: "A photographed inventory, a written archive of stories and provenance where captured, a resale assessment for items with value, and a dispersal strategy document. The format is designed to be genuinely useful." },
      { q: "Can this be done for a family member in another city?", a: "I'm based in Los Angeles, but I can travel for the right engagement. I've also worked with families managing a parent's household from a distance — I coordinate directly with whoever is on-site." },
    ]
  },
  {
    title: "Home Reset & Move Support",
    items: [
      { q: "Do you do full moves? Do you move furniture? Do you bring a team?", a: "No — I don't do full moves and I don't move furniture. What I do is vendor oversight and coordination: I manage the move for you. That means handling the logistics, communicating with your movers, and making sure the right things happen in the right order so you don't have to be the one holding it all together.\n\nProject management is in my background. I'm comfortable running event coordination, breakdown and setup, and anything that requires multiple vendors or moving parts. For non-contractor repairs and tasks — things that require a drill, a wall anchor, or basic assembly — I do those myself, and everything I do follows the applicable codes for the City and State of California.\n\nI work well with other vendors and I have a network of people in the LA area I trust. I've just moved back, so I'm actively rebuilding and growing that network. In the meantime, my job is to find who you need — so you're not the one making calls, figuring out who's reliable, or managing a project you don't have time for." },
      { q: "Are you licensed? Is this a real business?", a: "Yes. The Well Lived Citizen is a registered business operating in Los Angeles, California. I'm insured, and everything I do that involves repairs, installations, or any work requiring tools follows the applicable codes for the City and State of California. If a project requires a licensed contractor — electrical, plumbing, structural — I'll tell you that clearly and connect you with the right person. I don't do work that requires a contractor's license, and I don't pretend otherwise." },
    ]
  },
  {
    title: "Practical Matters",
    items: [
      { q: "What areas do you serve?", a: "I'm based in Los Angeles and serve the greater LA area — West LA, Santa Monica, Hollywood, Silver Lake, Brentwood, Beverly Hills, Pasadena, and surrounding neighborhoods. For Legacy Inventory and specialized engagements, travel is available. Not sure if you're in my area? Reach out." },
      { q: "How do I pay?", a: "I accept Venmo, Zelle, check, and major credit cards. Payment is due at the time of service unless otherwise arranged. Retainer clients are billed monthly." },
      { q: "What's your cancellation policy?", a: "The Reset: 48-hour notice required. House Calls: 24-hour notice. Late cancellations may incur a fee equal to 50% of the session rate. I understand life happens — please just communicate. I'd rather you tell me you need to reschedule than push through something that isn't working." },
      { q: "Is everything confidential?", a: "Yes. I don't talk about clients, their homes, or what's inside them. What I see stays with me. Always." },
      { q: "Do you work with people in difficult or private situations?", a: "Yes. I absolutely work with people navigating difficult and private situations — leaving a hard place, managing a transition someone else can't face, or simply needing a trusted person to handle something you can't do yourself. I handle these on a case-by-case basis, always with safety and discretion for everyone involved. No one who reaches out is left without support." },
    ]
  },
];

export default function FAQ() {
  usePageMeta({
    title: "FAQ — Common Questions About Working With The Well Lived Citizen",
    description: "Cancellation policy, what's included, how booking works, who this is for. The plain answers before you schedule.",
    path: "/faq",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "6rem" }}>
        <div className="container">
          <div style={{ maxWidth: 580 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>FAQ</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Questions I hear most often.</h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
              If your question isn't here, just reach out. I'm easy to get in touch with.
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: "5rem", alignItems: "start" }}>
            <div style={{ position: "sticky", top: "7rem" }}>
              <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>Jump to</p>
              {faqSections.map((section, i) => (
                <a key={i} href={`#faq-${i}`} style={{
                  display: "block", padding: "0.5rem 0", fontSize: "0.85rem", fontWeight: 400,
                  color: "var(--sage-dark)", textDecoration: "none", borderBottom: "1px solid var(--warm-gray-lt)",
                  transition: "color 0.18s ease",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--sage-dark)")}
                >{section.title}</a>
              ))}
            </div>

            <div>
              {faqSections.map((section, i) => (
                <FadeUp key={i} delay={i * 30}>
                  <div id={`faq-${i}`} style={{ marginBottom: "4rem" }}>
                    <h2 style={{
                      fontSize: "1.2rem", fontWeight: 700, color: "var(--ink)", marginBottom: "0.5rem",
                      paddingBottom: "1rem", borderBottom: "2px solid var(--sage)", display: "inline-block",
                    }}>{section.title}</h2>
                    <div style={{ marginTop: "1rem" }}>
                      {section.items.map((item, j) => (
                        <FAQItem key={j} q={item.q} a={item.a} />
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--ink)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "2rem" }}>
              <div>
                <h2 className="display-sm" style={{ color: "var(--parchment)", marginBottom: "0.75rem" }}>Still have questions?</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "rgba(248,244,227,0.65)" }}>Reach out directly. I'm easy to get in touch with.</p>
                <div style={{ marginTop: "1rem", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                  <a href="tel:3234331350" style={{ fontSize: "0.85rem", color: "rgba(248,244,227,0.65)" }}>(323) 433-1350</a>
                  <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "0.85rem", color: "rgba(248,244,227,0.65)" }}>dayna@thewelllivedcitizen.com</a>
                </div>
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
