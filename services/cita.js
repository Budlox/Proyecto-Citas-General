const { PrismaClient } = require("@prisma/client");
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class Cita {

  constructor() {

  };

  async Agregar(cita) {
    let resultado;
    try {
      resultado = await prisma.cita.create({
        data: {
            FechaCita: cita.FechaCita,
            Nombre_Cliente: cita.Nombre_Cliente,
            Apellido_Cliente: cita.Apellido_Cliente,
            Correo_Cliente: cita.Correo_Cliente,
            IdServicioEspecifico: parseInt(cita.IdServicioEspecifico),
            IdSolicitante: parseInt(cita.IdSolicitante)
        }
      });
      await historialSistema.registrarHistorial('Cita', 'Se agregó una cita', resultado.IdCita);
    } catch (error) {
      console.error(`No se pudo insertar una cita debido al error: ${error}`);
    }
    return resultado;
  }
  

  async Actualizar(IdCita, datosActualizados) {
    let resultado;
    try {
      resultado = await prisma.cita.update({
        where: { IdCita: parseInt(IdCita) },
        data: {
            FechaCita: datosActualizados.FechaCita,
            Nombre_Cliente: datosActualizados.Nombre_Cliente,
            Apellido_Cliente: datosActualizados.Apellido_Cliente,
            Correo_Cliente: datosActualizados.Correo_Cliente,
            IdServicioEspecifico: parseInt(datosActualizados.IdServicioEspecifico),
            IdSolicitante: parseInt(datosActualizados.IdSolicitante)
        },
      });
      await historialSistema.registrarHistorial('Cita', 'Se actualizó una cita', IdCita);
    } catch (error) {
      console.error(`No se pudo actualizar la cita ${IdCita} debido al error: ${error}`);
    }
    return resultado;
  }
  

  async Borrar(IdCita) {
    let resultado;
    try {
      resultado = await prisma.cita.delete({
        where: {
          IdCita: parseInt(IdCita),
        },
      });
      await historialSistema.registrarHistorial('Cita', 'Se borró una cita', IdCita);
    } catch (error) {
      console.error(`No se pudo borrar la cita ${IdCita} debido al error: ${error}`);
    }
    return resultado;
  };

  Listar(IdCita) {
    let Citas;
    if (IdCita === undefined) {
      Citas = prisma.cita.findMany();
    } else {
      Citas = prisma.cita.findMany({
        where: {
            IdCita: parseInt(IdCita),
        },
      });
    }
    return Citas;
  };
}

module.exports = Cita;