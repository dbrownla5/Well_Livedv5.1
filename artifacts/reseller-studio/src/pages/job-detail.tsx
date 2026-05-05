import { useState, useRef } from "react";
import { useParams, useLocation, Link } from "wouter";
import {
  useGetJob,
  useListItems,
  useAnalyzePhotoBatch,
  useUpdateItem,
  usePriceJobItems,
  useGenerateJobListings,
  getListItemsQueryKey,
  getGetItemQueryKey,
  getGetJobQueryKey,
  type AnalyzeBatchResult,
  type AnalyzedItem,
  type Item,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/constants";
import { ArrowLeft, UploadCloud, Image as ImageIcon, CheckCircle2, PackageSearch, TrendingUp, FileText, ArrowRight, Pencil, Save, X, Copy } from "lucide-react";

const CARD_CATEGORIES = [
  "Clothing","Shoes","Accessories","Jewelry","Furniture","Decor",
  "Art","Electronics","Kitchen","Books","Toys","Vintage","Collectibles","Other",
];
const CARD_CONDITIONS = ["Excellent", "Good", "Fair", "Poor"];

/* ── type guards for JSON columns ── */
interface CopyPlatform { title: string; description: string; hashtags: string[]; measurements: string; }
interface ListingCopyState { poshmark: CopyPlatform; ebay: CopyPlatform; etsy: CopyPlatform; facebook: CopyPlatform; }
interface MarketSource { platform: string; title: string; price: number; condition: string; soldDate: string; }

function isCopyPlatform(v: unknown): v is CopyPlatform {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return typeof o["title"] === "string" && typeof o["description"] === "string";
}
function isListingCopyState(v: unknown): v is ListingCopyState {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return isCopyPlatform(o["poshmark"]) && isCopyPlatform(o["ebay"]) &&
         isCopyPlatform(o["etsy"]) && isCopyPlatform(o["facebook"]);
}
function isMarketSourceArray(v: unknown): v is MarketSource[] {
  if (!Array.isArray(v)) return false;
  return v.every(s => s && typeof s === "object" &&
    typeof (s as Record<string, unknown>)["platform"] === "string" &&
    typeof (s as Record<string, unknown>)["price"] === "number");
}

const COPY_PLATFORM_COLORS: Record<string, string> = {
  poshmark: "bg-red-100 text-red-700 border-red-200 data-[active=true]:bg-red-600 data-[active=true]:text-white",
  ebay:     "bg-yellow-100 text-yellow-800 border-yellow-200 data-[active=true]:bg-yellow-500 data-[active=true]:text-white",
  etsy:     "bg-orange-100 text-orange-700 border-orange-200 data-[active=true]:bg-orange-500 data-[active=true]:text-white",
  facebook: "bg-blue-100 text-blue-700 border-blue-200 data-[active=true]:bg-blue-600 data-[active=true]:text-white",
};

const BASE_PATH = import.meta.env.BASE_URL ?? "/studio/";

const ANGLE_LABEL_OPTIONS = ["front", "back", "left-side", "right-side", "top", "bottom", "detail", "label", "damage"] as const;

interface UploadedPhoto {
  storageKey: string;
  width: number | null;
  height: number | null;
}

function getImageDimensions(file: File): Promise<{ width: number; height: number } | null> {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve({ width: img.naturalWidth, height: img.naturalHeight }); };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(null); };
    img.src = url;
  });
}

async function uploadPhotoToStorage(file: File): Promise<UploadedPhoto> {
  const [urlRes, dims] = await Promise.all([
    fetch(`${BASE_PATH}api/storage/uploads/request-url`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type }),
    }),
    getImageDimensions(file),
  ]);
  if (!urlRes.ok) throw new Error(`Failed to get upload URL: ${urlRes.status}`);
  const { uploadURL, objectPath } = (await urlRes.json()) as { uploadURL: string; objectPath: string };

  const putRes = await fetch(uploadURL, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!putRes.ok) throw new Error(`Failed to upload to storage: ${putRes.status}`);

  return { storageKey: objectPath, width: dims?.width ?? null, height: dims?.height ?? null };
}

