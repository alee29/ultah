CREATE TABLE `couple_data` (
	`id` text PRIMARY KEY DEFAULT '1' NOT NULL,
	`partner_name` text NOT NULL,
	`birth_date` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `greeting_text` (
	`id` text PRIMARY KEY DEFAULT '1' NOT NULL,
	`content` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `media` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`url` text NOT NULL,
	`title` text,
	`sort_order` integer DEFAULT 0 NOT NULL
);
