# The Well Lived Citizen — website

Vite + React + TypeScript site, deployed on Netlify.

## Quick start

```bash
npm install --legacy-peer-deps
npm run dev          # local dev at http://localhost:5173
npm run build        # production build → dist/
npm run preview      # preview production build locally
```

## Deploying to Netlify

1. Push this repo to GitHub.
2. In Netlify: New site → Import from GitHub → select this repo.
3. Netlify will auto-detect settings from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Functions directory: `netlify/functions`
4. Add environment variables (Site settings → Environment variables):
   - `RESEND_API_KEY` — get from https://resend.com (free tier covers this)
   - `CONTACT_TO` — `dayna@thewelllivedcitizen.com`
   - `CONTACT_FROM` — `WLC Contact Form <noreply@thewelllivedcitizen.com>` (once domain is verified at Resend)
5. Connect the custom domain `thewelllivedcitizen.com` in Netlify Domain settings.

## Contact form

The contact form POSTs to `/api/contact`, which routes to `netlify/functions/contact.ts`.
That function uses Resend to email the submission to Dayna.

To swap email providers (e.g. SendGrid, Mailgun, Postmark), edit `netlify/functions/contact.ts`.

## SEO

- `index.html` has site-wide meta + LocalBusiness JSON-LD schema
- Every page uses `usePageMeta()` (src/lib/usePageMeta.ts) to set page-specific meta tags
- `public/sitemap.xml` and `public/robots.txt` are present
- After deploy: verify ownership at https://search.google.com/search-console
  - Paste the verification code into `index.html` where it says `REPLACE_WITH_GSC_VERIFICATION_CODE`

## Project structure

```
.
├── index.html                  # Entry HTML with full SEO meta + JSON-LD
├── netlify/functions/          # Serverless functions (contact form)
├── netlify.toml                # Netlify build + redirect config
├── package.json
├── public/                     # Static assets (favicon, opengraph, sitemap)
├── src/
│   ├── components/             # Shared UI (Nav, Footer, FAQItem, etc.)
│   ├── lib/                    # Hooks + utilities (usePageMeta, etc.)
│   ├── pages/                  # All 14 routed pages
│   ├── App.tsx                 # Wouter route table
│   └── main.tsx                # React mount + global styles
├── tsconfig.json
└── vite.config.ts
```
