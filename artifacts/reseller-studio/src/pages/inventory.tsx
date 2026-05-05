import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useListItems, useListClients, useListJobs } from "@workspace/api-client-react";
import { formatCurrency, PLATFORMS, STATUSES } from "@/lib/constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Search } from "lucide-react";

function platformBadgeClass(platform: string): string {
  const map: Record<string, string> = {
    "Poshmark":            "bg-red-100 text-red-700 border-red-200",
    "eBay":                "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Etsy":                "bg-orange-100 text-orange-700 border-orange-200",
    "Facebook Marketplace":"bg-blue-100 text-blue-700 border-blue-200",
    "Chairish":            "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Local Pickup":        "bg-gray-100 text-gray-600 border-gray-200",
  };
  return map[platform] ?? "bg-gray-100 text-gray-600 border-gray-200";
}

export default function Inventory() {
  const [, setLocation] = useLocation();
  const [platform, setPlatform] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const [clientId, setClientId] = useState<string>("all");
  const [jobId, setJobId] = useState<string>("all");

  const { data: items, isLoading } = useListItems({
    platform: platform !== "all" ? platform : undefined,
    status: status !== "all" ? status : undefined,
    clientId: clientId !== "all" ? Number(clientId) : undefined,
    jobId: jobId !== "all" ? Number(jobId) : undefined,
  });

  const { data: clients } = useListClients();
  const { data: jobs } = useListJobs(clientId !== "all" ? { clientId: Number(clientId) } : undefined);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">Master Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage and track all items across jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-card border border-border rounded-xl shadow-sm">
        <div className="space-y-1.5">
          <Label className="text-xs">Client</Label>
          <Select value={clientId} onValueChange={(val) => { setClientId(val); setJobId("all"); }}>
            <SelectTrigger>
              <SelectValue placeholder="All Clients" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              {clients?.map(c => (
                <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Job</Label>
          <Select value={jobId} onValueChange={setJobId} disabled={!jobs || jobs.length === 0}>
            <SelectTrigger>
              <SelectValue placeholder="All Jobs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              {jobs?.map(j => (
                <SelectItem key={j.id} value={j.id.toString()}>{j.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Platform</Label>
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger>
              <SelectValue placeholder="All Platforms" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              {PLATFORMS.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {STATUSES.map(s => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 hover:bg-muted/50">
              <TableHead>Item</TableHead>
              <TableHead>Client & Job</TableHead>
              <TableHead>Market</TableHead>
              <TableHead>Floor</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Disposition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell><Skeleton className="h-4 w-32" /><Skeleton className="h-3 w-24 mt-2" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-32 mt-2" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                  <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                </TableRow>
              ))
            ) : items && items.length > 0 ? (
              items.map((item) => (
                <TableRow 
                  key={item.id} 
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => setLocation(`/inventory/${item.id}`)}
                >
                  <TableCell>
                    <div className="font-medium text-foreground">{item.brand}</div>
                    <div className="text-sm text-muted-foreground truncate max-w-[200px]">{item.model}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{item.clientName}</div>
                    <div className="text-xs text-muted-foreground truncate max-w-[150px]">{item.jobTitle}</div>
                  </TableCell>
                  <TableCell className="text-sm font-medium">{formatCurrency(item.marketPrice)}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{formatCurrency(item.floorPrice)}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${platformBadgeClass(item.platform)}`}>
                      {item.platform}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        item.status === 'Sold' ? 'default' : 
                        item.status === 'New' ? 'destructive' : 
                        'outline'
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm capitalize">{item.disposition}</span>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                  No items found matching the criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
