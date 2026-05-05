import { useState, useRef } from "react";
import { useParams, useLocation, Link } from "wouter";
import {
  useGetJob,
  useListItems,
  useAnalyzePhotoBatch,
  getListItemsQueryKey,
  getGetJobQueryKey,
  type AnalyzeBatchResult,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@clerk/react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/constants";
import { ArrowLeft, UploadCloud, Image as ImageIcon, CheckCircle2, AlertCircle, PackageSearch } from "lucide-react";

export default function JobDetail() {
  const { jobId } = useParams<{ jobId: string }>();
  const id = Number(jobId);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: job, isLoading: jobLoading, error } = useGetJob(id);
  const { data: items, isLoading: itemsLoading } = useListItems({ jobId: id });
  const analyzeBatch = useAnalyzePhotoBatch();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [batchResult, setBatchResult] = useState<AnalyzeBatchResult | null>(null);

  if (error || isNaN(id)) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Job not found.
        </div>
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
    setProgress(10);
    setBatchResult(null);

    try {
      const photos = await Promise.all(
        Array.from(files).map(async (file) => {
          const buffer = await file.arrayBuffer();
          const base64 = btoa(
            new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
          );
          
          return {
            filename: file.name,
            mimeType: file.type,
            dataBase64: base64
          };
        })
      );

      setProgress(40);

      analyzeBatch.mutate(
        {
          data: {
            jobId: id,
            operatorEmail: user?.primaryEmailAddress?.emailAddress ?? user?.id ?? undefined,
            photos
          }
        },
        {
          onSuccess: (result) => {
            setProgress(100);
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
          }
        }
      );
    } catch (err) {
      console.error("File processing error:", err);
      toast({ variant: "destructive", title: "Failed to process files locally." });
      setUploading(false);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

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
        <div className="lg:col-span-1 space-y-6">
          <Card className="shadow-sm border-dashed border-2 bg-muted/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-primary" /> AI Photo Intake
              </CardTitle>
              <CardDescription>
                Upload clearout photos. The AI will identify items, check markets, and triage to inventory.
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
                  <Button 
                    className="w-full h-24 flex flex-col gap-2" 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <UploadCloud className="w-6 h-6 text-muted-foreground" />
                    <span>Select Photos</span>
                  </Button>
                )}

                {uploading && (
                  <div className="space-y-2 p-4 bg-card rounded-md border">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Processing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Sending to Gemini AI...
                    </p>
                  </div>
                )}

                {batchResult && !uploading && (
                  <div className="p-4 bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900 rounded-md space-y-2">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium text-sm">
                      <CheckCircle2 className="w-4 h-4" /> Analysis Complete
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg">{batchResult.savedCount}</div>
                        <div className="text-muted-foreground">Saved</div>
                      </div>
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg">{batchResult.duplicateCount}</div>
                        <div className="text-muted-foreground">Dups</div>
                      </div>
                      <div className="bg-background p-2 rounded border shadow-sm">
                        <div className="font-bold text-lg">{batchResult.donateCount}</div>
                        <div className="text-muted-foreground">Donate</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
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
                  <TableHead>Platform</TableHead>
                  <TableHead>Market</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Disposition</TableHead>
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
                        <div className="text-sm text-muted-foreground truncate max-w-[180px]">{item.model}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="font-normal text-xs">{item.platform}</Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">{formatCurrency(item.marketPrice)}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            item.status === 'Sold' ? 'default' : 
                            item.status === 'New' ? 'destructive' : 
                            'outline'
                          }
                          className="text-xs"
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
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
                        <p>No items in this job yet. Upload photos to start intaking.</p>
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
  );
}
