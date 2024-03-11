-- DropForeignKey
ALTER TABLE `Mascota` DROP FOREIGN KEY `Mascota_responsableId_fkey`;

-- DropForeignKey
ALTER TABLE `Mascota` DROP FOREIGN KEY `Mascota_tutorId_fkey`;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_tutorId_fkey` FOREIGN KEY (`tutorId`) REFERENCES `Tutor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mascota` ADD CONSTRAINT `Mascota_responsableId_fkey` FOREIGN KEY (`responsableId`) REFERENCES `Responsable`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
