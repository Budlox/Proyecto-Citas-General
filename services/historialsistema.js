const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class HistorialSistema {
  constructor() {}

  async registrarHistorial(nombreModelo, descripcionAccion, idModelo) {
    try {
      await prisma.historialSistema.create({
        data: {
          NombreModelo: nombreModelo,
          DescripcionAccion: `${descripcionAccion} - ID: ${idModelo}`,
          IdUsuario: 1,
        },
      });
    } catch (error) {
      console.error(
        `No se pudo registrar la acción en el historial debido al error: ${error}`
      );
    }
  }
}

module.exports = HistorialSistema;
