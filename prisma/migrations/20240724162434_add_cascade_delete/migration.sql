-- DropForeignKey
ALTER TABLE `serviciosespecificos` DROP FOREIGN KEY `ServiciosEspecificos_IdServicio_fkey`;

-- AddForeignKey
ALTER TABLE `ServiciosEspecificos` ADD CONSTRAINT `ServiciosEspecificos_IdServicio_fkey` FOREIGN KEY (`IdServicio`) REFERENCES `ServiciosGeneral`(`IdServicio`) ON DELETE CASCADE ON UPDATE CASCADE;
