/*
  Warnings:

  - Added the required column `Apellido_Solicitante` to the `Solicitante` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `solicitante` ADD COLUMN `Apellido_Solicitante` VARCHAR(191) NOT NULL;
