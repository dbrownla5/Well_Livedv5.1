import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AgreementGate from "@/components/AgreementGate";
import { usePageMeta } from "@/lib/usePageMeta";

/**
 * Signed bag-pickup intake. This is the page the "Schedule a Pickup" CTAs point
 * to for Fast Bag Fill — it requires the resale agreement signature that opens a
 * Handshake record on the server.
 */
export default function BagPickup() {
  usePageMeta({
    title: "Schedule a Bag Pickup — The Well Lived Citizen",
    description: "Sign the resale agreement and request your Fast Bag Fill pickup. Possession transfers at handoff; you'll get an itemized inventory within 7–10 business days.",
    path: "/bag-pickup",
  });
  return (
    <div style={{ backgroundColor: "var(--parchment)", minHeight: "100vh" }}>
      <Nav />
      <section style={{ backgroundColor: "var(--ink)", paddingTop: "10rem", paddingBottom: "4rem" }}>
        <div className="container">
          <span className="eyebrow" style={{ color: "rgba(248,244,227,0.45)" }}>Fast Bag Fill</span>
          <h1 className="display-lg" style={{ color: "var(--parchment)", marginBottom: "1rem" }}>
            Sign, then schedule<br />your pickup.
          </h1>
          <p style={{ fontSize: "1rem", fontWeight: 300, color: "rgba(248,244,227,0.7)", lineHeight: 1.75, maxWidth: 540 }}>
            The signature is what opens your record — it's how possession is logged and how your payout is protected. Read it, sign it, and tell me when to come by.
          </p>
        </div>
      </section>
      <section style={{ padding: "4rem 0 7rem" }}>
        <div className="container">
          <AgreementGate />
        </div>
      </section>
      <Footer />
    </div>
  );
}
