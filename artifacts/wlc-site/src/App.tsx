import { Switch, Route, Router as WouterRouter } from "wouter";
import NotFound from "@/pages/not-found";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Services from "@/pages/Services";
import Pricing from "@/pages/Pricing";
import FAQ from "@/pages/FAQ";
import Contact from "@/pages/Contact";

import TheReset from "@/pages/TheReset";
import HouseCalls from "@/pages/HouseCalls";
import FastBagFill from "@/pages/FastBagFill";

import HomeReset from "@/pages/HomeReset";
import LegacyPillar from "@/pages/LegacyPillar";
import HouseCallsPillar from "@/pages/HouseCallsPillar";
import CuratedResalePillar from "@/pages/CuratedResalePillar";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/faq" component={FAQ} />
      <Route path="/contact" component={Contact} />

      <Route path="/the-reset" component={TheReset} />
      <Route path="/house-calls" component={HouseCalls} />
      <Route path="/fast-bag-fill" component={FastBagFill} />

      <Route path="/home-reset-move-support" component={HomeReset} />
      <Route path="/legacy-planning" component={LegacyPillar} />
      <Route path="/legacy-inventory" component={LegacyPillar} />
      <Route path="/house-calls-pillar" component={HouseCallsPillar} />
      <Route path="/curated-resale-consignment" component={CuratedResalePillar} />
      <Route path="/curated-resale" component={CuratedResalePillar} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

export default App;
