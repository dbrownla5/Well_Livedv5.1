import { useState, useEffect, useRef } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";

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

type ClientType = "returning" | "new" | "";
type ServiceChoice =
  | "fast-bag" | "reset" | "house-call" | "closeout"
  | "bigger" | "not-sure" | "for-parent" | "";
type ReturningNeed = "book-again" | "bag-pickup" | "just-talk" | "";

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

export default function Contact() {
  usePageMeta({
    title: "Contact Dayna Brown — The Well Lived Citizen, Los Angeles",
    description: "Schedule a call, send a message, or text directly. (323) 433-1350 · dayna@thewelllivedcitizen.com. Based in Los Angeles.",
    path: "/contact",
  });
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [clientType, setClientType] = useState<ClientType>("");
  const [serviceChoice, setServiceChoice] = useState<ServiceChoice>("");
  const [returningNeed, setReturningNeed] = useState<ReturningNeed>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", neighborhood: "", situation: "", bagsCount: "", urgency: "", pickupTime1: "", pickupTime2: "", pickupMethod: "", pickupRelease: false, courierNotes: "", agreementAccepted: false, estimatedItems: "" });

  function pick<T>(setter: (v: T) => void, val: T, next: 0 | 1 | 2 | 3) {
    setter(val);
    setTimeout(() => setStep(next), 80);
  }

  function handleChange(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function buildSummary() {
    if (clientType === "returning") {
      const needs: Record<ReturningNeed, string> = {
        "book-again": "Book a service again",
        "bag-pickup": "Schedule a bag pickup",
        "just-talk": "Just want to talk",
        "": "",
      };
      return needs[returningNeed] || "Returning client";
    }
    const choices: Record<ServiceChoice, string> = {
      "fast-bag": "Fast Bag Fill — free pickup",
      "reset": "The 4-Hour Reset ($495 flat)",
      "house-call": "The 2-Hour House Call ($175/hr)",
      "closeout": "The Closeout — transitioning a whole space",
      "bigger": "Something bigger — full reset, legacy, or ongoing",
      "not-sure": "Not sure yet — wants a call",
      "for-parent": "Reaching out about a parent or family member",
      "": "",
    };
    return choices[serviceChoice] || "";
  }

  function getPlaceholder() {
    if (clientType === "returning") return "What are you working with? Any context is helpful.";
    if (serviceChoice === "reset") return "What space are you thinking? Closet, bedroom, post-move? Any backstory?";
    if (serviceChoice === "fast-bag") return "What kind of clothing and accessories are you looking to move on? A rough description is fine.";
    if (serviceChoice === "house-call") return "What's been on the list? What needs attention?";
    if (serviceChoice === "closeout") return "What's the situation? Moving, transitioning a parent's home, downsizing?";
    if (serviceChoice === "bigger") return "Tell me what's going on. The more context the better.";
    if (serviceChoice === "for-parent") return "Where is the parent located? What's the situation?";
    return "What's going on? What do you need help with?";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    const summary = buildSummary();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          neighborhood: form.neighborhood,
          clientType,
          summary: summary || "General",
          situation: form.situation,
          bagsCount: form.bagsCount,
          urgency: form.urgency,
          pickupTime1: form.pickupTime1,
          pickupTime2: form.pickupTime2,
          pickupMethod: form.pickupMethod,
          pickupRelease: form.pickupRelease,
          courierNotes: form.courierNotes,
          agreementAccepted: form.agreementAccepted,
          estimatedItems: form.estimatedItems,
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

  const progressPct = step === 0 ? 10 : step === 1 ? 40 : step === 2 ? 75 : 100;

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "5rem", alignItems: "center" }}>
            <div>
              <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Get in Touch</span>
              <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
                Let's figure out<br />what you need.
              </h1>
              <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
                A few quick questions — then I'll be in touch within 24 hours to schedule a call. No pressure, no commitment.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ backgroundColor: "rgba(248,244,227,0.06)", border: "1px solid rgba(248,244,227,0.12)", padding: "1.75rem" }}>
                <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--parchment)", marginBottom: "1rem" }}>Prefer to reach out directly?</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  <a href="tel:3234331350" style={{ fontSize: "0.9rem", fontWeight: 400, color: "rgba(248,244,227,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--sage)", fontSize: "0.65rem", fontWeight: 700 }}>CALL</span>(323) 433-1350
                  </a>
                  <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "0.9rem", fontWeight: 400, color: "rgba(248,244,227,0.75)", textDecoration: "none", display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span style={{ color: "var(--sage)", fontSize: "0.65rem", fontWeight: 700 }}>EMAIL</span>dayna@thewelllivedcitizen.com
                  </a>
                </div>
              </div>
              <div style={{ backgroundColor: "var(--sage)", padding: "1.25rem 1.75rem" }}>
                <p style={{ fontSize: "0.85rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.65 }}>
                  I respond to every inquiry personally. You won't get an auto-reply and then silence.
                </p>
                <p style={{ fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(56,48,46,0.55)", marginTop: "0.6rem" }}>— Dayna</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      {submitted ? (
        <section style={{ backgroundColor: "var(--parchment)", padding: "8rem 0" }}>
          <div className="container">
            {(serviceChoice === "fast-bag" || returningNeed === "bag-pickup") ? (
              <div style={{ maxWidth: 580 }}>
                <span className="eyebrow eyebrow-sage">You're on the calendar.</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Agreement signed. Pickup request received.</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  I'll reach out within 24 hours to confirm the pickup window and lock in the logistics.
                </p>

                {/* Pickup details echo */}
                <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1.5rem", marginBottom: "1.5rem", borderLeft: "3px solid var(--sage)" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>Your Pickup Details</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {form.bagsCount && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Bags</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>{form.bagsCount}</span>
                      </div>
                    )}
                    {form.estimatedItems && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Est. item count</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>{form.estimatedItems}</span>
                      </div>
                    )}
                    {form.urgency && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Urgency</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>{form.urgency}</span>
                      </div>
                    )}
                    {form.pickupTime1 && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Window 1</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>{form.pickupTime1}</span>
                      </div>
                    )}
                    {form.pickupTime2 && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Window 2</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>{form.pickupTime2}</span>
                      </div>
                    )}
                    {form.pickupMethod && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Method</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>
                          {form.pickupMethod === "in-person" && "In-person pickup"}
                          {form.pickupMethod === "ups" && "UPS label"}
                          {form.pickupMethod === "courier" && "Uber courier"}
                        </span>
                      </div>
                    )}
                  </div>
                  {form.pickupMethod === "ups" && (
                    <p style={{ fontSize: "0.82rem", color: "var(--sage-dark)", marginTop: "1rem", lineHeight: 1.6 }}>
                      You'll receive a prepaid UPS label via email before the pickup date.
                    </p>
                  )}
                  {form.pickupMethod === "courier" && (
                    <p style={{ fontSize: "0.82rem", color: "var(--sage-dark)", marginTop: "1rem", lineHeight: 1.6 }}>
                      Courier details will be confirmed via text.
                    </p>
                  )}
                </div>

                {/* What comes next */}
                <div style={{ border: "1.5px solid var(--warm-gray-lt)", padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>What happens next</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {[
                      "I'll confirm your pickup window within 24 hours.",
                      "After I receive the bags, I'll verify item count and send you the full inventory.",
                      "Once evaluated, you'll get a proposed listing — every item, platform, and starting price.",
                      "You'll have 24 hours to approve or pull any items. Once you approve, your 30-day cycle begins.",
                    ].map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.85rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                        <span style={{ color: "var(--sage)", fontWeight: 700, flexShrink: 0 }}>0{i + 1}</span>{line}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ maxWidth: 540 }}>
                <span className="eyebrow eyebrow-sage">Message Sent</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Thank you — I'll be in touch.</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "1rem" }}>
                  Got it — I'll be in touch within 24 hours.
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section style={{ backgroundColor: "var(--parchment)", padding: "5rem 0 7rem" }}>
          <div className="container">
            <FadeUp>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "5rem", alignItems: "start" }}>

                {/* ── SIDEBAR ── */}
                <div style={{ position: "sticky", top: "7rem" }}>
                  <div style={{ marginBottom: "2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage-dark)" }}>
                        Progress
                      </span>
                      <span style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--sage-dark)" }}>{progressPct}%</span>
                    </div>
                    <div style={{ height: 3, backgroundColor: "var(--warm-gray-lt)", width: "100%" }}>
                      <div style={{ height: "100%", width: `${progressPct}%`, backgroundColor: "var(--sage)", transition: "width 0.4s ease" }} />
                    </div>
                  </div>

                  <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1rem", lineHeight: 1.2 }}>
                    {step === 0 && "First question."}
                    {step === 1 && clientType === "returning" && "Good to hear from you."}
                    {step === 1 && clientType === "new" && "What brings you in?"}
                    {step === 2 && "A little context."}
                    {step === 3 && "Almost done."}
                  </h2>
                  <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.75 }}>
                    {step === 0 && "This helps me know how to best prepare for the call."}
                    {step === 1 && clientType === "returning" && "What do you need this time around?"}
                    {step === 1 && clientType === "new" && "Pick the one that sounds most like your situation. You can always change it on the call."}
                    {step === 2 && "The more context you give me, the more useful the first conversation will be. Nothing here is binding."}
                    {step === 3 && "Where should I reach you?"}
                  </p>

                  {step > 0 && (
                    <button
                      type="button"
                      onClick={() => setStep(prev => (prev - 1) as 0 | 1 | 2 | 3)}
                      style={{ marginTop: "2rem", fontSize: "0.78rem", fontWeight: 500, color: "var(--sage-dark)", background: "none", border: "none", cursor: "pointer", padding: 0, textDecoration: "underline" }}
                    >
                      ← Back
                    </button>
                  )}
                </div>

                {/* ── FORM STEPS ── */}
                <div>

                  {/* STEP 0: Returning or New */}
                  {step === 0 && (
                    <div>
                      <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                        Have we worked together before?
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                        <ChoiceButton selected={clientType === "returning"} onClick={() => pick(setClientType, "returning", 1)}>
                          Yes — I'm a returning client
                        </ChoiceButton>
                        <ChoiceButton selected={clientType === "new"} onClick={() => pick(setClientType, "new", 1)}>
                          No — reaching out for the first time
                        </ChoiceButton>
                      </div>
                    </div>
                  )}

                  {/* STEP 1A: Returning — what do you need */}
                  {step === 1 && clientType === "returning" && (
                    <div>
                      <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                        What would you like to do?
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                        <ChoiceButton selected={returningNeed === "book-again"} onClick={() => pick(setReturningNeed, "book-again", 2)}>
                          Book a service again
                        </ChoiceButton>
                        <ChoiceButton selected={returningNeed === "bag-pickup"} onClick={() => pick(setReturningNeed, "bag-pickup", 2)}>
                          Schedule a bag pickup
                        </ChoiceButton>
                        <ChoiceButton selected={returningNeed === "just-talk"} onClick={() => pick(setReturningNeed, "just-talk", 2)}>
                          Just want to get on the phone
                        </ChoiceButton>
                      </div>
                    </div>
                  )}

                  {/* STEP 1B: New — which service */}
                  {step === 1 && clientType === "new" && (
                    <div>
                      <p style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--ink)", marginBottom: "1.5rem" }}>
                        Which sounds most like what you're looking for?
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        <ChoiceButton selected={serviceChoice === "fast-bag"} onClick={() => pick(setServiceChoice, "fast-bag", 2)}>
                          <span style={{ fontWeight: 700 }}>Fast Bag Fill</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Free pickup · Clothing, accessories, items I'm ready to let go</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "reset"} onClick={() => pick(setServiceChoice, "reset", 2)}>
                          <span style={{ fontWeight: 700 }}>The 4-Hour Reset</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$495 flat · One focused session in one space</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "house-call"} onClick={() => pick(setServiceChoice, "house-call", 2)}>
                          <span style={{ fontWeight: 700 }}>The 2-Hour House Call</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$175/hr · Practical help with the everyday stuff</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "closeout"} onClick={() => pick(setServiceChoice, "closeout", 2)}>
                          <span style={{ fontWeight: 700 }}>The Closeout</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>You go first, I close out — whole-space transition</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "bigger"} onClick={() => pick(setServiceChoice, "bigger", 2)}>
                          <span style={{ fontWeight: 700 }}>Something bigger</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Full home reset, legacy planning, or an ongoing arrangement</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "for-parent"} onClick={() => pick(setServiceChoice, "for-parent", 2)}>
                          <span style={{ fontWeight: 700 }}>I'm reaching out about a parent or family member</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>House calls, check-ins, home support, or a transition</span>
                        </ChoiceButton>
                        <ChoiceButton selected={serviceChoice === "not-sure"} onClick={() => pick(setServiceChoice, "not-sure", 2)}>
                          <span style={{ fontWeight: 700 }}>I'm not sure — let's just get on the phone</span><br />
                          <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>I'll figure out what makes sense once we talk</span>
                        </ChoiceButton>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Context */}
                  {step === 2 && (
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
                          placeholder={getPlaceholder()}
                          onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--sage)"}
                          onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = "var(--warm-gray-lt)"}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-ink"
                        onClick={() => setStep(3)}
                        style={{ width: "100%", justifyContent: "center" }}
                      >
                        Continue →
                      </button>
                    </div>
                  )}

                  {/* STEP 3: Contact info + submit */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit}>
                      <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1rem 1.25rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                        <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--ink)" }}>{buildSummary()}</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
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
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                        <div>
                          <label style={labelStyle}>Phone</label>
                          <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} style={inputStyle} placeholder="Your phone number"
                            onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                            onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                        </div>
                        <div>
                          <label style={labelStyle}>Neighborhood</label>
                          <input type="text" value={form.neighborhood} onChange={e => handleChange("neighborhood", e.target.value)} style={inputStyle} placeholder="e.g. Silver Lake, Brentwood"
                            onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                            onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                        </div>
                      </div>

                      {/* BAG-FILL INTAKE — only shown when bag pickup is selected */}
                      {(serviceChoice === "fast-bag" || returningNeed === "bag-pickup") && (
                        <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1.5rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.25rem" }}>
                            Pickup Details
                          </p>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                            <div>
                              <label style={labelStyle}>How many bags?</label>
                              <select value={form.bagsCount} onChange={e => handleChange("bagsCount", e.target.value)} style={inputStyle}
                                onFocus={e => (e.target as HTMLSelectElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLSelectElement).style.borderColor = "var(--warm-gray-lt)"}>
                                <option value="">Select…</option>
                                <option value="1">1 bag</option>
                                <option value="2-3">2–3 bags</option>
                                <option value="4-6">4–6 bags</option>
                                <option value="closet">A full closet</option>
                                <option value="more">More than that</option>
                              </select>
                            </div>
                            <div>
                              <label style={labelStyle}>Urgency</label>
                              <select value={form.urgency} onChange={e => handleChange("urgency", e.target.value)} style={inputStyle}
                                onFocus={e => (e.target as HTMLSelectElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLSelectElement).style.borderColor = "var(--warm-gray-lt)"}>
                                <option value="">Select…</option>
                                <option value="asap">ASAP — within 48 hours</option>
                                <option value="this-week">This week</option>
                                <option value="next-week">Next week</option>
                                <option value="flexible">Flexible — whenever you can</option>
                              </select>
                            </div>
                          </div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                            <div>
                              <label style={labelStyle}>Ideal pickup time #1</label>
                              <input type="text" value={form.pickupTime1} onChange={e => handleChange("pickupTime1", e.target.value)} style={inputStyle} placeholder="e.g. Wed AM, Fri after 3pm"
                                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            </div>
                            <div>
                              <label style={labelStyle}>Ideal pickup time #2</label>
                              <input type="text" value={form.pickupTime2} onChange={e => handleChange("pickupTime2", e.target.value)} style={inputStyle} placeholder="e.g. Sat morning, anytime Sunday"
                                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            </div>
                          </div>
                          <p style={{ fontSize: "0.72rem", color: "var(--sage-dark)", marginTop: "0.75rem", lineHeight: 1.5, opacity: 0.8 }}>
                            Give me two windows that work. I'll confirm one and lock the time.
                          </p>

                          <div style={{ marginTop: "1.25rem" }}>
                            <label style={labelStyle}>How should the bags get to me?</label>
                            <select value={form.pickupMethod} onChange={e => handleChange("pickupMethod", e.target.value)} style={inputStyle}
                              onFocus={e => (e.target as HTMLSelectElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLSelectElement).style.borderColor = "var(--warm-gray-lt)"}>
                              <option value="">Select…</option>
                              <option value="in-person">I'll be home for pickup</option>
                              <option value="ups">Send me a UPS label</option>
                              <option value="courier">Uber courier</option>
                            </select>
                          </div>

                          {form.pickupMethod === "in-person" && (
                            <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginTop: "1rem", cursor: "pointer" }}>
                              <input type="checkbox" checked={form.pickupRelease} onChange={e => handleChange("pickupRelease", e.target.checked)} style={{ marginTop: "0.2rem" }} />
                              <span style={{ fontSize: "0.8rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                                I authorize release of items to The Well Lived Citizen at pickup. Possession transfers at handoff.
                              </span>
                            </label>
                          )}

                          {form.pickupMethod === "courier" && (
                            <div style={{ marginTop: "1rem" }}>
                              <label style={labelStyle}>Courier access notes</label>
                              <input type="text" value={form.courierNotes} onChange={e => handleChange("courierNotes", e.target.value)} style={inputStyle} placeholder="Gate code, building access, where to find the bags"
                                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            </div>
                          )}

                          <div style={{ marginTop: "1.25rem" }}>
                            <label style={labelStyle}>Roughly how many items total?</label>
                            <input type="text" value={form.estimatedItems} onChange={e => handleChange("estimatedItems", e.target.value)} style={inputStyle} placeholder="e.g. 20–30 pieces, mostly tops and dresses"
                              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            <p style={{ fontSize: "0.7rem", color: "var(--sage-dark)", marginTop: "0.4rem", lineHeight: 1.5 }}>
                              A rough count is enough. I'll verify when I receive the bags.
                            </p>
                          </div>

                          <div style={{ backgroundColor: "var(--parchment)", border: "1.5px solid var(--warm-gray-lt)", padding: "1.25rem", marginTop: "1.25rem" }}>
                            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>
                              Resale Agreement — Required
                            </p>
                            <p style={{ fontSize: "0.82rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6, marginBottom: "1rem" }}>
                              Scheduling a pickup means agreeing to the Resale Agreement — commission structure, custody terms, payout schedule, and how unsold or declined items are handled. Read it before you check the box.
                            </p>
                            <a href="/WLC-Resale-Agreement.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--sage-dark)", textDecoration: "underline", textUnderlineOffset: "3px", display: "block", marginBottom: "1rem" }}>
                              Read the Resale Agreement (PDF) →
                            </a>
                            <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", cursor: "pointer" }}>
                              <input
                                type="checkbox"
                                required
                                checked={form.agreementAccepted}
                                onChange={e => handleChange("agreementAccepted", e.target.checked)}
                                style={{ marginTop: "0.2rem", flexShrink: 0 }}
                              />
                              <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.5 }}>
                                I have read and agree to the Resale Agreement. I understand that possession transfers at pickup and my 30-day reporting cycle begins when I approve the listing.
                              </span>
                            </label>
                          </div>
                        </div>
                      )}

                      {submitError && (
                        <p style={{ fontSize: "0.85rem", color: "#b94a48", marginBottom: "1rem", lineHeight: 1.5 }}>
                          {submitError}
                        </p>
                      )}
                      <button type="submit" disabled={submitting} className="btn btn-ink" style={{ width: "100%", justifyContent: "center", padding: "1rem", opacity: submitting ? 0.65 : 1, cursor: submitting ? "not-allowed" : "pointer" }}>
                        {submitting ? "Sending…" : "Send Message"}
                      </button>
                    </form>
                  )}

                </div>
              </div>
            </FadeUp>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
