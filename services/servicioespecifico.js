const { PrismaClient } = require("@prisma/client");
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class ServicioEspecifico {
  constructor() {}

  async Agregar(servicioEspecifico) {
    let resultado;
    if (!servicioEspecifico || !servicioEspecifico.NombreServicioEspecifico) {
      throw new Error('Missing NombreServicio in request body');
    }

    try {
      console.log('Adding service:', servicioEspecifico);
      resultado = await prisma.serviciosEspecificos.create({
        data: {
          IdServicio: parseInt(servicioEspecifico.IdServicio),
          NombreServicioEspecifico: servicioEspecifico.NombreServicioEspecifico,
          CostoServicioEspecifico: parseInt(servicioEspecifico.CostoServicioEspecifico)
        }
      });
      console.log('Service added:', resultado);
      await historialSistema.registrarHistorial('Servicio Específico', 'Se agregó un servicio específico', resultado.IdServicioEspecifico);
    } catch (error) {
      console.error(`No se pudo insertar el servicio específico debido al error: ${error}`);
    }
    return resultado;
  }

  async Actualizar(IdServicioEspecifico, datosActualizados) {
    let resultado;
    if (!datosActualizados) {
      throw new TypeError("No hay datos para actualizar");
    }

    try {
      const idServicioInt = parseInt(IdServicioEspecifico, 10);
      if (isNaN(idServicioInt)) {
        throw new TypeError("IdServicio debe ser un número válido");
      }

      resultado = await prisma.serviciosEspecificos.update({
        where: { IdServicioEspecifico: parseInt(IdServicioEspecifico) },
        data: {
          IdServicio: parseInt(datosActualizados.IdServicio),
          NombreServicioEspecifico: datosActualizados.NombreServicioEspecifico,
          CostoServicioEspecifico: parseInt(datosActualizados.CostoServicioEspecifico)
        },
      });
      await historialSistema.registrarHistorial('Servicio Específico', 'Se actualizó un servicio específico', IdServicioEspecifico);
    } catch (error) {
      console.error(`No se pudo actualizar el servicio ${IdServicioEspecifico} debido al error: ${error}`);
    }
    return resultado;
  }

  async Borrar(IdServicioEspecifico) {
    let resultado;
    try {
      resultado = await prisma.serviciosEspecificos.delete({
        where: {
          IdServicioEspecifico: parseInt(IdServicioEspecifico),
        },
      });
      await historialSistema.registrarHistorial('Servicio Específico', 'Se borró un servicio específico', IdServicioEspecifico);
    } catch (error) {
      console.error(`No se pudo borrar el servicio ${IdServicioEspecifico} debido al error: ${error}`);
    }
    return resultado;
  }

  async BorrarPorIdServicio(IdServicio) {
    let resultado;
    try {
      const idServicioInt = parseInt(IdServicio, 10);
  
      // Verificar si el servicio general existe
      const servicioGeneralExiste = await prisma.serviciosGeneral.findUnique({
        where: {
          IdServicio: idServicioInt
        }
      });
  
      if (!servicioGeneralExiste) {
        throw new Error(`El servicio general con ID ${idServicioInt} no existe`);
      }
  
      // Eliminar las citas relacionadas con los servicios específicos
      await prisma.cita.deleteMany({
        where: {
          IdServicioEspecifico: {
            in: (await prisma.serviciosEspecificos.findMany({
              where: {
                IdServicio: idServicioInt
              },
              select: {
                IdServicioEspecifico: true
              }
            })).map(se => se.IdServicioEspecifico)
          }
        }
      });
  
      // Eliminar los servicios específicos relacionados
      await prisma.serviciosEspecificos.deleteMany({
        where: {
          IdServicio: idServicioInt
        }
      });
  
      // Eliminar el servicio general
      resultado = await prisma.serviciosGeneral.delete({
        where: {
          IdServicio: idServicioInt
        }
      });
    } catch (error) {
      console.error("Error al borrar servicio general:", error);
      throw error;
    }
    return resultado;
  }
  
  Listar(IdServicioEspecifico) {
    let ServiciosEspecificos;
    if (IdServicioEspecifico === undefined) {
      ServiciosEspecificos = prisma.serviciosEspecificos.findMany();
    } else {
      ServiciosEspecificos = prisma.serviciosEspecificos.findMany({
        where: {
          IdServicioEspecifico: parseInt(IdServicioEspecifico),
        },
      });
    }
    return ServiciosEspecificos;
  }
}

module.exports = ServicioEspecifico;
