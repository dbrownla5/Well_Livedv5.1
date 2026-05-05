import { Router, type IRouter } from "express";
import { and, desc, eq, sql } from "drizzle-orm";
import {
  db,
  clients as clientsTable,
  jobs as jobsTable,
  items as itemsTable,
  itemPhotos as itemPhotosTable,
} from "@workspace/db";
import {
  CreateClientBody as ClientInput,
  CreateJobBody as JobInput,
  UpdateItemBody as ItemUpdate,
  GetClientParams,
  GetJobParams,
  GetItemParams,
  UpdateItemParams,
  DeleteItemParams,
  ListJobsQueryParams,
  ListItemsQueryParams,
  AnalyzePhotoBatchBody,
  GenerateListingDescriptionBody,
} from "@workspace/api-zod";
import {
  analyzeBatch,
  generateListingDescription,
  fetchMarketPricing,
  generateListingCopy,
} from "../lib/gemini-pipeline";
import { publishItem, syncPlatformStatus } from "../lib/platform-adapters";
import { ObjectStorageService, ObjectNotFoundError } from "../lib/objectStorage";
import { Readable } from "stream";

const objectStorage = new ObjectStorageService();

const router: IRouter = Router();

// ---------- clients ----------
router.get("/reseller/clients", async (_req, res): Promise<void> => {
  const rows = await db
    .select()
    .from(clientsTable)
    .orderBy(desc(clientsTable.createdAt));
  res.json(rows);
});

router.post("/reseller/clients", async (req, res): Promise<void> => {
  const parsed = ClientInput.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(clientsTable)
    .values(parsed.data)
    .returning();
  res.json(row);
});

router.get("/reseller/clients/:clientId", async (req, res): Promise<void> => {
  const params = GetClientParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.id, params.data.clientId));
  if (!row) {
    res.status(404).json({ error: "Client not found" });
    return;
  }
  res.json(row);
});

// ---------- jobs ----------
router.get("/reseller/jobs", async (req, res): Promise<void> => {
  const q = ListJobsQueryParams.safeParse(req.query);
  if (!q.success) {
    res.status(400).json({ error: q.error.message });
    return;
  }
  const where = q.data.clientId
    ? eq(jobsTable.clientId, q.data.clientId)
    : undefined;
  const rows = await db
    .select({
      id: jobsTable.id,
      createdAt: jobsTable.createdAt,
      clientId: jobsTable.clientId,
      title: jobsTable.title,
      jobType: jobsTable.jobType,
      status: jobsTable.status,
      notes: jobsTable.notes,
      clientName: clientsTable.name,
      itemCount: sql<number>`(
        select count(*) from ${itemsTable} where ${itemsTable.jobId} = ${jobsTable.id}
      )::int`,
    })
    .from(jobsTable)
    .leftJoin(clientsTable, eq(clientsTable.id, jobsTable.clientId))
    .where(where)
    .orderBy(desc(jobsTable.createdAt));
  res.json(rows);
});

router.post("/reseller/jobs", async (req, res): Promise<void> => {
  const parsed = JobInput.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .insert(jobsTable)
    .values(parsed.data)
    .returning();
  res.json(row);
});

router.get("/reseller/jobs/:jobId", async (req, res): Promise<void> => {
  const params = GetJobParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select({
      id: jobsTable.id,
      createdAt: jobsTable.createdAt,
      clientId: jobsTable.clientId,
      title: jobsTable.title,
      jobType: jobsTable.jobType,
      status: jobsTable.status,
      notes: jobsTable.notes,
      clientName: clientsTable.name,
    })
    .from(jobsTable)
    .leftJoin(clientsTable, eq(clientsTable.id, jobsTable.clientId))
    .where(eq(jobsTable.id, params.data.jobId));
  if (!row) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  res.json(row);
});

