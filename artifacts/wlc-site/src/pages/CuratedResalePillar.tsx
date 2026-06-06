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

export default function CuratedResalePillar() {
  usePageMeta({
    title: "Resale & Consignment — Pillar 04 | The Well Lived Citizen",
    description: "Resale for the things still worth something. Pickup, evaluation, photography, listing, and payout. Commission-based. Los Angeles.",
    path: "/curated-resale-consignment",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "7rem" }}>
        <div className="container">
          <div style={{ maxWidth: 740 }}>
            <span className="eyebrow eyebrow-light">Pillar 04</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
              Resale<br />&amp; Consignment
            </h1>
            <p style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8, marginBottom: "0.75rem" }}>
              Resale for the things still worth something — handled by someone who knows where each thing actually sells.
            </p>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.6)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              It flows from everything else. A Reset surfaces what you're editing out. Legacy work uncovers what has value sitting in storage. A move closeout routes what doesn't make the truck. The resale piece is already built into the other work — it doesn't have to be its own separate project.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <Link href="/bag-pickup" className="btn btn-sage">Schedule a Resale Pickup</Link>
              <Link href="/pricing" className="btn btn-outline-light">View Commission Structure</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT THIS IS ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "5rem", alignItems: "start" }}>
            <FadeUp>
              <span className="eyebrow eyebrow-sage">What This Is</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>For the things that still have value — but not your time.</h2>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                I help clients sort through belongings, identify value, and route items through the resale channels that make the most sense for their category, condition, and potential. From clothing and accessories to collections, decor, storage units, and inherited belongings.
              </p>
              <p className="body-lg" style={{ marginBottom: "1.5rem" }}>
                The goal is simple: recover value where it still exists and help things move to their next place responsibly.
              </p>
              <p className="body-lg">
                No marketplace burnout. No figuring it all out alone. No piles sitting in limbo for another two years. Just practical help getting things moving again.
              </p>
            </FadeUp>

            <FadeUp delay={80}>
              <div style={{ backgroundColor: "var(--parchment-mid)", padding: "2.5rem", boxShadow: "6px 6px 0px var(--sage)" }}>
                <p style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.5rem" }}>The Work Includes</p>
                {[
                  "Pickup and intake",
                  "Evaluation and photography",
                  "Platform matching and pricing",
                  "Buyer communication",
                  "Routing and return logic",
                  "Donation reroute when appropriate",
                  "Monthly reporting",
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

      {/* ── QUICK RESALE PICKUP DOORWAY ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <div style={{ display: "inline-block", backgroundColor: "var(--sage)", padding: "0.25rem 0.75rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--parchment)" }}>Quick Entry</span>
                </div>
                <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Quick Resale Pickup</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.75)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                  A simple way to start letting clothing leave the house. The bags I send are large zip totes — they hold anywhere from three king-size pillows to three dresser drawers' worth of clothing. What you put in them is up to you.
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.8, marginBottom: "1.25rem" }}>
                  What I ask is that you have some sense of what's in there. Not a spreadsheet — just a general idea. My job is to make the call on what sells, where, and when. That's the gift I bring: years across retail, resale, high-end, and everything in between.
                </p>
                <p style={{ fontSize: "0.85rem", fontWeight: 300, color: "rgba(248,244,227,0.5)", lineHeight: 1.75, fontStyle: "italic" }}>
                  Clothing and accessories only. Home decor, furniture, art, and delicate valuables require a local consultation.
                </p>
                <div style={{ marginTop: "2rem" }}>
                  <Link href="/fast-bag-fill" className="btn btn-sage">Schedule a Quick Resale Pickup</Link>
                </div>
              </div>
              <div>
                {[
                  { label: "City pickup", body: "Route-based stop-ins, building desk drops, or direct bag shipment." },
                  { label: "Same-day courier", body: "I work with 60–90 quart totes — the size that fits an Uber courier cleanly." },
                  { label: "Volume", body: "Fill what you have. I'll tell you honestly if something isn't worth the effort." },
                  { label: "Item standards", body: "Items you took care of and know deserve another life. Please do not send dirty clothing or bio-risk textiles." },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(248,244,227,0.1)" }}>
                    <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--sage)", marginBottom: "0.4rem" }}>{item.label}</p>
                    <p style={{ fontSize: "0.88rem", fontWeight: 300, color: "rgba(248,244,227,0.65)", lineHeight: 1.7 }}>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── WHERE ITEMS SELL ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Where Items Sell</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem", maxWidth: 500 }}>Routed by category and market fit.</h2>
            <p className="body-lg" style={{ marginBottom: "3rem", maxWidth: 580 }}>
              Items are matched to the platform where they make the most sense — not just listed everywhere and hoped for.
            </p>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1rem" }}>
            {["Poshmark (Ambassador)", "eBay", "Etsy", "Facebook Marketplace", "Chairish", "Vinted", "Vestiaire", "Grailed", "Local high-end resale", "Private collector networks"].map((platform, i) => (
              <FadeUp key={i} delay={i * 30}>
                <div style={{ backgroundColor: "var(--parchment)", padding: "1.25rem 1.5rem", borderLeft: "3px solid var(--sage)" }}>
                  <p style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--ink)" }}>{platform}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── REALISTIC TIMELINES ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 680 }}>
              <span className="eyebrow eyebrow-sage">Realistic Timelines</span>
              <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2rem" }}>This is a long game, not a fast-cash service.</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                {[
                  { label: "Intake Review", value: "7–10 business days once items arrive" },
                  { label: "Resale Timeline", value: "Most strong items sell within the first 90 days. Nearly everything with real demand finds its buyer within 6–9 months." },
                  { label: "Consignment Term", value: "Items are listed until sold; I'll check in at 180 days if anything hasn't moved" },
                  { label: "Monthly Report", value: "Every 30 days, starting from the signing date" },
                  { label: "Payout", value: "Every 30 days via Venmo, Zelle, or check" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "2rem", alignItems: "baseline", padding: "1.25rem 0", borderBottom: "1px solid var(--warm-gray-lt)" }}>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage-dark)", minWidth: 140, flexShrink: 0 }}>{item.label}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.6 }}>{item.value}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.75, marginTop: "1.5rem", fontStyle: "italic" }}>
                Resale rewards patience, not urgency. If immediate cash is the priority, resale may not be the best route.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── COMMISSION ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "4rem", alignItems: "start" }}>
              <div>
                <span className="eyebrow" style={{ color: "var(--sage-dark)" }}>Commission Structure</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Fair splits. Always disclosed before pickup.</h2>
                <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--ink)", lineHeight: 1.75, opacity: 0.85, marginBottom: "1.5rem" }}>
                  Proceeds are split after platform fees and shipping are deducted. You agree to the resale terms when you request a pickup; possession transfers when the items reach me. After evaluation you approve the listings, and your 30-day reporting and payout cycle begins from that consent. <a href="/WLC-Resale-Agreement.pdf" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sage-dark)", textDecoration: "underline", textUnderlineOffset: "2px" }}>Read the full Resale Agreement (PDF).</a>
                </p>
                <p style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.75, opacity: 0.9, marginBottom: "1.5rem" }}>
                  I'll always try to be fair with people. But for that to work in second-life resale, buyers also need to approach it fairly, realistically, and in good faith.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <Link href="/bag-pickup" className="btn btn-ink">Schedule a Pickup</Link>
                </div>
              </div>
              <div>
                {[
                  { category: "Clothing & Accessories", split: "45% to you / 55% WLC", note: "Standard items, shoes, bags, jewelry" },
                  { category: "Designer & Luxury", split: "50% to you / 50% WLC", note: "Designer handbags, luxury clothing, fine jewelry" },
                  { category: "Furniture & Significant Home Pieces", split: "50% to you / 50% WLC", note: "Furniture, art, significant home pieces" },
                  { category: "Full Closet Liquidation", split: "45% to you / 55% WLC", note: "Whole-closet edits, multi-piece engagements" },
                  { category: "Low-Value Volume", split: "35% to you / 65% WLC", note: "Primarily $5–$10 resale range · reviewed at intake, never applied retroactively" },
                ].map((row, i) => (
                  <div key={i} style={{ padding: "1.25rem 0", borderBottom: "1px solid rgba(56,48,46,0.15)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "var(--ink)" }}>{row.category}</span>
                      <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--sage-dark)", whiteSpace: "nowrap" }}>{row.split}</span>
                    </div>
                    <p style={{ fontSize: "0.75rem", fontWeight: 300, color: "var(--ink)", opacity: 0.65 }}>{row.note}</p>
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
              { q: "What's the difference between Quick Resale Pickup and full resale consignment?", a: "Quick Resale Pickup is the easy way in for clothing and accessories — fill a bag, I come pick it up, I handle everything from there. Full resale consignment is a more deliberate process for items with significant value — designer pieces, collections, estate items, furniture, and home decor." },
              { q: "What happens to items that don't sell?", a: "Items that don't sell within the consignment window are returned to you or donated at your direction. I'll flag anything that hasn't moved at the 180-day mark so nothing sits indefinitely without your knowledge." },
              { q: "Do you accept furniture?", a: "Yes — furniture, art, and significant home pieces are accepted through a local consultation, not the Quick Resale Pickup. I'll evaluate the items in person and discuss routing." },
              { q: "How do I get paid?", a: "Your 30-day clock starts when you consent to the listings after evaluation. Every 30 days you'll get a sales report and a payout reflecting whatever sold in that window. Payouts via Venmo, Zelle, or check. Because each platform pays out on a different cadence, your statement reflects what's actually cleared during your 30-day window." },
              { q: "How do I know my items are being handled correctly?", a: "You'll get a sales report every 30 days — item, platform, price, and net proceeds. I don't keep anything without documentation. You agree to the resale terms at intake, possession transfers at pickup, and you approve every listing before it goes live." },
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
              <h2 className="display-md" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>Ready to get it out of the house?</h2>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Reach out and tell me what you have. I'll handle the evaluation, routing, and proceeds.
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <Link href="/bag-pickup" className="btn btn-sage">Schedule a Pickup</Link>
                <Link href="/fast-bag-fill" className="btn btn-outline-light">Quick Resale Pickup</Link>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
