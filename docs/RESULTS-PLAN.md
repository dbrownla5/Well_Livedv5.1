# Results Plan — Stop Building, Start Selling

**For:** Dayna Brown
**Date:** 2026-05-30
**Premise:** You don't have a building problem. You have a **finishing and
focus** problem. 15 half-developed resale apps is not 15 assets — it's one
unfinished thing fifteen times. The path to results is subtraction, then
finishing one lane end-to-end.

---

## The honest diagnosis

- **You're paying into tools and getting fragments.** Each tool (Replit, Manus,
  Google) builds its slice and hands you an integration problem. Nobody owns the
  whole outcome, so you do — and that's not your job.
- **Your brand voice slipped.** Past builds were clearer; recent passes diluted
  the delivery of your services. That's fixable and it's high-value — your voice
  *is* the product (per `replit.md`).
- **You have no media/content support** while trying to edit photos and sell.
  That's the actual daily bottleneck, and it's not a coding task.

You don't need more apps. You need: **one finished sales lane, your voice locked
back in, and a content workflow you can run in minutes.**

---

## Priority order (do these, in this order)

### P1 — Finish ONE resale lane end-to-end (this repo)
The Handshake system built tonight is the closest thing to done. Finish it to a
real first sale instead of starting anything new:
1. Provision Postgres on Replit (`pnpm --filter @workspace/db run push`).
2. Set secrets (`DATABASE_URL`, `RESEND_API_KEY`, `PUBLIC_SITE_URL`).
3. Run one real client through all 9 steps and confirm the payout + emails.
*Outcome: a working intake → custody → sale → payout you can actually use.*

### P2 — Pick the survivors of the 15 apps; kill the rest
For each of the 15, answer two questions: *Does it have a paying user or a clear
path to one within 30 days? Is it >70% done?* Keep only the apps that are "yes"
to both (likely 1–3). Archive the rest. **Every app you keep alive costs money
and attention; killing them is a revenue decision, not a loss.**
*I can help you score all 15 against this rubric if you list them.*

### P3 — Re-lock your brand voice (high value, low effort)
There is already a voice tool in this repo (`/api/voice/analyze`, profile in
`artifacts/api-server/src/voice-profile.ts`). It's built but not used. We can:
- Run your current site copy + listings through it to flag where the voice
  slipped, and fix the worst offenders first.
- Tighten the voice profile to match your *desired* delivery, so every future
  draft is measured against it.
*Outcome: consistent, on-brand copy without you editing every word by hand.*

### P4 — A content/media workflow you can run fast
This is your daily bottleneck. You don't need a tool you don't have — you need a
repeatable process:
- A listing template (photo checklist + on-brand description skeleton driven by
  the voice tool) so each item takes minutes, not an hour.
- A short list of the actual photo edits that move resale items (clean
  background, true color, scale reference) — done in a free editor, not a
  subscription.
*I can draft this workflow as a checklist you keep next to you while you list.*

---

## What I need from you to move

Pick the **one** that would change your week the most, and we start there:
- **A —** Get the Handshake lane to a real first sale (P1).
- **B —** Triage the 15 apps so you stop bleeding money (P2).
- **C —** Re-lock the brand voice across the site + listings (P3).
- **D —** Build the listing/photo content workflow (P4).

You can only have one "first." Everything else stays on this list and waits.
That constraint *is* the strategy — it's how you get a result instead of more
half-built things.

---

## What "valuable skill" should look like from your tools

You said Replit needs to deliver real skill, not poor return. Fair. Going
forward, a contribution only counts if it:
1. Runs on the stack you already pay for (no new thing to host).
2. Passes the Verified Checks (it builds and works, proven by running it).
3. Moves one of P1–P4 forward — not a sideways new app.

That's the bar. This repo now meets it; new work has to clear it too.