// ---------- items ----------
router.get("/reseller/items", async (req, res): Promise<void> => {
  const q = ListItemsQueryParams.safeParse(req.query);
  if (!q.success) {
    res.status(400).json({ error: q.error.message });
    return;
  }
  const filters = [];
  if (q.data.jobId) filters.push(eq(itemsTable.jobId, q.data.jobId));
  if (q.data.clientId) filters.push(eq(itemsTable.clientId, q.data.clientId));
  if (q.data.platform) filters.push(eq(itemsTable.platform, q.data.platform));
  if (q.data.status) filters.push(eq(itemsTable.status, q.data.status));

  const rows = await db
    .select({
      id: itemsTable.id,
      createdAt: itemsTable.createdAt,
      updatedAt: itemsTable.updatedAt,
      jobId: itemsTable.jobId,
      clientId: itemsTable.clientId,
      brand: itemsTable.brand,
      model: itemsTable.model,
      category: itemsTable.category,
      color: itemsTable.color,
      condition: itemsTable.condition,
      conditionNotes: itemsTable.conditionNotes,
      marketPrice: itemsTable.marketPrice,
      floorPrice: itemsTable.floorPrice,
      priceRangeLow: itemsTable.priceRangeLow,
      priceRangeHigh: itemsTable.priceRangeHigh,
      estimatedDaysToSell: itemsTable.estimatedDaysToSell,
      marketSources: itemsTable.marketSources,
      recommendedPlatform: itemsTable.recommendedPlatform,
      platformRationale: itemsTable.platformRationale,
      listingCopy: itemsTable.listingCopy,
      platform: itemsTable.platform,
      shippingLogic: itemsTable.shippingLogic,
      status: itemsTable.status,
      disposition: itemsTable.disposition,
      listingDescription: itemsTable.listingDescription,
      createdBy: itemsTable.createdBy,
      clientName: clientsTable.name,
      jobTitle: jobsTable.title,
      platformListingId: itemsTable.platformListingId,
      platformListingUrl: itemsTable.platformListingUrl,
      platformPublishError: itemsTable.platformPublishError,
    })
    .from(itemsTable)
    .leftJoin(clientsTable, eq(clientsTable.id, itemsTable.clientId))
    .leftJoin(jobsTable, eq(jobsTable.id, itemsTable.jobId))
    .where(filters.length ? and(...filters) : undefined)
    .orderBy(desc(itemsTable.createdAt));
  res.json(rows);
});

router.get("/reseller/items/:itemId", async (req, res): Promise<void> => {
  const params = GetItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [row] = await db
    .select({
      id: itemsTable.id,
      createdAt: itemsTable.createdAt,
      updatedAt: itemsTable.updatedAt,
      jobId: itemsTable.jobId,
      clientId: itemsTable.clientId,
      brand: itemsTable.brand,
      model: itemsTable.model,
      category: itemsTable.category,
      color: itemsTable.color,
      condition: itemsTable.condition,
      conditionNotes: itemsTable.conditionNotes,
      marketPrice: itemsTable.marketPrice,
      floorPrice: itemsTable.floorPrice,
      priceRangeLow: itemsTable.priceRangeLow,
      priceRangeHigh: itemsTable.priceRangeHigh,
      estimatedDaysToSell: itemsTable.estimatedDaysToSell,
      marketSources: itemsTable.marketSources,
      recommendedPlatform: itemsTable.recommendedPlatform,
      platformRationale: itemsTable.platformRationale,
      listingCopy: itemsTable.listingCopy,
      platform: itemsTable.platform,
      shippingLogic: itemsTable.shippingLogic,
      status: itemsTable.status,
      disposition: itemsTable.disposition,
      listingDescription: itemsTable.listingDescription,
      createdBy: itemsTable.createdBy,
      clientName: clientsTable.name,
      jobTitle: jobsTable.title,
      platformListingId: itemsTable.platformListingId,
      platformListingUrl: itemsTable.platformListingUrl,
      platformPublishError: itemsTable.platformPublishError,
    })
    .from(itemsTable)
    .leftJoin(clientsTable, eq(clientsTable.id, itemsTable.clientId))
    .leftJoin(jobsTable, eq(jobsTable.id, itemsTable.jobId))
    .where(eq(itemsTable.id, params.data.itemId));
  if (!row) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(row);
});

router.patch("/reseller/items/:itemId", async (req, res): Promise<void> => {
  const params = UpdateItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const parsed = ItemUpdate.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const [row] = await db
    .update(itemsTable)
    .set(parsed.data)
    .where(eq(itemsTable.id, params.data.itemId))
    .returning();
  if (!row) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  res.json(row);
});

router.delete("/reseller/items/:itemId", async (req, res): Promise<void> => {
  const params = DeleteItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  await db.delete(itemsTable).where(eq(itemsTable.id, params.data.itemId));
  res.json({ ok: true });
});

