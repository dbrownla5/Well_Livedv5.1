# The Well Lived Citizen — Operating Directive

**For:** Dayna Brown
**From:** Claude (your build + marketing systems seat)
**Date:** 2026-05-31

You handed this to me and said: come back with a whole site, make sure it
sounds like me, make sure the tools I already pay for actually get used, and
tell me who does what. This is that document. Read the **Do This Week** section
first if you read nothing else.

---

## The one-line version

You don't have a content problem or a tool problem. You have a *too-many-open-loops*
problem. The fix isn't another app — it's giving each tool **one job** and a clear
handoff between them, so nothing waits on you to be the glue.

---

## Who does what (your tool stack, with real jobs)

You already named the shape of this. Here it is locked in, so there's no
guessing later.

| Tool | Its one job | What it should NEVER be used for |
|------|-------------|-------------------------------|
| **Claude (me)** | Build & maintain the site, the systems behind it, and the brand voice. Marketing strategy, launch copy, the content engine, anything that has to *sound like you at scale*. | Posting to socials. Managing your accounts/passwords. Live photo retouching. |
| **Manus** | Your personal assistant. Runs socials (scheduling/posting), manages account info, does the realistic photo editing. The hands-on operator. | Inventing brand voice from scratch — it works *from* the voice I maintain, not instead of it. |
| **Gemini Studio** | The resale engine. Drafting listing titles/descriptions, category matching, pricing research, bulk item write-ups for Poshmark/eBay/etc. | Client-facing website copy — that stays in the voice system, not a generic LLM. |
| **Unfold** | Your bio/link site — the personal front door (the "chaos wrangler / fanciest pajamas faster" page). | Being the business site. The business lives at The Well Lived Citizen site I maintain. |

**The handoff that makes it work:**
`Claude` defines the voice → `Gemini` writes listings in it → `Manus` edits the
photos and posts → the **Well Lived Citizen site** is where it all points back to.
One direction. No loops back to you except the decisions only you can make
(pricing, which client, go/no-go).

---

## The content engine — what you actually asked for

You said: *"I want to be able to say 'post this' and dump photos and get them
edited. I'm so tired of doing this work."*

Here's the honest version, because you've been promised magic before and gotten
nothing. I'm not going to do that.

### What's real today (use it tonight)
The single most valuable asset in this whole project is **your voice profile** —
it's already written down, in detail, in
`artifacts/api-server/src/voice-profile.ts`. That's the moat. Most people can't
describe their voice; yours is documented to the rhythm and the anti-patterns.

That means you can generate on-brand captions **right now**, in any AI tool, by
pasting the prompt template in `docs/CONTENT-ENGINE.md`. You give it a photo
description or a rough thought; it gives you three captions that sound like you.
No app required. That's value today, not a someday-promise.

### What "post this + dump photos" really takes (the honest build path)
A true one-button "say it, post it, photos edited" app is **three separate hard
things**, and pretending it's one button is how you got burned before:

1. **Caption generation** — *Easy. Mostly done.* Your voice profile + an AI call.
   This is the first thing I'd wire into a real tool.
2. **Photo editing** — *Medium, and it shouldn't be AI-plastic.* Your own rule
   in the status notes is right: real, lived-in photos, not fake AI gloss. This
   belongs in **Manus** (a human-in-the-loop edit), not an auto-filter. Trying to
   fully automate this is how the brand starts looking like everyone else's.
3. **Auto-posting to Instagram** — *Hard, and gated by Meta, not by us.* Posting
   to Instagram programmatically requires a Business account, a Meta developer
   app, and Meta's review. That's weeks of *their* process, not coding. **Manus
   handles posting** so you are not blocked on Meta's bureaucracy to launch.

**So the realistic engine is:** Claude generates the caption in your voice →
Gemini handles resale listing text → Manus edits the photo and posts it. You say
"post this," and the "this" is already written for you. That's the version that
actually ships and actually saves you the work — not a fantasy single button.

### Now built: the Caption Studio (`/caption-studio`)
The realistic first brick of the engine is **done and shipped in this branch**.
It's a private page on your own site (off the public nav — clients won't see it):
you type a rough idea or a photo's situation, pick a service and vibe, and it
returns three on-voice captions (dry / warm / straight) with hashtags, copy-button
included. It runs on the voice profile + the Replit AI integration you already pay
for. To switch it on, connect AI Integrations on the Repl (see `docs/GO-LIVE.md`
Part 3). Until then the page loads with a clear message instead of breaking.

---

## The site — where it stands

It's not weak and it's not unfinished. It's a real, multi-page site that builds
clean. What it's been waiting on is *you hitting publish*, not more building.

- **Live pages:** Home, About, Services, Pricing, FAQ, Contact, plus deep pages
  for all four pillars (Home Reset & Move Support, Legacy Planning & Inventory,
  House Calls, Curated Resale) and the Reset / House Call / Fast Bag Fill entry
  points.
- **Voice:** Locked and documented. I added your real bio register to the About
  page today (the "unofficial bio" — chaos wrangler, fanciest pajamas faster) so
  it sounds like you, not a luxury template.
- **Intake/booking:** Signed-agreement flow → bag pickup → consent, wired
  through the Handshake system.
- **Build health:** Typecheck green, both builds green. Verified this session.

### The only thing standing between you and "live"
To turn on bookings end-to-end you need to provision the database and set a few
secrets on Replit. Steps are in `docs/HANDSHAKE.md`. That's a 20-minute
operational task, not a build task — and it's the last real gap.

---

## Do This Week (in order, low effort to high)

1. **Publish the site.** It's ready. Follow `docs/GO-LIVE.md` — the plain-English,
   in-order checklist (publish → bookings → caption studio).
2. **Launch quietly.** Post copy is already written in `docs/LAUNCH-KIT.md`.
   **One** real, lived-in photo per post — not a Canva carousel. The restraint
   *is* the brand. Manus schedules it.
3. **Point Unfold at the site.** Your bio page links to The Well Lived Citizen.
   One front door, one destination.
4. **Generate captions from `docs/CONTENT-ENGINE.md`** for the week's posts.
   Hand them to Manus with the photos.
5. **Tell me what to build next** — Caption Studio, or finish the booking flow,
   or triage the other apps. One thing at a time.

---

## What I am NOT going to do (so you can trust the rest)

- I won't tell you a half-built feature is finished.
- I won't auto-generate plastic AI photos and call it your brand.
- I won't route client PII through anything until the URL is stable and the
  webhook secret is enforced (see `docs/PARTNER-BRIEF.md`).
- I won't add ten new apps. You have enough open loops. We close them.

You've spent months building. The building is mostly done. The next move is
small, operational, and yours: publish, post once, and let it be real.
</content>
</invoke>
