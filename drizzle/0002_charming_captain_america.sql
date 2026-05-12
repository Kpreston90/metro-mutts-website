CREATE TABLE `seasonal_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`message` text NOT NULL,
	`highlight` varchar(255),
	`bookable` enum('true','false') NOT NULL DEFAULT 'false',
	`isActive` enum('true','false') NOT NULL DEFAULT 'true',
	`startsAt` timestamp,
	`endsAt` timestamp,
	`priority` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `seasonal_messages_id` PRIMARY KEY(`id`)
);
