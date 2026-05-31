import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/**
 * Client-facing consent page (/consent/:token). Linked from the inventory
 * report email. The client reviews their itemized list and either approves
 * everything or pulls specific items. Submitting records the decision, starts
 * the review period, and anchors the payout clock to this moment.
 */
interface Item {
  id: number;
  description: string;
  platform: string | null;
  estSaleCents: number | null;
  disposition: string;
  clientPulled: boolean;
}
interface ConsentData {
  ok: boolean;
  clientName?: string;
  step?: string;
  decided?: boolean;
  items?: Item[];
  error?: string;
}

const money = (c: number | null) => (c == null ? "" : `$${(c / 100).toFixed(2)}`);

export default function Consent() {
  const [, params] = useRoute("/consent/:token");
  const token = params?.token ?? "";
  const [data, setData] = useState<ConsentData | null>(null);
  const [pulled, setPulled] = useState<Set<number>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<null | string>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/handshake/consent/${token}`)
      .then((r) => r.json())
      .then((d: ConsentData) => setData(d))
      .catch(() => setData({ ok: false, error: "Could not load your list." }));
  }, [token]);

  function toggle(id: number) {
    setPulled((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function submit(approveAll: boolean) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/handshake/consent/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pulledItemIds: approveAll ? [] : [...pulled] }),
      });
      const d = (await res.json()) as { ok: boolean; decision?: string; error?: string };
      if (!res.ok || !d.ok) setError(d.error ?? "Something went wrong.");
      else setDone(d.decision ?? "approved");
    } catch {
      setError("Unable to submit. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const wrap = (children: React.ReactNode) => (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />
      <section style={{ paddingTop: "9rem", paddingBottom: "7rem" }}>
        <div className="container" style={{ maxWidth: 720 }}>{children}</div>
      </section>
      <Footer />
    </div>
  );

  if (!data) return wrap(<p className="muted">Loading your list…</p>);
  if (!data.ok) return wrap(<p style={{ color: "#b94a48" }}>{data.error ?? "Not found."}</p>);
  if (done) {
    return wrap(
      <>
        <span className="eyebrow eyebrow-sage">Recorded</span>
        <h1 className="display-md" style={{ color: "var(--ink)", marginBottom: "1rem" }}>
          {done === "changes" ? "Got it — I've pulled those." : "Approved — thank you."}
        </h1>
        <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8 }}>
          {done === "changes"
            ? "The items you flagged will be returned at the next visit. Everything else proceeds to resale."
            : "Everything proceeds as listed. I'll keep you posted as items sell."}
        </p>
      </>,
    );
  }
  if (data.decided) {
    return wrap(
      <>
        <span className="eyebrow eyebrow-sage">Already Recorded</span>
        <h1 className="display-md" style={{ color: "var(--ink)" }}>Your decision is already on file.</h1>
        <p style={{ color: "var(--ink-soft)", marginTop: "1rem" }}>If something's changed, reach out directly and we'll sort it.</p>
      </>,
    );
  }

  const items = data.items ?? [];
  return wrap(
    <>
      <span className="eyebrow eyebrow-sage">Your Inventory</span>
      <h1 className="display-md" style={{ color: "var(--ink)", marginBottom: "0.75rem" }}>
        {data.clientName ? `${data.clientName}, ` : ""}here's your list.
      </h1>
      <p style={{ fontSize: "1rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
        This is everything I've cataloged from your pickup. Check anything you'd like to pull back — those come home at the next visit. Leave them unchecked to approve resale.
      </p>

      <div style={{ border: "1.5px solid var(--warm-gray-lt)", background: "white" }}>
        {items.map((it, i) => (
          <label
            key={it.id}
            style={{ display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem", borderTop: i ? "1px solid var(--warm-gray-lt)" : "none", cursor: "pointer" }}
          >
            <input type="checkbox" checked={pulled.has(it.id)} onChange={() => toggle(it.id)} />
            <span style={{ flex: 1 }}>
              <span style={{ fontWeight: 600, color: "var(--ink)" }}>{it.description}</span>
              {it.platform ? <span style={{ color: "var(--sage-dark)", fontSize: "0.82rem" }}> · {it.platform}</span> : null}
            </span>
            <span style={{ color: "var(--sage-dark)", fontSize: "0.85rem" }}>{money(it.estSaleCents)}</span>
            <span style={{ fontSize: "0.7rem", color: pulled.has(it.id) ? "#b94a48" : "var(--sage-dark)", minWidth: 64, textAlign: "right" }}>
              {pulled.has(it.id) ? "PULL BACK" : "resell"}
            </span>
          </label>
        ))}
        {items.length === 0 && <p style={{ padding: "1.25rem", color: "var(--sage-dark)" }}>No items listed yet.</p>}
      </div>

      {error && <p style={{ color: "#b94a48", marginTop: "1rem" }}>{error}</p>}

      <div style={{ display: "flex", gap: "1rem", marginTop: "2rem", flexWrap: "wrap" }}>
        <button className="btn btn-ink" disabled={submitting} onClick={() => submit(true)} style={{ flex: 1, justifyContent: "center", minWidth: 200 }}>
          {submitting ? "Submitting…" : "Approve all for resale"}
        </button>
        <button className="btn btn-sage" disabled={submitting || pulled.size === 0} onClick={() => submit(false)} style={{ flex: 1, justifyContent: "center", minWidth: 200, opacity: pulled.size === 0 ? 0.5 : 1 }}>
          {pulled.size > 0 ? `Pull back ${pulled.size} & approve rest` : "Pull back selected"}
        </button>
      </div>
    </>,
  );
}
