CREATE TABLE "contact_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"neighborhood" text,
	"client_type" text,
	"summary" text,
	"situation" text,
	"bags_count" text,
	"urgency" text,
	"pickup_time_1" text,
	"pickup_time_2" text,
	"pickup_method" text,
	"pickup_release" boolean DEFAULT false,
	"courier_notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "handshake_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"handshake_id" integer NOT NULL,
	"step" text NOT NULL,
	"action" text NOT NULL,
	"detail" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "handshake_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"handshake_id" integer NOT NULL,
	"description" text NOT NULL,
	"platform" text,
	"tier" text DEFAULT 'standard' NOT NULL,
	"disposition" text DEFAULT 'list' NOT NULL,
	"start_price_cents" integer,
	"est_sale_cents" integer,
	"est_turn_days" integer,
	"client_pulled" boolean DEFAULT false NOT NULL,
	"sold_gross_cents" integer,
	"fees_cents" integer,
	"shipping_cents" integer,
	"net_client_cents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "handshakes" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"contact_submission_id" integer,
	"client_name" text NOT NULL,
	"client_email" text NOT NULL,
	"client_phone" text,
	"neighborhood" text,
	"summary" text,
	"situation" text,
	"bags_count" text,
	"estimated_items" text,
	"urgency" text,
	"pickup_method" text,
	"pickup_time_1" text,
	"pickup_time_2" text,
	"pickup_release" boolean DEFAULT false,
	"courier_notes" text,
	"agreement_accepted" boolean DEFAULT false NOT NULL,
	"agreement_timestamp" timestamp with time zone,
	"signature_name" text,
	"blocked" boolean DEFAULT false NOT NULL,
	"step" text DEFAULT 'intake' NOT NULL,
	"day_before_at" timestamp with time zone,
	"custody_at" timestamp with time zone,
	"inventory_at" timestamp with time zone,
	"evaluation_at" timestamp with time zone,
	"report_sent_at" timestamp with time zone,
	"consent_decision_at" timestamp with time zone,
	"review_at" timestamp with time zone,
	"consent_decision" text,
	"payout_date" timestamp with time zone,
	"payout_paid_at" timestamp with time zone,
	"payout_client_total_cents" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "handshakes_token_unique" UNIQUE("token")
);
--> statement-breakpoint
ALTER TABLE "handshake_events" ADD CONSTRAINT "handshake_events_handshake_id_handshakes_id_fk" FOREIGN KEY ("handshake_id") REFERENCES "public"."handshakes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "handshake_items" ADD CONSTRAINT "handshake_items_handshake_id_handshakes_id_fk" FOREIGN KEY ("handshake_id") REFERENCES "public"."handshakes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "handshakes" ADD CONSTRAINT "handshakes_contact_submission_id_contact_submissions_id_fk" FOREIGN KEY ("contact_submission_id") REFERENCES "public"."contact_submissions"("id") ON DELETE no action ON UPDATE no action;