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
type ReturningService = "reset" | "house-call" | "legacy" | "resale" | "other" | "";

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

function isBagPath(serviceChoice: ServiceChoice, returningNeed: ReturningNeed) {
  return serviceChoice === "fast-bag" || returningNeed === "bag-pickup";
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
  const [returningService, setReturningService] = useState<ReturningService>("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [agreementRead, setAgreementRead] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", neighborhood: "",
    situation: "", bagsCount: "", urgency: "",
    pickupTime1: "", pickupTime2: "", pickupMethod: "",
    pickupRelease: false, courierNotes: "",
    agreementAccepted: false, estimatedItems: "",
  });

  function handleChange(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function advanceTo(next: 0 | 1 | 2 | 3) {
    setTimeout(() => setStep(next), 80);
  }

  function pickClientType(val: ClientType) {
    setClientType(val);
    advanceTo(1);
  }

  function pickServiceChoice(val: ServiceChoice) {
    setServiceChoice(val);
    if (val === "fast-bag") {
      advanceTo(3);
    } else {
      advanceTo(2);
    }
  }

  function pickReturningNeed(val: ReturningNeed) {
    setReturningNeed(val);
    if (val === "bag-pickup") {
      advanceTo(3);
    } else {
      advanceTo(2);
    }
  }

  function pickReturningService(val: ReturningService) {
    setReturningService(val);
    advanceTo(3);
  }

  function buildSummary() {
    if (clientType === "returning") {
      if (returningNeed === "book-again") {
        const labels: Record<ReturningService, string> = {
          reset: "The 4-Hour Reset — returning",
          "house-call": "House Call — returning",
          legacy: "Legacy Planning — returning",
          resale: "Curated Resale — returning",
          other: "Returning client — other service",
          "": "Returning client",
        };
        return labels[returningService] || "Returning client — book again";
      }
      const needs: Record<ReturningNeed, string> = {
        "book-again": "Book a service again",
        "bag-pickup": "Schedule a bag pickup — returning client",
        "just-talk": "Returning client — wants a call",
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
    if (serviceChoice === "reset") return "What space are you thinking? Closet, bedroom, post-move? Any backstory?";
    if (serviceChoice === "house-call") return "What's been on the list? What needs attention?";
    if (serviceChoice === "closeout") return "What's the situation? Moving, transitioning a parent's home, downsizing?";
    if (serviceChoice === "bigger") return "Tell me what's going on. The more context the better.";
    if (serviceChoice === "for-parent") return "Where is the parent located? What's the situation?";
    if (returningNeed === "just-talk") return "What's on your mind? Any context is helpful.";
    return "What's going on? What do you need help with?";
  }

  function getSidebarCopy(): { heading: string; body: string } {
    if (step === 0) return {
      heading: "Let's start here.",
      body: "This helps me route your request before we talk.",
    };
    if (step === 1 && clientType === "returning") return {
      heading: "Good to hear from you.",
      body: "What are you looking to do?",
    };
    if (step === 1 && clientType === "new") return {
      heading: "What brings you in?",
      body: "Pick the one that sounds closest. Easy to adjust on the call.",
    };
    if (step === 2 && returningNeed === "book-again") return {
      heading: "Which service?",
      body: "Pick the one you're coming back for.",
    };
    if (step === 2) return {
      heading: "A little background.",
      body: "The more you share here, the more useful our first conversation will be.",
    };
    return {
      heading: "Last step.",
      body: "Where should I reach you?",
    };
  }

  const bagPath = isBagPath(serviceChoice, returningNeed);

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
          returningService,
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

  const sidebar = getSidebarCopy();

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      {/* ── HERO ── */}
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "5rem" }}>
        <div className="container">
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Get in Touch</span>
            <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1.5rem" }}>
              Let's figure out<br />what you need.
            </h1>
            <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
              A few quick questions, then I'll be in touch within 24 hours.
            </p>
          </div>
        </div>
      </section>

      {/* ── FORM / SUCCESS ── */}
      {submitted ? (
        <section style={{ backgroundColor: "var(--parchment)", padding: "8rem 0" }}>
          <div className="container">
            {bagPath ? (
              <div style={{ maxWidth: 580 }}>
                <span className="eyebrow eyebrow-sage">You're on the calendar.</span>
                <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1.5rem" }}>Agreement signed. Pickup request received.</h2>
                <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  I'll reach out within 24 hours to confirm the pickup window and lock in the logistics.
                </p>

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
                    {form.pickupMethod && (
                      <div style={{ display: "flex", gap: "1rem", fontSize: "0.88rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--ink)", minWidth: 130 }}>Method</span>
                        <span style={{ fontWeight: 300, color: "var(--ink-soft)" }}>
                          {form.pickupMethod === "in-person" && "Direct handoff"}
                          {form.pickupMethod === "ups" && "UPS label"}
                          {form.pickupMethod === "courier" && "Uber courier"}
                        </span>
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

                <div style={{ border: "1.5px solid var(--warm-gray-lt)", padding: "1.5rem" }}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.75rem" }}>What happens next</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                    {[
                      "I'll confirm your pickup window within 24 hours.",
                      "After I receive the bags, I'll verify item count within 48 hours.",
                      "7–10 business days for evaluation. You'll get a full intake report — every item, platform, starting price, estimated sale, and turn.",
                      "24 hours to approve listings or pull items. No response means listings proceed. Your 30-day cycle begins at consent.",
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
                  Got it. I'll reach out within 24 hours.
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
                  <h2 className="display-sm" style={{ color: "var(--ink)", marginBottom: "1rem", lineHeight: 1.2 }}>
                    {sidebar.heading}
                  </h2>
                  <p style={{ fontSize: "0.9rem", fontWeight: 300, color: "var(--sage-dark)", lineHeight: 1.75 }}>
                    {sidebar.body}
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

                  {/* STEP 0: New or Returning */}
                  {step === 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                      <ChoiceButton selected={clientType === "returning"} onClick={() => pickClientType("returning")}>
                        Yes — I'm a returning client
                      </ChoiceButton>
                      <ChoiceButton selected={clientType === "new"} onClick={() => pickClientType("new")}>
                        No — reaching out for the first time
                      </ChoiceButton>
                    </div>
                  )}

                  {/* STEP 1A: Returning — what do you need */}
                  {step === 1 && clientType === "returning" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                      <ChoiceButton selected={returningNeed === "book-again"} onClick={() => pickReturningNeed("book-again")}>
                        Book a service again
                      </ChoiceButton>
                      <ChoiceButton selected={returningNeed === "bag-pickup"} onClick={() => pickReturningNeed("bag-pickup")}>
                        Schedule a bag pickup
                      </ChoiceButton>
                      <ChoiceButton selected={returningNeed === "just-talk"} onClick={() => pickReturningNeed("just-talk")}>
                        Just want to get on the phone
                      </ChoiceButton>
                    </div>
                  )}

                  {/* STEP 1B: New — which service */}
                  {step === 1 && clientType === "new" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      <ChoiceButton selected={serviceChoice === "fast-bag"} onClick={() => pickServiceChoice("fast-bag")}>
                        <span style={{ fontWeight: 700 }}>Fast Bag Fill</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Free pickup · Clothing, accessories, items I'm ready to let go</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "reset"} onClick={() => pickServiceChoice("reset")}>
                        <span style={{ fontWeight: 700 }}>The 4-Hour Reset</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$495 flat · One focused session in one space</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "house-call"} onClick={() => pickServiceChoice("house-call")}>
                        <span style={{ fontWeight: 700 }}>The 2-Hour House Call</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>$175/hr · Practical help with the everyday stuff</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "closeout"} onClick={() => pickServiceChoice("closeout")}>
                        <span style={{ fontWeight: 700 }}>The Closeout</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>You go first, I close out — whole-space transition</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "bigger"} onClick={() => pickServiceChoice("bigger")}>
                        <span style={{ fontWeight: 700 }}>Something bigger</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>Full home reset, legacy planning, or an ongoing arrangement</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "for-parent"} onClick={() => pickServiceChoice("for-parent")}>
                        <span style={{ fontWeight: 700 }}>I'm reaching out about a parent or family member</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>House calls, check-ins, home support, or a transition</span>
                      </ChoiceButton>
                      <ChoiceButton selected={serviceChoice === "not-sure"} onClick={() => pickServiceChoice("not-sure")}>
                        <span style={{ fontWeight: 700 }}>I'm not sure — let's just get on the phone</span><br />
                        <span style={{ fontSize: "0.8rem", opacity: 0.75 }}>I'll figure out what makes sense once we talk</span>
                      </ChoiceButton>
                    </div>
                  )}

                  {/* STEP 2A: Book-again — which service picker */}
                  {step === 2 && returningNeed === "book-again" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: 420 }}>
                      <ChoiceButton selected={returningService === "reset"} onClick={() => pickReturningService("reset")}>
                        The 4-Hour Reset
                      </ChoiceButton>
                      <ChoiceButton selected={returningService === "house-call"} onClick={() => pickReturningService("house-call")}>
                        House Call
                      </ChoiceButton>
                      <ChoiceButton selected={returningService === "legacy"} onClick={() => pickReturningService("legacy")}>
                        Legacy Planning & Inventory
                      </ChoiceButton>
                      <ChoiceButton selected={returningService === "resale"} onClick={() => pickReturningService("resale")}>
                        Curated Resale
                      </ChoiceButton>
                      <ChoiceButton selected={returningService === "other"} onClick={() => pickReturningService("other")}>
                        Something else
                      </ChoiceButton>
                    </div>
                  )}

                  {/* STEP 2B: Context — for paths that need it */}
                  {step === 2 && returningNeed !== "book-again" && (
                    <div>
                      <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1rem 1.25rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                        <p style={{ fontSize: "0.78rem", fontWeight: 500, color: "var(--ink)" }}>{buildSummary()}</p>
                      </div>
                      <div style={{ marginBottom: "1.75rem" }}>
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

                      {/* Name + Email */}
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

                      {/* Phone + Neighborhood (non-bag paths only) */}
                      <div style={{ display: "grid", gridTemplateColumns: bagPath ? "1fr" : "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                        <div>
                          <label style={labelStyle}>Phone</label>
                          <input type="tel" value={form.phone} onChange={e => handleChange("phone", e.target.value)} style={inputStyle} placeholder="Your phone number"
                            onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                            onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                        </div>
                        {!bagPath && (
                          <div>
                            <label style={labelStyle}>Neighborhood</label>
                            <input type="text" value={form.neighborhood} onChange={e => handleChange("neighborhood", e.target.value)} style={inputStyle} placeholder="e.g. Silver Lake, Brentwood"
                              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                          </div>
                        )}
                      </div>

                      {/* BAG PICKUP DETAILS */}
                      {bagPath && (
                        <div style={{ backgroundColor: "var(--parchment-mid)", padding: "1.5rem", marginBottom: "2rem", borderLeft: "3px solid var(--sage)" }}>
                          <p style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1.25rem" }}>
                            Pickup Details
                          </p>

                          {/* Delivery method FIRST */}
                          <div style={{ marginBottom: "1.25rem" }}>
                            <label style={labelStyle}>How should the bags get to me?</label>
                            <select value={form.pickupMethod} onChange={e => handleChange("pickupMethod", e.target.value)} style={inputStyle}
                              onFocus={e => (e.target as HTMLSelectElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLSelectElement).style.borderColor = "var(--warm-gray-lt)"}>
                              <option value="">Select…</option>
                              <option value="in-person">I'll be there — direct handoff</option>
                              <option value="ups">Send me a UPS label</option>
                              <option value="courier">Uber courier</option>
                            </select>
                          </div>

                          {/* In-person release authorization */}
                          {form.pickupMethod === "in-person" && (
                            <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", marginBottom: "1.25rem", cursor: "pointer" }}>
                              <input type="checkbox" checked={form.pickupRelease} onChange={e => handleChange("pickupRelease", e.target.checked)} style={{ marginTop: "0.2rem" }} />
                              <span style={{ fontSize: "0.8rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.5 }}>
                                I authorize release of items to The Well Lived Citizen at pickup. Possession transfers at handoff.
                              </span>
                            </label>
                          )}

                          {/* Courier access notes */}
                          {form.pickupMethod === "courier" && (
                            <div style={{ marginBottom: "1.25rem" }}>
                              <label style={labelStyle}>Courier access notes</label>
                              <input type="text" value={form.courierNotes} onChange={e => handleChange("courierNotes", e.target.value)} style={inputStyle} placeholder="Gate code, building access, where to find the bags"
                                onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            </div>
                          )}

                          {/* Time windows — only after delivery method is selected */}
                          {form.pickupMethod && (
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
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
                          )}

                          {/* Bag count + urgency */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
                            <div>
                              <label style={labelStyle}>How many bags?</label>
                              <select value={form.bagsCount} onChange={e => handleChange("bagsCount", e.target.value)} style={inputStyle}
                                onFocus={e => (e.target as HTMLSelectElement).style.borderColor = "var(--sage)"}
                                onBlur={e => (e.target as HTMLSelectElement).style.borderColor = "var(--warm-gray-lt)"}>
                                <option value="">Select…</option>
                                <option value="1">1 bag</option>
                                <option value="2">2 bags</option>
                                <option value="more">More than 2 (session pickup)</option>
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

                          {/* Estimated items */}
                          <div style={{ marginBottom: "1.25rem" }}>
                            <label style={labelStyle}>Roughly how many items total?</label>
                            <input type="text" value={form.estimatedItems} onChange={e => handleChange("estimatedItems", e.target.value)} style={inputStyle} placeholder="e.g. 20–30 pieces, mostly tops and dresses"
                              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                            <p style={{ fontSize: "0.7rem", color: "var(--sage-dark)", marginTop: "0.4rem", lineHeight: 1.5 }}>
                              A rough count is enough. I'll verify when I receive the bags.
                            </p>
                          </div>

                          {/* Neighborhood — bag paths only, here */}
                          <div style={{ marginBottom: "0" }}>
                            <label style={labelStyle}>Neighborhood</label>
                            <input type="text" value={form.neighborhood} onChange={e => handleChange("neighborhood", e.target.value)} style={inputStyle} placeholder="e.g. Silver Lake, Brentwood"
                              onFocus={e => (e.target as HTMLInputElement).style.borderColor = "var(--sage)"}
                              onBlur={e => (e.target as HTMLInputElement).style.borderColor = "var(--warm-gray-lt)"} />
                          </div>
                        </div>
                      )}

                      {/* RESALE AGREEMENT — read-first flow */}
                      {bagPath && (
                        <div style={{ marginBottom: "2rem" }}>
                          <div style={{ backgroundColor: "var(--parchment)", border: "1.5px solid var(--warm-gray-lt)", padding: "1.5rem" }}>
                            <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "1rem" }}>
                              Resale Agreement — Required
                            </p>

                            {/* Key terms summary */}
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.25rem" }}>
                              {[
                                "Commission is split by item tier — reviewed at intake. The split is never applied retroactively.",
                                "Possession transfers at pickup. I am legally responsible for your items from that moment.",
                                "Your 30-day payout clock starts when you sign consent to listings — not at pickup.",
                                "Items that are unsanitary or biohazardous are disposed of immediately. No exceptions, no discussion.",
                                "You have 24 hours to approve or pull items after you receive the listing report. No response means listings proceed.",
                              ].map((term, i) => (
                                <div key={i} style={{ display: "flex", gap: "0.75rem", fontSize: "0.82rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                                  <span style={{ color: "var(--sage)", fontWeight: 700, flexShrink: 0, fontSize: "0.7rem", paddingTop: "0.15rem" }}>—</span>
                                  {term}
                                </div>
                              ))}
                            </div>

                            <a href="/WLC-Resale-Agreement.pdf" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--sage-dark)", textDecoration: "underline", textUnderlineOffset: "3px", display: "block", marginBottom: "1.25rem" }}>
                              Read the full Resale Agreement (PDF) →
                            </a>

                            {/* Reveal checkbox toggle */}
                            {!agreementRead && (
                              <button
                                type="button"
                                onClick={() => setAgreementRead(true)}
                                style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--ink)", background: "none", border: "1.5px solid var(--ink)", padding: "0.65rem 1.25rem", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                              >
                                I've read this →
                              </button>
                            )}

                            {/* Checkbox — only shown after agreementRead */}
                            {agreementRead && (
                              <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", cursor: "pointer" }}>
                                <input
                                  type="checkbox"
                                  required
                                  checked={form.agreementAccepted}
                                  onChange={e => handleChange("agreementAccepted", e.target.checked)}
                                  style={{ marginTop: "0.2rem", flexShrink: 0 }}
                                />
                                <span style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--ink)", lineHeight: 1.5 }}>
                                  I have read and agree to the Resale Agreement. I understand possession transfers at pickup and my 30-day cycle begins when I approve the listing. Today's date will be recorded at submission.
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      )}

                      {submitError && (
                        <p style={{ fontSize: "0.85rem", color: "#b94a48", marginBottom: "1rem", lineHeight: 1.5 }}>
                          {submitError}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-ink"
                        style={{ width: "100%", justifyContent: "center", padding: "1rem", opacity: submitting ? 0.65 : 1, cursor: submitting ? "not-allowed" : "pointer" }}
                      >
                        {submitting ? "Sending…" : bagPath ? "Submit Pickup Request" : "Send Message"}
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
