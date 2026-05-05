import { Link } from "wouter";
import { usePageMeta } from "../../hooks/usePageMeta";

export default function Legacy() {
  usePageMeta({
    title: "Legacy Planning & Inventory Catalog",
    description: "Clarity without fear. The operational side of a home, made visible — inventory, documentation, and decisions while you're the one making them.",
  });
  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">02 — Legacy Planning & Inventory Catalog</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>Clarity without fear.</h1>
          <p style={{ fontSize: "17px", color: "var(--stone)", lineHeight: 1.75, maxWidth: "600px" }}>The operational side of a home, made visible again.</p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ fontSize: "15px", lineHeight: 1.9, color: "var(--ink)", marginBottom: "32px" }}>
            <p style={{ marginBottom: "16px" }}>This is for the part of life most people don't realize has been quietly building for years — the things inside a home that became part of how life worked, long before anyone stopped to look at them.</p>
            <p style={{ marginBottom: "8px", fontWeight: 600 }}>It is not estate planning.</p>
            <p style={{ marginBottom: "8px", fontWeight: 600 }}>It is not asset planning.</p>
            <p style={{ marginBottom: "8px", fontWeight: 600 }}>It is planning the actual pieces of a life.</p>
            <p>Not the will, not the paperwork, not the part a lawyer handles. The part that lives inside the walls.</p>
          </div>

          {/* China passage */}
          <div style={{ background: "var(--warm)", borderLeft: "3px solid var(--rust)", padding: "24px 28px", margin: "40px 0" }}>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.9, marginBottom: "16px" }}>It's a holiday dinner, looking at china that hasn't been used in years. You wonder if it ever will, knowing three plates are missing, broken in memorable moments over lifetimes. What happens to a set of china passed down two generations, incomplete but once made a new couple feel whole? It can't be worthless, but can't be sold incomplete. Your kids live in small apartments and said, "That's sweet, but we can't take it." So, what happens to something you thought would be with your family forever?</p>
            <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.9 }}>I help. I look at everything in your home — practical, sentimental, and holding memories — and I listen to them, for as long or as little as you want to tell their stories. We'll find a way to ensure the things you felt were special — incomplete and all — make it to hands that collect, treasure, and find value in them, sharing in the story a little longer.</p>
          </div>

          <p style={{ fontSize: "16px", fontWeight: 700, color: "var(--char)", margin: "32px 0", fontStyle: "italic" }}>This service is the person who can see what is actually there.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>What this work actually is</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px" }}>The operational side of a home is the layer that quietly adds up over time:</p>
          <ul style={{ listStyle: "none", marginBottom: "24px" }}>
            {[
              "The drawers",
              "The backup bedding",
              "The linen closets stacked with care",
              "The vintage pieces with story",
              "The everyday things with future value",
              "The candles tucked away because the house was always tidy enough",
              "The designer pieces in sizes the family doesn't share",
              "The collection no one else in the house ever learned to see",
              "The objects that deserve clarity before family stress builds",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "8px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>Sometimes the people who love you don't share your eye, your size, or the history behind what you chose. That is not a failure of family. It is just the reality of inherited space — people can only hold what they recognize.</p>

          <div className="outputs-grid">
            <span className="outputs-header">Possible outputs include</span>
            <span>Digital inventory</span><span>Photo documentation</span>
            <span>Room-by-room item notes</span><span>Family distribution references</span>
            <span>Sentiment and story preservation</span><span>Resale-ready routing notes</span>
            <span>Donation pathways</span><span>Second-home and storage references</span>
            <span>Transition roadmap</span><span>Printable copies</span>
            <span>Bound family binders</span><span>Duplicate family copies</span>
            <span style={{ borderRight: "none" }}>Digital or web-based workflows</span><span></span>
          </div>

          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, margin: "32px 0" }}>When a piece has a story worth keeping with it, that history is documented too — not for paperwork, but so the next person who wears the fur coat, sets the table with the china, or lights the candle in the drawer has just enough of the mystery underneath to feel like they are living inside a second life, not just holding an object.</p>

          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>That is the quiet bridge between Legacy Planning and Curated Resale. Items identified for sale during catalog work can route directly into Curated Resale & Consignment without restarting the process — and when story matters, the story travels with them.</p>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>How project timelines work</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "40px" }}>Larger projects are completed across focused work sessions over a shared timeline, rather than continuous daily presence. A two-week catalog may look like three focused 11–4 sessions, with off-site documentation, resale routing, and continuity work completed between visits.</p>

          <p style={{ fontSize: "14px", color: "var(--stone)", lineHeight: 1.75, marginBottom: "40px" }}>Hourly is $175 with a two-hour minimum. Larger projects and whole-home catalogs are scoped and quoted after a walkthrough. <Link href="/pricing" style={{ color: "var(--rust)" }}>Full pricing →</Link></p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact?service=legacy" className="btn btn-dark">Book your time</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
