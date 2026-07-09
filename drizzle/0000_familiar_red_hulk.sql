CREATE TABLE `settings` (
	`id` text PRIMARY KEY DEFAULT '1' NOT NULL,
	`partner_name` text NOT NULL,
	`birth_date` text NOT NULL,
	`main_greeting` text NOT NULL,
	`music_url` text NOT NULL
);