// ---------- dashboard summary ----------
router.get("/reseller/dashboard/summary", async (_req, res): Promise<void> => {
  const [counts] = await db
    .select({
      totalItems: sql<number>`count(*)::int`,
      newItems: sql<number>`count(*) filter (where ${itemsTable.status} = 'New')::int`,
      duplicateItems: sql<number>`count(*) filter (where ${itemsTable.status} = 'Duplicate')::int`,
      donateItems: sql<number>`count(*) filter (where ${itemsTable.disposition} = 'donate')::int`,
      marketValue: sql<number>`coalesce(sum(${itemsTable.marketPrice}), 0)::float`,
      floorValue: sql<number>`coalesce(sum(${itemsTable.floorPrice}), 0)::float`,
    })
    .from(itemsTable);

  const [{ totalClients }] = await db
    .select({ totalClients: sql<number>`count(*)::int` })
    .from(clientsTable);
  const [{ totalJobs }] = await db
    .select({ totalJobs: sql<number>`count(*)::int` })
    .from(jobsTable);

  const byPlatform = await db
    .select({
      platform: itemsTable.platform,
      count: sql<number>`count(*)::int`,
      marketValue: sql<number>`coalesce(sum(${itemsTable.marketPrice}), 0)::float`,
    })
    .from(itemsTable)
    .groupBy(itemsTable.platform);

  const byStatus = await db
    .select({
      status: itemsTable.status,
      count: sql<number>`count(*)::int`,
    })
    .from(itemsTable)
    .groupBy(itemsTable.status);

  const recentItems = await db
    .select({
      id: itemsTable.id,
      createdAt: itemsTable.createdAt,
      updatedAt: itemsTable.updatedAt,
      jobId: itemsTable.jobId,
      clientId: itemsTable.clientId,
      brand: itemsTable.brand,
      model: itemsTable.model,
      category: itemsTable.category,
      color: itemsTable.color,
      condition: itemsTable.condition,
      conditionNotes: itemsTable.conditionNotes,
      marketPrice: itemsTable.marketPrice,
      floorPrice: itemsTable.floorPrice,
      priceRangeLow: itemsTable.priceRangeLow,
      priceRangeHigh: itemsTable.priceRangeHigh,
      estimatedDaysToSell: itemsTable.estimatedDaysToSell,
      marketSources: itemsTable.marketSources,
      recommendedPlatform: itemsTable.recommendedPlatform,
      platformRationale: itemsTable.platformRationale,
      listingCopy: itemsTable.listingCopy,
      platform: itemsTable.platform,
      shippingLogic: itemsTable.shippingLogic,
      status: itemsTable.status,
      disposition: itemsTable.disposition,
      listingDescription: itemsTable.listingDescription,
      createdBy: itemsTable.createdBy,
      clientName: clientsTable.name,
      jobTitle: jobsTable.title,
      platformListingId: itemsTable.platformListingId,
      platformListingUrl: itemsTable.platformListingUrl,
      platformPublishError: itemsTable.platformPublishError,
    })
    .from(itemsTable)
    .leftJoin(clientsTable, eq(clientsTable.id, itemsTable.clientId))
    .leftJoin(jobsTable, eq(jobsTable.id, itemsTable.jobId))
    .orderBy(desc(itemsTable.createdAt))
    .limit(8);

  res.json({
    totalItems: counts?.totalItems ?? 0,
    newItems: counts?.newItems ?? 0,
    duplicateItems: counts?.duplicateItems ?? 0,
    donateItems: counts?.donateItems ?? 0,
    totalClients: totalClients ?? 0,
    totalJobs: totalJobs ?? 0,
    marketValue: counts?.marketValue ?? 0,
    floorValue: counts?.floorValue ?? 0,
    byPlatform,
    byStatus,
    recentItems,
  });
});

