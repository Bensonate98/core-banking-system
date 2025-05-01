-- CreateTable
CREATE TABLE `Account` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountNumber` VARCHAR(191) NOT NULL,
    `balance` DECIMAL(18, 2) NOT NULL DEFAULT 0.00,
    `type` ENUM('Tier 1', 'Tier 2') NOT NULL DEFAULT 'Tier 1',
    `status` ENUM('ACTIVE', 'CLOSED') NOT NULL DEFAULT 'ACTIVE',
    `closedAt` DATETIME(3) NULL,
    `customerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_accountNumber_key`(`accountNumber`),
    INDEX `Account_accountNumber_customerId_idx`(`accountNumber`, `customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Customer_id_idx` ON `Customer`(`id`);

-- CreateIndex
CREATE INDEX `Token_refreshToken_idx` ON `Token`(`refreshToken`);

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
