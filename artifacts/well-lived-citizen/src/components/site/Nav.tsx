import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        isOpen &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        btnRef.current &&
        !btnRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const handleLinkClick = () => setIsOpen(false);

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-text">The Well Lived Citizen Co</div>
          </Link>
          <div className="nav-links">
            <div className="nav-dropdown">
              <button className="nav-dropdown-trigger">
                Services
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="dropdown-menu">
                <div className="dropdown-menu-inner">
                  <Link href="/services" className="dropdown-header">
                    All Services & Pricing
                  </Link>
                  <Link href="/services/home-organization">Home Organization & Modern Move</Link>
                  <Link href="/services/legacy">Legacy Planning & Inventory Catalog</Link>
                  <Link href="/services/house-calls">House Calls</Link>
                  <Link href="/services/resale">Curated Resale & Consignment</Link>
                  <Link href="/pricing" className="dropdown-footer">
                    View Pricing &rarr;
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/about" className={location === "/about" ? "active" : ""}>
              About
            </Link>
            <Link
              href="/contact"
              className={`nav-cta ${location === "/contact" ? "active" : ""}`}
            >
              Get in Touch
            </Link>
          </div>
          <button
            ref={btnRef}
            className="nav-hamburger"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <div ref={menuRef} className={`mobile-menu ${isOpen ? "open" : ""}`}>
        <Link href="/services" onClick={handleLinkClick}>
          Services & Pricing
        </Link>
        <Link href="/services/home-organization" onClick={handleLinkClick}>
          Home Organization & Modern Move
        </Link>
        <Link href="/services/legacy" onClick={handleLinkClick}>
          Legacy Planning & Inventory Catalog
        </Link>
        <Link href="/services/house-calls" onClick={handleLinkClick}>
          House Calls
        </Link>
        <Link href="/services/resale" onClick={handleLinkClick}>
          Curated Resale & Consignment
        </Link>
        <Link href="/about" onClick={handleLinkClick}>
          About
        </Link>
        <Link href="/contact" onClick={handleLinkClick}>
          Get in Touch
        </Link>
      </div>
    </>
  );
}