// ---------- AI ----------
router.post("/reseller/ai/analyze-batch", async (req, res): Promise<void> => {
  const parsed = AnalyzePhotoBatchBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }
  const { jobId, photos } = parsed.data;
  const operator = req.operatorEmail ?? null;

  const [job] = await db
    .select()
    .from(jobsTable)
    .where(eq(jobsTable.id, jobId));
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }

  const existing = await db
    .select({ brand: itemsTable.brand, model: itemsTable.model })
    .from(itemsTable);

  req.log.info(
    { jobId, photoCount: photos.length, operator },
    "Running Gemini analyze-batch",
  );

  // Download photo bytes from object storage for Gemini inline data
  let photosForGemini: { mimeType: string; dataBase64: string }[];
  try {
    photosForGemini = await Promise.all(
      photos.map(async (p) => {
        const file = await objectStorage.getObjectEntityFile(p.storageKey);
        const nodeStream = file.createReadStream();
        const chunks: Buffer[] = [];
        for await (const chunk of nodeStream) {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        return { mimeType: p.mimeType, dataBase64: Buffer.concat(chunks).toString("base64") };
      }),
    );
  } catch (err) {
    req.log.error({ err }, "Failed to download photos from storage");
    if (err instanceof ObjectNotFoundError) {
      res.status(400).json({ error: "One or more photo storage keys are invalid" });
    } else {
      res.status(502).json({ error: "Failed to retrieve photos from storage" });
    }
    return;
  }

  let analyzed;
  try {
    analyzed = await analyzeBatch(photosForGemini, existing);
  } catch (err) {
    req.log.error({ err }, "Gemini analysis failed");
    res.status(502).json({ error: "AI analysis failed" });
    return;
  }

  // Persist photo metadata (storage keys + dimensions) for the job
  if (photos.length) {
    await db.insert(itemPhotosTable).values(
      photos.map((p) => ({
        jobId,
        filename: p.filename,
        mimeType: p.mimeType,
        storageKey: p.storageKey,
        width: p.width ?? null,
        height: p.height ?? null,
      })),
    );
  }

  // Persist every analyzed item (including duplicates and donate) so summary
  // metrics reflect the full pipeline outcome. status/disposition distinguish them.
  const result: Array<{
    brand: string;
    model: string;
    marketPrice: string | null;
    floorPrice: string | null;
    platform: string;
    shippingLogic: string | null;
    status: string;
    disposition: string;
    savedItemId: number | null;
  }> = [];
  let savedCount = 0;
  let duplicateCount = 0;
  let donateCount = 0;

  for (const a of analyzed) {
    const isDonate =
      a.disposition === "donate" || a.disposition === "wipe-recycle";
    const isDuplicate = a.status === "Duplicate";
    const [row] = await db
      .insert(itemsTable)
      .values({
        jobId,
        clientId: job.clientId,
        brand: a.brand,
        model: a.model,
        category: a.category,
        color: a.color,
        condition: a.condition,
        conditionNotes: a.conditionNotes,
        marketPrice: a.marketPrice,
        floorPrice: a.floorPrice,
        platform: a.platform,
        shippingLogic: a.shippingLogic,
        status: a.status,
        disposition: a.disposition,
        createdBy: operator,
        aiRaw: a as unknown as Record<string, unknown>,
      })
      .returning({ id: itemsTable.id });
    const savedItemId = row?.id ?? null;
    if (isDonate) donateCount++;
    else if (isDuplicate) duplicateCount++;
    else if (savedItemId) savedCount++;
    result.push({ ...a, savedItemId });
  }

  res.json({
    items: result,
    savedCount,
    duplicateCount,
    donateCount,
  });
});

// ---------- publish ----------
router.post("/reseller/items/:itemId/publish", async (req, res): Promise<void> => {
  const params = GetItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [item] = await db
    .select()
    .from(itemsTable)
    .where(eq(itemsTable.id, params.data.itemId));

  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }

  if (item.platform === "Local Pickup") {
    res.status(400).json({ error: "Local Pickup listings must be managed manually." });
    return;
  }

  // Platforms explicitly excluded from any automated publishing per policy
  const FORBIDDEN_PUBLISH_PLATFORMS = new Set([
    "Depop", "Grailed", "Mercari", "Thumbtack",
  ]);
  if (FORBIDDEN_PUBLISH_PLATFORMS.has(item.platform)) {
    res.status(400).json({
      error: `Publishing to ${item.platform} is not permitted by platform policy. Reassign to a supported platform.`,
    });
    return;
  }

  // Only items with a "list" disposition should reach a sales platform
  if (item.disposition && item.disposition !== "list") {
    res.status(400).json({
      error: `Cannot publish an item with disposition "${item.disposition}". Change disposition to "list" before publishing.`,
    });
    return;
  }

  const description = item.listingDescription;
  if (!description || !description.trim()) {
    res.status(400).json({ error: "Item has no listing description. Generate one first." });
    return;
  }

  const title = `${item.brand} ${item.model}`.slice(0, 80);

  let result;
  try {
    result = await publishItem({
      itemId: item.id,
      brand: item.brand,
      model: item.model,
      platform: item.platform,
      listingDescription: description,
      title,
      marketPrice: item.marketPrice ?? null,
      floorPrice: item.floorPrice ?? null,
      shippingLogic: item.shippingLogic ?? null,
    });
  } catch (err) {
    req.log.error({ err, itemId: item.id }, "Platform publish failed");
    const errMsg = err instanceof Error ? err.message : String(err);
    await db
      .update(itemsTable)
      .set({ status: "Error", platformPublishError: errMsg })
      .where(eq(itemsTable.id, item.id));
    res.status(502).json({ error: `Platform API error: ${errMsg}` });
    return;
  }

  const newStatus = result.mode === "live" ? "Listed" : "Draft";

  await db
    .update(itemsTable)
    .set({
      status: newStatus,
      platformListingId: result.platformListingId ?? null,
      platformListingUrl: result.platformListingUrl ?? null,
      platformPublishError: result.mode === "draft_prepared" ? result.message : null,
    })
    .where(eq(itemsTable.id, item.id));

  req.log.info(
    { itemId: item.id, platform: item.platform, mode: result.mode },
    "Item published",
  );

  res.json({
    itemId: item.id,
    platform: item.platform,
    mode: result.mode,
    platformListingId: result.platformListingId,
    platformListingUrl: result.platformListingUrl,
    message: result.message,
    newStatus,
  });
});

