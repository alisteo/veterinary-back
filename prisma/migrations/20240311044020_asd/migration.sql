-- DropForeignKey
ALTER TABLE `Responsable` DROP FOREIGN KEY `Responsable_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Tutor` DROP FOREIGN KEY `Tutor_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Tutor` ADD CONSTRAINT `Tutor_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Responsable` ADD CONSTRAINT `Responsable_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
