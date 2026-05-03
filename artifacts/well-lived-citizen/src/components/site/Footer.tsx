import { Link } from "wouter";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        {/* Brand */}
        <div>
          <img
            src={`${import.meta.env.BASE_URL}images/logo-black.png`}
            alt="The Well Lived Citizen"
            style={{ height: "48px", width: "auto", marginBottom: "12px" }}
          />
          <div className="footer-brand">The Well Lived Citizen</div>
          <div className="footer-loc">Los Angeles, CA</div>
          <div className="footer-legal">Well Dressed Citizen LLC</div>
          <div className="footer-social">
            <div className="footer-social-item">
              <a href="https://instagram.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Instagram — Main" title="Instagram · Main">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <span className="footer-social-label">Main</span>
            </div>
            <div className="footer-social-item">
              <a href="https://instagram.com/thewelllivedcloset" target="_blank" rel="noopener" aria-label="Instagram — Closet" title="Instagram · Closet">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <span className="footer-social-label">Closet</span>
            </div>
            <div className="footer-social-item">
              <a href="https://facebook.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <span className="footer-social-label">FB</span>
            </div>
          </div>
        </div>

        {/* Services nav */}
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--clay)", marginBottom: "14px" }}>Services</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/services/home-organization" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Home Organization & Move
            </Link>
            <Link href="/services/legacy" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Legacy Planning & Catalog
            </Link>
            <Link href="/services/house-calls" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              House Calls
            </Link>
            <Link href="/services/resale" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Curated Resale & Consignment
            </Link>
          </div>

          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--clay)", margin: "24px 0 14px" }}>The Well Lived Closet</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <a href="https://posh.mk/HLUmmsrzq2b" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Shop Poshmark →
            </a>
            <a href="https://ebay.us/m/cUjlUb" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Shop eBay →
            </a>
            <a href="https://instagram.com/thewelllivedcloset" target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--rust)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--stone)")}>
              Follow on Instagram →
            </a>
          </div>
        </div>

        {/* Site links */}
        <div>
          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--clay)", marginBottom: "14px" }}>Navigate</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link href="/pricing" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none" }}>Pricing</Link>
            <Link href="/about" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none" }}>About</Link>
            <Link href="/contact" style={{ fontSize: "12px", color: "var(--stone)", textDecoration: "none" }}>Get in Touch</Link>
          </div>
        </div>

        <div className="footer-copy">&copy; 2026 The Well Lived Citizen &middot; Los Angeles, CA</div>
      </div>
    </footer>
  );
}
