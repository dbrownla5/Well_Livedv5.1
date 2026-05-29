import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

const pillars = [
  { href: "/home-reset-move-support", label: "The Reset", num: "01" },
  { href: "/legacy-planning", label: "Legacy Planning & Inventory", num: "02" },
  { href: "/house-calls-pillar", label: "House Calls", num: "03" },
  { href: "/curated-resale-consignment", label: "Curated Resale & Consignment", num: "04" },
];

const quickBooks = [
  { href: "/the-reset", label: "The 4-Hour Reset" },
  { href: "/house-calls", label: "The 2-Hour House Call" },
  { href: "/fast-bag-fill", label: "The Fast Bag Fill" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [location] = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setServicesOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const topLinks = [
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/faq", label: "FAQs" },
  ];

  const navLinkStyle = (href: string) => ({
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "0.7rem",
    fontWeight: 600,
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: location === href ? "var(--sage)" : "var(--ink)",
    transition: "color 0.18s ease",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
  });

  return (
    <>
      <nav className={`nav-fixed ${scrolled ? "scrolled" : ""}`} style={{ height: 68 }}>
        <div className="container" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          {/* Logo wordmark */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none" }}>
            <img
              src="/assets/wlc-hanger-logo-nobg.png"
              alt="The Well Lived Citizen logo"
              style={{ height: 38, width: "auto", display: "block", flexShrink: 0 }}
            />
            <span style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.22em",
              color: "var(--ink)",
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}>
              THE WELL<br />LIVED CITIZEN
            </span>
          </Link>

          {/* Desktop links */}
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="hidden md:flex">

            {/* Services dropdown */}
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button
                style={navLinkStyle("/services")}
                onClick={() => setServicesOpen(!servicesOpen)}
                onMouseEnter={(e) => { if (location !== "/services") (e.currentTarget.style.color = "var(--sage)"); }}
                onMouseLeave={(e) => { if (!servicesOpen) (e.currentTarget.style.color = location === "/services" ? "var(--sage)" : "var(--ink)"); }}
              >
                Services {servicesOpen ? "↑" : "↓"}
              </button>

              {servicesOpen && (
                <div style={{
                  position: "absolute",
                  top: "calc(100% + 1.25rem)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  backgroundColor: "var(--parchment)",
                  border: "1px solid var(--warm-gray-lt)",
                  boxShadow: "0 8px 32px rgba(56,48,46,0.12)",
                  minWidth: 520,
                  zIndex: 200,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                }}>
                  <div style={{ padding: "1.75rem", borderRight: "1px solid var(--warm-gray-lt)" }}>
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                      Quick Books
                    </p>
                    {quickBooks.map((qb) => (
                      <Link key={qb.href} href={qb.href} style={{
                        display: "block",
                        padding: "0.5rem 0",
                        fontSize: "0.82rem",
                        fontWeight: 400,
                        color: "var(--ink)",
                        borderBottom: "1px solid var(--warm-gray-lt)",
                        transition: "color 0.15s ease",
                      }}
                        onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--sage)"}
                        onMouseLeave={(e) => (e.target as HTMLElement).style.color = "var(--ink)"}
                      >{qb.label}</Link>
                    ))}
                  </div>
                  <div style={{ padding: "1.75rem" }}>
                    <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                      Four Pillars
                    </p>
                    {pillars.map((p) => (
                      <Link key={p.href} href={p.href} style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: "0.5rem",
                        padding: "0.5rem 0",
                        fontSize: "0.82rem",
                        fontWeight: 400,
                        color: "var(--ink)",
                        borderBottom: "1px solid var(--warm-gray-lt)",
                        transition: "color 0.15s ease",
                      }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--sage)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink)")}
                      >
                        <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--sage)", opacity: 0.7, flexShrink: 0 }}>{p.num}</span>
                        {p.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {topLinks.map((l) => (
              <Link key={l.href} href={l.href} style={navLinkStyle(l.href)}
                onMouseEnter={(e) => { if (location !== l.href) (e.currentTarget.style.color = "var(--sage)"); }}
                onMouseLeave={(e) => { (e.currentTarget.style.color = location === l.href ? "var(--sage)" : "var(--ink)"); }}
              >{l.label}</Link>
            ))}

            <Link href="/contact" className="btn btn-ink" style={{ padding: "0.6rem 1.2rem", fontSize: "0.65rem" }}>
              Contact
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            style={{ background: "none", border: "none", padding: "0.5rem", cursor: "pointer", display: "flex", flexDirection: "column", gap: "5px" }}
            onClick={() => setOpen(!open)}
            className="md:hidden"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block",
                width: 22,
                height: 1.5,
                backgroundColor: "var(--ink)",
                transition: "all 0.2s ease",
                transformOrigin: "center",
                transform: open && i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)" : open && i === 1 ? "scaleX(0)" : open && i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)" : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 99,
          backgroundColor: "var(--parchment)",
          paddingTop: "5rem",
          overflowY: "auto",
        }}>
          <div className="container" style={{ paddingTop: "2rem", paddingBottom: "4rem" }}>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                Quick Books
              </p>
              {quickBooks.map((qb) => (
                <Link key={qb.href} href={qb.href} style={{
                  display: "block", padding: "0.85rem 0",
                  fontSize: "1rem", fontWeight: 600, color: "var(--ink)",
                  borderBottom: "1px solid var(--warm-gray-lt)",
                }}>{qb.label}</Link>
              ))}
            </div>
            <div style={{ marginBottom: "2rem" }}>
              <p style={{ fontSize: "0.6rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                Four Pillars
              </p>
              {pillars.map((p) => (
                <Link key={p.href} href={p.href} style={{
                  display: "flex", alignItems: "baseline", gap: "0.75rem",
                  padding: "0.85rem 0", fontSize: "1rem", fontWeight: 400, color: "var(--ink)",
                  borderBottom: "1px solid var(--warm-gray-lt)",
                }}>
                  <span style={{ fontSize: "0.6rem", fontWeight: 700, color: "var(--sage)", flexShrink: 0 }}>{p.num}</span>
                  {p.label}
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {[...topLinks, { href: "/contact", label: "Contact" }].map((l) => (
                <Link key={l.href} href={l.href} style={{
                  display: "block", padding: "0.85rem 0",
                  fontSize: "1rem", fontWeight: 500, color: "var(--ink)",
                  borderBottom: "1px solid var(--warm-gray-lt)",
                }}>{l.label}</Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
