import { useEffect } from "react";
import { Link } from "wouter";

export default function HomeOrganization() {
  useEffect(() => {
    document.title = "Home Organization & Modern Move — The Well Lived Citizen Co";
  }, []);

  return (
    <div className="page">
      <section style={{ padding: "80px 0 56px", borderBottom: "1px solid var(--linen)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="label">01 — Home Organization & Modern Move</div>
          <h1 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 700, color: "var(--char)", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "16px" }}>
            Your home, made to work for how you actually live.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--stone)", fontStyle: "italic", maxWidth: "520px" }}>
            The relief of the room.
          </p>
        </div>
      </section>

      <section style={{ padding: "64px 0" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div className="service-body">
            <p>We cover the rooms and spaces. For the room that keeps collecting piles. The storage unit that keeps increasing rent and you only go every six months to ensure you weren't broken into or to take out that one outfit, or bike. The move where the boxes made it through the door, but nothing feels settled. The move where you had to leave before everything was fully packed, and someone still needs to close out what's left behind.</p>
            <p>The professional landing in Los Angeles the same day as their boxes and the first day on the job — knowing you'll come home to a boxed mattress, no phone charger, and a suit that needs steaming. No energy, takeout food, or forks. It's the 'oh my gosh, someone save me' situation. But you're happy — life is starting a new chapter — you just have to move through the hurdles of that part.</p>
            <p>The closet that no longer fits your life, body, season, or the way you actually get dressed (morning or afternoon — no judgment). I come in, find the friction, and make the space work around how you naturally move through your day. The goal is a home that lands well and WORKS and keeps working after I leave.</p>
          </div>

          <div className="service-pricing" style={{ marginTop: "40px" }}>$150/hr &middot; 3 hr minimum</div>
          <div className="service-flex-note">
            Flex pricing and project quotes covered on our <Link href="/pricing" style={{ color: "var(--rust)" }}>Pricing page</Link>.
          </div>
          <Link href="/contact" className="btn btn-dark" style={{ marginTop: "16px" }}>Book your session</Link>
        </div>
      </section>

      <section style={{ padding: "48px 0 72px", borderTop: "1px solid var(--linen)", background: "var(--warm)" }}>
        <div className="container" style={{ maxWidth: "760px", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--rust)", marginBottom: "24px" }}>
            Other Services
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", alignItems: "center" }}>
            <Link href="/services/legacy" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Legacy Planning & Inventory Catalog</Link>
            <Link href="/services/house-calls" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>House Calls</Link>
            <Link href="/services/resale" style={{ fontSize: "14px", fontWeight: 600, color: "var(--char)", textDecoration: "underline", textDecorationColor: "var(--linen)", textUnderlineOffset: "4px" }}>Curated Resale & Consignment</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
