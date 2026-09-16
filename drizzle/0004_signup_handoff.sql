CREATE TABLE `gingr_registrations` (
	`inquiryId` varchar(36) NOT NULL,
	`ownerId` varchar(100) NOT NULL,
	`registeredAt` timestamp NOT NULL,
	`verifiedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `gingr_registrations_inquiryId` PRIMARY KEY(`inquiryId`),
	CONSTRAINT `gingr_registrations_ownerId_unique` UNIQUE(`ownerId`)
);
--> statement-breakpoint
ALTER TABLE `website_inquiries` ADD `kind` enum('contact','signup_handoff') DEFAULT 'contact' NOT NULL;--> statement-breakpoint
ALTER TABLE `gingr_registrations` ADD CONSTRAINT `gingr_registrations_inquiryId_website_inquiries_id_fk` FOREIGN KEY (`inquiryId`) REFERENCES `website_inquiries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `gingr_registrations` ADD CONSTRAINT `gingr_registrations_verifiedBy_users_id_fk` FOREIGN KEY (`verifiedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;