import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetItem, 
  useUpdateItem, 
  useDeleteItem, 
  useGenerateListingDescription,
  usePublishItem,
  useSyncItemPlatformStatus,
  usePriceItem,
  useGenerateItemListings,
  getGetItemQueryKey,
  getListItemsQueryKey,
} from "@workspace/api-client-react";
import { PLATFORMS, STATUSES, DISPOSITIONS, formatCurrency } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowLeft, Sparkles, Trash2, Save, Send, ExternalLink, AlertCircle,
  CheckCircle2, Info, RefreshCw, TrendingUp, Copy, Check, FileText,
} from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const NO_API_PLATFORMS = new Set(["Poshmark", "Chairish", "Facebook Marketplace"]);
const MANUAL_PLATFORMS = new Set(["Local Pickup"]);
const CONDITIONS = ["Excellent", "Good", "Fair", "Poor"];
const CATEGORIES = [
  "Clothing","Shoes","Accessories","Jewelry","Furniture","Decor",
  "Art","Electronics","Kitchen","Books","Toys","Vintage","Collectibles","Other",
];

const COPY_TAB_COLORS: Record<string, { active: string; inactive: string }> = {
  poshmark: { active: "bg-red-500 text-white border-transparent", inactive: "bg-red-50 text-red-600 border-red-200" },
  ebay:     { active: "bg-yellow-500 text-white border-transparent", inactive: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  etsy:     { active: "bg-orange-500 text-white border-transparent", inactive: "bg-orange-50 text-orange-600 border-orange-200" },
  facebook: { active: "bg-blue-600 text-white border-transparent", inactive: "bg-blue-50 text-blue-600 border-blue-200" },
};

interface MarketSource {
  platform: string;
  title: string;
  price: number;
  condition: string;
  soldDate: string;
}

interface PricingState {
  itemId: number;
  priceLow: number;
  priceHigh: number;
  estimatedDaysToSell: number;
  recommendedPlatform: string;
  platformRationale: string;
  sources: MarketSource[];
}

interface CopyPlatform {
  title: string;
  description: string;
  hashtags: string[];
  measurements: string;
}

interface ListingCopyState {
  poshmark: CopyPlatform;
  ebay: CopyPlatform;
  etsy: CopyPlatform;
  facebook: CopyPlatform;
}

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
  return v.every(
    (s) => s && typeof s === "object" &&
      typeof (s as Record<string, unknown>)["platform"] === "string" &&
      typeof (s as Record<string, unknown>)["price"] === "number",
  );
}

function PublishStatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
    Listed: { label: "Listed", variant: "default" },
    Draft:  { label: "Draft",  variant: "secondary" },
    Error:  { label: "Error",  variant: "destructive" },
    New:    { label: "New",    variant: "outline" },
    Sold:   { label: "Sold",   variant: "default" },
  };
  const config = map[status] ?? { label: status, variant: "outline" };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export default function InventoryItem() {
  const { itemId } = useParams<{ itemId: string }>();
  const id = Number(itemId);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: item, isLoading, error } = useGetItem(id);
  const updateItem = useUpdateItem();
  const deleteItem = useDeleteItem();
  const generateDesc = useGenerateListingDescription();
  const publishItemMutation = usePublishItem();
  const syncStatusMutation = useSyncItemPlatformStatus();
  const priceItemMutation = usePriceItem();
  const generateListingsMutation = useGenerateItemListings();

  const [formData, setFormData] = useState({
    brand: "", model: "", category: "", color: "", condition: "",
    conditionNotes: "", style: "", fabric: "", marketPrice: "", floorPrice: "",
    platform: "", status: "", disposition: "", shippingLogic: "", listingDescription: "",
  });

  const [pricing, setPricing] = useState<PricingState | null>(null);
  const [listingCopy, setListingCopy] = useState<ListingCopyState | null>(null);
  const [copyTab, setCopyTab] = useState<"poshmark" | "ebay" | "etsy" | "facebook">("poshmark");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const [publishResult, setPublishResult] = useState<{
    mode: string; message: string;
    platformListingUrl?: string | null;
    listingTitle?: string; listingDescription?: string;
  } | null>(null);
  const [syncResult, setSyncResult] = useState<{
    newStatus: string; message: string; apiCalled: boolean;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        brand: item.brand || "",
        model: item.model || "",
        category: item.category || "",
        color: item.color || "",
        condition: item.condition || "",
        conditionNotes: item.conditionNotes || "",
        style: item.style || "",
        fabric: item.fabric || "",
        marketPrice: item.marketPrice || "",
        floorPrice: item.floorPrice || "",
        platform: item.platform || "",
        status: item.status || "",
        disposition: item.disposition || "",
        shippingLogic: item.shippingLogic || "",
        listingDescription: item.listingDescription || "",
      });
      if (item.priceRangeLow && isMarketSourceArray(item.marketSources)) {
        setPricing({
          itemId: item.id,
          priceLow: Number(item.priceRangeLow),
          priceHigh: Number(item.priceRangeHigh ?? item.priceRangeLow),
          estimatedDaysToSell: item.estimatedDaysToSell ?? 30,
          recommendedPlatform: item.recommendedPlatform ?? item.platform,
          platformRationale: item.platformRationale ?? "",
          sources: item.marketSources,
        });
      }
      if (isListingCopyState(item.listingCopy)) {
        setListingCopy(item.listingCopy);
      }
      setPublishResult(null);
    }
  }, [item]);

  if (error || isNaN(id)) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Item not found or an error occurred.
        </div>
        <Button variant="outline" className="mt-4" onClick={() => setLocation("/inventory")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Inventory
        </Button>
      </div>
    );
  }

  if (isLoading || !item) {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  const handleSave = () => {
    updateItem.mutate(
      { 
        itemId: id, 
        data: {
          brand: formData.brand,
          model: formData.model,
          category: formData.category || null,
          color: formData.color || null,
          condition: formData.condition || null,
          conditionNotes: formData.conditionNotes || null,
          style: formData.style || null,
          fabric: formData.fabric || null,
          marketPrice: formData.marketPrice || null,
          floorPrice: formData.floorPrice || null,
          platform: formData.platform,
          status: formData.status,
          disposition: formData.disposition,
          shippingLogic: formData.shippingLogic || null,
          listingDescription: formData.listingDescription || null,
        },
      },
      {
        onSuccess: () => {
          toast({ title: "Item updated successfully." });
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to update item." });
        },
      }
    );
  };

  const handleDelete = () => {
    deleteItem.mutate(
      { itemId: id },
      {
        onSuccess: () => {
          toast({ title: "Item deleted." });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
          setLocation("/inventory");
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to delete item." });
        },
      }
    );
  };

  const handleGenerateDesc = () => {
    generateDesc.mutate(
      { data: { itemId: id } },
      {
        onSuccess: (data) => {
          toast({ title: "Description generated!" });
          setFormData(prev => ({ ...prev, listingDescription: data.description }));
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to generate description." });
        },
      }
    );
  };

  const handleGetPricing = () => {
    priceItemMutation.mutate(
      { itemId: id },
      {
        onSuccess: (data) => {
          setPricing(data as PricingState);
          toast({ title: "Market pricing generated!" });
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to generate market pricing." });
        },
      }
    );
  };

  const handleGenerateListings = () => {
    generateListingsMutation.mutate(
      { itemId: id },
      {
        onSuccess: (data) => {
          const { itemId: _id, ...copy } = data as { itemId: number } & ListingCopyState;
          setListingCopy(copy);
          toast({ title: "Listing copy generated!" });
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to generate listing copy." });
        },
      }
    );
  };

  const handlePublish = () => {
    publishItemMutation.mutate(
      { itemId: id },
      {
        onSuccess: (data) => {
          setPublishResult({
            mode: data.mode, message: data.message,
            platformListingUrl: data.platformListingUrl,
            listingTitle: formData.brand + " " + formData.model,
            listingDescription: formData.listingDescription,
          });
          setFormData(prev => ({ ...prev, status: data.newStatus }));
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
          if (data.mode === "live") toast({ title: `Listed on ${data.platform}!` });
          else if (data.mode === "draft") toast({ title: `Draft saved on ${data.platform}.` });
          else toast({ title: `Draft prepared for ${data.platform}.` });
        },
        onError: (err: unknown) => {
          const msg = err instanceof Error ? err.message : "Failed to publish item.";
          toast({ variant: "destructive", title: msg });
        },
      }
    );
  };

  const handleSyncStatus = () => {
    setSyncResult(null);
    syncStatusMutation.mutate(
      { itemId: id },
      {
        onSuccess: (data) => {
          setSyncResult({ newStatus: data.newStatus, message: data.message, apiCalled: data.apiCalled });
          setFormData(prev => ({ ...prev, status: data.newStatus }));
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
          toast({ title: `Status synced: ${data.newStatus}` });
        },
        onError: (err: unknown) => {
          const msg = err instanceof Error ? err.message : "Failed to sync platform status.";
          toast({ variant: "destructive", title: msg });
        },
      }
    );
  };

  const handleCopyListing = () => {
    if (!publishResult) return;
    const text = [
      publishResult.listingTitle ? `TITLE: ${publishResult.listingTitle}` : "",
      publishResult.listingDescription ? `\nDESCRIPTION:\n${publishResult.listingDescription}` : "",
      formData.floorPrice ? `\nPRICE: $${formData.floorPrice}` : formData.marketPrice ? `\nPRICE: $${formData.marketPrice}` : "",
      formData.shippingLogic ? `\nSHIPPING: ${formData.shippingLogic}` : "",
    ].filter(Boolean).join("");
    void navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const copyToClipboard = (text: string, key: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    });
  };

  const isPublishable =
    !MANUAL_PLATFORMS.has(formData.platform) &&
    formData.disposition === "list" &&
    !!formData.listingDescription?.trim();

  const publishButtonLabel = () => {
    if (publishItemMutation.isPending) return "Publishing…";
    if (NO_API_PLATFORMS.has(formData.platform)) return `Prepare Draft for ${formData.platform}`;
    return `Publish to ${formData.platform}`;
  };

  const activeCopyPlatform = listingCopy?.[copyTab];

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <button onClick={() => setLocation("/inventory")} className="hover:text-foreground transition-colors flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Inventory
        </button>
        <span>/</span>
        <span>Item {id}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">{item.brand} {item.model}</h1>
          <p className="text-muted-foreground mt-1">Client: {item.clientName} • Job: {item.jobTitle}</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="text-destructive hover:bg-destructive hover:text-destructive-foreground">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the item.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSave} disabled={updateItem.isPending}>
            <Save className="w-4 h-4 mr-2" /> Save Changes
          </Button>
        </div>
      </div>

      {publishResult && (
        <div className={`flex items-start gap-3 p-4 rounded-lg border text-sm ${
          publishResult.mode === "live"
            ? "bg-green-50 border-green-200 text-green-800"
            : publishResult.mode === "draft_prepared"
              ? "bg-amber-50 border-amber-200 text-amber-800"
              : "bg-blue-50 border-blue-200 text-blue-800"
        }`}>
          {publishResult.mode === "live" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : publishResult.mode === "draft_prepared" ? (
            <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-medium">
              {publishResult.mode === "live" ? "Live listing created"
                : publishResult.mode === "draft" ? "Draft saved"
                : "Draft prepared"}
            </p>
            <p className="mt-0.5">{publishResult.message}</p>
            {publishResult.mode === "draft_prepared" && (
              <div className="flex gap-2 mt-2 flex-wrap">
                <button
                  onClick={handleCopyListing}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-white/70 border border-current hover:bg-white transition-colors"
                >
                  {copied ? "Copied!" : "Copy listing text"}
                </button>
                {publishResult.platformListingUrl && (
                  <a
                    href={publishResult.platformListingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded bg-white/70 border border-current hover:bg-white transition-colors"
                  >
                    Open listing form <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            )}
            {publishResult.mode !== "draft_prepared" && publishResult.platformListingUrl && (
              <a
                href={publishResult.platformListingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-2 underline font-medium"
              >
                View on platform <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* ── Left column ── */}
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Model / Title</Label>
                  <Input value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Color</Label>
                  <Input
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                    placeholder="e.g. Navy Blue"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Condition</Label>
                  <Select value={formData.condition} onValueChange={v => setFormData({...formData, condition: v})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {formData.condition && formData.condition !== "Excellent" && (
                <div className="space-y-2">
                  <Label>Condition Notes</Label>
                  <Input
                    value={formData.conditionNotes}
                    onChange={e => setFormData({...formData, conditionNotes: e.target.value})}
                    placeholder="Brief note on flaws or wear…"
                  />
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Style</Label>
                  <Input
                    value={formData.style}
                    onChange={e => setFormData({...formData, style: e.target.value})}
                    placeholder="e.g. Mid-Century Modern, Bohemian"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Material / Fabric</Label>
                  <Input
                    value={formData.fabric}
                    onChange={e => setFormData({...formData, fabric: e.target.value})}
                    placeholder="e.g. Cotton, Walnut, Brass"
                  />
                </div>
              </div>
              {(() => {
                const angles = (item as unknown as { angleLabels?: string[] }).angleLabels ?? [];
                return angles.length > 0 ? (
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground uppercase tracking-wide">Photo Angles Captured</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {angles.map((a) => (
                        <span key={a} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded uppercase tracking-wide font-medium border border-slate-200">
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null;
              })()}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Market Price</Label>
                  <Input type="number" step="0.01" value={formData.marketPrice} onChange={e => setFormData({...formData, marketPrice: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label>Floor Price</Label>
                  <Input type="number" step="0.01" value={formData.floorPrice} onChange={e => setFormData({...formData, floorPrice: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Shipping Logic / Notes</Label>
                <Input
                  value={formData.shippingLogic}
                  onChange={e => setFormData({...formData, shippingLogic: e.target.value})}
                  placeholder="e.g. USPS Priority Medium box, Local pickup only"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Listing Description</CardTitle>
              <Button variant="secondary" size="sm" onClick={handleGenerateDesc} disabled={generateDesc.isPending}>
                <Sparkles className="w-4 h-4 mr-2 text-blue-500" />
                {generateDesc.isPending ? "Generating..." : "Generate with AI"}
              </Button>
            </CardHeader>
            <CardContent>
              <Textarea
                className="min-h-[200px]"
                value={formData.listingDescription}
                onChange={e => setFormData({...formData, listingDescription: e.target.value})}
                placeholder="Item description for the listing platform..."
              />
            </CardContent>
          </Card>
        </div>

        {/* ── Right column ── */}
        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={formData.platform} onValueChange={v => setFormData({...formData, platform: v})}>
                  <SelectTrigger><SelectValue placeholder="Select platform" /></SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              {pricing?.recommendedPlatform && pricing.recommendedPlatform !== formData.platform && (
                <div className="text-xs bg-amber-50 border border-amber-200 rounded-md p-2.5 text-amber-700 space-y-1">
                  <p>AI recommends: <strong>{pricing.recommendedPlatform}</strong></p>
                  {pricing.platformRationale && <p className="text-amber-600">{pricing.platformRationale}</p>}
                </div>
              )}
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center gap-2">
                  <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                    <SelectContent>
                      {STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <PublishStatusBadge status={formData.status} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Disposition</Label>
                <Select value={formData.disposition} onValueChange={v => setFormData({...formData, disposition: v})}>
                  <SelectTrigger><SelectValue placeholder="Select disposition" /></SelectTrigger>
                  <SelectContent>
                    {DISPOSITIONS.map(d => <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-primary/20">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Send className="w-4 h-4" />
                Publish Listing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {MANUAL_PLATFORMS.has(formData.platform) ? (
                <p className="text-sm text-muted-foreground">
                  Local Pickup listings are managed manually. No platform integration is available.
                </p>
              ) : NO_API_PLATFORMS.has(formData.platform) ? (
                <p className="text-sm text-muted-foreground">
                  {formData.platform} does not offer a public API. Clicking below will mark this item as a Draft and display copy-ready instructions.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Posts a draft listing to {formData.platform || "the routed platform"} via their API. Forbidden language is scrubbed automatically before sending.
                </p>
              )}

              {item.platformListingUrl && (
                <a href={item.platformListingUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-primary hover:underline">
                  <ExternalLink className="w-3.5 h-3.5" />
                  View existing listing
                </a>
              )}

              {item.platformPublishError && !publishResult && (
                <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 p-2 rounded">
                  <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{item.platformPublishError}</span>
                </div>
              )}

              <Button className="w-full" onClick={handlePublish} disabled={publishItemMutation.isPending || !isPublishable}>
                <Send className="w-4 h-4 mr-2" />
                {publishButtonLabel()}
              </Button>

              {!MANUAL_PLATFORMS.has(formData.platform) && item.platformListingId && (
                <Button variant="outline" className="w-full" onClick={handleSyncStatus} disabled={syncStatusMutation.isPending}>
                  <RefreshCw className={`w-4 h-4 mr-2 ${syncStatusMutation.isPending ? "animate-spin" : ""}`} />
                  {syncStatusMutation.isPending ? "Syncing…" : "Sync Status from Platform"}
                </Button>
              )}

              {syncResult && (
                <div className={`flex items-start gap-2 text-xs p-2 rounded border ${
                  syncResult.apiCalled ? "bg-blue-50 border-blue-200 text-blue-800" : "bg-amber-50 border-amber-200 text-amber-800"
                }`}>
                  <Info className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span>{syncResult.message}</span>
                </div>
              )}

              {!formData.listingDescription?.trim() && !MANUAL_PLATFORMS.has(formData.platform) && (
                <p className="text-xs text-amber-600">
                  Generate a listing description first to enable publishing.
                </p>
              )}
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(item.updatedAt).toLocaleString()}</p>
            <p>Created by: {item.createdBy || "Unknown"}</p>
            {item.platformListingId && <p>Platform ID: {item.platformListingId}</p>}
          </div>
        </div>
      </div>

      {/* ── Market Pricing + Listing Copy Tabs ── */}
      <Card className="shadow-sm">
        <Tabs defaultValue="pricing">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <TabsList className="h-9">
                <TabsTrigger value="pricing" className="flex items-center gap-1.5 text-xs">
                  <TrendingUp className="w-3.5 h-3.5" /> Market Pricing
                </TabsTrigger>
                <TabsTrigger value="listings" className="flex items-center gap-1.5 text-xs">
                  <FileText className="w-3.5 h-3.5" /> Listing Copy
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={handleGetPricing} disabled={priceItemMutation.isPending}>
                  <Sparkles className="w-4 h-4 mr-1.5 text-emerald-500" />
                  {priceItemMutation.isPending ? "Analyzing…" : pricing ? "Refresh Pricing" : "Get Pricing"}
                </Button>
                <Button variant="secondary" size="sm" onClick={handleGenerateListings} disabled={generateListingsMutation.isPending}>
                  <Sparkles className="w-4 h-4 mr-1.5 text-blue-500" />
                  {generateListingsMutation.isPending ? "Generating…" : listingCopy ? "Regen Copy" : "Generate Copy"}
                </Button>
              </div>
            </div>
          </CardHeader>

          <TabsContent value="pricing">
            <CardContent className="pt-4">
              {pricing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-muted/40 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Price Range</div>
                      <div className="font-semibold">${pricing.priceLow} – ${pricing.priceHigh}</div>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Est. Days to Sell</div>
                      <div className="font-semibold">{pricing.estimatedDaysToSell}d</div>
                    </div>
                    <div className="bg-muted/40 rounded-lg p-3 text-center">
                      <div className="text-xs text-muted-foreground mb-1">Best Platform</div>
                      <div className="font-semibold text-sm truncate">{pricing.recommendedPlatform}</div>
                    </div>
                  </div>
                  {pricing.platformRationale && (
                    <p className="text-xs text-muted-foreground italic">{pricing.platformRationale}</p>
                  )}
                  {pricing.sources.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-2">Comparable Sold Listings</p>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs">
                          <thead className="bg-muted/50">
                            <tr>
                              <th className="text-left p-2 font-medium text-muted-foreground">Platform</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Item</th>
                              <th className="text-left p-2 font-medium text-muted-foreground">Condition</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Sold</th>
                              <th className="text-right p-2 font-medium text-muted-foreground">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {pricing.sources.map((src, i) => (
                              <tr key={i} className="border-t border-border/50 hover:bg-muted/30">
                                <td className="p-2 text-muted-foreground">{src.platform}</td>
                                <td className="p-2 max-w-[180px] truncate">{src.title}</td>
                                <td className="p-2 text-muted-foreground">{src.condition}</td>
                                <td className="p-2 text-right font-medium">${src.price}</td>
                                <td className="p-2 text-right text-muted-foreground">{src.soldDate}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No pricing data yet. Click "Get Pricing" to generate market comps from recent sold listings.
                </p>
              )}
            </CardContent>
          </TabsContent>

          <TabsContent value="listings">
            <CardContent className="pt-4">
              {listingCopy ? (
                <div className="space-y-4">
                  <div className="flex gap-2 flex-wrap">
                    {(["poshmark", "ebay", "etsy", "facebook"] as const).map((p) => {
                      const colors = COPY_TAB_COLORS[p];
                      const isActive = copyTab === p;
                      const labels: Record<string, string> = { poshmark: "Poshmark", ebay: "eBay", etsy: "Etsy", facebook: "Facebook" };
                      return (
                        <button
                          key={p}
                          onClick={() => setCopyTab(p)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${isActive ? colors.active : colors.inactive}`}
                        >
                          {labels[p]}
                        </button>
                      );
                    })}
                  </div>

                  {activeCopyPlatform && (
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-xs">Title</Label>
                          <button onClick={() => copyToClipboard(activeCopyPlatform.title, `${copyTab}-title`)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            {copiedKey === `${copyTab}-title` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            {copiedKey === `${copyTab}-title` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="text-sm bg-muted/40 rounded-md p-3 font-medium">{activeCopyPlatform.title}</div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <Label className="text-xs">Description</Label>
                          <button onClick={() => copyToClipboard(activeCopyPlatform.description, `${copyTab}-desc`)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                            {copiedKey === `${copyTab}-desc` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                            {copiedKey === `${copyTab}-desc` ? "Copied" : "Copy"}
                          </button>
                        </div>
                        <div className="text-sm bg-muted/40 rounded-md p-3 whitespace-pre-wrap leading-relaxed">{activeCopyPlatform.description}</div>
                      </div>
                      {activeCopyPlatform.measurements && (
                        <div>
                          <Label className="text-xs">Measurements</Label>
                          <div className="text-sm text-muted-foreground mt-1">{activeCopyPlatform.measurements}</div>
                        </div>
                      )}
                      {activeCopyPlatform.hashtags.length > 0 && (
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <Label className="text-xs">Hashtags</Label>
                            <button onClick={() => copyToClipboard(activeCopyPlatform.hashtags.map(h => `#${h}`).join(" "), `${copyTab}-tags`)} className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                              {copiedKey === `${copyTab}-tags` ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
                              {copiedKey === `${copyTab}-tags` ? "Copied" : "Copy all"}
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {activeCopyPlatform.hashtags.map((tag, i) => (
                              <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground py-6 text-center">
                  No listing copy yet. Click "Generate Copy" to create platform-specific titles, descriptions, and hashtags.
                </p>
              )}
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
