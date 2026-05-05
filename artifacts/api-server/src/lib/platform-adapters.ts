import { scrubForbidden } from "./forbidden-scrub";
import { randomUUID } from "crypto";

export type PublishMode = "live" | "draft" | "draft_prepared";

export interface PublishResult {
  mode: PublishMode;
  platformListingId: string | null;
  platformListingUrl: string | null;
  message: string;
  /** For draft_prepared platforms: platform-specific deep link to the listing creation flow */
  createUrl?: string;
}

export interface ItemPayload {
  itemId: number;
  brand: string;
  model: string;
  platform: string;
  listingDescription: string;
  title: string;
  marketPrice: string | null;
  floorPrice: string | null;
  shippingLogic: string | null;
}

function scrubPayload(payload: ItemPayload): ItemPayload {
  return {
    ...payload,
    title: scrubForbidden(payload.title),
    listingDescription: scrubForbidden(payload.listingDescription),
    shippingLogic: payload.shippingLogic
      ? scrubForbidden(payload.shippingLogic)
      : null,
  };
}

function listPrice(payload: ItemPayload): string {
  return payload.floorPrice ?? payload.marketPrice ?? "9.99";
}

// ---------- eBay ----------

async function publishToEbay(payload: ItemPayload): Promise<PublishResult> {
  const token = process.env["EBAY_USER_ACCESS_TOKEN"];
  const locationKey = process.env["EBAY_MERCHANT_LOCATION_KEY"];
  const fulfillmentPolicyId = process.env["EBAY_FULFILLMENT_POLICY_ID"];
  const paymentPolicyId = process.env["EBAY_PAYMENT_POLICY_ID"];
  const returnPolicyId = process.env["EBAY_RETURN_POLICY_ID"];

  if (!token || !locationKey || !fulfillmentPolicyId || !paymentPolicyId || !returnPolicyId) {
    return {
      mode: "draft_prepared",
      platformListingId: `ebay-draft-${payload.itemId}`,
      platformListingUrl: null,
      createUrl: "https://www.ebay.com/sell/trading/sell-your-item",
      message:
        "eBay credentials not configured. Set EBAY_USER_ACCESS_TOKEN, EBAY_MERCHANT_LOCATION_KEY, EBAY_FULFILLMENT_POLICY_ID, EBAY_PAYMENT_POLICY_ID, EBAY_RETURN_POLICY_ID as Replit secrets to enable direct publishing. Use the link below to list manually.",
    };
  }

  const sku = `DBRES-${payload.itemId}`;
  const baseUrl = "https://api.ebay.com";

  const inventoryItemBody = {
    availability: {
      shipToLocationAvailability: { quantity: 1 },
    },
    condition: "USED_EXCELLENT",
    product: {
      title: payload.title.slice(0, 80),
      description: payload.listingDescription,
      aspects: {
        Brand: [payload.brand],
      },
    },
  };

  const inventoryRes = await fetch(
    `${baseUrl}/sell/inventory/v1/inventory_item/${encodeURIComponent(sku)}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Content-Language": "en-US",
        Accept: "application/json",
      },
      body: JSON.stringify(inventoryItemBody),
    },
  );

  if (!inventoryRes.ok && inventoryRes.status !== 204) {
    const text = await inventoryRes.text();
    throw new Error(`eBay inventory item creation failed (${inventoryRes.status}): ${text}`);
  }

  const offerBody = {
    sku,
    marketplaceId: "EBAY_US",
    format: "FIXED_PRICE",
    listingDescription: payload.listingDescription,
    pricingSummary: {
      price: { value: listPrice(payload), currency: "USD" },
    },
    listingPolicies: {
      fulfillmentPolicyId,
      paymentPolicyId,
      returnPolicyId,
    },
    merchantLocationKey: locationKey,
    quantityLimitPerBuyer: 1,
  };

  const offerRes = await fetch(`${baseUrl}/sell/inventory/v1/offer`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(offerBody),
  });

  if (!offerRes.ok) {
    const text = await offerRes.text();
    throw new Error(`eBay offer creation failed (${offerRes.status}): ${text}`);
  }

  const offerData = (await offerRes.json()) as { offerId?: string };
  const offerId = offerData.offerId ?? null;

  return {
    mode: "draft",
    platformListingId: offerId,
    platformListingUrl: offerId
      ? "https://www.ebay.com/sh/lst/active"
      : null,
    message: `eBay draft offer created (SKU: DBRES-${payload.itemId}, offerId: ${offerId}). Open eBay Seller Hub to publish.`,
  };
}

// ---------- Etsy ----------

async function publishToEtsy(payload: ItemPayload): Promise<PublishResult> {
  const apiKey = process.env["ETSY_API_KEY"];
  const shopId = process.env["ETSY_SHOP_ID"];
  const accessToken = process.env["ETSY_ACCESS_TOKEN"];

  if (!apiKey || !shopId || !accessToken) {
    return {
      mode: "draft_prepared",
      platformListingId: `etsy-draft-${payload.itemId}`,
      platformListingUrl: null,
      createUrl: "https://www.etsy.com/sell",
      message:
        "Etsy credentials not configured. Set ETSY_API_KEY, ETSY_SHOP_ID, and ETSY_ACCESS_TOKEN as Replit secrets to enable direct publishing. Use the link below to list manually.",
    };
  }

  const priceFloat =
    payload.floorPrice
      ? parseFloat(payload.floorPrice)
      : payload.marketPrice
        ? parseFloat(payload.marketPrice)
        : 9.99;

  const listingBody = {
    title: payload.title.slice(0, 140),
    description: payload.listingDescription,
    price: priceFloat,
    quantity: 1,
    who_made: "someone_else",
    when_made: "2000_2024",
    taxonomy_id: 1,
    state: "draft",
    is_digital: false,
  };

  const res = await fetch(
    `https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(shopId)}/listings`,
    {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(listingBody),
    },
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Etsy listing creation failed (${res.status}): ${text}`);
  }

  const data = (await res.json()) as { listing_id?: number };
  const listingId = data.listing_id ? String(data.listing_id) : null;

  return {
    mode: "draft",
    platformListingId: listingId,
    platformListingUrl: listingId
      ? "https://www.etsy.com/your/shops/me/tools/listings"
      : null,
    message: `Etsy draft listing created (id: ${listingId}). Review and publish from Etsy Shop Manager.`,
  };
}

