import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";

/**
 * Intake form — rebuilt to Dayna's 2026-05-30 walkthrough:
 * - The intake form is the front door. No "call/email me instead" in the hero
 *   (direct contact lives in the footer) — raw outreach creates messy contact
 *   info and silence.
 * - No fake quote. No progress bar. No "First question / second question."
 * - Returning clients get ONE question, not two redundant ones.
 * - Picking a service IS the context — only the open-ended paths
 *   (something bigger / not sure / about a parent) ask for freestanding context.
 * - Minimal typing: name, email, and when. Everything else is taps.
 */

function FadeUp({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
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
  return <div ref={ref} className="fade-up">{children}</div>;
}

type Step = "who" | "returning" | "service" | "context" | "info";
type ClientType = "returning" | "new" | "";
type ServiceChoice =
  | "reset" | "house-call" | "closeout"
  | "bigger" | "not-sure" | "for-parent" | "just-talk" | "";

const inputStyle: React.CSSProperties = {
  width: "100%",
  backgroundColor: "white",
  border: "1.5px solid var(--warm-gray-lt)",
  padding: "0.85rem 1rem",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "0.9rem",
  fontWeight: 400,
  color: "var(--ink)",
  outline: "none",
  transition: "border-color 0.18s ease",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.68rem",
  fontWeight: 600,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--sage-dark)",
  marginBottom: "0.5rem",
};

function ChoiceButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "1rem 1.25rem",
        border: `2px solid ${selected ? "var(--ink)" : "var(--warm-gray-lt)"}`,
        backgroundColor: selected ? "var(--ink)" : "white",
        color: selected ? "var(--parchment)" : "var(--ink)",
        fontSize: "0.88rem",
        fontWeight: selected ? 600 : 400,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.15s ease",
        lineHeight: 1.4,
      }}
    >
      {children}
    </button>
  );
}

/** Open-ended paths are the only ones that need freestanding context. */
const NEEDS_CONTEXT: ServiceChoice[] = ["bigger", "not-sure", "for-parent"];

