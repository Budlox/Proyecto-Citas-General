const { PrismaClient } = require("@prisma/client");
const HistorialSistema = require('./historialsistema');
const ServicioEspecifico = require('./servicioespecifico'); // Importa la clase ServicioEspecifico

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();
const servicioEspecifico = new ServicioEspecifico(); // Instancia de ServicioEspecifico

class ServicioGeneral {
  constructor() {}

  async Agregar(servicioGeneral) {
    let resultado;
    try {
      resultado = await prisma.serviciosGeneral.create({
        data: {
          NombreServicio: servicioGeneral.NombreServicio
        }
      });
      await historialSistema.registrarHistorial('Servicio General', 'Se agregó un servicio general', resultado.IdServicio);
    } catch (error) {
      console.error(`No se pudo insertar el servicio general ${servicioGeneral} debido al error: ${error}`);
    }
    return resultado;
  }

  // Actualizar servicio general
async Actualizar(IdServicio, datosActualizados) {
  let resultado;
  try {
    if (!datosActualizados.NombreServicio) {
      throw new TypeError("NombreServicio no puede estar vacío");
    }

    resultado = await prisma.serviciosGeneral.update({
      where: {
        IdServicio: IdServicio
      },
      data: datosActualizados
    });
  } catch (error) {
    console.error("Error al actualizar servicio general:", error);
    throw error;
  }
  return resultado;
}


  async Borrar(IdServicio) {
    let resultado;
    try {
      // Elimina los servicios específicos relacionados antes de eliminar el servicio general
      await servicioEspecifico.BorrarPorIdServicio(IdServicio);

      resultado = await prisma.serviciosGeneral.delete({
        where: {
          IdServicio: parseInt(IdServicio),
        },
      });
      await historialSistema.registrarHistorial('Servicio General', 'Se borró un servicio general', IdServicio);
    } catch (error) {
      console.error(`No se pudo borrar el servicio general ${IdServicio} debido al error: ${error}`);
    }
    return resultado;
  }

  Listar(IdServicio) {
    let ServiciosGenerales;
    if (IdServicio === undefined) {
      ServiciosGenerales = prisma.serviciosGeneral.findMany();
    } else {
      ServiciosGenerales = prisma.serviciosGeneral.findMany({
        where: {
          IdServicio: parseInt(IdServicio),
        },
      });
    }
    return ServiciosGenerales;
  }
}

module.exports = ServicioGeneral;
