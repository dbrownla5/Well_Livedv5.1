# Internal Dashboard Build Order

## Build Principle

The first live version should reduce Dayna’s cognitive load immediately. That means the earliest release should prioritize capture, visibility, and continuity before automation flourishes.

## Phase 1 MVP

| Module | Why It Comes First | Required Capability |
|---|---|---|
| Today | Gives Dayna a clean landing surface with open asks, recent updates, and what is waiting on her | Read aggregated dashboard state |
| Business Facts | Establishes the single source of truth for contact, services, socials, payments, and core business identity | Create and edit structured fields |
| Requests and Needs | Makes visible what the system still needs from Dayna and what has already been resolved | Checklist tracking |
| Intake | Lets Dayna drop raw updates into the system so they can be structured quickly | Fast note capture with interpretation fields |

## Phase 2 Operational Continuity

| Module | Why It Comes Second | Required Capability |
|---|---|---|
| Voice and Brand | Preserves wording, tone, and positioning consistency across sessions and agents | Editable brand rules |
| Handoffs | Packages approved facts and next actions for other agents or future sessions | Generate exportable handoff packet |
| Activity History | Creates auditability across changes and interpretations | Timestamped update log |

## Phase 3 Enhancements

| Module | Why It Comes Later | Required Capability |
|---|---|---|
| Prompt Builder | Useful once the source of truth is stable | Convert approved data into agent-ready prompts |
| Smart intake suggestions | Helpful, but only after enough examples exist | Pattern-based suggestions from prior structured entries |
| Cross-surface publishing | Useful after the internal model is stable | Controlled export into other tools or systems |

## Non-Negotiable UX Rule

The dashboard must always feel simpler than the underlying data model. If a feature helps developers but makes Dayna think harder, it belongs behind the scenes rather than in the primary interface.
