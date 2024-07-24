const { PrismaClient } = require("@prisma/client")
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class Solicitante {

  constructor() {

  };

  async Agregar(solicitante) {
    let resultado;
    try {
      resultado = await prisma.solicitante.create({
        data: {
            Nombre_Solicitante: solicitante.Nombre_Solicitante,
            Email: solicitante.Email,
            Contrasenna: solicitante.Contrasenna
        }
      });
      await historialSistema.registrarHistorial('Solicitante', 'Se agregó un solicitante', resultado.IdSolicitante);
    } catch (error) {
      console.error(`No se pudo insertar el solicitante debido al error: ${error}`);
    }
    return resultado;
  }
  

  async Actualizar(IdSolicitante, datosActualizados) {
    let resultado;
    try {
      resultado = await prisma.solicitante.update({
        where: { IdSolicitante: parseInt(IdSolicitante) },
        data: {
          Nombre_Solicitante: datosActualizados.Nombre_Solicitante,
          Email: datosActualizados.Email,
          Contrasenna: datosActualizados.Contrasenna
      },
      });
      await historialSistema.registrarHistorial('Solicitante', 'Se actualizó un solicitante', IdSolicitante);
    } catch (error) {
      console.error(`No se pudo actualizar el solicitante ${IdSolicitante} debido al error: ${error}`);
    }
    return resultado;
  }
  

  async Borrar(IdSolicitante) {
    let resultado;
    try {
      resultado = await prisma.solicitante.delete({
        where: {
          IdSolicitante: parseInt(IdSolicitante),
        },
      });
      await historialSistema.registrarHistorial('Solicitante', 'Se borró un solicitante', IdSolicitante);
    } catch (error) {
      console.error(`No se pudo borrar el solicitante ${IdSolicitante} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(IdSolicitante) {
    let Solicitantes;
    if (IdSolicitante === undefined) {
      Solicitantes = prisma.solicitante.findMany();
    } else {
      Solicitantes = prisma.solicitante.findMany({
        where: {
            IdSolicitante: parseInt(IdSolicitante),
        },
      });
    }
    return Solicitantes;
  };
}

module.exports = Solicitante;