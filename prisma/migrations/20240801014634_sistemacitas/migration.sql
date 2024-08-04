-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `Rol` ENUM('Nivel0', 'Nivel1', 'Nivel2') NOT NULL DEFAULT 'Nivel0',
    ADD COLUMN `Token` VARCHAR(300) NOT NULL DEFAULT '-';
