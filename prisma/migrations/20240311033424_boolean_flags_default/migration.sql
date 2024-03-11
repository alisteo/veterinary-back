-- AlterTable
ALTER TABLE `User` MODIFY `es_admin` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `es_tutor` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `es_veterinario` BOOLEAN NOT NULL DEFAULT false;
