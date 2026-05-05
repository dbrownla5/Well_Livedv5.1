import { useParams, useLocation } from "wouter";
import { useGetClient, useListJobs } from "@workspace/api-client-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Briefcase, Mail, Phone, Home, FileText } from "lucide-react";

export default function ClientDetail() {
  const { clientId } = useParams<{ clientId: string }>();
  const id = Number(clientId);
  const [, setLocation] = useLocation();

  const { data: client, isLoading: clientLoading, error } = useGetClient(id);
  const { data: jobs, isLoading: jobsLoading } = useListJobs({ clientId: id });

  if (error || isNaN(id)) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Client not found.
        </div>
        <Button variant="outline" className="mt-4" onClick={() => setLocation("/clients")}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Clients
        </Button>
      </div>
    );
  }

  if (clientLoading || !client) {
    return (
      <div className="p-8 max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
        <button onClick={() => setLocation("/clients")} className="hover:text-foreground transition-colors flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Clients
        </button>
        <span>/</span>
        <span>{client.name}</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif text-foreground">{client.name}</h1>
          {client.household && <p className="text-muted-foreground mt-1 text-lg">{client.household}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 shadow-sm h-fit">
          <CardHeader>
            <CardTitle className="text-lg">Contact Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {client.contactEmail && (
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{client.contactEmail}</span>
              </div>
            )}
            {client.contactPhone && (
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <span className="text-sm">{client.contactPhone}</span>
              </div>
            )}
            {!client.contactEmail && !client.contactPhone && (
              <p className="text-sm text-muted-foreground">No contact info provided.</p>
            )}

            {client.notes && (
              <>
                <div className="border-t border-border my-4"></div>
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                  <p className="text-sm whitespace-pre-wrap">{client.notes}</p>
                </div>
              </>
            )}
            
            <div className="text-xs text-muted-foreground mt-6 pt-4 border-t border-border">
              Added {new Date(client.createdAt).toLocaleDateString()}
            </div>
          </CardContent>
        </Card>

        <div className="col-span-1 md:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-medium">Jobs</h2>
            <Button size="sm" onClick={() => setLocation("/jobs")}>
              <Briefcase className="w-4 h-4 mr-2" /> View All Jobs
            </Button>
          </div>

          <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobsLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4"><Skeleton className="h-6 w-32 mx-auto" /></TableCell>
                  </TableRow>
                ) : jobs && jobs.length > 0 ? (
                  jobs.map((job) => (
                    <TableRow 
                      key={job.id} 
                      className="cursor-pointer hover:bg-muted/50 transition-colors"
                      onClick={() => setLocation(`/jobs/${job.id}`)}
                    >
                      <TableCell className="font-medium text-foreground">{job.title}</TableCell>
                      <TableCell className="capitalize text-muted-foreground">{job.jobType}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{job.status}</Badge>
                      </TableCell>
                      <TableCell>{job.itemCount || 0}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center text-muted-foreground">
                      No jobs for this client yet.
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
