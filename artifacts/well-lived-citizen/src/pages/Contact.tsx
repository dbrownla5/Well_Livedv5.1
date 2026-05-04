import { useState } from "react";
import { useSearch } from "wouter";
import { usePageMeta } from "../hooks/usePageMeta";

type ClientType = "new" | "returning";

type IntentType =
  | "homeorg"
  | "move"
  | "housecalls"
  | "resale"
  | "legacy"
  | "four-x-five"
  | "house-call"
  | "call";

const INTENTS: { id: IntentType; label: string; desc: string }[] = [
  { id: "four-x-five", label: "The Four x Five — 4 hrs, $500",   desc: "Pick the heaviest space. I bring the momentum." },
  { id: "house-call",  label: "House Call — 2 hrs, at your door", desc: "Tech, errands, vendors, practical overflow." },
  { id: "homeorg",     label: "A room, space, or closet",         desc: "Organization, systems, or a reset — home made to work." },
  { id: "move",        label: "A move — or what it left behind",  desc: "Packing out, landing in, or closing out the old place." },
  { id: "resale",      label: "Items to sell or consign",         desc: "Clothing, furniture, vintage — I handle the platforms." },
  { id: "legacy",      label: "Catalog what's in the home",       desc: "What's accumulated and what should stay, go, or be documented." },
  { id: "call",        label: "Not sure — let's schedule a call", desc: "Send your info and I'll reach out to figure it out with you." },
];