// ---------- No-API platforms ----------
// Poshmark, Chairish, and Facebook Marketplace do not offer public listing APIs
// for individual sellers. This adapter prepares a platform-specific draft locally,
// sets the item status to Draft, stores a local draft reference, and provides a
// direct deep link to the platform's listing creation flow so operators can
// paste the prepared copy in one step.

interface NoApiConfig {
  draftIdPrefix: string;
  createUrl: string;
  instructions: string;
}

const NO_API_CONFIG: Record<string, NoApiConfig> = {
  Poshmark: {
    draftIdPrefix: "poshmark-draft",
    createUrl: "https://poshmark.com/sell",
    instructions:
      "Poshmark has no public listing API. Tap 'Sell' in the Poshmark app, paste the title and description prepared below, and set the price shown. The item has been marked Draft here.",
  },
  Chairish: {
    draftIdPrefix: "chairish-draft",
    createUrl: "https://www.chairish.com/sell",
    instructions:
      "Chairish has no public listing API. Open the Chairish seller portal, click 'Add an Item', and paste the prepared title and description. Set the floor price shown. The item has been marked Draft here.",
  },
  "Facebook Marketplace": {
    draftIdPrefix: "fb-marketplace-draft",
    createUrl:
      "https://www.facebook.com/marketplace/create/item",
    instructions:
      "Facebook Marketplace has no public listing API for individual sellers. Click the link to open the Marketplace listing form, then paste the prepared title and description. The item has been marked Draft here.",
  },
};

function buildNoApiResult(platform: string, payload: ItemPayload): PublishResult {
  const config = NO_API_CONFIG[platform];
  if (!config) {
    return {
      mode: "draft_prepared",
      platformListingId: null,
      platformListingUrl: null,
      message: `${platform} does not have a public API. List manually using the prepared copy.`,
    };
  }

  const draftRef = `${config.draftIdPrefix}-${payload.itemId}-${randomUUID().slice(0, 8)}`;

  return {
    mode: "draft_prepared",
    platformListingId: draftRef,
    platformListingUrl: config.createUrl,
    createUrl: config.createUrl,
    message: config.instructions,
  };
}

const NO_API_PLATFORMS = new Set(["Poshmark", "Chairish", "Facebook Marketplace"]);

export async function publishItem(raw: ItemPayload): Promise<PublishResult> {
  const payload = scrubPayload(raw);

  if (NO_API_PLATFORMS.has(payload.platform)) {
    return buildNoApiResult(payload.platform, payload);
  }

  switch (payload.platform) {
    case "eBay":
      return publishToEbay(payload);
    case "Etsy":
      return publishToEtsy(payload);
    default:
      return {
        mode: "draft_prepared",
        platformListingId: null,
        platformListingUrl: null,
        message: `Publishing is not supported for platform "${payload.platform}".`,
      };
  }
}

// ---------- Status sync ----------
// Polls the platform API to get the current listing/offer state and maps it to
// our internal status enum (Draft | Listed | Sold | Error).
// Called explicitly by the operator via the "Sync Status" button on the item page.

