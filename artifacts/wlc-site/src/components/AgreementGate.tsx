import { useState, useRef } from "react";
import { commission } from "@/content/brand";

const clothingSplit = commission.find((c) => c.category.includes("Clothing"))?.client ?? "45%";
const designerSplit = commission.find((c) => c.category.includes("Designer"))?.client ?? "50%";
const furnitureSplit = commission.find((c) => c.category.includes("Furniture"))?.client ?? "50%";
const liquidationSplit = commission.find((c) => c.category.includes("Closet"))?.client ?? "45%";

const AGREEMENT_SECTIONS: { h: string; b: string }[] = [
  { h: "1. Possession & Custody", b: "Items handed to WLC at pickup transfer into WLC's custody for the purpose of evaluation, listing, and resale. Custody is logged at the moment of handoff." },
  { h: "2. Evaluation Window", b: "WLC will evaluate items within 7–10 business days of pickup and provide an itemized inventory report with estimated resale values." },
  { h: "3. Commission Split", b: `Commission is calculated on net sale price (sale price minus platform fees, shipping, and approved transaction costs). Client share by category: Clothing & Accessories ${clothingSplit}, Designer & Luxury ${designerSplit}, Furniture & Significant Home ${furnitureSplit}, Full Closet Liquidation ${liquidationSplit}. Bags primarily of lower-value items may use an adjusted structure, reviewed and communicated before listing.` },
  { h: "4. Client Review & Consent", b: "After the inventory report, the Client has a 24-hour window to pull any item from resale. Pulled items are returned at the next scheduled visit." },
  { h: "5. Payout", b: "Commission payouts are issued monthly for items that have sold." },
  { h: "6. Items Not Sold", b: "Most strong inventory sells within approximately 6–9 months. At about 180 days, remaining unsold items may be continued in the resale workflow, rerouted, returned, or donated, per Client preference and operational judgment — with reasonable attempts to contact the Client first." },
  { h: "7. Condition & Authenticity", b: "The Client affirms that items are their property to sell and are represented honestly as to condition and authenticity." },
  { h: "8. Liability", b: "WLC is not liable for loss or damage beyond the documented resale value of any item." },
];

const input: React.CSSProperties = {
  width: "100%", backgroundColor: "white", border: "1.5px solid var(--warm-gray-lt)",
  padding: "0.85rem 1rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.9rem",
  color: "var(--ink)", outline: "none", boxSizing: "border-box",
};
const label: React.CSSProperties = {
  display: "block", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.14em",
  textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem",
};

