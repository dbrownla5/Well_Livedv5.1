import { useEffect, useState } from "react";
import { Link } from "wouter";

export default function Contact() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    document.title = "Get in Touch — The Well Lived Citizen Co";
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitting");

    // Simulate form submission
    setTimeout(() => {
      setFormState("success");
    }, 1500);
  };

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">The Well Lived Citizen Co.</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "520px" }}>
            Tell me what you need. You do not need to have it figured out. Start with what is true right now and I will take it from there.
          </p>
          <p style={{ fontSize: "13px", color: "var(--clay)", marginTop: "8px", fontStyle: "italic" }}>
            The first conversation is always just that — a conversation.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "64px", alignItems: "start" }}>
            {/* FORM */}
            <div>
              {/* Entry paths */}
              <div style={{ marginBottom: "40px" }}>
                <div className="form-label">What brings you here?</div>
                <div className="form-radio-group">
                  <label className="form-radio">
                    <input type="radio" name="need" value="call" />
                    <span><strong>Schedule a call</strong> — I want to talk through what I need first.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="book" />
                    <span><strong>Book a session</strong> — I know what I need and I'm ready to lock it in.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="pickup" />
                    <span><strong>Schedule a pickup or drop-off</strong> — Clothing, items, resale — I just need to hand something off.</span>
                  </label>
                  <label className="form-radio">
                    <input type="radio" name="need" value="notsure" />
                    <span><strong>Not sure yet</strong> — Send me a message and Dayna will figure it out.</span>
                  </label>
                </div>
              </div>

              <form onSubmit={handleSubmit} style={{ display: formState === "success" ? "none" : "block" }}>
                <input type="hidden" name="_subject" value="New Inquiry — The Well Lived Citizen Co" />
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
                  <select className="form-select" id="service" name="service">
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
                  <input className="form-input" type="text" id="bestTime" name="bestTime" placeholder="e.g. weekday mornings, anytime by text" />
                </div>

                <button type="submit" className="form-submit" disabled={formState === "submitting"}>
                  {formState === "submitting" ? "Sending..." : "Send"}
                </button>

                {formState === "error" && (
                  <div style={{ marginTop: "16px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                    <p style={{ fontSize: "13px", color: "var(--char)" }}>
                      Something went wrong. Text directly at (323) 433-1350 or email <a href="mailto:dayna@thewelllivedcitizenco.com" style={{ color: "var(--rust)" }}>dayna@thewelllivedcitizenco.com</a>.
                    </p>
                  </div>
                )}
              </form>

              {formState === "success" && (
                <div style={{ padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                  <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600 }}>Got it.</p>
                  <p style={{ fontSize: "13px", color: "var(--stone)", marginTop: "4px" }}>
                    I'll be in touch within 24 hours. Text (323) 433-1350 if you need something sooner.
                  </p>
                </div>
              )}
            </div>

            {/* Direct contact sidebar */}
            <div style={{ position: "sticky", top: "88px" }}>
              <div style={{ padding: "32px", background: "var(--warm)", border: "1px solid var(--linen)", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>
                  Direct Contact
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <a href="tel:3234331350" style={{ fontSize: "15px", fontWeight: 700, color: "var(--char)", display: "block" }}>(323) 433-1350</a>
                  <div style={{ fontSize: "11px", color: "var(--stone)", marginTop: "2px" }}>Text or call</div>
                </div>
                <div>
                  <a href="mailto:dayna@thewelllivedcitizenco.com" style={{ fontSize: "13px", color: "var(--rust)" }}>dayna@thewelllivedcitizenco.com</a>
                </div>
              </div>
              <div style={{ padding: "24px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>
                  Service Area
                </div>
                <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7 }}>
                  Los Angeles and surrounding areas. Travel by project logic — not radius-limited.
                </p>
                <div style={{ marginTop: "16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "8px" }}>
                  Response Time
                </div>
                <p style={{ fontSize: "13px", color: "var(--stone)" }}>
                  Within 24 hours. Text for urgent requests.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
