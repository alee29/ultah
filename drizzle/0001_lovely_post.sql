CREATE TABLE `secret_messages` (
	`id` text PRIMARY KEY DEFAULT '1' NOT NULL,
	`passcode` text NOT NULL,
	`letter_content` text NOT NULL,
	`show_notification` integer DEFAULT true NOT NULL
);
