# The Well Lived Citizen — Internal Living Dashboard Spec

## Product Intent

The internal dashboard is a private operating layer for Dayna. It is not a developer console and not a public website. Its job is to capture authoritative business facts, translate Dayna’s voice-text and brain dumps into clean structured records, maintain a current brand and business source of truth, and prepare reliable handoffs for separate execution agents.

## Trust Boundary

| Rule | Implementation Consequence |
|---|---|
| Clean-start reset is active. | No legacy company files, historical repositories, old dashboards, or prior agent assumptions are valid unless Dayna explicitly reintroduces them. |
| Dayna is the authority. | Direct user messages and explicitly approved uploads become the source of truth. |
| Voice-to-text errors are normal. | The system should favor contextual interpretation and only surface clarification requests when ambiguity would materially change meaning. |
| Dashboard serves humans and builders. | The interface must feel simple to Dayna while the underlying data stays structured enough for downstream development use. |

## Core Screens

| Screen | Purpose | Primary User Value |
|---|---|---|
| Today | Show open asks, pending inputs, active decisions, and recent updates. | Immediate calm and visibility. |
| Business Facts | Store current business name, contact data, domain, hours, services, social links, and payment links. | Single source of truth. |
| Voice and Brand | Capture tone rules, phrasing preferences, banned language, and approved positioning. | Consistency across sessions and agents. |
| Intake | Convert Dayna’s raw updates into structured entries with source attribution and timestamps. | Fast capture from voice-text and brain dumps. |
| Handoffs | Generate clean transfer packets for implementation agents or future sessions. | Continuity without drift. |
| Requests and Needs | Track what the system is waiting on from Dayna and what has already been resolved. | Clear checklist and reduced mental load. |

## Data Domains

| Domain | Required Fields | Notes |
|---|---|---|
| Business identity | businessName, ownerName, legalEntity, description, domain | Treat each field as independently editable and timestamped. |
| Contact | primaryPhone, primaryEmail, contactPreference, responseTime, bookingLink | Direct-use values should support downstream website wiring. |
| Social | instagramMain, instagramSecondary, facebook, otherActiveChannels | Keep inactive or retired channels separately marked, not mixed into active ones. |
| Payments | zelle, venmo, stripe, invoiceInstructions, paymentNotes | Values should distinguish handle, link, and usage notes. |
| Services | serviceName, serviceSummary, status, pricingMode, notes | Structured enough to inform both content and operations. |
| Brand voice | toneRules, approvedPhrases, bannedPhrases, audienceNotes, formattingRules | Must preserve Dayna’s working language. |
| Session inputs | rawInput, interpretedMeaning, confidence, sourceType, timestamp | Maintains traceability from brain dump to structured record. |
| Handoff packets | objective, approvedFacts, openQuestions, blockedItems, nextPrompt | Enables cross-agent continuity. |

## Input-to-Structure Workflow

| Step | System Behavior |
|---|---|
| Capture | Dayna provides a brain dump, correction, or new business fact. |
| Interpret | The system normalizes obvious transcription issues and extracts operational meaning. |
| Structure | The update is written into the correct domain with timestamp and source note. |
| Confirm by behavior | If ambiguity is low, the dashboard updates directly. If ambiguity is material, the system asks a focused follow-up question. |
| Publish internally | Updated facts become available to downstream prompts, handoffs, and implementation work. |

## Checklist Logic

The dashboard should maintain a visible checklist of open asks and dependencies. That list should separate what the system needs from Dayna, what is blocked by another agent or system, and what has already been translated into structured truth. The point is not project management theater. The point is reducing cognitive load and preventing repeated asks.

| Checklist Section | Meaning |
|---|---|
| Waiting on Dayna | Facts or decisions only Dayna can supply |
| In progress | Information currently being structured or implemented |
| Ready for handoff | Clean outputs available for another agent to use |
| Resolved | Items already incorporated into the dashboard |

## UX Direction

The interface should feel closer to an iOS operating companion than a back-office admin panel. It should read clearly, minimize clutter, and let Dayna move quickly between capture, review, and handoff. It should use plain language labels rather than technical system terms. The visible structure should help her think, not force her to think like a developer.

## Developer Layer

Under the surface, the dashboard should preserve stable schemas, timestamps, and attribution fields so implementation agents can consume the information safely. The interface may feel soft and human, but the data underneath should be rigid enough to support APIs, prompts, content generation, and execution workflows without ambiguity.

## Immediate Open Questions

| Question | Why It Matters |
|---|---|
| What are the current authoritative business facts for contact, domain, services, socials, and payments? | These populate the initial source of truth. |
| What should the first live version prioritize: intake, facts, handoffs, or all four major screens? | This determines the minimum viable dashboard. |
| Should the dashboard support direct prompt generation for other agents from day one? | This affects the handoff workflow design. |
| Does Dayna want the dashboard optimized first for desktop, mobile, or both equally? | This sets layout priorities. |
