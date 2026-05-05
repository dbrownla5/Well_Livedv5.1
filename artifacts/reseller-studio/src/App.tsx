import { useEffect, useRef } from "react";
import { ClerkProvider, SignIn, SignUp, Show, useClerk } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { shadcn } from "@clerk/themes";
import { Switch, Route, useLocation, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
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
import { AppLayout } from "@/components/layout";

const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

if (!clerkPubKey) {
  throw new Error("Missing VITE_CLERK_PUBLISHABLE_KEY");
}

const clerkAppearance = {
  theme: shadcn,
  cssLayerName: "clerk",
  options: {
    logoPlacement: "inside" as const,
    logoLinkUrl: basePath || "/",
    logoImageUrl: `${window.location.origin}${basePath}/logo.svg`,
  },
  variables: {
    colorPrimary: "#6a4a36",
    colorForeground: "#231e1a",
    colorMutedForeground: "#6e5e57",
    colorDanger: "#a33333",
    colorBackground: "#f8f6f2",
    colorInput: "#cec7bd",
    colorInputForeground: "#231e1a",
    colorNeutral: "#d0c9c1",
    fontFamily: "'Inter', system-ui, sans-serif",
    borderRadius: "0.375rem",
  },
  elements: {
    rootBox: "w-full flex justify-center",
    cardBox: "bg-[#f8f6f2] rounded-2xl w-[440px] max-w-full overflow-hidden shadow-sm border border-[#d0c9c1]",
    card: "!shadow-none !border-0 !bg-transparent !rounded-none",
    footer: "!shadow-none !border-0 !bg-transparent !rounded-none",
    headerTitle: "text-[#231e1a] font-serif",
    headerSubtitle: "text-[#6e5e57]",
    socialButtonsBlockButtonText: "text-[#231e1a]",
    formFieldLabel: "text-[#231e1a]",
    footerActionLink: "text-[#6a4a36]",
    footerActionText: "text-[#6e5e57]",
    dividerText: "text-[#6e5e57]",
    identityPreviewEditButton: "text-[#6a4a36]",
    formFieldSuccessText: "text-[#6a4a36]",
    alertText: "text-[#231e1a]",
    logoBox: "flex justify-center",
    logoImage: "w-10 h-10",
    socialButtonsBlockButton: "border border-[#d0c9c1] bg-white hover:bg-[#f0ede8]",
    formButtonPrimary: "bg-[#6a4a36] hover:bg-[#5c3d2e]",
    formFieldInput: "border-[#d0c9c1] bg-white text-[#231e1a]",
    footerAction: "bg-transparent",
    dividerLine: "bg-[#d0c9c1]",
    alert: "bg-[#f0ede8]",
    otpCodeFieldInput: "border-[#d0c9c1] bg-white text-[#231e1a]",
    formFieldRow: "",
    main: "",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function ClerkQueryClientCacheInvalidator() {
  const { addListener } = useClerk();
  const qc = useQueryClient();
  const prevUserIdRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = addListener(({ user }) => {
      const userId = user?.id ?? null;
      if (
        prevUserIdRef.current !== undefined &&
        prevUserIdRef.current !== userId
      ) {
        qc.clear();
      }
      prevUserIdRef.current = userId;
    });
    return unsubscribe;
  }, [addListener, qc]);

  return null;
}

function StudioLanding() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-sm space-y-8 text-center">
        <div>
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <img src={`${basePath}/logo.svg`} alt="DB" className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-serif text-foreground">DB Reseller Studio</h1>
          <p className="text-muted-foreground mt-2">Back-of-house operations</p>
        </div>
        <a
          href={`${basePath}/sign-in`}
          className="inline-block w-full py-2 px-4 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Sign in to the studio
        </a>
      </div>
    </div>
  );
}

function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignIn routing="path" path={`${basePath}/sign-in`} signUpUrl={`${basePath}/sign-up`} />
    </div>
  );
}

function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <SignUp routing="path" path={`${basePath}/sign-up`} signInUrl={`${basePath}/sign-in`} />
    </div>
  );
}

function HomeRedirect() {
  return (
    <>
      <Show when="signed-in">
        <AppLayout>
          <Dashboard />
        </AppLayout>
      </Show>
      <Show when="signed-out">
        <StudioLanding />
      </Show>
    </>
  );
}

function ProtectedRoute({ component: Component }: { component: ComponentType }) {
  return (
    <>
      <Show when="signed-in">
        <AppLayout>
          <Component />
        </AppLayout>
      </Show>
      <Show when="signed-out">
        <Redirect to="/sign-in" />
      </Show>
    </>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomeRedirect} />
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />
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

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey!}
      proxyUrl={clerkProxyUrl}
      appearance={clerkAppearance}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      localization={{
        signIn: {
          start: {
            title: "Welcome back",
            subtitle: "Sign in to access the studio",
          },
        },
        signUp: {
          start: {
            title: "Create an account",
            subtitle: "Get access to the reseller studio",
          },
        },
      }}
      routerPush={(to) => setLocation(stripBase(to))}
      routerReplace={(to) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <WouterRouter base={basePath}>
      <ClerkProviderWithRoutes />
    </WouterRouter>
  );
}

export default App;
