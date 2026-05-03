import { useState } from "react";
import { useSearch } from "wouter";

type IntentType =
  | "homeorg"
  | "move"
  | "housecalls"
  | "resale"
  | "legacy"
  | "quick4x5"
  | "quick2x3"
  | "general";

const INTENTS: { id: IntentType; label: string; desc: string }[] = [
  { id: "homeorg",   label: "A room, space, or closet",         desc: "Organization, systems, or a reset — home made to work." },
  { id: "move",      label: "A move — or what it left behind",  desc: "Packing out, landing in, or closing out the old place." },
  { id: "housecalls",label: "Ongoing help around the house",    desc: "Practical things that need hands — errands, vendors, resets." },
  { id: "resale",    label: "Items to sell or consign",         desc: "Clothing, furniture, vintage — I handle the platforms." },
  { id: "legacy",    label: "Catalog what's in the home",       desc: "What's accumulated, what it's worth, and what should stay or go." },
  { id: "quick4x5",  label: "Book the 4x5 — 4 hrs, $500",       desc: "Pick the heaviest space. I bring the momentum." },
  { id: "quick2x3",  label: "Book the 2x3 — 2 hrs, $300",       desc: "Two hours for the things life left unfinished." },
  { id: "general",   label: "Not sure — just reach out",        desc: "Send a message and I'll figure it out with you." },
];

function getInitialIntent(search: string): IntentType | null {
  const p = new URLSearchParams(search);
  const offer = p.get("offer");
  const service = p.get("service");
  if (offer === "4hour")    return "quick4x5";
  if (offer === "pickup")   return "resale";
  if (offer === "closeout") return "move";
  if (offer === "housecall")return "quick2x3";
  if (service === "home-org")    return "homeorg";
  if (service === "legacy")      return "legacy";
  if (service === "house-calls") return "housecalls";
  if (service === "resale")      return "resale";
  return null;
}

const QUICK: IntentType[] = ["quick4x5", "quick2x3", "general"];

