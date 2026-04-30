import { useState, FormEvent } from "react";
import { Link } from "wouter";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch("https://formspree.io/f/xreojkvo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">The Well Lived Citizen</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>Get in Touch</h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "520px" }}>Tell me what you need. You do not need to have it figured out. Start with what is true right now and I will take it from there.</p>
          <p style={{ fontSize: "13px", color: "var(--clay)", marginTop: "8px", fontStyle: "italic" }}>The first conversation is always just that — a conversation.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "64px", alignItems: "start" }} className="contact-grid">
            {/* FORM */}
            <div>
              {/* Entry paths */}
              <div style={{ marginBottom: "40px" }}>
                <div className="form-label">What brings you here?</div>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input type="radio" name="need" value="call" />{" "}
                    <span><strong>Schedule a call</strong> — I want to talk through what I need first.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="book" />{" "}
                    <span><strong>Book a session</strong> — I know what I need and I'm ready to lock it in.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="pickup" />{" "}
                    <span><strong>Schedule a pickup or drop-off</strong> — Clothing, items, resale — I just need to hand something off.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="notsure" />{" "}
                    <span><strong>Not sure yet</strong> — Send me a message and I'll figure it out with you.</span>
                  </label>
                </div>
              </div>

              {status === "success" ? (
                <div style={{ marginTop: "16px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                  <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600 }}>Got it.</p>
                  <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "4px" }}>I'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <input type="hidden" name="_subject" value="New Inquiry — The Well Lived Citizen" />
                  <input type="text" name="_gotcha" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

                  <div className="form-field">
                    <label className="form-label" htmlFor="fullName">Your name</label>
                    <input className="form-input" type="text" id="fullName" name="fullName" required placeholder="First and last name" />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input className="form-input" type="email" id="email" name="email" required placeholder="your@email.com" />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="phone">Phone</label>
                    <input className="form-input" type="tel" id="phone" name="phone" placeholder="(000) 000-0000" />
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="service">Which service?</label>
                    <select className="form-select" id="service" name="service" defaultValue="">
                      <option value="">— Select —</option>
                      <option value="home-org">Home Organization & Modern Move</option>
                      <option value="legacy">Legacy Planning & Inventory Catalog</option>
                      <option value="house-calls">House Calls</option>
                      <option value="resale">Curated Resale & Consignment</option>
                      <option value="notsure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="realLife">What's the real-life version?</label>
                    <textarea className="form-textarea" id="realLife" name="realLife" placeholder="Two sentences is enough. What changed, what's actually happening?"></textarea>
                  </div>

                  <div className="form-field">
                    <label className="form-label" htmlFor="bestTime">Best time to reach you</label>
                    <input className="form-input" type="text" id="bestTime" name="bestTime" placeholder="e.g. weekday mornings, anytime by email" />
                  </div>

                  <button type="submit" className="form-submit" disabled={status === "sending"}>
                    {status === "sending" ? "Sending..." : "Send"}
                  </button>

                  {status === "error" && (
                    <div style={{ marginTop: "16px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                      <p style={{ fontSize: "13px", color: "var(--char)" }}>
                        Something went wrong sending that. Please email{" "}
                        <a href="mailto:dayna@thewelllivedcitizen.com" style={{ color: "var(--rust)", fontWeight: 600 }}>dayna@thewelllivedcitizen.com</a> directly.
                      </p>
                    </div>
                  )}
                </form>
              )}
            </div>

            {/* Direct contact sidebar */}
            <div style={{ position: "sticky", top: "calc(var(--nav-h) + 16px)" }}>
              <div style={{ padding: "32px", background: "var(--warm)", border: "1px solid var(--linen)", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>Direct Contact</div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6, marginBottom: "10px" }}>The fastest way to reach me is the form on this page.</div>
                  <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "13px", color: "var(--rust)" }}>dayna@thewelllivedcitizen.com</a>
                </div>
                <div className="contact-social">
                  <a href="https://instagram.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://facebook.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Facebook" title="Facebook">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div style={{ padding: "24px", background: "var(--warm)", border: "1px solid var(--linen)", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>Payment</div>
                <p style={{ fontSize: "12px", color: "var(--stone)", lineHeight: 1.6, marginBottom: "12px" }}>Zelle using the email below.</p>
                <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "12px", color: "var(--rust)", display: "block", marginTop: "4px" }}>dayna@thewelllivedcitizen.com</a>
                <Link href="/pricing#payment" style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "block", marginTop: "10px", textDecoration: "none" }}>Payment details →</Link>
              </div>
              <div style={{ padding: "24px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>Service Area</div>
                <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7 }}>Los Angeles and surrounding areas.</p>
                <div style={{ marginTop: "16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "8px" }}>Response Time</div>
                <p style={{ fontSize: "13px", color: "var(--stone)" }}>Within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
