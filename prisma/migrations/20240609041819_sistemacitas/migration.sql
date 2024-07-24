-- CreateTable
CREATE TABLE `ServiciosGeneral` (
    `IdServicio` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreServicio` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`IdServicio`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiciosEspecificos` (
    `IdServicioEspecifico` INTEGER NOT NULL AUTO_INCREMENT,
    `IdServicio` INTEGER NOT NULL,
    `NombreServicioEspecifico` VARCHAR(191) NOT NULL,
    `CostoServicioEspecifico` INTEGER NOT NULL,

    PRIMARY KEY (`IdServicioEspecifico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cita` (
    `IdCita` INTEGER NOT NULL AUTO_INCREMENT,
    `FechaCita` DATETIME(3) NOT NULL,
    `Nombre_Cliente` VARCHAR(191) NOT NULL,
    `Apellido_Cliente` VARCHAR(191) NOT NULL,
    `Correo_Cliente` VARCHAR(191) NOT NULL,
    `IdServicioEspecifico` INTEGER NOT NULL,
    `IdSolicitante` INTEGER NOT NULL,

    PRIMARY KEY (`IdCita`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `IdUsuario` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreUsuario` VARCHAR(191) NOT NULL,
    `Contrasenna` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `FechaRegistro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Usuario_NombreUsuario_key`(`NombreUsuario`),
    UNIQUE INDEX `Usuario_Email_key`(`Email`),
    PRIMARY KEY (`IdUsuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HistorialSistema` (
    `IdHistorial` INTEGER NOT NULL AUTO_INCREMENT,
    `NombreModelo` VARCHAR(191) NOT NULL,
    `DescripcionAccion` VARCHAR(191) NOT NULL,
    `FechaAccion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `IdUsuario` INTEGER NOT NULL,

    PRIMARY KEY (`IdHistorial`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Solicitante` (
    `IdSolicitante` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre_Solicitante` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,
    `Contrasenna` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Solicitante_Email_key`(`Email`),
    PRIMARY KEY (`IdSolicitante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ServiciosEspecificos` ADD CONSTRAINT `ServiciosEspecificos_IdServicio_fkey` FOREIGN KEY (`IdServicio`) REFERENCES `ServiciosGeneral`(`IdServicio`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_IdServicioEspecifico_fkey` FOREIGN KEY (`IdServicioEspecifico`) REFERENCES `ServiciosEspecificos`(`IdServicioEspecifico`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_IdSolicitante_fkey` FOREIGN KEY (`IdSolicitante`) REFERENCES `Solicitante`(`IdSolicitante`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HistorialSistema` ADD CONSTRAINT `HistorialSistema_IdUsuario_fkey` FOREIGN KEY (`IdUsuario`) REFERENCES `Usuario`(`IdUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;