function CheckItem({
  label, name, value, checked, onChange,
}: { label: string; name: string; value: string; checked: boolean; onChange: (v: string, c: boolean) => void }) {
  return (
    <label className="intake-check-item">
      <input type="checkbox" name={name} value={value} checked={checked}
        onChange={e => onChange(value, e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function RadioItem({
  label, name, value, checked, onChange,
}: { label: string; name: string; value: string; checked: boolean; onChange: (v: string) => void }) {
  return (
    <label className="intake-check-item">
      <input type="radio" name={name} value={value} checked={checked}
        onChange={() => onChange(value)} />
      <span>{label}</span>
    </label>
  );
}

function BranchQuestions({
  intent,
  answers,
  onCheck,
  onRadio,
  onText,
}: {
  intent: IntentType;
  answers: Record<string, string | string[]>;
  onCheck: (key: string, val: string, checked: boolean) => void;
  onRadio: (key: string, val: string) => void;
  onText: (key: string, val: string) => void;
}) {
  const checked = (key: string, val: string) =>
    ((answers[key] as string[] | undefined) ?? []).includes(val);
  const radio = (key: string) => (answers[key] as string | undefined) ?? "";

  if (intent === "homeorg") return (
    <>
      <div className="intake-question">
        <div className="form-label">Which space are we working on?</div>
        <div className="intake-check-group">
          {["Closet","Bedroom","Kitchen","Living room","Garage or storage unit","Move landing","Whole home"].map(v => (
            <CheckItem key={v} label={v} name="space" value={v} checked={checked("space", v)} onChange={(val, c) => onCheck("space", val, c)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">Where are things right now?</div>
        <div className="intake-check-group">
          {[
            "Just moved — boxes are in but nothing's settled",
            "Been sitting for a while and I need it to finally be done",
            "About to move — I need help preparing",
            "Ongoing friction I can't seem to get ahead of",
          ].map(v => (
            <RadioItem key={v} label={v} name="stage" value={v} checked={radio("stage") === v} onChange={val => onRadio("stage", val)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">Timeline?</div>
        <div className="intake-check-group">
          {["This week","Within the next month","Flexible"].map(v => (
            <RadioItem key={v} label={v} name="timeline" value={v} checked={radio("timeline") === v} onChange={val => onRadio("timeline", val)} />
          ))}
        </div>
      </div>
    </>
  );

  if (intent === "move") return (
    <>
      <div className="intake-question">
        <div className="form-label">Where are you in the move?</div>
        <div className="intake-check-group">
          {[
            "Boxes are in — it technically happened but never landed",
            "Still packing — I need help with the close-out",
            "I've already moved — there's stuff left at the old place",
            "I need to leave before it's done — pack and close it out for me",
          ].map(v => (
            <RadioItem key={v} label={v} name="move_stage" value={v} checked={radio("move_stage") === v} onChange={val => onRadio("move_stage", val)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">Home size?</div>
        <div className="intake-check-group">
          {["Studio or 1-bedroom","2-bedroom","3-bedroom or larger","Storage unit or offload only"].map(v => (
            <RadioItem key={v} label={v} name="home_size" value={v} checked={radio("home_size") === v} onChange={val => onRadio("home_size", val)} />
          ))}
        </div>
      </div>
    </>
  );

  if (intent === "housecalls") return (
    <>
      <div className="intake-question">
        <div className="form-label">What needs to happen?</div>
        <div className="intake-check-group">
          {["Donation drop-off or routing","Tech setup or troubleshooting","Vendor or contractor access","Returns or errands","Small room reset","Not sure — I'll explain in notes"].map(v => (
            <CheckItem key={v} label={v} name="task" value={v} checked={checked("task", v)} onChange={(val, c) => onCheck("task", val, c)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">One-time or ongoing?</div>
        <div className="intake-check-group">
          {["One time","Looking for regular support"].map(v => (
            <RadioItem key={v} label={v} name="frequency" value={v} checked={radio("frequency") === v} onChange={val => onRadio("frequency", val)} />
          ))}
        </div>
      </div>
    </>
  );

  if (intent === "resale") return (
    <>
      <div className="intake-question">
        <div className="form-label">What are we working with?</div>
        <div className="intake-check-group">
          {["Clothing & accessories","Designer pieces","Jewelry","Furniture","Home décor or art","Vintage","Mixed or not sure"].map(v => (
            <CheckItem key={v} label={v} name="item_type" value={v} checked={checked("item_type", v)} onChange={(val, c) => onCheck("item_type", val, c)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">Roughly how much?</div>
        <div className="intake-check-group">
          {["1–2 bags or boxes","3–5 bags or boxes","More than 5, or large pieces"].map(v => (
            <RadioItem key={v} label={v} name="volume" value={v} checked={radio("volume") === v} onChange={val => onRadio("volume", val)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">How would handoff work?</div>
        <div className="intake-check-group">
          {["City pickup — come to me","I'll ship it","I can drop it off"].map(v => (
            <RadioItem key={v} label={v} name="handoff" value={v} checked={radio("handoff") === v} onChange={val => onRadio("handoff", val)} />
          ))}
        </div>
      </div>
    </>
  );

  if (intent === "legacy") return (
    <>
      <div className="intake-question">
        <div className="form-label">What's the scope?</div>
        <div className="intake-check-group">
          {["A single room or storage unit","Multiple rooms","The whole home"].map(v => (
            <RadioItem key={v} label={v} name="scope" value={v} checked={radio("scope") === v} onChange={val => onRadio("scope", val)} />
          ))}
        </div>
      </div>
      <div className="intake-question">
        <div className="form-label">What's the situation?</div>
        <div className="intake-check-group">
          {[
            "General home accumulation over the years",
            "A life transition — move, divorce, loss",
            "Estate or inheritance related",
            "Not sure yet",
          ].map(v => (
            <RadioItem key={v} label={v} name="situation" value={v} checked={radio("situation") === v} onChange={val => onRadio("situation", val)} />
          ))}
        </div>
      </div>
    </>
  );

  if (intent === "quick4x5") return (
    <div className="intake-question">
      <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "20px", marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600, marginBottom: "4px" }}>The 4x5 — 4 hours, $500 flat.</p>
        <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6 }}>No project scope. No hourly count. You pick the space that needs the most momentum. I handle it.</p>
      </div>
      <div className="form-label">What's the focus? <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span></div>
      <textarea className="form-textarea" placeholder="One room, one task list, one move landing — whatever needs the block."
        value={(answers["focus"] as string) ?? ""}
        onChange={e => onText("focus", e.target.value)} />
    </div>
  );

  if (intent === "quick2x3") return (
    <div className="intake-question">
      <div style={{ background: "var(--warm)", border: "1px solid var(--linen)", padding: "20px", marginBottom: "24px" }}>
        <p style={{ fontSize: "14px", color: "var(--char)", fontWeight: 600, marginBottom: "4px" }}>The 2x3 — 2 hours, $300 flat.</p>
        <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6 }}>Fixed price. No estimate call. The fastest way to get me on your calendar.</p>
      </div>
      <div className="form-label">What needs to happen? <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span></div>
      <textarea className="form-textarea" placeholder="Donation bags, tech setup, vendor access, practical overflow — just describe it."
        value={(answers["focus"] as string) ?? ""}
        onChange={e => onText("focus", e.target.value)} />
    </div>
  );

  // general
  return (
    <div className="intake-question">
      <div className="form-label">What's going on?</div>
      <textarea className="form-textarea" required placeholder="A few sentences is enough. What changed, what's actually happening?"
        value={(answers["general_note"] as string) ?? ""}
        onChange={e => onText("general_note", e.target.value)} />
    </div>
  );
}

export default function Contact() {
  const search = useSearch();
  const preIntent = getInitialIntent(search);

  const [step, setStep] = useState<1 | 2 | 3>(preIntent ? 2 : 1);
  const [intent, setIntent] = useState<IntentType | null>(preIntent);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [realLife, setRealLife] = useState("");
  const [bestTime, setBestTime] = useState("");
  const [status, setStatus]     = useState<"idle" | "sending" | "success" | "error">("idle");

  function selectIntent(id: IntentType) {
    setIntent(id);
    setAnswers({});
    setStep(2);
  }

  function onCheck(key: string, val: string, checked: boolean) {
    setAnswers(prev => {
      const arr = (prev[key] as string[] | undefined) ?? [];
      return { ...prev, [key]: checked ? [...arr, val] : arr.filter(v => v !== val) };
    });
  }
  function onRadio(key: string, val: string) {
    setAnswers(prev => ({ ...prev, [key]: val }));
  }
  function onText(key: string, val: string) {
    setAnswers(prev => ({ ...prev, [key]: val }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    const payload = {
      serviceType: intent ?? "general",
      answers,
      name,
      email,
      phone: phone || undefined,
      realLife: realLife || undefined,
      bestTime: bestTime || undefined,
    };

    try {
      const [serverRes] = await Promise.allSettled([
        fetch("/api/intake", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }),
        (async () => {
          const fd = new FormData();
          fd.append("_subject", `New Intake — ${intent ?? "general"} — ${name}`);
          fd.append("name", name);
          fd.append("email", email);
          if (phone) fd.append("phone", phone);
          fd.append("service", intent ?? "general");
          fd.append("answers", JSON.stringify(answers));
          if (realLife) fd.append("realLife", realLife);
          if (bestTime) fd.append("bestTime", bestTime);
          await fetch("https://formspree.io/f/xreojkvo", {
            method: "POST",
            body: fd,
            headers: { Accept: "application/json" },
          });
        })(),
      ]);

      const ok = serverRes.status === "fulfilled" && (serverRes.value as Response).ok;
      setStatus(ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const intentLabel = INTENTS.find(i => i.id === intent)?.label ?? "";
  const totalSteps = QUICK.includes(intent ?? "general") ? 2 : 3;

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
              {status === "success" ? (
                <div style={{ padding: "40px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                  <p style={{ fontSize: "18px", color: "var(--char)", fontWeight: 700, marginBottom: "8px" }}>Got it.</p>
                  <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.7 }}>I'll be in touch within 24 hours. Text for anything urgent: <a href="tel:3234331350" style={{ color: "var(--rust)" }}>(323) 433-1350</a>.</p>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  {step > 1 && (
                    <div className="intake-progress">
                      <span className={step >= 1 ? "active" : ""}>1</span>
                      <span className="intake-progress-line" />
                      <span className={step >= 2 ? "active" : ""}>2</span>
                      {totalSteps === 3 && (
                        <>
                          <span className="intake-progress-line" />
                          <span className={step >= 3 ? "active" : ""}>3</span>
                        </>
                      )}
                    </div>
                  )}

                  {/* STEP 1 — Intent */}
                  {step === 1 && (
                    <div>
                      <div className="form-label" style={{ marginBottom: "20px" }}>What brings you here?</div>
                      <div className="intake-intent-grid">
                        {INTENTS.map(({ id, label, desc }) => (
                          <button key={id} type="button"
                            className={`intake-intent-card${intent === id ? " selected" : ""}`}
                            onClick={() => selectIntent(id)}>
                            <span className="intake-intent-label">{label}</span>
                            <span className="intake-intent-desc">{desc}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* STEP 2 — Branch questions */}
                  {step === 2 && intent && (
                    <div>
                      <div style={{ marginBottom: "28px" }}>
                        <button type="button" className="intake-back" onClick={() => setStep(1)}>← Change</button>
                        <span style={{ fontSize: "13px", color: "var(--stone)", marginLeft: "8px" }}>{intentLabel}</span>
                      </div>
                      <BranchQuestions intent={intent} answers={answers} onCheck={onCheck} onRadio={onRadio} onText={onText} />
                      <button type="button" className="btn btn-dark" style={{ marginTop: "32px" }}
                        onClick={() => setStep(QUICK.includes(intent) ? 3 : 3)}>
                        Continue →
                      </button>
                    </div>
                  )}

                  {/* STEP 3 — Contact info */}
                  {step === 3 && (
                    <form onSubmit={handleSubmit}>
                      <div style={{ marginBottom: "28px" }}>
                        <button type="button" className="intake-back" onClick={() => setStep(2)}>← Back</button>
                        <span style={{ fontSize: "13px", color: "var(--stone)", marginLeft: "8px" }}>{intentLabel}</span>
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="fullName">Your name</label>
                        <input className="form-input" type="text" id="fullName" required placeholder="First and last name"
                          value={name} onChange={e => setName(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="email">Email</label>
                        <input className="form-input" type="email" id="email" required placeholder="your@email.com"
                          value={email} onChange={e => setEmail(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="phone">Phone <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span></label>
                        <input className="form-input" type="tel" id="phone" placeholder="(000) 000-0000"
                          value={phone} onChange={e => setPhone(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="realLife">Anything else I should know? <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span></label>
                        <textarea className="form-textarea" id="realLife"
                          placeholder="Two sentences is enough. What changed, what's actually happening?"
                          value={realLife} onChange={e => setRealLife(e.target.value)} />
                      </div>

                      <div className="form-field">
                        <label className="form-label" htmlFor="bestTime">Best time to reach you <span style={{ fontWeight: 400, color: "var(--clay)" }}>(optional)</span></label>
                        <input className="form-input" type="text" id="bestTime"
                          placeholder="e.g. weekday mornings, anytime by email"
                          value={bestTime} onChange={e => setBestTime(e.target.value)} />
                      </div>

                      <button type="submit" className="form-submit" disabled={status === "sending"}>
                        {status === "sending" ? "Sending..." : "Send"}
                      </button>

                      {status === "error" && (
                        <div style={{ marginTop: "16px", padding: "20px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                          <p style={{ fontSize: "13px", color: "var(--char)" }}>
                            Something went wrong. Please email{" "}
                            <a href="mailto:dayna@thewelllivedcitizen.com" style={{ color: "var(--rust)", fontWeight: 600 }}>dayna@thewelllivedcitizen.com</a> directly.
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
                <div style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.6, marginBottom: "10px" }}>The fastest way to reach me is the form on this page.</div>
                <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "13px", color: "var(--rust)", display: "block", marginBottom: "16px" }}>dayna@thewelllivedcitizen.com</a>
                <div className="contact-social">
                  <a href="https://instagram.com/thewelllivedcitizen" target="_blank" rel="noopener" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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
                <p style={{ fontSize: "12px", color: "var(--stone)", lineHeight: 1.6, marginBottom: "6px" }}>Zelle via email below.</p>
                <a href="mailto:dayna@thewelllivedcitizen.com" style={{ fontSize: "12px", color: "var(--rust)", display: "block" }}>dayna@thewelllivedcitizen.com</a>
              </div>
              <div style={{ padding: "24px", background: "var(--warm)", border: "1px solid var(--linen)" }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "12px" }}>Service Area</div>
                <p style={{ fontSize: "13px", color: "var(--stone)", lineHeight: 1.7 }}>Los Angeles and surrounding areas.</p>
                <div style={{ marginTop: "16px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "8px" }}>Response Time</div>
                <p style={{ fontSize: "13px", color: "var(--stone)" }}>Within 24 hours. Text for urgent requests.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
