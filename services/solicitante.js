const { PrismaClient } = require("@prisma/client");
const bcrypt = require('bcrypt');
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class Solicitante {

  constructor() {}

  async Agregar(solicitante) {
    let resultado;
    if (!solicitante) {
      throw new Error('Faltan los datos');
    }

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(solicitante.Contrasenna, 10);
      
      console.log('Solicitante:', solicitante);
      resultado = await prisma.solicitante.create({
        data: {
          Nombre_Solicitante: solicitante.Nombre_Solicitante,
          Email: solicitante.Email,
          Contrasenna: hashedPassword
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
    if (!datosActualizados) {
      throw new TypeError("Datos actualizados no pueden estar vacíos");
    }

    try {
      const idSolicitanteInt = parseInt(IdSolicitante, 10);
      if (isNaN(idSolicitanteInt)) {
        throw new TypeError("IdSolicitante debe ser un número válido");
      }
      
      // Prepare the data to be updated
      const updateData = {
        Nombre_Solicitante: datosActualizados.Nombre_Solicitante,
        Email: datosActualizados.Email
      };

      // Hash the password if it's provided
      if (datosActualizados.Contrasenna) {
        updateData.Contrasenna = await bcrypt.hash(datosActualizados.Contrasenna, 10);
      }

      resultado = await prisma.solicitante.update({
        where: { IdSolicitante: idSolicitanteInt },
        data: updateData,
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
      const idSolicitanteInt = parseInt(IdSolicitante, 10);
  
      // Verificar si el solicitante existe
      const solicitanteExiste = await prisma.solicitante.findUnique({
        where: {
          IdSolicitante: idSolicitanteInt
        }
      });
  
      if (!solicitanteExiste) {
        throw new Error(`El solicitante con ID ${idSolicitanteInt} no existe`);
      }
  
      // Eliminar citas relacionadas
      await prisma.cita.deleteMany({
        where: {
          IdSolicitante: idSolicitanteInt
        }
      });
  
      // Eliminar solicitante
      resultado = await prisma.solicitante.delete({
        where: {
          IdSolicitante: idSolicitanteInt
        }
      });
    } catch (error) {
      console.error("Error al borrar solicitante:", error);
      throw error;
    }
    return resultado;
  }

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
  }
}

module.exports = Solicitante;
