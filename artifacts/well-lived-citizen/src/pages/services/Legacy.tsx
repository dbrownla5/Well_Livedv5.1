import { Link } from "wouter";

export default function Legacy() {
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

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "40px 0 16px" }}>Who this is for</h2>
          <p style={{ fontSize: "14px", color: "var(--stone)", marginBottom: "16px", lineHeight: 1.75 }}>The operational side of a home shows up for almost everyone, eventually. Sometimes it's a life change. Sometimes it's a move. Sometimes it's a quiet morning where the drawers, closets, and storage spaces stop matching the person living there.</p>

          <ul style={{ listStyle: "none", marginBottom: "24px" }}>
            {[
              "The divorced mom who moved into a condo and suddenly had to see, for the first time, how much had actually been accumulated over a marriage — and had to agree to how it all gets split",
              "The person who lived in the same apartment for ten years and had no idea how much had quietly gathered in the back of every closet",
              "The career change that revealed a hundred film industry cords, gear, and references in the garage — from a life that isn't the current one anymore",
              "The household where someone is ready to take control of their own story before it falls into someone else's hands",
              "The family carrying years of meaningful, valuable, or hard-to-sort volume that deserves clarity without pressure",
              "The person who wants to decide what stays, what moves on, and what gets remembered — while they are the one making the decisions",
            ].map((item, i, arr) => (
              <li key={i} style={{ fontSize: "14px", color: "var(--ink)", padding: "10px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--linen)" : "none" }}>{item}</li>
            ))}
          </ul>

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

          <div style={{ background: "var(--char)", padding: "36px", margin: "40px 0" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--sand)", marginBottom: "14px" }}>The value of the operational middle.</div>
            <p style={{ fontSize: "15px", color: "var(--cream)", lineHeight: 1.8, marginBottom: "12px" }}>You already have the estate planner and the will. But the lawyer doesn't know about the backup bedding, the designer pieces in sizes the family doesn't share, or the vintage pieces with a story no one thought to write down.</p>
            <p style={{ fontSize: "15px", color: "rgba(245,240,232,.78)", lineHeight: 1.8 }}>My work is preventing family stress before it builds — mapping the operational side of the home so that when the time comes, your family has clarity and not chaos. The things that took a lifetime to accumulate deserve more than a rushed weekend of sorting.</p>
          </div>

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 16px" }}>What Legacy Planning holds</h2>
          <p style={{ fontSize: "14px", color: "var(--ink)", lineHeight: 1.8, marginBottom: "24px" }}>The walls and the things inside them tell a story just as much as the person in the photographs. This work is built to honor both — the operational layer that keeps a home running, and the meaning underneath the objects that deserve to carry forward with the right memory attached.</p>

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

          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "var(--char)", margin: "0 0 20px" }}>Pricing</h2>
          <table className="pricing-table">
            <tbody>
              <tr><td>Single room or storage unit</td><td>$175/hr · 2 hr minimum</td></tr>
              <tr><td>Whole home</td><td>Project quote after walkthrough</td></tr>
            </tbody>
          </table>
          <p style={{ fontSize: "12px", color: "var(--sand)", marginTop: "8px", marginBottom: "40px" }}>No fixed tier for larger estates — scope and complexity vary too much to quote in advance.</p>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/contact" className="btn btn-dark">Book your time</Link>
            <Link href="/services" style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--stone)", display: "flex", alignItems: "center", textDecoration: "none" }}>← All Services</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
