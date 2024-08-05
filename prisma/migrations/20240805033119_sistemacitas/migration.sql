/*
  Warnings:

  - You are about to alter the column `Rol` on the `usuario` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `usuario` MODIFY `Rol` VARCHAR(191) NOT NULL DEFAULT 'Nivel0';
