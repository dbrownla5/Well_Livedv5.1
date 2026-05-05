export const PLATFORMS = [
  "eBay",
  "Poshmark",
  "Etsy",
  "Chairish",
  "Facebook Marketplace",
  "Local Pickup"
] as const;

export type Platform = typeof PLATFORMS[number];

export const STATUSES = [
  "New",
  "Draft",
  "Listed",
  "Sold",
  "Donated",
  "Archived"
] as const;

export type Status = typeof STATUSES[number];

export const DISPOSITIONS = [
  "list",
  "donate",
  "wipe-recycle"
] as const;

export type Disposition = typeof DISPOSITIONS[number];

export function formatCurrency(value: string | number | null | undefined): string {
  if (!value) return "$0.00";
  const num = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(num)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(num);
}
