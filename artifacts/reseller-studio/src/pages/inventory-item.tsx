import { useState, useEffect } from "react";
import { useParams, useLocation } from "wouter";
import { useQueryClient } from "@tanstack/react-query";
import { 
  useGetItem, 
  useUpdateItem, 
  useDeleteItem, 
  useGenerateListingDescription,
  getGetItemQueryKey,
  getListItemsQueryKey
} from "@workspace/api-client-react";
import { PLATFORMS, STATUSES, DISPOSITIONS, formatCurrency } from "@/lib/constants";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Sparkles, Trash2, Save } from "lucide-react";
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

  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    marketPrice: "",
    floorPrice: "",
    platform: "",
    status: "",
    disposition: "",
    shippingLogic: "",
    listingDescription: "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        brand: item.brand || "",
        model: item.model || "",
        marketPrice: item.marketPrice || "",
        floorPrice: item.floorPrice || "",
        platform: item.platform || "",
        status: item.status || "",
        disposition: item.disposition || "",
        shippingLogic: item.shippingLogic || "",
        listingDescription: item.listingDescription || "",
      });
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
          marketPrice: formData.marketPrice || null,
          floorPrice: formData.floorPrice || null,
          platform: formData.platform,
          status: formData.status,
          disposition: formData.disposition,
          shippingLogic: formData.shippingLogic || null,
          listingDescription: formData.listingDescription || null,
        } 
      },
      {
        onSuccess: () => {
          toast({ title: "Item updated successfully." });
          queryClient.invalidateQueries({ queryKey: getGetItemQueryKey(id) });
          queryClient.invalidateQueries({ queryKey: getListItemsQueryKey() });
        },
        onError: () => {
          toast({ variant: "destructive", title: "Failed to update item." });
        }
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
        }
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
        }
      }
    );
  };

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
        <div className="flex gap-2">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Item Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Brand</Label>
                  <Input 
                    value={formData.brand} 
                    onChange={e => setFormData({...formData, brand: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Model / Title</Label>
                  <Input 
                    value={formData.model} 
                    onChange={e => setFormData({...formData, model: e.target.value})} 
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Market Price</Label>
                  <Input 
                    type="number" 
                    step="0.01"
                    value={formData.marketPrice} 
                    onChange={e => setFormData({...formData, marketPrice: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Floor Price</Label>
                  <Input 
                    type="number"
                    step="0.01" 
                    value={formData.floorPrice} 
                    onChange={e => setFormData({...formData, floorPrice: e.target.value})} 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Shipping Logic / Notes</Label>
                <Input 
                  value={formData.shippingLogic} 
                  onChange={e => setFormData({...formData, shippingLogic: e.target.value})} 
                  placeholder="e.g. Needs custom crate, Local only"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Listing Description</CardTitle>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={handleGenerateDesc}
                disabled={generateDesc.isPending}
              >
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

        <div className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Classification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select value={formData.platform} onValueChange={v => setFormData({...formData, platform: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={formData.status} onValueChange={v => setFormData({...formData, status: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map(s => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Disposition</Label>
                <Select value={formData.disposition} onValueChange={v => setFormData({...formData, disposition: v})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select disposition" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISPOSITIONS.map(d => (
                      <SelectItem key={d} value={d} className="capitalize">{d}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p>Last updated: {new Date(item.updatedAt).toLocaleString()}</p>
            <p>Created by: {item.createdBy || "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