// ---------- sync platform status ----------
router.post(
  "/reseller/items/:itemId/sync-platform-status",
  async (req, res): Promise<void> => {
    const params = GetItemParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const [item] = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, params.data.itemId));

    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    const sku = `DBRES-${item.id}`;

    let result;
    try {
      result = await syncPlatformStatus(
        item.platform,
        item.platformListingId ?? null,
        sku,
      );
    } catch (err) {
      req.log.error({ err, itemId: item.id }, "Platform status sync failed");
      const errMsg = err instanceof Error ? err.message : String(err);
      await db
        .update(itemsTable)
        .set({ status: "Error", platformPublishError: errMsg })
        .where(eq(itemsTable.id, item.id));
      res.status(502).json({ error: `Platform sync error: ${errMsg}` });
      return;
    }

    // Only persist the resolved status when we actually called the platform API.
    // Skipping the write for no-API platforms avoids clobbering a manually
    // maintained status (e.g. an operator who already marked the item as Sold).
    if (result.apiCalled) {
      await db
        .update(itemsTable)
        .set({ status: result.newStatus })
        .where(eq(itemsTable.id, item.id));
    }

    req.log.info(
      {
        itemId: item.id,
        platform: item.platform,
        newStatus: result.apiCalled ? result.newStatus : "(not written — no API)",
        apiCalled: result.apiCalled,
      },
      "Platform status sync complete",
    );

    // Return the item's effective current status so the UI stays consistent
    const effectiveStatus = result.apiCalled ? result.newStatus : item.status;

    res.json({
      itemId: item.id,
      platform: item.platform,
      newStatus: effectiveStatus,
      message: result.message,
      apiCalled: result.apiCalled,
    });
  },
);

router.post(
  "/reseller/ai/listing-description",
  async (req, res): Promise<void> => {
    const parsed = GenerateListingDescriptionBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }
    const [item] = await db
      .select()
      .from(itemsTable)
      .where(eq(itemsTable.id, parsed.data.itemId));
    if (!item) {
      res.status(404).json({ error: "Item not found" });
      return;
    }

    let generated;
    try {
      generated = await generateListingDescription({
        brand: item.brand,
        model: item.model,
        platform: item.platform,
        marketPrice: item.marketPrice,
        floorPrice: item.floorPrice,
        shippingLogic: item.shippingLogic,
      });
    } catch (err) {
      req.log.error({ err }, "Listing description generation failed");
      res.status(502).json({ error: "AI generation failed" });
      return;
    }

    await db
      .update(itemsTable)
      .set({ listingDescription: generated.description })
      .where(eq(itemsTable.id, item.id));

    res.json({
      itemId: item.id,
      platform: item.platform,
      title: generated.title,
      description: generated.description,
    });
  },
);

// ---------- market pricing ----------

router.post("/reseller/items/:itemId/pricing", async (req, res): Promise<void> => {
  const params = GetItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.select().from(itemsTable).where(eq(itemsTable.id, params.data.itemId));
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  let pricing;
  try {
    pricing = await fetchMarketPricing({
      brand: item.brand,
      model: item.model,
      category: item.category,
      color: item.color,
      condition: item.condition,
      conditionNotes: item.conditionNotes,
      platform: item.platform,
    });
  } catch (err) {
    req.log.error({ err }, "Market pricing failed");
    res.status(502).json({ error: "AI pricing failed" });
    return;
  }
  await db
    .update(itemsTable)
    .set({
      priceRangeLow: String(pricing.priceLow),
      priceRangeHigh: String(pricing.priceHigh),
      estimatedDaysToSell: pricing.estimatedDaysToSell,
      marketSources: pricing.sources as unknown as Record<string, unknown>[],
      recommendedPlatform: pricing.recommendedPlatform,
      platformRationale: pricing.platformRationale,
    })
    .where(eq(itemsTable.id, item.id));
  res.json({ itemId: item.id, ...pricing });
});