export interface SyncStatusResult {
  /** Resolved internal status to write back to the DB */
  newStatus: string;
  /** Human-readable summary of what the platform API returned */
  message: string;
  /** Whether the platform API was actually called (false for no-API platforms) */
  apiCalled: boolean;
}

async function syncEbayStatus(
  offerId: string,
  sku: string,
): Promise<SyncStatusResult> {
  const token = process.env["EBAY_USER_ACCESS_TOKEN"];
  if (!token) {
    return {
      newStatus: "Draft",
      message: "EBAY_USER_ACCESS_TOKEN not configured. Cannot sync status.",
      apiCalled: false,
    };
  }

  // First, check the offer state (PUBLISHED = live, UNPUBLISHED = draft)
  const offerRes = await fetch(
    `https://api.ebay.com/sell/inventory/v1/offer/${encodeURIComponent(offerId)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  if (!offerRes.ok) {
    throw new Error(`eBay offer status fetch failed (${offerRes.status}): ${await offerRes.text()}`);
  }

  const offer = (await offerRes.json()) as {
    status?: string;
    listing?: { listingId?: string };
  };

  const offerStatus = offer.status ?? "";

  if (offerStatus === "UNPUBLISHED") {
    return { newStatus: "Draft", message: "eBay offer is unpublished (draft in Seller Hub).", apiCalled: true };
  }

  if (offerStatus !== "PUBLISHED") {
    return { newStatus: "Draft", message: `eBay offer status: ${offerStatus}`, apiCalled: true };
  }

  // Offer is published — check if there are fulfilled orders for this SKU to detect sold
  const orderRes = await fetch(
    `https://api.ebay.com/sell/fulfillment/v1/order?filter=ordersFilter:COMPLETED`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  );

  if (orderRes.ok) {
    const orders = (await orderRes.json()) as {
      orders?: Array<{
        lineItems?: Array<{ sku?: string; quantity?: number }>;
      }>;
    };
    const hasSold = (orders.orders ?? []).some((o) =>
      (o.lineItems ?? []).some((li) => li.sku === sku),
    );
    if (hasSold) {
      return { newStatus: "Sold", message: "eBay order found for this SKU — item sold.", apiCalled: true };
    }
  }

  return { newStatus: "Listed", message: "eBay offer is published and active.", apiCalled: true };
}

async function syncEtsyStatus(
  listingId: string,
  shopId: string,
): Promise<SyncStatusResult> {
  const apiKey = process.env["ETSY_API_KEY"];
  const accessToken = process.env["ETSY_ACCESS_TOKEN"];
  if (!apiKey || !accessToken) {
    return {
      newStatus: "Draft",
      message: "ETSY_API_KEY or ETSY_ACCESS_TOKEN not configured. Cannot sync status.",
      apiCalled: false,
    };
  }

  if (!shopId) {
    return {
      newStatus: "Draft",
      message: "ETSY_SHOP_ID is not configured. Cannot sync Etsy listing status.",
      apiCalled: false,
    };
  }

  const res = await fetch(
    `https://openapi.etsy.com/v3/application/shops/${encodeURIComponent(shopId)}/listings/${encodeURIComponent(listingId)}`,
    {
      headers: {
        "x-api-key": apiKey,
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Etsy listing status fetch failed (${res.status}): ${await res.text()}`);
  }

  const data = (await res.json()) as { state?: string; quantity?: number };
  const state = data.state ?? "";

  const stateMap: Record<string, string> = {
    active: "Listed",
    sold_out: "Sold",
    draft: "Draft",
    inactive: "Draft",
    expired: "Draft",
    edit: "Draft",
  };

  const newStatus = stateMap[state] ?? "Listed";
  return {
    newStatus,
    message: `Etsy listing state: ${state}`,
    apiCalled: true,
  };
}

export async function syncPlatformStatus(
  platform: string,
  platformListingId: string | null,
  sku: string,
  shopId?: string,
): Promise<SyncStatusResult> {
  if (NO_API_PLATFORMS.has(platform)) {
    return {
      newStatus: "Draft",
      message: `${platform} has no public listing API. Update status manually using the Status dropdown and Save Changes.`,
      apiCalled: false,
    };
  }

  if (!platformListingId) {
    return {
      newStatus: "Draft",
      message: "No platform listing ID on record. Publish the item first.",
      apiCalled: false,
    };
  }

  switch (platform) {
    case "eBay":
      return syncEbayStatus(platformListingId, sku);
    case "Etsy":
      return syncEtsyStatus(platformListingId, shopId ?? process.env["ETSY_SHOP_ID"] ?? "");
    default:
      return {
        newStatus: "Draft",
        message: `Status sync is not supported for platform "${platform}".`,
        apiCalled: false,
      };
  }
}
