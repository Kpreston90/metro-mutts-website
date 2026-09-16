CREATE TABLE `booking_outcomes` (
	`invoiceId` varchar(100) NOT NULL,
	`inquiryId` varchar(36) NOT NULL,
	`ownerId` varchar(100) NOT NULL,
	`paidAt` timestamp NOT NULL,
	`valueCents` int NOT NULL,
	`verifiedBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `booking_outcomes_invoiceId` PRIMARY KEY(`invoiceId`)
);
--> statement-breakpoint
CREATE TABLE `website_inquiries` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`service` varchar(30) NOT NULL,
	`message` text NOT NULL,
	`attribution` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `website_inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `booking_outcomes` ADD CONSTRAINT `booking_outcomes_inquiryId_website_inquiries_id_fk` FOREIGN KEY (`inquiryId`) REFERENCES `website_inquiries`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `booking_outcomes` ADD CONSTRAINT `booking_outcomes_verifiedBy_users_id_fk` FOREIGN KEY (`verifiedBy`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;