router.post("/reseller/jobs/:jobId/pricing", async (req, res): Promise<void> => {
  const params = GetJobParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, params.data.jobId));
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  const jobItems = await db
    .select()
    .from(itemsTable)
    .where(and(eq(itemsTable.jobId, params.data.jobId), eq(itemsTable.disposition, "list")));

  let processed = 0;
  let errors = 0;
  for (const it of jobItems) {
    try {
      const pricing = await fetchMarketPricing({
        brand: it.brand,
        model: it.model,
        category: it.category,
        color: it.color,
        condition: it.condition,
        conditionNotes: it.conditionNotes,
        platform: it.platform,
      });
      await db
        .update(itemsTable)
        .set({
          priceRangeLow: String(pricing.priceLow),
          priceRangeHigh: String(pricing.priceHigh),
          estimatedDaysToSell: pricing.estimatedDaysToSell,
          marketSources: pricing.sources as unknown as Record<string, unknown>[],
          recommendedPlatform: pricing.recommendedPlatform,
          platformRationale: pricing.platformRationale,
        })
        .where(eq(itemsTable.id, it.id));
      processed++;
    } catch (err) {
      req.log.error({ err, itemId: it.id }, "Pricing failed for item");
      errors++;
    }
  }
  res.json({ jobId: params.data.jobId, processed, skipped: 0, errors });
});

// ---------- listing copy ----------

router.post("/reseller/items/:itemId/listings", async (req, res): Promise<void> => {
  const params = GetItemParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [item] = await db.select().from(itemsTable).where(eq(itemsTable.id, params.data.itemId));
  if (!item) {
    res.status(404).json({ error: "Item not found" });
    return;
  }
  let copy;
  try {
    copy = await generateListingCopy({
      brand: item.brand,
      model: item.model,
      category: item.category,
      color: item.color,
      condition: item.condition,
      conditionNotes: item.conditionNotes,
      marketPrice: item.marketPrice,
      floorPrice: item.floorPrice,
      shippingLogic: item.shippingLogic,
      priceLow: item.priceRangeLow ? Number(item.priceRangeLow) : null,
      priceHigh: item.priceRangeHigh ? Number(item.priceRangeHigh) : null,
    });
  } catch (err) {
    req.log.error({ err }, "Listing copy generation failed");
    res.status(502).json({ error: "AI listing copy failed" });
    return;
  }
  await db
    .update(itemsTable)
    .set({ listingCopy: copy as unknown as Record<string, unknown> })
    .where(eq(itemsTable.id, item.id));
  res.json({ itemId: item.id, ...copy });
});

router.post("/reseller/jobs/:jobId/listings", async (req, res): Promise<void> => {
  const params = GetJobParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }
  const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, params.data.jobId));
  if (!job) {
    res.status(404).json({ error: "Job not found" });
    return;
  }
  const jobItems = await db
    .select()
    .from(itemsTable)
    .where(and(eq(itemsTable.jobId, params.data.jobId), eq(itemsTable.disposition, "list")));

  let processed = 0;
  let errors = 0;
  for (const it of jobItems) {
    try {
      const copy = await generateListingCopy({
        brand: it.brand,
        model: it.model,
        category: it.category,
        color: it.color,
        condition: it.condition,
        conditionNotes: it.conditionNotes,
        marketPrice: it.marketPrice,
        floorPrice: it.floorPrice,
        shippingLogic: it.shippingLogic,
        priceLow: it.priceRangeLow ? Number(it.priceRangeLow) : null,
        priceHigh: it.priceRangeHigh ? Number(it.priceRangeHigh) : null,
      });
      await db
        .update(itemsTable)
        .set({ listingCopy: copy as unknown as Record<string, unknown> })
        .where(eq(itemsTable.id, it.id));
      processed++;
    } catch (err) {
      req.log.error({ err, itemId: it.id }, "Listing copy failed for item");
      errors++;
    }
  }
  res.json({ jobId: params.data.jobId, processed, skipped: 0, errors });
});

export default router;
