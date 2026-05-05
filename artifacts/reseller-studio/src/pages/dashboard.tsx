import { useGetDashboardSummary } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/constants";
import {
  PackageSearch,
  Copy,
  HeartHandshake,
  DollarSign,
  Users,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const { data: summary, isLoading, error } = useGetDashboardSummary();

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md">
          Error loading dashboard. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif text-foreground">Studio Overview</h1>
        <p className="text-muted-foreground mt-1">Today's snapshot of your back-of-house operations.</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      ) : summary ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Market Value" 
              value={formatCurrency(summary.marketValue)} 
              icon={DollarSign}
              subtitle={`Floor: ${formatCurrency(summary.floorValue)}`}
            />
            <StatCard 
              title="Total Items" 
              value={summary.totalItems} 
              icon={PackageSearch}
              subtitle={`${summary.newItems} new`}
            />
            <StatCard 
              title="Active Jobs" 
              value={summary.totalJobs} 
              icon={Briefcase}
            />
            <StatCard 
              title="Total Clients" 
              value={summary.totalClients} 
              icon={Users}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Disposition Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-blue-500/10 flex items-center justify-center">
                      <PackageSearch className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="font-medium text-sm">To List</span>
                  </div>
                  <span className="font-bold">{summary.newItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-orange-500/10 flex items-center justify-center">
                      <Copy className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="font-medium text-sm">Duplicates</span>
                  </div>
                  <span className="font-bold">{summary.duplicateItems}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-md bg-green-500/10 flex items-center justify-center">
                      <HeartHandshake className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="font-medium text-sm">To Donate</span>
                  </div>
                  <span className="font-bold">{summary.donateItems}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 lg:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent Items</CardTitle>
              </CardHeader>
              <CardContent>
                {summary.recentItems?.length > 0 ? (
                  <div className="space-y-3">
                    {summary.recentItems.slice(0, 5).map(item => (
                      <Link key={item.id} href={`/inventory/${item.id}`} className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors border border-transparent hover:border-border">
                        <div>
                          <p className="font-medium text-sm">{item.brand} {item.model}</p>
                          <p className="text-xs text-muted-foreground">{item.jobTitle}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">{item.platform}</Badge>
                          <span className="text-sm font-semibold">{formatCurrency(item.marketPrice)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No items processed recently.
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatCard({ title, value, icon: Icon, subtitle }: { title: string; value: string | number; icon: LucideIcon; subtitle?: string }) {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-2xl font-bold tracking-tight text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
