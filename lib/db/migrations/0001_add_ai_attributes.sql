-- Migration: Add AI attribute columns to reseller_items
-- Applied via drizzle-kit push on 2026-05-05

ALTER TABLE reseller_items
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS color TEXT,
  ADD COLUMN IF NOT EXISTS condition TEXT,
  ADD COLUMN IF NOT EXISTS condition_notes TEXT,
  ADD COLUMN IF NOT EXISTS style TEXT,
  ADD COLUMN IF NOT EXISTS fabric TEXT,
  ADD COLUMN IF NOT EXISTS angle_labels JSONB,
  ADD COLUMN IF NOT EXISTS price_range_low NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS price_range_high NUMERIC(10,2),
  ADD COLUMN IF NOT EXISTS estimated_days_to_sell INTEGER,
  ADD COLUMN IF NOT EXISTS market_sources JSONB,
  ADD COLUMN IF NOT EXISTS recommended_platform TEXT,
  ADD COLUMN IF NOT EXISTS platform_rationale TEXT,
  ADD COLUMN IF NOT EXISTS listing_copy JSONB;
