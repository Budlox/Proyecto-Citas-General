const { PrismaClient } = require("@prisma/client");
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class ServicioEspecifico {
  constructor() {}

  async Agregar(servicioEspecifico) {
    let resultado;
    try {
      resultado = await prisma.serviciosEspecificos.create({
        data: {
          IdServicio: parseInt(servicioEspecifico.IdServicio),
          NombreServicioEspecifico: servicioEspecifico.NombreServicioEspecifico,
          CostoServicioEspecifico: parseInt(servicioEspecifico.CostoServicioEspecifico)
        }
      });
      await historialSistema.registrarHistorial('Servicio Específico', 'Se agregó un servicio específico', resultado.IdServicioEspecifico);
    } catch (error) {
      console.error(`No se pudo insertar el servicio específico debido al error: ${error}`);
    }
    return resultado;
  }

  async Actualizar(IdServicioEspecifico, datosActualizados) {
    let resultado;
    try {
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
      resultado = await prisma.serviciosEspecificos.deleteMany({
        where: {
          IdServicio: parseInt(IdServicio),
        },
      });
      await historialSistema.registrarHistorial('Servicio Específico', `Se borraron los servicios específicos relacionados con el servicio general ${IdServicio}`, IdServicio);
    } catch (error) {
      console.error(`No se pudieron borrar los servicios específicos relacionados con el servicio general ${IdServicio} debido al error: ${error}`);
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
