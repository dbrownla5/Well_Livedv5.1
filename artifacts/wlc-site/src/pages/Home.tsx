import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";
import { hero, entryOffers } from "@/content/brand";

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  return <div ref={ref} className={`fade-up ${className}`}>{children}</div>;
}

/** Find an entry offer by id (name + price + href come from brand.ts; description is Dayna's verbatim copy). */
function offer(id: string) {
  return entryOffers.find((o) => o.id === id)!;
}

// Quick Start cards — name/price/href from brand.ts entryOffers, descriptions are Dayna's verbatim copy.
const QUICK_STARTS: { id: string; name: string; price: string; href: string; desc: string }[] = [
  {
    id: "reset",
    name: "Four Hour Reset",
    price: "$495",
    href: offer("reset").href,
    desc:
      'The specific room, the singular task, the aftermath of a party, or the "my mother-in-law is coming" panic. That one looming project ruining your week. Let\'s just get it handled.',
  },
  {
    id: "house-call",
    name: "House Call",
    price: "$350",
    href: offer("house-call").href,
    desc:
      "The things nobody really has a category for—tech setup, logistics, errands, and all those small details that a helpful neighbor used to handle for you.",
  },
  {
    id: "resale-pickup",
    name: "Quick Resale Pickup",
    price: "Commission Based",
    href: offer("resale-pickup").href,
    desc:
      "A hands-off way to clear the bags from your hallway, porch, or trunk — you know the ones, that have been following you around for two years. I sort, list, and sell; you get paid on what sells, nothing out of pocket.",
  },
  {
    id: "move-closeout",
    name: "Move Wrap-Up",
    price: "$150/hr",
    href: offer("move-closeout").href,
    desc:
      'The truck\'s gone but the move isn\'t done — the half-unpacked rooms, the boxes marked "misc," the stuff that never got a home. I close the loop so it actually feels moved-in.',
  },
];

const CORE_SERVICES: { name: string; href: string }[] = [
  { name: "Home Organization & Move Support", href: "/home-reset-move-support" },
  { name: "House Calls", href: "/house-calls-pillar" },
  { name: "Legacy Inventory & Cataloging", href: "/legacy-planning" },
  { name: "Resale & Consignment", href: "/curated-resale-consignment" },
];

