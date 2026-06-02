/**
 * THE WELL LIVED CITIZEN — SINGLE SOURCE OF TRUTH
 * ================================================
 * Every price, name, tagline, pillar, and canonical line lives HERE.
 * Pages import from this file. NEVER hardcode these values in a page.
 *
 * Change a fact once, here, and it updates everywhere it appears — so the
 * homepage, Services, Pricing, and intake can never disagree. This is the
 * anti-drift protection described in /replit.md.
 *
 * Sources of truth: docs/BRAND-VOICE.md (voice + hero), docs/SERVICES-PRICING.md
 * (pricing), docs/brand-source/ (Dayna's originals). Locked 2026-05-31.
 */

export const company = {
  name: "The Well Lived Citizen",
  legalEntity: "Well Dressed Citizen LLC",
  resaleArm: "The Well Lived Closet",
  location: "Los Angeles",
  serviceArea: "Greater Los Angeles",
  email: "dayna@thewelllivedcitizen.com",
  domainPrimary: "www.thewelllivedcitizen.com", // canonical; pending final confirm
  domainSecondary: "welllivedcitizen.com", // 301 redirect to primary
  instagram: {
    business: "@thewelllivedcitizen",
    closet: "@thewelllivedcloset",
  },
} as const;

/** LOCKED HERO — see docs/BRAND-VOICE.md. */
export const hero = {
  headline:
    "Professional problem solver. Unofficial fixer of the things life keeps turning into projects.",
  subhead:
    "Moves, resale, errands, setups, storage units, logistics, tech, vendor coordination, and the things you forgot about too.",
} as const;

/** Approved positioning lines — use across the site / page breaks (not the hero). */
export const positioningLines = [
  "One person for the move, the resale, the storage unit, and the other thing currently ruining your week.",
  "Operational support for modern life.",
  "The stuff that falls between categories — and still has to get handled.",
  "For the things that become six phone calls, three vendors, and a month of avoidance.",
  "The logistics, the follow-through, the vendor coordination, the resale decisions, the weird lamp, the storage unit. All of it.",
  "Support for people with too many tabs open.",
  "Someone competent helping life move again.",
] as const;

/** The real "why people hire you." */
export const thesisLine =
  "Most clients hire me because the operational side of life quietly became heavier than it used to be.";

/** QUICK ENTRY / FAST SUPPORT — the entry tier. Public label is NOT "Quick Books". */
export const entryOffers = [
  {
    id: "reset",
    name: "4-Hour Practical Reset",
    price: "$495 flat",
    blurb:
      "Focused operational support for one room, one task, one reset, one move stage — one measurable outcome.",
    href: "/the-reset",
  },
  {
    id: "house-call",
    name: "2-Hour House Call",
    price: "$350",
    blurb:
      "Vendor access, donation routing, install days, errands, returns, guest prep, package overflow, tech — the day-to-day.",
    href: "/house-calls",
  },
  {
    id: "fast-bag",
    name: "Fast Bag Pickup",
    price: "Commission-based · free pickup",
    blurb:
      "Fill a bag with clothing and accessories you're done with. I pick up, evaluate, route to the right platform, and list.",
    href: "/fast-bag-fill",
  },
] as const;

/** The four pillars (core services). */
export const pillars = [
  {
    num: "01",
    name: "Home Organization & Move Support",
    desc: "Organization, unpacking, move support, room resets, closets, kitchens, systems, layout, setup. The 4-Hour Reset and flex blocks live here.",
    price: "$150/hr",
    href: "/home-reset-move-support",
  },
  {
    num: "02",
    name: "Legacy Planning & Inventory Catalog",
    desc: "Inventory and documentation of belongings and stories — inherited objects, antiques, records, fragile-item routing, preservation, resale routing.",
    price: "$175/hr · 2-hr minimum",
    href: "/legacy-planning",
  },
  {
    num: "03",
    name: "House Calls",
    desc: "The operational side of life that got heavier: tech, smart-home, vendor coordination, package management, resets, remote family support, donation routing.",
    price: "$175/hr · 2-hr minimum",
    href: "/house-calls-pillar",
  },
  {
    num: "04",
    name: "Curated Resale & Consignment",
    desc: "Sort, evaluate, route, list, ship — across 10+ platforms by market fit. Story-rich vintage, designer, furniture, and home goods. Pickup included.",
    price: "Commission-based · free pickup",
    href: "/curated-resale-consignment",
  },
] as const;

/** Full canonical pricing — see docs/SERVICES-PRICING.md for scope detail. */
export const pricing = {
  reset4hr: "$495 flat",
  houseCall2hr: "$350",
  homeOrgHourly: "$150/hr",
  flexBlock10hr: "$1,250 prepaid",
  flexBlock25hr: "$3,150 prepaid",
  moveInDay: "$1,200 flat",
  houseCallsHourly: "$175/hr · 2-hour minimum",
  homeCloseoutsHourly: "$150/hr (+ resale commission on items sold)",
  legacyHourly: "$175/hr · 2-hour minimum",
  legacyWholeHome: "Scoped after walkthrough",
  itemResearch: "~$25 (single item, one stop, one question)",
  retainerFrom: "Starting at $500/month",
} as const;

/** Resale commission — % to client / % to TWLC, on net sale price. */
export const commission = [
  { category: "Clothing & Accessories", client: "45%", twlc: "55%" },
  { category: "Designer & Luxury", client: "50%", twlc: "50%" },
  { category: "Furniture & Significant Home", client: "50%", twlc: "50%" },
  { category: "Full Closet Liquidation", client: "45%", twlc: "55%" },
] as const;

/** Supply add-on bundles — SUPPLIES ONLY, never labor. */
export const supplyBundles = [
  { name: "Starter Bundle", price: "$150" },
  { name: "Mid Bundle", price: "$250" },
  { name: "Full Bundle", price: "$500" },
] as const;
