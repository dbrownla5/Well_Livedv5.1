import { useEffect } from "react";
import { useLocation } from "wouter";
import Nav from "./Nav";
import Footer from "./Footer";
import FloatCall from "./FloatCall";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <FloatCall />
    </>
  );
}
