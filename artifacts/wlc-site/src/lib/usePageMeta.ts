import { useEffect } from "react";

type PageMeta = {
  title: string;
  description: string;
  /** Path under the site root, e.g. "/about". Defaults to current pathname. */
  path?: string;
};

const SITE_ORIGIN = "https://www.thewelllivedcitizen.com";

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) ?? [];
    if (selector.includes("property=")) el.setAttribute("property", name ?? "");
    else el.setAttribute("name", name ?? "");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Sets <title>, <meta name="description">, canonical, and Open Graph / Twitter
 * tags for the current page. Per-page titles + matching OG = unique social
 * cards and unique Google snippets.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    const path = meta.path ?? window.location.pathname;
    const url = `${SITE_ORIGIN}${path}`;
    document.title = meta.title;

    setMeta('meta[name="description"]', "content", meta.description);
    setLink("canonical", url);

    setMeta('meta[property="og:title"]', "content", meta.title);
    setMeta('meta[property="og:description"]', "content", meta.description);
    setMeta('meta[property="og:url"]', "content", url);

    setMeta('meta[name="twitter:title"]', "content", meta.title);
    setMeta('meta[name="twitter:description"]', "content", meta.description);
  }, [meta.title, meta.description, meta.path]);
}
