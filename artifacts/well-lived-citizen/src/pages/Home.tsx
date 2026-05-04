import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { usePageMeta } from "../hooks/usePageMeta";

export default function Home() {
  usePageMeta({
    title: "The Well Lived Citizen — Concierge Home Services in Los Angeles",
    description: "Concierge home and life services in Los Angeles — home organization, legacy planning, house calls, and curated resale. Run by Dayna Brown.",
  });

  const heroRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || !overlayRef.current) return;
      const heroH = heroRef.current.offsetHeight;
      const base = 0.68;
      const scroll = Math.min(window.scrollY / (heroH * 0.6), 1 - base);
      const progress = base + scroll;
      overlayRef.current.style.opacity = String(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page">
      {/* HERO */}
      <section ref={heroRef} className="hero hero-with-image">
        <div ref={overlayRef} className="hero-overlay" aria-hidden="true" />
        <div className="container hero-content bg-[#f5f5f5b5]" style={{ maxWidth: "820px" }}>
          <div className="label fade-up fade-up-1">Los Angeles</div>
          <h1 className="hero-h1 fade-up fade-up-2">
            When <em
            className="text-[#403737f2] border-t-[#4a4848] border-r-[#4a4848] border-b-[#4a4848] border-l-[#4a4848]">"there has to be an easier way"</em> becomes a business.
          </h1>
          <p className="hero-sub fade-up fade-up-2">
            Welcome to the concierge for the things you don't want to handle.
          </p>
          <p className="hero-body fade-up fade-up-3">
            My daily life already runs on shipping, logistics, tech fixes, resale, and the kind of real-world problem solving that doesn't slow down.
            I move fast where things are solvable, and when life gets stuck, I know how to move it through.
          </p>
          <p className="hero-kicker fade-up fade-up-3">I'm built for your chaos.</p>
        </div>
      </section>
      {/* QUICK ENTRY BAND — rolls directly out of the hero, no divider */}
      <section style={{ padding: "56px 0 72px" }}>
        <div className="container">
          <div className="conversion-grid">

            {/* Card 1 — 4-Hour Practical Reset */}
            <div className="conversion-block">
              <div className="conversion-label">Ready to move on it?</div>
              <div className="conversion-body">The room that keeps collecting piles. The task list that keeps moving to tomorrow. The move landing that technically happened but never settled. Four hours. I come in, find the friction, and make it move.</div>
              <Link href="/contact?offer=4hour" className="btn">Book 4-Hour Reset</Link>
            </div>

            {/* Card 2 — Resale Pickup */}
            <div className="conversion-block">
              <div className="conversion-label">Resale bag pickup.</div>
              <div className="conversion-body">Moving, closet cleanout, post-breakup, wardrobe reset — fill 2 to 4 totes and get them to me same day. The handoff is intentionally easy — pickup, courier, or during another project block.</div>
              <Link href="/contact?offer=pickup" className="btn">Schedule Pickup</Link>
            </div>

          </div>

          {/* Full-width — Move Closeout */}
          <div className="conversion-fullwidth">
            <div className="conversion-label">Need to leave before everything is packed?</div>
            <div className="conversion-body">You go to the new city, the family home, the furnished rental, or the next place first. I stay behind to pack and close out the space — moving what should be stored, routing what should be sold, and shipping what you still need in labeled boxes. Start with a scoped project fee built from hourly work blocks. The move continues in flexible chunks without you carrying the urgency from the other end.</div>
            <Link href="/contact?offer=closeout" className="btn btn-dark">Book the closeout</Link>
          </div>

        </div>
      </section>
      <hr className="divider" />
      {/* SERVICES OVERVIEW */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">

          {/* 01 */}
          <div className="service-card">
            <div className="service-num">01 — Home Organization & Modern Move</div>
            <div className="service-title">Your home, made to work for how you actually live.</div>
            <div className="service-body">
              <p>For the room that keeps collecting piles. The move that technically happened but never settled. The closet that no longer fits your life. I come in, find the friction, and make the space work around how you naturally move through your day.</p>
            </div>
            <div className="service-pricing">$150/hr · 3 hr minimum</div>
            <div className="service-flex-note">Flex pricing and project quotes on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/home-organization" className="btn btn-outline">Book your session</Link>
          </div>

          {/* 02 */}
          <div className="service-card">
            <div className="service-num">02 — Legacy Planning & Inventory Catalog</div>
            <div className="service-title">Clarity without fear.</div>
            <div className="service-body">
              <p>The operational layer of what quietly adds up inside a home. You may already have the estate planner, the will, and the paperwork. My work lives in the operational middle — the things inside the walls that deserve a plan while you're still the one making decisions.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">Project quotes on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/legacy" className="btn btn-outline">Book your time</Link>
          </div>

          {/* 03 */}
          <div className="service-card">
            <div className="service-num">03 — House Calls</div>
            <div className="service-title">For the things life leaves unfinished.</div>
            <div className="service-body">
              <p>That's the thing friends used to do. The thing neighbors don't always have time for anymore. The thing adult children need when they're in another city. Once I know how your home works, it becomes easy for me to help keep it working — home check-ins, tech setup, donation drop-offs, and the practical loose ends that make everyday life easier when someone trusted is paying attention.</p>
            </div>
            <div className="service-pricing">$175/hr · 2 hr minimum</div>
            <div className="service-flex-note">Continuity retainer available. Details on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/house-calls" className="btn btn-outline">Book me</Link>
          </div>

          {/* 04 */}
          <div className="service-card" style={{ borderBottom: "none" }}>
            <div className="service-num">04 — Curated Resale & Consignment</div>
            <div className="service-title">Is it cool? Is it sellable? Will they even take it?</div>
            <div className="service-body">
              <p>For the things that still have value, story, or second-market potential — without asking you to become a part-time reseller. I go through it piece by piece, match each item to the right platform, and handle everything from pickup through payout.</p>
            </div>
            <div className="service-pricing">Commission-based · agreement required</div>
            <div className="service-flex-note">Commission structure and full terms on the <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.</div>
            <Link href="/services/resale" className="btn btn-outline">Schedule it</Link>
          </div>

        </div>
      </section>
      <hr className="divider" />
      {/* TESTIMONIAL */}
      <section style={{ padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="testimonial-block">
            <div className="testimonial-quote">
              "I wake up and my clicker for all my lamps is on my bedside table. I get up and move it to the dresser by the door so every time I come back in I can turn any lamp from the doorway. My clothes are arranged by item and color, my purses on two long shelves and two short ones — I can see what I have and choose accordingly. My shoes are on four shelves where I can easily see them. The heat is set perfectly. The TV is set up with only one clicker to get to all the channels I want. Thank you for making life easier for me."
            </div>
            <div className="testimonial-attr">— Gayle, Seattle &nbsp;·&nbsp; <Link href="/services/house-calls" style={{ color: "var(--rust)", fontWeight: 600 }}>House Calls</Link></div>
          </div>
        </div>
      </section>
      <hr className="divider" />
      {/* CLOSING CTA */}
      <section style={{ padding: "72px 0", background: "var(--char)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "16px" }}>Not sure where to start?</div>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 700, color: "var(--cream)", lineHeight: 1.2, marginBottom: "16px" }}>Start anywhere.</h2>
          <p style={{ fontSize: "15px", color: "var(--sand)", lineHeight: 1.75, marginBottom: "36px" }}>No pressure. The whole point is to make your life easier to navigate from here.</p>
          <Link href="/contact" className="btn btn-rust">Get in Touch</Link>
        </div>
      </section>
    </div>
  );
}
