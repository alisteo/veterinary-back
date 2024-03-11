/*
  Warnings:

  - Added the required column `es_admin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `es_tutor` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `es_veterinario` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `es_admin` BOOLEAN NOT NULL,
    ADD COLUMN `es_tutor` BOOLEAN NOT NULL,
    ADD COLUMN `es_veterinario` BOOLEAN NOT NULL;
