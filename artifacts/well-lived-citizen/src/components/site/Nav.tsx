import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      if (
        servicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen, servicesOpen]);

  const handleLinkClick = () => { setIsOpen(false); setServicesOpen(false); };

  return (
    <>
      <nav className={scrolled ? "nav-scrolled" : "nav-top"}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src={`${import.meta.env.BASE_URL}images/logo-transparent.png`} alt="The Well Lived Citizen" />
          </Link>
          <div className="nav-links">
            <div ref={dropdownRef} className={`nav-dropdown${servicesOpen ? " open" : ""}`}>
              <button
                className="nav-dropdown-trigger"
                onClick={() => setServicesOpen(!servicesOpen)}
                aria-expanded={servicesOpen}
              >
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
                  <Link href="/services/home-organization" onClick={handleLinkClick}
                    style={location === "/services/home-organization" ? { color: "var(--rust)" } : undefined}
                  >
                    01 — Home Organization & Modern Move
                  </Link>
                  <Link href="/services/legacy" onClick={handleLinkClick}
                    style={location === "/services/legacy" ? { color: "var(--rust)" } : undefined}
                  >
                    02 — Legacy Planning & Inventory Catalog
                  </Link>
                  <Link href="/services/house-calls" onClick={handleLinkClick}
                    style={location === "/services/house-calls" ? { color: "var(--rust)" } : undefined}
                  >
                    03 — House Calls
                  </Link>
                  <Link href="/services/resale" onClick={handleLinkClick}
                    style={location === "/services/resale" ? { color: "var(--rust)" } : undefined}
                  >
                    04 — Curated Resale & Consignment
                  </Link>
                  <Link href="/pricing" onClick={handleLinkClick} className="dropdown-footer">
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