function platformBadgeClass(platform: string): string {
  const map: Record<string, string> = {
    "Poshmark":             "bg-red-100 text-red-700 border-red-200",
    "eBay":                 "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Etsy":                 "bg-orange-100 text-orange-700 border-orange-200",
    "Facebook Marketplace": "bg-blue-100 text-blue-700 border-blue-200",
    "Chairish":             "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Local Pickup":         "bg-gray-100 text-gray-600 border-gray-200",
  };
  return map[platform] ?? "bg-gray-100 text-gray-600 border-gray-200";
}

function dispositionConfig(disposition: string, status: string) {
  if (status === "Duplicate") return { label: "Duplicate", cls: "bg-amber-100 text-amber-800 border-amber-200" };
  if (disposition === "donate") return { label: "Donate", cls: "bg-purple-100 text-purple-700 border-purple-200" };
  if (disposition === "wipe-recycle") return { label: "Recycle", cls: "bg-gray-100 text-gray-600 border-gray-200" };
  return { label: "Saved", cls: "bg-green-100 text-green-700 border-green-200" };
}

function AnalyzedItemCard({ item, dbItem }: { item: AnalyzedItem; dbItem?: Item }) {
  const dc = dispositionConfig(item.disposition, item.status);
  const angles = item.angleLabels ?? [];
  const photoIds = item.photoIds ?? [];
  const savedItemId = item.savedItemId ?? null;

  const pricing = isMarketSourceArray(dbItem?.marketSources) ? {
    priceLow: Number(dbItem!.priceRangeLow ?? 0),
    priceHigh: Number(dbItem!.priceRangeHigh ?? dbItem!.priceRangeLow ?? 0),
    estimatedDaysToSell: dbItem!.estimatedDaysToSell ?? null,
    recommendedPlatform: dbItem!.recommendedPlatform ?? null,
    platformRationale: dbItem!.platformRationale ?? null,
    sources: dbItem!.marketSources as MarketSource[],
  } : null;
  const listingCopy = isListingCopyState(dbItem?.listingCopy) ? dbItem!.listingCopy as ListingCopyState : null;

  const { toast } = useToast();
  const queryClient = useQueryClient();
  const updateItem = useUpdateItem();

  const [editing, setEditing] = useState(false);
  const [listingTab, setListingTab] = useState<"poshmark" | "ebay" | "etsy" | "facebook">("poshmark");
  const [copiedTab, setCopiedTab] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    brand: item.brand,
    category: item.category ?? "",
    condition: item.condition ?? "",
    conditionNotes: item.conditionNotes ?? "",
  });

  const copyListingText = (platform: "poshmark" | "ebay" | "etsy" | "facebook") => {
    if (!listingCopy) return;
    const p = listingCopy[platform];
    const text = [p.title, "", p.description, "", p.hashtags.map(h => `#${h}`).join(" ")].filter(Boolean).join("\n");
    navigator.clipboard.writeText(text).catch(() => {});
    setCopiedTab(platform);
    setTimeout(() => setCopiedTab(null), 2000);
  };

  const handleSave = () => {
    if (!savedItemId) return;
    updateItem.mutate(
      {
        itemId: savedItemId,
        data: {
          brand: draft.brand,
          category: draft.category || null,
          condition: draft.condition || null,
          conditionNotes: draft.conditionNotes || null,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Item updated." });
          setEditing(false);
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(savedItemId) });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
        },
        onError: () => toast({ variant: "destructive", title: "Update failed." }),
      }
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Photo thumbnail strip */}
      {photoIds.length > 0 && (
        <div className="flex gap-px bg-muted overflow-x-auto">
          {photoIds.slice(0, 5).map((pid) => (
            <img
              key={pid}
              src={`${BASE_PATH}api/reseller/item-photos/${pid}/serve`}
              alt="item photo"
              className="w-20 h-20 object-cover flex-shrink-0"
              loading="lazy"
            />
          ))}
          {photoIds.length > 5 && (
            <div className="w-20 h-20 flex items-center justify-center bg-muted flex-shrink-0 text-xs text-muted-foreground font-medium">
              +{photoIds.length - 5}
            </div>
          )}
        </div>
      )}

      <div className="p-3 space-y-2.5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            {editing ? (
              <Input
                className="h-7 text-sm font-semibold"
                value={draft.brand}
                onChange={e => setDraft({ ...draft, brand: e.target.value })}
              />
            ) : (
              <>
                <p className="font-semibold text-sm text-foreground truncate">{item.brand}</p>
                <p className="text-xs text-muted-foreground truncate">{item.model}</p>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${dc.cls}`}>
              {dc.label}
            </span>
            {savedItemId && !editing && (
              <button onClick={() => setEditing(true)} className="text-muted-foreground hover:text-foreground p-0.5 rounded" title="Edit">
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {editing ? (
          /* ── Inline edit form ── */
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              <div>
                <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">Category</Label>
                <Select value={draft.category} onValueChange={v => setDraft({ ...draft, category: v })}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_CATEGORIES.map(c => <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">Condition</Label>
                <Select value={draft.condition} onValueChange={v => setDraft({ ...draft, condition: v })}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue placeholder="Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_CONDITIONS.map(c => <SelectItem key={c} value={c} className="text-xs">{c}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label className="text-[10px] uppercase tracking-wide text-muted-foreground">Condition Notes</Label>
              <Input
                className="h-7 text-xs"
                placeholder="Brief note on flaws…"
                value={draft.conditionNotes}
                onChange={e => setDraft({ ...draft, conditionNotes: e.target.value })}
              />
            </div>
            <div className="flex gap-1.5 pt-1">
              <Button size="sm" className="h-7 text-xs flex-1" onClick={handleSave} disabled={updateItem.isPending}>
                <Save className="w-3 h-3 mr-1" /> {updateItem.isPending ? "Saving…" : "Save"}
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setEditing(false)}>
                <X className="w-3 h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Attribute pills */}
            <div className="flex flex-wrap gap-1">
              {item.category && <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{item.category}</span>}
              {item.color && <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{item.color}</span>}
              {item.condition && (
                <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
                  item.condition === "Excellent" ? "bg-green-100 text-green-700" :
                  item.condition === "Good" ? "bg-blue-100 text-blue-700" :
                  item.condition === "Fair" ? "bg-yellow-100 text-yellow-700" :
                  "bg-red-100 text-red-700"
                }`}>{item.condition}</span>
              )}
              {item.style && <span className="text-xs bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded border border-violet-200">{item.style}</span>}
              {item.fabric && <span className="text-xs bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded border border-teal-200">{item.fabric}</span>}
            </div>

            {/* Angle labels */}
            {angles.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {angles.map((a) => (
                  <span key={a} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded uppercase tracking-wide font-medium">{a}</span>
                ))}
              </div>
            )}

            {item.conditionNotes && (
              <p className="text-xs text-muted-foreground italic">"{item.conditionNotes}"</p>
            )}

            {/* ── Pricing comps ── populated after "Price All" runs */}
            {pricing && (
              <div className="pt-2 border-t border-border/40 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3 h-3 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-bold text-foreground">
                      ${pricing.priceLow.toFixed(0)} – ${pricing.priceHigh.toFixed(0)}
                    </span>
                    {pricing.estimatedDaysToSell && (
                      <span className="text-[10px] text-muted-foreground">~{pricing.estimatedDaysToSell}d</span>
                    )}
                  </div>
                  {pricing.recommendedPlatform && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full border font-medium ${platformBadgeClass(pricing.recommendedPlatform)}`}>
                      ★ {pricing.recommendedPlatform}
                    </span>
                  )}
                </div>
                {pricing.platformRationale && (
                  <p className="text-[10px] text-muted-foreground leading-snug">{pricing.platformRationale}</p>
                )}
                {pricing.sources.length > 0 && (
                  <div className="space-y-0.5">
                    {pricing.sources.slice(0, 4).map((s, i) => (
                      <div key={i} className="flex items-center justify-between text-[10px]">
                        <span className="text-muted-foreground truncate max-w-[140px]">{s.title}</span>
                        <span className="font-semibold text-foreground ml-1 flex-shrink-0">${s.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── Per-platform listing copy ── populated after "Generate All Listings" runs */}
            {listingCopy && (
              <div className="pt-2 border-t border-border/40 space-y-1.5">
                <div className="flex items-center gap-1 flex-wrap">
                  <FileText className="w-3 h-3 text-blue-600 flex-shrink-0" />
                  {(["poshmark", "ebay", "etsy", "facebook"] as const).map(p => (
                    <button
                      key={p}
                      data-active={listingTab === p ? "true" : "false"}
                      onClick={() => setListingTab(p)}
                      className={`text-[10px] px-1.5 py-0.5 rounded border font-medium capitalize transition-colors ${
                        listingTab === p
                          ? (p === "poshmark" ? "bg-red-600 text-white border-transparent" :
                             p === "ebay"     ? "bg-yellow-500 text-white border-transparent" :
                             p === "etsy"     ? "bg-orange-500 text-white border-transparent" :
                                               "bg-blue-600 text-white border-transparent")
                          : (COPY_PLATFORM_COLORS[p] ?? "bg-muted text-muted-foreground border-border")
                      }`}
                    >
                      {p === "facebook" ? "FB" : p.charAt(0).toUpperCase() + p.slice(1)}
                    </button>
                  ))}
                </div>
                <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">
                  {listingCopy[listingTab].title}
                </p>
                <p className="text-[10px] text-muted-foreground leading-snug line-clamp-3">
                  {listingCopy[listingTab].description}
                </p>
                <button
                  onClick={() => copyListingText(listingTab)}
                  className="text-[10px] text-primary hover:underline flex items-center gap-0.5"
                >
                  {copiedTab === listingTab
                    ? <><CheckCircle2 className="w-2.5 h-2.5" /> Copied!</>
                    : <><Copy className="w-2.5 h-2.5" /> Copy listing</>}
                </button>
              </div>
            )}
          </>
        )}

        {/* Footer: platform badge + detail link */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <div className="flex items-center gap-1.5">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium border ${platformBadgeClass(item.platform)}`}>
              {item.platform}
            </span>
            {/* AI quick estimate when no full pricing comps yet */}
            {!pricing && (item.marketPrice || item.floorPrice) && (
              <span className="text-xs font-semibold text-foreground">
                {item.floorPrice && item.marketPrice
                  ? `$${item.floorPrice}–$${item.marketPrice}`
                  : `$${item.marketPrice ?? item.floorPrice}`}
              </span>
            )}
          </div>
          {savedItemId && (
            <Link href={`/inventory/${savedItemId}`} className="text-xs text-primary hover:underline flex items-center gap-0.5 font-medium">
              Full Detail <ArrowRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const id = Number(jobId);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: job, isLoading: jobLoading, error } = useGetJob(id);
  const { data: items, isLoading: itemsLoading } = useListItems({ jobId: id });
  const analyzeBatch = useAnalyzePhotoBatch();
  const priceJobMutation = usePriceJobItems();
  const generateJobListingsMutation = useGenerateJobListings();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("");
  const [batchResult, setBatchResult] = useState<AnalyzeBatchResult | null>(null);
  const [showReview, setShowReview] = useState(true);
  const [batchActionResult, setBatchActionResult] = useState<{
    type: "pricing" | "listings";
    processed: number;
    errors: number;
  } | null>(null);

  if (error || isNaN(id)) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">Job not found.</div>
        <Button variant="outline" className="mt-4" onClick={() => setLocation("/jobs")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
        </Button>
      </div>
    );
  }

  if (jobLoading || !job) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-32 w-full" />
      </div>
    );
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setProgress(5);
    setBatchResult(null);
    setBatchActionResult(null);
    setShowReview(true);

    try {
      setStatusText("Uploading photos to storage...");
      const fileArray = Array.from(files);
      const uploaded: UploadedPhoto[] = [];
      for (let i = 0; i < fileArray.length; i++) {
        const result = await uploadPhotoToStorage(fileArray[i]);
        uploaded.push(result);
        setProgress(5 + Math.round(((i + 1) / fileArray.length) * 35));
      }

      setProgress(40);
      setStatusText("Analyzing with Gemini AI...");

      const photos = fileArray.map((file, i) => ({
        filename: file.name,
        mimeType: file.type,
        storageKey: uploaded[i].storageKey,
        width: uploaded[i].width ?? undefined,
        height: uploaded[i].height ?? undefined,
      }));

      analyzeBatch.mutate(
        { data: { jobId: id, photos } },
        {
          onSuccess: (result) => {
            setProgress(100);
            setStatusText("");
            setBatchResult(result);
            toast({ title: "Batch analysis complete!" });
            queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
            queryClient.invalidateQueries({ queryKey: getGetJobQueryKey(id) });
            setTimeout(() => setUploading(false), 1000);
          },
          onError: (err) => {
            console.error("Batch error:", err);
            toast({ variant: "destructive", title: "Failed to analyze photos." });
            setUploading(false);
          },
        },
      );
    } catch (err) {
      console.error("Upload error:", err);
      toast({ variant: "destructive", title: "Failed to upload photos to storage." });
      setUploading(false);
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePriceAll = () => {
    setBatchActionResult(null);
    priceJobMutation.mutate(
      { jobId: id },
      {
        onSuccess: (data) => {
          setBatchActionResult({ type: "pricing", processed: data.processed, errors: data.errors });
          toast({ title: `Pricing complete — ${data.processed} items priced.` });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to run batch pricing." });
        },
      }
    );
  };

  const handleGenerateAllListings = () => {
    setBatchActionResult(null);
    generateJobListingsMutation.mutate(
      { jobId: id },
      {
        onSuccess: (data) => {
          setBatchActionResult({ type: "listings", processed: data.processed, errors: data.errors });
          toast({ title: `Listings generated — ${data.processed} items updated.` });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to generate batch listings." });
        },
      }
    );
  };

  const batchActionsRunning = priceJobMutation.isPending || generateJobListingsMutation.isPending;
  const hasListableItems = (items?.filter(i => i.disposition === "list") ?? []).length > 0;
  const savedItems = batchResult?.items.filter(i => i.status !== "Duplicate" && i.disposition === "list") ?? [];
  const dupItems = batchResult?.items.filter(i => i.status === "Duplicate") ?? [];
  const donateItems = batchResult?.items.filter(i => i.disposition !== "list" && i.status !== "Duplicate") ?? [];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <button onClick={() => setLocation("/jobs")} className="hover:text-foreground transition-colors flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Jobs
        </button>
        <span>/</span>
        <span>{job.title}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">{job.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-muted-foreground">Client: <Link href={`/clients/${job.clientId}`} className="hover:underline">{job.clientName}</Link></span>
            <Badge variant="outline" className="capitalize font-normal">{job.status}</Badge>
            <Badge variant="secondary" className="capitalize font-normal">{job.jobType}</Badge>
          </div>
          {job.notes && <p className="text-sm mt-3 text-muted-foreground max-w-2xl">{job.notes}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Left: AI Photo Intake + Batch Actions ── */}
        <div className="lg:col-span-1 space-y-4">
          <Card className="shadow-sm border-dashed border-2 bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> AI Photo Intake
              </CardTitle>
              <CardDescription>
                Upload clearout photos. Gemini AI groups angles, identifies items, extracts attributes, and triages to inventory.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <input
                  type="file"
                  multiple
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />

                {!uploading && (
                  <Button className="w-full h-24 flex flex-col gap-2" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <UploadCloud className="w-6 h-6 text-muted-foreground" />
                    <span>Select Photos</span>
                  </Button>
                )}

                {uploading && (
                  <div className="space-y-2 p-4 bg-card rounded-md border">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{statusText || "Processing..."}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      {progress < 40 ? "Uploading to secure storage..." : "Gemini AI analyzing angles & attributes..."}
                    </p>
                  </div>
                )}

                {batchResult && !uploading && (
                  <div className="p-4 bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900 rounded-md space-y-3">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Analysis Complete
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg text-green-700">{batchResult.savedCount}</div>
                        <div className="text-muted-foreground">Saved</div>
                      </div>
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg text-amber-600">{batchResult.duplicateCount}</div>
                        <div className="text-muted-foreground">Dups</div>
                      </div>
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg text-purple-600">{batchResult.donateCount}</div>
                        <div className="text-muted-foreground">Donate</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowReview(!showReview)}
                      className="w-full text-xs text-center text-primary hover:underline"
                    >
                      {showReview ? "Hide item review" : `Show ${batchResult.items.length} items`}
                    </button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Batch AI Actions */}
          {hasListableItems && (
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Batch AI Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" size="sm" onClick={handlePriceAll} disabled={batchActionsRunning}>
                  <TrendingUp className="w-4 h-4 mr-2 text-emerald-600" />
                  {priceJobMutation.isPending ? "Pricing items…" : "Price All Items"}
                </Button>
                <Button className="w-full justify-start" variant="outline" size="sm" onClick={handleGenerateAllListings} disabled={batchActionsRunning}>
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  {generateJobListingsMutation.isPending ? "Generating listings…" : "Generate All Listings"}
                </Button>
                {batchActionsRunning && (
                  <p className="text-xs text-muted-foreground text-center pt-1">
                    Processing sequentially — this may take a minute…
                  </p>
                )}
                {batchActionResult && (
                  <div className="mt-2 p-2.5 bg-muted/50 border border-border rounded-md text-xs space-y-0.5">
                    <p className="font-medium">{batchActionResult.type === "pricing" ? "Pricing" : "Listings"} complete</p>
                    <p className="text-muted-foreground">
                      {batchActionResult.processed} items updated{batchActionResult.errors > 0 && `, ${batchActionResult.errors} errors`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Right: Review Panel + Inventory Table ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* ── Batch Review Panel ── */}
          {batchResult && showReview && !uploading && batchResult.items.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-serif font-medium text-foreground">Item Review</h2>
              <p className="text-xs text-muted-foreground">
                AI extracted category, color, condition, style, fabric, and photo angles for each item. Click "View" to edit details.
              </p>

              {/* Saved / listable items */}
              {savedItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-green-700">Saved to inventory ({savedItems.length})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {savedItems.map((item, i) => (
                      <AnalyzedItemCard key={i} item={item} dbItem={items?.find(it => it.id === item.savedItemId)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Duplicate items */}
              {dupItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-amber-600">Duplicates ({dupItems.length})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {dupItems.map((item, i) => (
                      <AnalyzedItemCard key={i} item={item} dbItem={items?.find(it => it.id === item.savedItemId)} />
                    ))}
                  </div>
                </div>
              )}

              {/* Donate / recycle items */}
              {donateItems.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">Donate / Recycle ({donateItems.length})</p>
                  <div className="grid grid-cols-2 gap-2">
                    {donateItems.map((item, i) => (
                      <AnalyzedItemCard key={i} item={item} dbItem={items?.find(it => it.id === item.savedItemId)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Job Inventory Table ── */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-serif font-medium flex items-center gap-2">
                <PackageSearch className="w-5 h-5 text-muted-foreground" />
                Job Inventory
              </h2>
              <Badge variant="secondary">{job.itemCount || 0} items</Badge>
            </div>

            <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50 hover:bg-muted/50">
                    <TableHead>Item</TableHead>
                    <TableHead>Attributes</TableHead>
                    <TableHead>Platform</TableHead>
                    <TableHead>Market</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {itemsLoading ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8"><Skeleton className="h-6 w-32 mx-auto" /></TableCell>
                    </TableRow>
                  ) : items && items.length > 0 ? (
                    items.map((item) => (
                      <TableRow
                        key={item.id}
                        className="cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => setLocation(`/inventory/${item.id}`)}
                      >
                        <TableCell>
                          <div className="font-medium text-foreground">{item.brand}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-[150px]">{item.model}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {item.category && <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{item.category}</span>}
                            {item.condition && <span className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{item.condition}</span>}
                            {(item as unknown as { style?: string | null }).style && (
                              <span className="text-xs bg-violet-50 text-violet-700 px-1.5 py-0.5 rounded border border-violet-200">
                                {(item as unknown as { style?: string | null }).style}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${platformBadgeClass(item.platform)}`}>
                            {item.platform}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm font-medium">
                          {item.priceRangeLow && item.priceRangeHigh
                            ? `$${Number(item.priceRangeLow).toFixed(0)}–$${Number(item.priceRangeHigh).toFixed(0)}`
                            : formatCurrency(item.marketPrice)}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={item.status === "Sold" ? "default" : item.status === "New" ? "destructive" : "outline"}
                            className="text-xs"
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                          <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                          <p>No items yet. Upload photos to start intaking.</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