export default function Contact() {
  usePageMeta({
    title: "Book — The Well Lived Citizen, Los Angeles",
    description: "Tell me what you need in a few taps — I'll be in touch within 24 hours to lock the time. Los Angeles & surrounding areas.",
    path: "/contact",
  });
  const [, navigate] = useLocation();
  const [step, setStep] = useState<Step>("who");
  const [history, setHistory] = useState<Step[]>([]);
  const [clientType, setClientType] = useState<ClientType>("");
  const [serviceChoice, setServiceChoice] = useState<ServiceChoice>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", situation: "", bestTime: "" });

  function go(next: Step) {
    setHistory(prev => [...prev, step]);
    setTimeout(() => setStep(next), 80);
  }

  function back() {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const h = [...prev];
      setStep(h.pop() as Step);
      return h;
    });
  }

  function handleChange(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function buildSummary() {
    const choices: Record<ServiceChoice, string> = {
      "reset": "Four-Hour Reset ($495 flat)",
      "house-call": "Two-Hour House Call ($350)",
      "closeout": "Move Wrap-Up — they go ahead, I close out",
      "bigger": "Something bigger — full reset, legacy, or ongoing",
      "not-sure": "Not sure yet — wants a call",
      "for-parent": "Reaching out about a parent or family member",
      "just-talk": "Returning client — wants to get on the phone",
      "": "",
    };
    const base = choices[serviceChoice] || "General inquiry";
    return clientType === "returning" ? `Returning client — ${base}` : base;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const situation = [form.situation, form.bestTime ? `Best time to book: ${form.bestTime}` : ""]
      .filter(Boolean).join("\n");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          clientType,
          summary: buildSummary(),
          situation,
        }),
      });
      const data = await res.json() as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setSubmitError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setSubmitError("Unable to send. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const showedContext = NEEDS_CONTEXT.includes(serviceChoice);

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO (lean — the form IS the page) ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "9rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Book</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.25rem" }}>
              Tell me what you need.
            </h1>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
              A few taps, your name and email, and when. I'll be in touch within 24 hours to lock the time.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      {submitted ? (
        <section style={{ backgroundColor: "var(--parchment)", padding: "8rem 0" }}>
          <div className="container">
              <div style={{ maxWidth: 540 }}>
                <span className="eyebrow eyebrow-sage">Request received</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Got it — I'll be in touch.</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "1rem" }}>
                  You'll hear from me within 24 hours to lock the time.
                </p>
              </div>
          </div>
        </section>
      ) : (
        <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0 7rem" }}>
          <div className="container">
            <FadeUp>
              <div style={{ maxWidth: 620 }}>

                {/* WHO: returning or new */}
                {step === "who" && (
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                      Have we worked together before?
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                      <ChoiceButton selected={clientType === "returning"} onClick={() => { setClientType("returning"); go("returning"); }}>
                        Yes — I'm a returning client
                      </ChoiceButton>
                      <ChoiceButton selected={clientType === "new"} onClick={() => { setClientType("new"); go("service"); }}>
                        No — reaching out for the first time
                      </ChoiceButton>
                    </div>
                  </div>
                )}

                {/* RETURNING: one question, not two */}
                {step === "returning" && (
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "0.5rem" }}>
                      Good to hear from you.
                    </p>
                    <p style={{ fontSize: "0.95rem", fontWeight: 300, color: "var(--sage-dark)", marginBottom: "1.5rem" }}>
                      What do you need this time around?
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                      <ChoiceButton selected={false} onClick={() => navigate("/bag-pickup")}>
                        Schedule a Quick Resale Pickup →
                      </ChoiceButton>
                      <ChoiceButton selected={false} onClick={() => go("service")}>
                        Book a service again
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "just-talk"} onClick={() => { setServiceChoice("just-talk"); go("info"); }}>
                        Just want to get on the phone
                      </ChoiceButton>
                    </div>
                  </div>
                )}

                {/* SERVICE: which one — the pick IS the context */}
                {step === "service" && (
                  <div>
                    <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                      Which sounds most like what you're looking for?
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <ChoiceButton selected={false} onClick={() => navigate("/bag-pickup")}>
                        <span style={{ fontWeight: 700 }}>Quick Resale Pickup →</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Free pickup · Clothing &amp; accessories you're done with. Takes you to the signed pickup request.</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "reset"} onClick={() => { setServiceChoice("reset"); go("info"); }}>
                        <span style={{ fontWeight: 700 }}>Four-Hour Reset</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$495 flat · One focused session in one space</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "house-call"} onClick={() => { setServiceChoice("house-call"); go("info"); }}>
                        <span style={{ fontWeight: 700 }}>Two-Hour House Call</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$350 · Practical help with the everyday stuff</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "closeout"} onClick={() => { setServiceChoice("closeout"); go("info"); }}>
                        <span style={{ fontWeight: 700 }}>Move Wrap-Up</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>You go ahead — I stay and close out the move</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "bigger"} onClick={() => { setServiceChoice("bigger"); go("context"); }}>
                        <span style={{ fontWeight: 700 }}>Something bigger</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Full home reset, legacy inventory, or an ongoing arrangement</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "for-parent"} onClick={() => { setServiceChoice("for-parent"); go("context"); }}>
                        <span style={{ fontWeight: 700 }}>I'm reaching out about a parent or family member</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>House calls, check-ins, home support, or a transition</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "not-sure"} onClick={() => { setServiceChoice("not-sure"); go("context"); }}>
                        <span style={{ fontWeight: 700 }}>I'm not sure — let's just get on the phone</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>We'll figure out what makes sense once we talk</span>
                      </ChoiceButton>
                    </div>
                  </div>
                )}

                {/* CONTEXT: only the open-ended paths land here */}
                {step === "context" && (
                  <div>
                    <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1rem 1.25rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--ink)" }}>{buildSummary()}</p>
                    </div>
                    <div style={{ marginBottom: "1.75rem" }}>
                      <label style={labelStyle}>Tell me what's going on</label>
                      <textarea
                        value={form.situation}
                        onChange={e => handleChange("situation", e.target.value)}
                        style={{ ...inputStyle, minHeight: 140, resize: "vertical" }}
                        placeholder={
                          serviceChoice === "for-parent"
                            ? "Where is the parent located? What's the situation?"
                            : "Tell me what's going on. The more context the better."
                        }
                        onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--sage)"}
                        onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--warm-gray-lt)"}
                      />
                    </div>
                    <button
                      type="button"
                      className="btn btn-ink"
                      onClick={() => go("info")}
                      style={{ width: "100%", justifyContent: "center" }}
                    >
                      Continue →
                    </button>
                  </div>
                )}

                {/* INFO: name, email, and when — that's it */}
                {step === "info" && (
                  <form onSubmit={handleSubmit}>
                    <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1rem 1.25rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                      <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--ink)" }}>{buildSummary()}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={labelStyle}>First &amp; Last Name *</label>
                        <input required type="text" value={form.name} onChange={e => handleChange("name", e.target.value)} style={inputStyle} placeholder="Your full name"
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email *</label>
                        <input required type="email" value={form.email} onChange={e => handleChange("email", e.target.value)} style={inputStyle} placeholder="your@email.com"
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={labelStyle}>Phone</label>
                        <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} style={inputStyle} placeholder="Your phone number"
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                      </div>
                      <div>
                        <label style={labelStyle}>When works for you?</label>
                        <input type="text" value={form.bestTime} onChange={e => handleChange("bestTime", e.target.value)} style={inputStyle} placeholder="e.g. weekday mornings, this Saturday"
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                      </div>
                    </div>

                    {!showedContext && serviceChoice !== "just-talk" && (
                      <div style={{ marginBottom: "1.75rem" }}>
                        <label style={labelStyle}>Anything I should know? <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
                        <input type="text" value={form.situation} onChange={e => handleChange("situation", e.target.value)} style={inputStyle} placeholder="One line is plenty"
                          onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                      </div>
                    )}

                    {submitError && (
                      <div style={{ marginBottom: "1rem" }}>
                        <p style={{ fontSize: "0.85rem", color: "#b94a48", marginBottom: "0.5rem", lineHeight: 1.5 }}>
                          {submitError}
                        </p>
                      </div>
                    )}
                    <button type="submit" disabled={submitting} className="btn btn-ink" style={{ width: "100%", justifyContent: "center", padding: "1rem", opacity: submitting ? 0.65 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
                      {submitting ? "Sending…" : "Send Request"}
                    </button>
                  </form>
                )}

                {history.length > 0 && (
                  <button
                    type="button"
                    onClick={back}
                    style={{ marginTop: "2rem", fontSize: "0.78rem", fontWeight: 500, color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
                  >
                    ← Back
                  </button>
                )}

              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
