import { Link } from "wouter";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
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
              <a
                href="https://instagram.com/thewelllivedcitizen"
                target="_blank"
                rel="noopener"
                aria-label="Instagram — Main"
                title="Instagram · Main"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <span className="footer-social-label">Main</span>
            </div>
            <div className="footer-social-item">
              <a
                href="https://instagram.com/thewelllivedcloset"
                target="_blank"
                rel="noopener"
                aria-label="Instagram — Closet"
                title="Instagram · Closet"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <span className="footer-social-label">Closet</span>
            </div>
            <div className="footer-social-item">
              <a
                href="https://facebook.com/thewelllivedcitizen"
                target="_blank"
                rel="noopener"
                aria-label="Facebook"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <span className="footer-social-label">FB</span>
            </div>
          </div>
        </div>
        <div className="footer-links">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Get in Touch</Link>
        </div>
        <div className="footer-copy">&copy; 2026 The Well Lived Citizen &middot; Los Angeles, CA</div>
      </div>
    </footer>
  );
}
