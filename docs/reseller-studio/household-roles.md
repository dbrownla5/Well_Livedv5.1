# Household-Management Roles — Reference

Source: `attached_assets/Pasted_content_10_1777845862885.txt` (research on multi-client household-management business models).

This is a reference for the people and business structures who already manage households for multiple clients without being full-time personal assistants. The reseller dashboard's eventual end users sit somewhere inside this taxonomy.

---

## 1. Fractional and multi-client management

**Fractional Estate Managers.** High-level management expertise delivered to several clients on a part-time or project-specific basis. Closer to a consultant than a staff member. Used for seasonal or complex needs (renovations, prepping properties for arrival).

**Personal Concierge Services.** Manage multiple clients simultaneously on an hourly or as-needed basis. Range from luxury travel booking to coordinating one-off personal experiences. Distinct from a personal assistant, who serves a single principal.

**Home Concierge Companies.** Property-focused support for multiple homeowners — landscaping, pool care, security monitoring, vendor management for repairs and deliveries.

## 2. Strategic vs. operational roles

**Household Manager.** The "COO of the home." Day-to-day operations and logistics. May serve a single large estate or a family with multiple properties.

**Estate Manager.** Strategic, large-property focus. Budget management, event coordination, supervising other staff (housekeepers, private chefs).

**Lifestyle Manager.** Hybrid role. Coordinates complex schedules, household logistics, and high-touch service across multiple residences. Common with HNW clients who travel frequently and need a dynamic global coordinator.

## 3. Specialized service providers

**Personal Chef.** Serves multiple clients (vs. a private chef who serves one household). Often weekly meal-prep visits stocking fridges with ready-to-eat meals tailored to dietary needs.

**Executive Housekeeper.** Beyond cleaning — supervises outside vendors, manages household inventory, sets cleaning schedules.

**Virtual Lifestyle Manager.** Remote, fractional. Books transportation, sources babysitters, etc. Independent contractors handling multiple clients.

---

## 4. Mapping each role to the reseller workflow

Where each role plausibly intersects the reseller dashboard:

| Role | Intersection with reseller workflow | Likely dashboard usage |
| --- | --- | --- |
| Fractional Estate Manager | Coordinates property prep + downsizing; controls what leaves the property. | Creates an estate clear-out "job," uploads photo batches, reviews AI-suggested platforms before listing. |
| Personal Concierge | Asked to handle ad-hoc resale ("can you sell this for me?"). | Drops in 1–10 items per request, uses the dashboard as a quick triage + listing generator. |
| Home Concierge Company | Handles vendor/logistics across many homes; resale is incidental. | Hands-off; mostly receives notifications about pickups/shipments handled by the resale operator. |
| Household Manager | Day-to-day owner of household inventory; first to notice items to cycle out. | Uses the master inventory + duplicate detection to track what has and hasn't been listed. |
| Estate Manager | Strategic owner of large/multi-property inventory and disposition decisions. | Authorizes higher-value items (Chairish/luxury) and reviews price floors before listings go live. |
| Lifestyle Manager | Coordinates across residences; resale is one of many concierge tasks. | Creates client/household records and assigns batches per residence. |
| Personal Chef | Generally not in the resale loop. | None expected. |
| Executive Housekeeper | Manages household inventory; flags items for disposition. | Photo-uploader role — capture items, hand off to a manager for routing. |
| Virtual Lifestyle Manager | Remote-only; can run the dashboard end-to-end. | Likely the heaviest direct user — uploads, listing copy, cross-platform routing. |

## 5. Implications for the dashboard build

- The end user is **not** a one-household personal assistant. The dashboard must support **multiple clients / households per operator**.
- Roles split between **upload / capture** (housekeeper, concierge) and **decision / authorization** (estate manager, household manager). The future build should anticipate multi-user permissions on a single client/household record.
- Estate clear-out is the highest-volume use case and should be the primary "job" entity in the dashboard.
- Virtual lifestyle managers are the most likely heavy users — meaning the dashboard needs to be fully usable remotely without ever physically handling the items themselves, relying on photos + descriptions submitted by on-site staff.
