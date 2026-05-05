import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import type { ComponentType } from "react";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Inventory from "@/pages/inventory";
import InventoryItem from "@/pages/inventory-item";
import Clients from "@/pages/clients";
import ClientDetail from "@/pages/client-detail";
import Jobs from "@/pages/jobs";
import JobDetail from "@/pages/job-detail";
import Login from "@/pages/login";
import { AppLayout } from "@/components/layout";
import { useAuth, getOperatorEmail } from "@/lib/auth";

// Interceptor for API calls
const originalFetch = window.fetch;
window.fetch = async (input, init) => {
  const email = getOperatorEmail();
  if (email) {
    const headers = new Headers(init?.headers);
    headers.set("X-Operator-Email", email);
    init = { ...init, headers };
  }
  return originalFetch(input, init);
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <AppLayout>
      <Component />
    </AppLayout>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/">
        <ProtectedRoute component={Dashboard} />
      </Route>
      <Route path="/inventory">
        <ProtectedRoute component={Inventory} />
      </Route>
      <Route path="/inventory/:itemId">
        <ProtectedRoute component={InventoryItem} />
      </Route>
      <Route path="/clients">
        <ProtectedRoute component={Clients} />
      </Route>
      <Route path="/clients/:clientId">
        <ProtectedRoute component={ClientDetail} />
      </Route>
      <Route path="/jobs">
        <ProtectedRoute component={Jobs} />
      </Route>
      <Route path="/jobs/:jobId">
        <ProtectedRoute component={JobDetail} />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
