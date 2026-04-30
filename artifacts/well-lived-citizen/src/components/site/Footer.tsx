import { Link } from "wouter";

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-brand" style={{ fontSize: "16px", marginBottom: "12px" }}>The Well Lived Citizen Co</div>
          <div className="footer-loc">Los Angeles, CA</div>
          <div className="footer-legal">The Well Lived Citizen Co., a DBA of Well Dressed Citizen LLC</div>
        </div>
        <div className="footer-links">
          <Link href="/services">Services</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Get in Touch</Link>
        </div>
        <div className="footer-copy">&copy; 2026 The Well Lived Citizen Co &middot; Los Angeles, CA</div>
      </div>
    </footer>
  );
}
