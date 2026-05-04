CREATE TABLE `practice_log` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`movement_id` text NOT NULL,
	`created_at` integer DEFAULT (cast(unixepoch('subsecond') * 1000 as integer)) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `practice_log_userId_idx` ON `practice_log` (`user_id`);--> statement-breakpoint
CREATE INDEX `practice_log_movementId_idx` ON `practice_log` (`movement_id`);