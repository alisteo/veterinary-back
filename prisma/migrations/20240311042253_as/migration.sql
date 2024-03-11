/*
  Warnings:

  - You are about to drop the column `nombre` on the `Mascota` table. All the data in the column will be lost.
  - Added the required column `nombre_mascota` to the `Mascota` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Mascota` DROP COLUMN `nombre`,
    ADD COLUMN `nombre_mascota` VARCHAR(191) NOT NULL;
