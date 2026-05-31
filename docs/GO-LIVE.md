# Go Live — The Plain-English Checklist

This is the calm version. No jargon, in order, with what each step is *for*.
The deep technical reference is `docs/HANDSHAKE.md` — you don't need it unless
something breaks.

There are three things that make the site fully live: **publish it**, **turn on
bookings**, and **turn on the Caption Studio**. You can do the first one alone
and be live today. The other two add the booking pipeline and your caption tool.

---

## Part 1 — Publish the site (this alone = you're live)

The site builds clean. To deploy it on Replit it needs two build settings so it
knows where it lives:

- `PORT` — the port Replit gives the app (Replit usually sets this for you).
- `BASE_PATH` — set to `/` (the site lives at the root of your domain).

Then hit **Deploy** in Replit. That's it — the public site is live: Home, About,
Services, Pricing, FAQ, Contact, and all four service pillars.

If you only do Part 1, everything *reads* perfectly. Contact-form leads are still
captured (saved to the database once Part 2 is done; until then they just need
the email key in Part 2 to notify you).

---

## Part 2 — Turn on bookings (the signed-intake pipeline)

This makes "Schedule a Pickup" open a real, tracked record and email you/clients.

In Replit, open **Secrets** (the lock icon) and add these:

| Secret | What to put | Why |
|--------|-------------|-----|
| `DATABASE_URL` | Provision a Postgres DB in Replit — it fills this in. | Where leads + handshakes are stored. |
| `RESEND_API_KEY` | Your Resend key. | Sends client + lead emails. |
| `CONTACT_FROM` | `The Well Lived Citizen <dayna@thewelllivedcitizen.com>` | The "from" on those emails. |
| `PUBLIC_SITE_URL` | `https://thewelllivedcitizen.com` | Builds the client consent links. |

Then, one time, create the database tables. In the Replit shell:

```
pnpm --filter @workspace/db run push
```

Deploy again. Bookings are live. Your private ops board is at
`/api/handshake/dashboard` — **keep it behind hosting auth; it's internal.**

> Don't set `WEBHOOK_URL` yet. That's for sending leads to an outside tool
> (Manus/CRM) and it needs a stable HTTPS URL + the `WEBHOOK_SECRET` first.
> See `docs/PARTNER-BRIEF.md`. Until then, the database is your record — nothing
> is lost.

---

## Part 3 — Turn on the Caption Studio (`/caption-studio`)

Your caption tool lives at `yoursite.com/caption-studio` (off the public nav —
clients won't see it). It writes captions in your voice using the AI integration.

It needs the Replit AI Integration connected so these exist (Replit
auto-provisions them when you enable AI Integrations on the Repl):

- `AI_INTEGRATIONS_OPENAI_BASE_URL`
- `AI_INTEGRATIONS_OPENAI_API_KEY`

Once those are present and you deploy, the Caption Studio works: type a photo
description or a thought, get three captions (dry / warm / straight), copy the
one you like, hand it to Manus with the photo.

If the integration isn't connected, the page still loads and shows a clear
message instead of breaking — so it's safe to ship even before you wire it.

---

## The 60-second smoke test (after deploying)

1. Open the site. Click through the nav — every page loads.
2. Submit the contact form with a test entry — you get the email (Part 2 done).
3. Go to `/caption-studio`, type "a closet full of good things to sell," hit
   Generate — three captions come back (Part 3 done).
4. Point your Unfold bio link at the live site.

That's the whole thing. Publish, post once from `docs/LAUNCH-KIT.md`, and let it
be real.
