import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import SiteLayout from "./components/site/SiteLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import HomeOrganization from "./pages/services/HomeOrganization";
import Legacy from "./pages/services/Legacy";
import HouseCalls from "./pages/services/HouseCalls";
import CuratedResale from "./pages/services/CuratedResale";

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - var(--nav-h))" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--char)", marginBottom: "8px" }}>404 Page Not Found</h1>
        <p style={{ color: "var(--stone)" }}>Did you forget to add the page to the router?</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <SiteLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/services" component={Services} />
        <Route path="/services/home-organization" component={HomeOrganization} />
        <Route path="/services/legacy" component={Legacy} />
        <Route path="/services/house-calls" component={HouseCalls} />
        <Route path="/services/resale" component={CuratedResale} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </SiteLayout>
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