export default function AgreementGate() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", neighborhood: "",
    bagsCount: "", estimatedItems: "", urgency: "", pickupMethod: "",
    pickupTime1: "", pickupTime2: "", courierNotes: "", situation: "",
    signatureName: "",
  });
  const [scrolledEnd, setScrolledEnd] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<null | { opened: boolean; reason: string }>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function set(k: string, v: string) { setForm((p) => ({ ...p, [k]: v })); }

  function onScroll() {
    const el = scrollRef.current;
    if (!el) return;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setScrolledEnd(true);
  }

  const signatureValid = form.signatureName.trim().length > 1;
  const canSubmit = accepted && signatureValid && !!form.name && !!form.email && !submitting;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/handshake/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          summary: "Quick Resale Pickup — signed pickup",
          agreementAccepted: true,
          agreementTimestamp: new Date().toISOString(),
        }),
      });
      const data = (await res.json()) as { ok: boolean; opened?: boolean; reason?: string; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setDone({ opened: !!data.opened, reason: data.reason ?? "" });
      }
    } catch {
      setError("Unable to send. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div style={{ maxWidth: 560 }}>
        <span className="eyebrow eyebrow-sage">Pickup Requested</span>
        <h2 className="display-md" style={{ color: "var(--ink)", marginBottom: "1rem" }}>
          Signed and sent — thank you.
        </h2>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8 }}>
          Your agreement is on record and your pickup request is in. I'll confirm a window with you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 640 }}>
      <h3 style={label}>The Resale Agreement</h3>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        style={{
          maxHeight: 260, overflowY: "auto", border: "1.5px solid var(--warm-gray-lt)",
          background: "white", padding: "1.25rem", marginBottom: "0.75rem", fontSize: "0.85rem",
          lineHeight: 1.7, color: "var(--ink-soft)",
        }}
      >
        <p style={{ marginTop: 0 }}>
          By signing below, you (&ldquo;the Client&rdquo;) authorize The Well Lived Citizen
          (&ldquo;WLC&rdquo;) to take possession of and resell the items you provide, under the
          following terms:
        </p>
        {AGREEMENT_SECTIONS.map((s) => (
          <div key={s.h} style={{ marginBottom: "0.9rem" }}>
            <strong style={{ color: "var(--ink)" }}>{s.h}</strong>
            <div>{s.b}</div>
          </div>
        ))}
        <p style={{ marginBottom: 0, fontStyle: "italic" }}>Last updated: 2026</p>
      </div>
      {!scrolledEnd && (
        <p style={{ fontSize: "0.72rem", color: "var(--sage-dark)", marginBottom: "1.25rem" }}>
          Please scroll to the end of the agreement to continue.
        </p>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem", opacity: scrolledEnd ? 1 : 0.5, pointerEvents: scrolledEnd ? "auto" : "none" }}>
        <div><label style={label}>First &amp; Last Name *</label><input style={input} value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your full name" /></div>
        <div><label style={label}>Email *</label><input type="email" style={input} value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="your@email.com" /></div>
        <div><label style={label}>Phone</label><input style={input} value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="Your phone" /></div>
        <div><label style={label}>Neighborhood</label><input style={input} value={form.neighborhood} onChange={(e) => set("neighborhood", e.target.value)} placeholder="e.g. Silver Lake" /></div>
        <div>
          <label style={label}>How many bags? (up to 2)</label>
          <select style={input} value={form.bagsCount} onChange={(e) => set("bagsCount", e.target.value)}>
            <option value="">Select…</option><option value="1">1 bag</option><option value="2">2 bags</option>
          </select>
          <p style={{ fontSize: "0.7rem", color: "var(--sage-dark)", marginTop: "0.4rem", lineHeight: 1.4 }}>
            Up to 2 large bags (must fit in an Uber). More than that is a Reset or House Call — note it below and I'll route it right.
          </p>
        </div>
        <div><label style={label}>Rough item count</label><input style={input} value={form.estimatedItems} onChange={(e) => set("estimatedItems", e.target.value)} placeholder="e.g. ~30" /></div>
        <div>
          <label style={label}>Urgency</label>
          <select style={input} value={form.urgency} onChange={(e) => set("urgency", e.target.value)}>
            <option value="">Select…</option><option value="asap">ASAP — within 48h</option><option value="this-week">This week</option><option value="flexible">Flexible</option>
          </select>
        </div>
        <div>
          <label style={label}>How should bags reach me?</label>
          <select style={input} value={form.pickupMethod} onChange={(e) => set("pickupMethod", e.target.value)}>
            <option value="">Select…</option><option value="in-person">I'll be home</option><option value="ups">UPS label</option><option value="courier">Courier</option>
          </select>
        </div>
        <div><label style={label}>Ideal pickup time #1</label><input style={input} value={form.pickupTime1} onChange={(e) => set("pickupTime1", e.target.value)} placeholder="e.g. Wed AM" /></div>
        <div><label style={label}>Backup pickup time</label><input style={input} value={form.pickupTime2} onChange={(e) => set("pickupTime2", e.target.value)} placeholder="e.g. Sat AM" /></div>
        {form.pickupMethod === "courier" && (
          <div style={{ gridColumn: "1 / -1" }}><label style={label}>Courier access notes</label><input style={input} value={form.courierNotes} onChange={(e) => set("courierNotes", e.target.value)} placeholder="Gate code, where to find the bags" /></div>
        )}
      </div>

      <div style={{ opacity: scrolledEnd ? 1 : 0.5, pointerEvents: scrolledEnd ? "auto" : "none", borderTop: "1px solid var(--warm-gray-lt)", paddingTop: "1.25rem" }}>
        <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", cursor: "pointer", marginBottom: "1rem" }}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} style={{ marginTop: "0.2rem" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.5 }}>
            I have read and agree to the Resale Agreement above. I authorize WLC to take possession of and resell my items under these terms. Possession transfers at handoff.
          </span>
        </label>
        <label style={label}>Type your full legal name to sign *</label>
        <input
          style={{ ...input, fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1.25rem", fontStyle: "italic" }}
          value={form.signatureName}
          onChange={(e) => set("signatureName", e.target.value)}
          placeholder="Your signature"
        />
        <p style={{ fontSize: "0.72rem", color: "var(--sage-dark)", marginTop: "0.5rem" }}>
          Signing stamps the date and time and opens your pickup record.
        </p>
      </div>

      {error && <p style={{ fontSize: "0.85rem", color: "#b94a48", margin: "1rem 0" }}>{error}</p>}

      <button type="submit" className="btn btn-ink" disabled={!canSubmit} style={{ width: "100%", justifyContent: "center", padding: "1rem", marginTop: "1.5rem", opacity: canSubmit ? 1 : 0.5, cursor: canSubmit ? "pointer" : "not-allowed" }}>
        {submitting ? "Signing…" : "Sign & Request Pickup"}
      </button>
    </form>
  );
}
