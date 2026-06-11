import { Link } from "wouter";
import { pillars } from "@/content/brand";

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  );
}

const SOCIALS = [
  { href: "https://www.instagram.com/thewelllivedcitizen", label: "@thewelllivedcitizen", icon: <InstagramIcon /> },
  { href: "https://www.instagram.com/thewelllivedcloset", label: "@thewelllivedcloset", icon: <InstagramIcon />, closetLogo: true },
] as { href: string; label: string; icon: React.ReactNode; closetLogo?: boolean }[];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--ink)", paddingTop: "5rem", paddingBottom: "3rem" }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
          paddingBottom: "3rem",
          borderBottom: "1px solid rgba(248,244,227,0.15)"
        }}>
          <div>
            <img
              src="/assets/wlc-hanger-logo-nobg.png"
              alt="The Well Lived Citizen"
              style={{ height: 56, width: "auto", display: "block", marginBottom: "0.75rem", filter: "invert(1) brightness(0.92)" }}
            />
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 800,
              letterSpacing: "0.28em",
              color: "var(--parchment)",
              textTransform: "uppercase",
              marginBottom: "0.5rem"
            }}>
              WELL LIVED<br />CITIZEN
            </div>
            <p style={{ fontSize: "0.8rem", fontWeight: 300, color: "rgba(248,244,227,0.6)", lineHeight: 1.7, marginTop: "1rem", maxWidth: 220 }}>
              One capable person for the things that quietly pile up — handled, so life feels easier to manage again.
            </p>
            <p style={{ fontSize: "0.75rem", color: "rgba(248,244,227,0.45)", marginTop: "0.75rem" }}>
              Los Angeles &amp; surrounding areas.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1.5rem" }}>
              {SOCIALS.map((s) => (
                <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: "0.5rem",
                  fontSize: "0.78rem", fontWeight: 400, color: "rgba(248,244,227,0.55)",
                  transition: "color 0.18s ease", textDecoration: "none",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--parchment)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,227,0.55)")}
                >
                  {s.closetLogo
                    ? <img src="/assets/wlc-closet-logo.png" alt="" style={{ height: 16, width: "auto", opacity: 0.55, filter: "brightness(10)" }} />
                    : s.icon}
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "rgba(248,244,227,0.45)", marginBottom: "1.25rem" }}>Services</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                ...pillars.map((p) => ({ href: p.href, label: p.name })),
                { href: "/services", label: "All Services" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "0.85rem", fontWeight: 400, color: "rgba(248,244,227,0.7)", transition: "color 0.18s ease" }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--parchment)"}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(248,244,227,0.7)"}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "rgba(248,244,227,0.45)", marginBottom: "1.25rem" }}>Company</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { href: "/pricing", label: "Pricing" },
                { href: "/about", label: "About" },
                { href: "/faq", label: "FAQs" },
                { href: "/contact", label: "Get in Touch" },
              ].map((l) => (
                <Link key={l.href} href={l.href} style={{ fontSize: "0.85rem", fontWeight: 400, color: "rgba(248,244,227,0.7)", transition: "color 0.18s ease" }}
                  onMouseEnter={(e) => (e.target as HTMLElement).style.color = "var(--parchment)"}
                  onMouseLeave={(e) => (e.target as HTMLElement).style.color = "rgba(248,244,227,0.7)"}
                >{l.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="eyebrow" style={{ color: "rgba(248,244,227,0.45)", marginBottom: "1.25rem" }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <a href="tel:3234331350" style={{ fontSize: "0.85rem", color: "rgba(248,244,227,0.7)" }}>(323) 433-1350</a>
              <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "0.85rem", color: "rgba(248,244,227,0.7)" }}>dayna@thewelllivedcitizen.com</a>
              <div style={{ marginTop: "0.5rem" }}>
                <Link href="/contact" className="btn btn-outline-light" style={{ padding: "0.6rem 1.2rem", fontSize: "0.65rem" }}>
                  Schedule a Call
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: "0.72rem", color: "rgba(248,244,227,0.35)", fontWeight: 300 }}>
            © 2026 The Well Lived Citizen. Los Angeles.
          </p>
          <div style={{ display: "flex", gap: "1.25rem", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={{ color: "rgba(248,244,227,0.35)", transition: "color 0.18s ease" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(248,244,227,0.8)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(248,244,227,0.35)")}
              >{s.icon}</a>
            ))}
            <p style={{ fontSize: "0.72rem", color: "rgba(248,244,227,0.35)", fontWeight: 300, margin: 0 }}>
              Well Dressed Citizen LLC · Est. 2020
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