type QuestionType = {
  key: string;
  label: string;
  type: "checkbox" | "radio" | "textarea";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

const QUESTIONS: Partial<Record<IntentType, QuestionType[]>> = {
  homeorg: [
    {
      key: "space",
      label: "Which space are we working on?",
      type: "checkbox",
      options: ["Closet", "Bedroom", "Kitchen", "Living room", "Garage or storage unit", "Move landing", "Whole home"],
    },
    {
      key: "stage",
      label: "Where are things right now?",
      type: "radio",
      options: [
        "Just moved — boxes are in but nothing's settled",
        "Been sitting for a while and I need it to finally be done",
        "About to move — I need help preparing",
        "Ongoing friction I can't seem to get ahead of",
      ],
    },
    { key: "timeline", label: "Timeline?", type: "radio", options: ["This week", "Within the next month", "Flexible"] },
  ],
  move: [
    {
      key: "move_stage",
      label: "Where are you in the move?",
      type: "radio",
      options: [
        "Boxes are in — it technically happened but never landed",
        "Still packing — I need help with the close-out",
        "I've already moved — there's stuff left at the old place",
        "I need to leave before it's done — pack and close it out for me",
      ],
    },
    {
      key: "home_size",
      label: "Home size?",
      type: "radio",
      options: ["Studio or 1-bedroom", "2-bedroom", "3-bedroom or larger", "Storage unit or offload only"],
    },
  ],
  housecalls: [
    {
      key: "task",
      label: "What needs to happen?",
      type: "checkbox",
      options: [
        "Donation drop-off or routing",
        "Tech setup or troubleshooting",
        "Vendor or contractor access",
        "Returns or errands",
        "Small room reset",
        "Personal shopping or sourcing",
        "I'll explain in notes",
      ],
    },
    { key: "frequency", label: "One-time or ongoing?", type: "radio", options: ["One time", "Looking for regular support"] },
  ],
  resale: [
    {
      key: "item_type",
      label: "What are we working with?",
      type: "checkbox",
      options: ["Clothing & accessories", "Designer pieces", "Jewelry", "Furniture", "Home décor or art", "Vintage", "Mixed or not sure"],
    },
    { key: "volume", label: "Roughly how much?", type: "radio", options: ["1–2 bags or boxes", "3–5 bags or boxes", "More than 5, or large pieces"] },
    { key: "handoff", label: "How would handoff work?", type: "radio", options: ["City pickup — come to me", "I'll ship it", "I can drop it off"] },
  ],
  legacy: [
    { key: "scope", label: "What's the scope?", type: "radio", options: ["A single room or storage unit", "Multiple rooms", "The whole home"] },
    {
      key: "situation",
      label: "What's the situation?",
      type: "radio",
      options: [
        "General home accumulation over the years",
        "A life transition — move, divorce, loss",
        "Estate or inheritance related",
        "Not sure yet",
      ],
    },
  ],
  "four-x-five": [
    { key: "focus", label: "What's the focus?", type: "textarea", placeholder: "One room, one task list, one event prep — whatever needs the block.", optional: true },
  ],
  "house-call": [
    { key: "focus", label: "What needs to happen?", type: "textarea", placeholder: "Donation bags, tech setup, vendor access, practical overflow — just describe it.", optional: true },
  ],
};

function getInitialIntent(search: string): IntentType | null {
  const p = new URLSearchParams(search);
  const offer = p.get("offer");
  const service = p.get("service");
  if (offer === "4hour")     return "four-x-five";
  if (offer === "pickup")    return "resale";
  if (offer === "closeout")  return "move";
  if (offer === "housecall") return "house-call";
  if (service === "home-org")     return "homeorg";
  if (service === "legacy")       return "legacy";
  if (service === "house-calls")  return "housecalls";
  if (service === "resale")       return "resale";
  return null;
}

function QuestionCard({
  question, answer, onCheck, onRadio, onText,
}: {
  question: QuestionType;
  answer: string | string[] | undefined;
  onCheck: (val: string, checked: boolean) => void;
  onRadio: (val: string) => void;
  onText: (val: string) => void;
}) {
  const checked = (val: string) => ((answer as string[] | undefined) ?? []).includes(val);
  const radioVal = (answer as string | undefined) ?? "";
  return (
    <div>
      <div className="form-label" style={{ marginBottom: "16px", fontSize: "13px" }}>
        {question.label}
        {question.optional && <span style={{ fontWeight: 400, color: "var(--clay)", marginLeft: "6px" }}>(optional)</span>}
      </div>
      {question.type === "checkbox" && question.options && (
        <div className="intake-check-group">
          {question.options.map((opt) => (
            <label key={opt} className="intake-check-item">
              <input type="checkbox" value={opt} checked={checked(opt)} onChange={(e) => onCheck(opt, e.target.checked)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
      {question.type === "radio" && question.options && (
        <div className="intake-check-group">
          {question.options.map((opt) => (
            <label key={opt} className="intake-check-item">
              <input type="radio" name={question.key} value={opt} checked={radioVal === opt} onChange={() => onRadio(opt)} />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}
      {question.type === "textarea" && (
        <textarea
          className="form-textarea"
          placeholder={question.placeholder}
          value={(answer as string | undefined) ?? ""}
          onChange={(e) => onText(e.target.value)}
        />
      )}
    </div>
  );
}

export default function Contact() {
  usePageMeta({
    title: "Get in Touch",
    description: "Tell me what you need. The first conversation is always just that — a conversation. Concierge home services in Los Angeles.",
  });

  const search = useSearch();
  const preIntent = getInitialIntent(search);

  const [clientType, setClientType] = useState<ClientType | null>(null);
  const [returningEmail, setReturningEmail] = useState("");
  const [returningLookup, setReturningLookup] = useState<"idle" | "checking" | "found" | "not-found">("idle");
  const [returningName, setReturningName]   = useState("");

  const [step, setStep]     = useState<0 | 1 | 2 | 3>(preIntent ? 1 : 0);
  const [intent, setIntent] = useState<IntentType | null>(preIntent);
  const [subStep, setSubStep]   = useState(0);
  const [answers, setAnswers]   = useState<Record<string, string | string[]>>({});

  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [realLife, setRealLife] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [status, setStatus]     = useState<"idle" | "sending" | "success" | "error">("idle");

  function chooseClientType(type: ClientType) {
    setClientType(type);
    if (type === "new") {
      setStep(1);
    } else {
      setStep(1);
    }
  }

  async function handleReturningEmail() {
    if (!returningEmail) return;
    setReturningLookup("checking");
    try {
      const res = await fetch(`/api/clients/lookup?email=${encodeURIComponent(returningEmail)}`);
      if (res.ok) {
        const data = await res.json();
        setReturningName(data.name ?? "");
        setReturningLookup("found");
        setEmail(returningEmail);
        if (data.name) setName(data.name);
      } else {
        setReturningLookup("not-found");
        setEmail(returningEmail);
      }
    } catch {
      setReturningLookup("not-found");
      setEmail(returningEmail);
    }
  }

  function selectIntent(id: IntentType) {
    setIntent(id);
    setAnswers({});
    setSubStep(0);
    if (id === "call") {
      setStep(3);
    } else {
      const qs = QUESTIONS[id];
      if (qs && qs.length > 0) {
        setStep(2);
      } else {
        setStep(3);
      }
    }
  }

  const questions        = intent ? (QUESTIONS[intent] ?? []) : [];
  const currentQuestion  = questions[subStep] ?? null;
  const totalSubSteps    = questions.length;
  const isLastSubStep    = subStep === totalSubSteps - 1;

  function onCheck(val: string, checked: boolean) {
    if (!currentQuestion) return;
    const key = currentQuestion.key;
    setAnswers((prev) => {
      const arr = (prev[key] as string[] | undefined) ?? [];
      return { ...prev, [key]: checked ? [...arr, val] : arr.filter((v) => v !== val) };
    });
  }
  function onRadio(val: string)  { if (currentQuestion) setAnswers((p) => ({ ...p, [currentQuestion.key]: val })); }
  function onText(val: string)   { if (currentQuestion) setAnswers((p) => ({ ...p, [currentQuestion.key]: val })); }

  function handleContinue() {
    if (isLastSubStep) setStep(3);
    else setSubStep((s) => s + 1);
  }

  function handleBack() {
    if (step === 1) { setStep(0); setClientType(null); }
    else if (step === 2) {
      if (subStep > 0) setSubStep((s) => s - 1);
      else setStep(1);
    } else if (step === 3) {
      if (intent === "call" || !QUESTIONS[intent!]?.length) setStep(1);
      else setStep(2);
    }
  }

  const canContinue = () => {
    if (!currentQuestion) return true;
    const ans = answers[currentQuestion.key];
    if (currentQuestion.optional) return true;
    if (currentQuestion.type === "checkbox") return (ans as string[] | undefined)?.length ?? 0 > 0;
    if (currentQuestion.type === "radio")    return typeof ans === "string" && ans.length > 0;
    if (currentQuestion.type === "textarea") return typeof ans === "string" && ans.trim().length > 0;
    return true;
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const fd = new FormData();
    fd.append("_subject", `${clientType === "returning" ? "[Returning] " : ""}New Intake — ${intent ?? "general"} — ${name}`);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("clientType", clientType ?? "new");
    if (phone)    fd.append("phone", phone);
    fd.append("service", intent ?? "general");
    fd.append("answers", JSON.stringify(answers));
    if (realLife) fd.append("realLife", realLife);
    if (bestTime) fd.append("bestTime", bestTime);
    try {
      const [formspreeRes] = await Promise.allSettled([
        fetch("https://formspree.io/f/xreojkvo", { method: "POST", body: fd, headers: { Accept: "application/json" } }),
        fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ serviceType: intent ?? "general", answers, name, email, clientType, phone: phone || undefined, realLife: realLife || undefined, bestTime: bestTime || undefined }),
        }).catch(() => null),
      ]);
      const ok = formspreeRes.status === "fulfilled" && (formspreeRes.value as Response).ok;
      setStatus(ok ? "success" : "error");
    } catch { setStatus("error"); }
  }

  const intentLabel = INTENTS.find((i) => i.id === intent)?.label ?? "";
  const isCallPath  = intent === "call";

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">The Well Lived Citizen</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "520px" }}>
            Tell me what you need. You do not need to have it figured out. Start with what is true right now and I'll take it from there.
          </p>
          <p style={{ fontSize: "13px", color: "var(--clay)", marginTop: "8px", fontStyle: "italic" }}>
            The first conversation is always just that — a conversation.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: "64px", alignItems: "start" }} className="contact-grid">

            {/* FORM */}
            <div>
              {status === "success" ? (
                <div style={{ padding: "40px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                  <p style={{ fontSize: "18px", color: "var(--char)", fontWeight: 700, marginBottom: "8px" }}>Got it.</p>
                  <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.7 }}>
                    {isCallPath
                      ? "I'll reach out to schedule a call — usually within a few hours."
                      : "I'll be in touch within 24 hours. Text for anything urgent: "}
                    {!isCallPath && <a href="tel:3234331350" style={{ color: "var(--rust)" }}>(323) 433-1350</a>}
                    {!isCallPath && "."}
                  </p>
                </div>
              ) : (
                <>
                  {/* STEP 0 — New or Returning */}
                  {step === 0 && (
                    <div>
                      <div className="form-label" style={{ marginBottom: "24px", fontSize: "15px" }}>
                        Have we worked together before?
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <button
                          type="button"
                          className="intake-intent-card"
                          style={{ textAlign: "left" }}
                          onClick={() => chooseClientType("new")}
                        >
                          <span className="intake-intent-label">New here</span>
                          <span className="intake-intent-desc">First time reaching out.</span>
                        </button>
                        <button
                          type="button"
                          className="intake-intent-card"
                          style={{ textAlign: "left" }}
                          onClick={() => chooseClientType("returning")}
                        >
                          <span className="intake-intent-label">We've worked together</span>
                          <span className="intake-intent-desc">I'm a returning client.</span>
                        </button>
                      </div>

                      {/* Returning email lookup */}
                      {clientType === "returning" && returningLookup === "idle" && (
                        <div style={{ marginTop: "28px" }}>
                          <div className="form-field">
                            <label className="form-label" htmlFor="ret-email">Your email</label>
                            <input
                              className="form-input"
                              type="email"
                              id="ret-email"
                              placeholder="your@email.com"
                              value={returningEmail}
                              onChange={(e) => setReturningEmail(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && handleReturningEmail()}
                            />
                          </div>
                          <button
                            type="button"
                            className="btn btn-dark"
                            style={{ marginTop: "12px" }}
                            onClick={handleReturningEmail}
                            disabled={!returningEmail}
                          >
                            Continue →
                          </button>
                        </div>
                      )}

                      {clientType === "returning" && returningLookup === "checking" && (
                        <p style={{ marginTop: "20px", fontSize: "13px", color: "var(--clay)" }}>Looking you up…</p>
                      )}

                      {clientType === "returning" && (returningLookup === "found" || returningLookup === "not-found") && (
                        <div style={{ marginTop: "20px" }}>
                          {returningLookup === "found" && returningName ? (
                            <p style={{ fontSize: "14px", color: "var(--char)", marginBottom: "16px" }}>
                              Welcome back, {returningName}. What do you need this time?
                            </p>
                          ) : (
                            <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>
                              Good to have you back. What brings you in?
                            </p>
                          )}
                          <button type="button" className="btn btn-dark" onClick={() => setStep(1)}>
                            Continue →
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* STEP 1 — Intent */}
                  {step === 1 && (
                    <div>
                      <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <button type="button" className="intake-back" onClick={handleBack}>← Back</button>
                      </div>
                      <div className="form-label" style={{ marginBottom: "20px" }}>What are you working on?</div>
                      <div className="intake-intent-grid">
                        {INTENTS.map(({ id, label, desc }) => (
                          <button
                            key={id}
                            type="button"
                            className={`intake-intent-card${intent === id ? " selected" : ""}${id === "call" ? " intake-intent-card-muted" : ""}`}
                            onClick={() => selectIntent(id)}
                          >
                            <span className="intake-intent-label">{label}</span>
                            <span className="intake-intent-desc">{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Questions */}
                  {step === 2 && intent && currentQuestion && (
                    <div>
                      <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <button type="button" className="intake-back" onClick={handleBack}>← Back</button>
                        <span style={{ fontSize: "12px", color: "var(--clay)" }}>
                          {intentLabel} · {subStep + 1} of {totalSubSteps}
                        </span>
                      </div>
                      <QuestionCard
                        question={currentQuestion}
                        answer={answers[currentQuestion.key]}
                        onCheck={onCheck}
                        onRadio={onRadio}
                        onText={onText}
                      />
                      <button
                        type="button"
                        className="btn btn-dark"
                        style={{ marginTop: "28px", opacity: canContinue() ? 1 : 0.4 }}
                        onClick={handleContinue}
                        disabled={!canContinue()}
                      >
                        {isLastSubStep ? "Continue →" : "Next →"}
                      </button>
                    </div>
                  )}

                  {/* STEP 3 — Contact info */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: "28px", display: "flex", alignItems: "center", gap: "12px" }}>
                        <button type="button" className="intake-back" onClick={handleBack}>← Back</button>
                        {intentLabel && <span style={{ fontSize: "12px", color: "var(--clay)" }}>{intentLabel}</span>}
                      </div>

                      {isCallPath && (
                        <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.7, marginBottom: "24px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                          Leave your info and I'll reach out to find a time. No prep needed — just a quick call to figure out what makes sense.
                        </p>
                      )}

                      <div className="form-field">
                        <label className="form-label" htmlFor="fullName">Your name</label>
                        <input className="form-input" type="text" id="fullName" required placeholder="First and last name" value={name} onChange={(e) => setName(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" type="email" id="email" required placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="phone">
                          Phone <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span>
                        </label>
                        <input className="form-input" type="tel" id="phone" placeholder="(000) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
                      </div>

                      {!isCallPath && (
                        <div className="form-field">
                          <label className="form-label" htmlFor="realLife">
                            Anything else I should know? <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span>
                          </label>
                          <textarea className="form-textarea" id="realLife" placeholder="Two sentences is enough. What changed, what's actually happening?" value={realLife} onChange={(e) => setRealLife(e.target.value)} />
                        </div>
                      )}

                      <div className="form-field">
                        <label className="form-label" htmlFor="bestTime">
                          Best time to reach you <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span>
                        </label>
                        <input className="form-input" type="text" id="bestTime" placeholder="e.g. weekday mornings, anytime by email" value={bestTime} onChange={(e) => setBestTime(e.target.value)} />
                      </div>

                      <button type="submit" className="form-submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending…" : isCallPath ? "Request a Call" : "Send"}
                      </button>

                      {status === "error" && (
                        <div style={{ marginTop: "16px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                          <p style={{ fontSize: "13px", color: "var(--char)" }}>
                            Something went wrong. Email{" "}
                            <a href="mailto:dayna@thewelllivedcitizen.com" style={{ color: "var(--rust)", fontWeight: 600 }}>dayna@thewelllivedcitizen.com</a>{" "}
                            directly.
                          </p>
                        </div>
                      )}
                    </form>
                  )}
                </>
              )}
            </div>

            {/* Sidebar */}
            <div style={{ position: "sticky", top: "calc(var(--nav-h) + 16px)" }}>
              <div style={{ padding: "32px", background: "var(--warm)", border: "1px solid var(--linen)", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "16px" }}>Direct Contact</div>
                <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6, marginBottom: "10px" }}>The fastest way is the form on this page.</div>
                <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "13px", color: "var(--rust)", display: "block", marginBottom: "16px" }}>dayna@thewelllivedcitizen.com</a>
                <div className="contact-social">
                  <a href="https://instagram.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </a>
                  <a href="https://facebook.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div style={{ padding: "24px", background: "var(--warm)", border: "1px solid var(--linen)", marginBottom: "16px" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>Payment</div>
                <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6 }}>
                  Zelle accepted at dayna@thewelllivedcitizen.com. Payment discussed after scope is confirmed.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