export default function Home() {
  usePageMeta({
    title: "The Well Lived Citizen — Chaos Wrangler. Professional Problem Solver. · Los Angeles",
    description: "One person for the move, the resale, the storage unit, and the other thing currently ruining your week. Home organization, house calls, legacy inventory, and resale in greater Los Angeles.",
    path: "/",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", minHeight: "100vh", display: "flex", alignItems: "center", padding: "9rem 0 5rem" }}>
        <div className="container" style={{ width: "100%" }}>
          <FadeUp>
            <span className="eyebrow eyebrow-light" style={{ marginBottom: "2rem" }}>The Well Lived Citizen · Los Angeles</span>
            <h1 className="display-xl" style={{ color: "var(--parchment)", maxWidth: 900 }}>
              {hero.headline}
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ── SUBHERO ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6.5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              <p style={{ fontSize: "1.15rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                You find me when you've typed:
              </p>
              <p style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--ink)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
                "Is there a person who..."
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2rem", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
                {[
                  "...can help me figure out what to do with all this baby stuff?",
                  "...can help me finish unpacking after a move that technically happened six months ago?",
                  "...can help me deal with the storage unit that was supposed to be temporary?",
                  "...can help me figure out what to keep, sell, donate, or stop paying to store?",
                  "...can help my parents without making it a whole thing?",
                  "...can just help me get this handled?",
                ].map((line, i) => (
                  <li key={i} style={{ fontSize: "1.05rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6, paddingLeft: "1.25rem", borderLeft: "2px solid var(--sage)" }}>
                    {line}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.8, marginBottom: "0.5rem" }}>
                Usually what you need falls somewhere between categories.
              </p>
              <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", lineHeight: 1.8 }}>
                I'm Dayna.
              </p>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── RECOGNITION ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6.5rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 820 }}>
              {[
                "The things nobody really has a category for.",
                "The nursery after the baby shower.",
                "The move that technically happened six months ago.",
                "The storage unit that started as temporary.",
                "The closet that's worth dealing with but somehow never becomes today's priority.",
                "The parent who swears they don't need help.",
                "The project that's been following you around for two years.",
              ].map((line, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "clamp(1.15rem, 2.2vw, 1.5rem)",
                    fontWeight: 300,
                    color: i === 0 ? "var(--parchment)" : "rgba(248,244,227,0.72)",
                    lineHeight: 1.5,
                    marginBottom: "1rem",
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── QUICK STARTS ── */}
      <section style={{ backgroundColor: "var(--parchment-mid)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Start here</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "3.5rem", marginTop: "0.5rem" }}>
              Easy ways most people start:
            </h2>
          </FadeUp>

          <div
            className="grid-cols-1 md:grid-cols-2"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5px", backgroundColor: "var(--warm-gray-lt)" }}
          >
            {QUICK_STARTS.map((card, i) => (
              <FadeUp key={card.id} delay={i * 60}>
                <div style={{ backgroundColor: "var(--parchment)", padding: "2.5rem", height: "100%", display: "flex", flexDirection: "column" }}>
                  <h3 className="display-sm" style={{ color: "var(--ink)", marginBottom: "0.4rem" }}>{card.name}</h3>
                  <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--sage-dark)", letterSpacing: "0.04em", marginBottom: "1.25rem" }}>{card.price}</p>
                  <p style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.8, color: "var(--ink-soft)", marginBottom: "2rem", flexGrow: 1 }}>
                    {card.desc}
                  </p>
                  <div>
                    <Link href={card.href} className="btn btn-ink">Book Now</Link>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ── */}
      <section style={{ backgroundColor: "var(--parchment)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow eyebrow-sage">Core Services</span>
            <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "2.5rem", marginTop: "0.5rem" }}>
              Or if it's bigger than that:
            </h2>
          </FadeUp>
          <div style={{ display: "grid", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
            {CORE_SERVICES.map((s, i) => (
              <FadeUp key={s.href} delay={i * 40}>
                <Link href={s.href}>
                  <div
                    style={{
                      backgroundColor: "var(--parchment)", padding: "1.75rem 2.5rem",
                      display: "flex", alignItems: "center", justifyContent: "space-between", gap: "2rem",
                      transition: "background-color 0.18s ease", cursor: "pointer",
                    }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment-mid)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.backgroundColor = "var(--parchment)"}
                  >
                    <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--ink)" }}>{s.name}</h3>
                    <span style={{ color: "var(--sage)", fontSize: "1.2rem", fontWeight: 300, flexShrink: 0 }}>→</span>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIDGE (closer) ── */}
      <section style={{ backgroundColor: "var(--sage)", padding: "7rem 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ maxWidth: 760 }}>
              {[
                "Life creates a lot to manage.",
                "Moves. Closets. Collections. Storage units. New babies. Family homes. The project that's been sitting in the corner for six months. The thing you'd handle yourself if you had the time, energy, or desire to become a part-time project manager.",
                "I help with the practical realities of living—home organization, move support, inventory cataloging, resale, house calls, and the dozens of details that somehow don't fit neatly into one service.",
                "One person instead of four strangers - one person who gets to know you, your home, how it all works.",
                "Most people address the clutter. I address the friction underneath it.",
                "Giving you clarity, ease and more time for living well.",
                "That's the work.",
              ].map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: i === 0 ? "clamp(1.4rem, 3vw, 2rem)" : "1.1rem",
                    fontWeight: i === 0 ? 700 : 300,
                    color: "var(--ink)",
                    lineHeight: i === 0 ? 1.25 : 1.85,
                    marginBottom: i === 0 ? "2rem" : "1.5rem",
                    opacity: i === 0 ? 1 : 0.9,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── NEXT STEPS ── */}
      <section style={{ backgroundColor: "var(--ink)", padding: "6rem 0" }}>
        <div className="container">
          <FadeUp>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Next steps</span>
            <div
              className="grid-cols-1 md:grid-cols-2"
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 4rem", marginTop: "1.5rem", maxWidth: 820 }}
            >
              {[
                { label: "Service Pages", href: "/services" },
                { label: "More About Me", href: "/about" },
                { label: "Pricing", href: "/pricing" },
                { label: "Contact Me", href: "/contact" },
                { label: "FAQ", href: "/faq" },
                { label: "Book Now", href: "/contact" },
              ].map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "1.1rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)",
                    fontSize: "1rem", fontWeight: 500, color: "var(--parchment)",
                    transition: "opacity 0.15s ease",
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
                >
                  <span>{l.label}</span>
                  <span style={{ color: "var(--sage)", flexShrink: 0, marginLeft: "1rem" }}>→</span>
                </Link>
              ))}

              {/* Testimonials and Socials → Instagram */}
              <a
                href="https://www.instagram.com/thewelllivedcitizen"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.1rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)",
                  fontSize: "1rem", fontWeight: 500, color: "var(--parchment)",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.opacity = "0.65"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.opacity = "1"}
              >
                <span>Testimonials and Socials</span>
                <span style={{ color: "var(--sage)", flexShrink: 0, marginLeft: "1rem" }}>→</span>
              </a>

              {/* Client Portal — Resale Only · coming soon (not a link) */}
              <div
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.1rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)",
                  fontSize: "1rem", fontWeight: 500, color: "rgba(248,244,227,0.45)",
                }}
              >
                <span>Client Portal — Resale Only</span>
                <span style={{ fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--sage)", flexShrink: 0, marginLeft: "1rem" }}>Coming soon</span>
              </div>

              {/* Gallery · coming soon (not a link) */}
              <div
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "1.1rem 0", borderBottom: "1px solid rgba(248,244,227,0.12)",
                  fontSize: "1rem", fontWeight: 500, color: "rgba(248,244,227,0.45)",
                }}
              >
                <span>Gallery</span>
                <span style={{ fontSize: "0.82rem", fontWeight: 400, color: "rgba(248,244,227,0.45)", flexShrink: 0, marginLeft: "1rem" }}>(Gallery coming soon)</span>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
