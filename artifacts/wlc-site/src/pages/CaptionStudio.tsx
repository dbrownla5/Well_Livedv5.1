import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { usePageMeta } from "@/lib/usePageMeta";

interface Caption {
  angle: string;
  text: string;
  hashtags: string[];
}

const SERVICES = ["general", "Reset", "House Call", "Resale", "Legacy"];
const VIBES = ["everyday", "launch", "behind-the-scenes", "client win"];

export default function CaptionStudio() {
  usePageMeta({
    title: "Caption Studio — The Well Lived Citizen",
    description: "Generate on-brand captions in Dayna's voice.",
    path: "/caption-studio",
  });

  const [situation, setSituation] = useState("");
  const [service, setService] = useState("general");
  const [vibe, setVibe] = useState("everyday");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  async function generate() {
    if (!situation.trim()) {
      setError("Tell me what you want to post about first.");
      return;
    }
    setLoading(true);
    setError(null);
    setCaptions([]);
    try {
      const res = await fetch("/api/voice/captions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ situation, service, vibe }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }
      setCaptions(data.captions as Caption[]);
    } catch {
      setError("Couldn't reach the caption engine. Check the connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  function copy(idx: number, c: Caption) {
    const tags = c.hashtags?.length ? "\n\n" + c.hashtags.join(" ") : "";
    void navigator.clipboard.writeText(c.text + tags);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx((cur) => (cur === idx ? null : cur)), 1800);
  }

  const labelStyle: React.CSSProperties = {
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.14em",
    textTransform: "uppercase", color: "var(--sage-dark)", marginBottom: "0.5rem", display: "block",
  };
  const fieldStyle: React.CSSProperties = {
    width: "100%", padding: "0.85rem 1rem", fontSize: "0.95rem",
    border: "1px solid var(--warm-gray-lt)", backgroundColor: "var(--parchment)",
    color: "var(--ink)", fontFamily: "inherit",
  };

  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />

      <section style={{ backgroundColor: "var(--ink)", paddingTop: "9rem", paddingBottom: "4rem" }}>
        <div className="container">
          <div style={{ maxWidth: 720 }}>
            <span className="eyebrow eyebrow-light">Internal Tool · Caption Studio</span>
            <h1 style={{ color: "var(--parchment)", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Say it once. Get it in your voice.
            </h1>
            <p style={{ fontSize: "1.05rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75 }}>
              Describe the photo or the thought. I'll give you three captions — one dry, one warm, one straight — already in your voice. Pick one, copy it, hand it to Manus with the photo.
            </p>
          </div>
        </div>
      </section>

      <section style={{ backgroundColor: "var(--parchment)", padding: "4rem 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "3rem", alignItems: "start" }}>

            {/* ── INPUT ── */}
            <div>
              <label style={labelStyle} htmlFor="situation">What are we posting about?</label>
              <textarea
                id="situation"
                value={situation}
                onChange={(e) => setSituation(e.target.value)}
                rows={5}
                placeholder="e.g. a dining table that's been a 'staging area' for eight months — mail, half-folded laundry, a box that never got unpacked."
                style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6, marginBottom: "1.5rem" }}
              />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.75rem" }}>
                <div>
                  <label style={labelStyle} htmlFor="service">Service</label>
                  <select id="service" value={service} onChange={(e) => setService(e.target.value)} style={fieldStyle}>
                    {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle} htmlFor="vibe">Vibe</label>
                  <select id="vibe" value={vibe} onChange={(e) => setVibe(e.target.value)} style={fieldStyle}>
                    {VIBES.map((v) => <option key={v} value={v}>{v}</option>)}
                  </select>
                </div>
              </div>

              <button
                onClick={generate}
                disabled={loading}
                className="btn btn-ink"
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer", border: "none" }}
              >
                {loading ? "Writing…" : "Generate Captions"}
              </button>

              {error && (
                <p style={{ marginTop: "1.25rem", fontSize: "0.9rem", color: "#9a3b2e", lineHeight: 1.6 }}>
                  {error}
                </p>
              )}
            </div>

            {/* ── OUTPUT ── */}
            <div>
              {captions.length === 0 && !loading && (
                <div style={{ padding: "2.5rem", backgroundColor: "var(--parchment-mid)", border: "1px dashed var(--warm-gray-lt)" }}>
                  <p style={{ fontSize: "0.92rem", fontWeight: 300, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                    Your three captions show up here. Each one is a different angle on the same moment — copy the one that sounds most like the day you're having.
                  </p>
                </div>
              )}

              {loading && (
                <p style={{ fontSize: "0.92rem", fontWeight: 300, color: "var(--sage-dark)" }}>
                  Finding the angle…
                </p>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: "1px", backgroundColor: "var(--warm-gray-lt)" }}>
                {captions.map((c, i) => (
                  <div key={i} style={{ backgroundColor: "var(--parchment)", padding: "1.75rem 1.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.9rem" }}>
                      <span className="underlay-tag underlay-tag-sage" style={{ textTransform: "capitalize" }}>{c.angle}</span>
                      <button
                        onClick={() => copy(i, c)}
                        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: copiedIdx === i ? "var(--sage-dark)" : "var(--ink-soft)" }}
                      >
                        {copiedIdx === i ? "Copied ✓" : "Copy"}
                      </button>
                    </div>
                    <p style={{ fontSize: "1rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.7, whiteSpace: "pre-line", marginBottom: c.hashtags?.length ? "0.9rem" : 0 }}>
                      {c.text}
                    </p>
                    {c.hashtags?.length > 0 && (
                      <p style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--sage-dark)" }}>
                        {c.hashtags.join(" ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
