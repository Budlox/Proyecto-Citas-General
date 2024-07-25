const { PrismaClient } = require("@prisma/client")
const HistorialSistema = require('./historialsistema');

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();

class Usuario {

  constructor() {

  };

  async Agregar(usuario) {
    let resultado;
    try {
      resultado = await prisma.usuario.create({
        data: {
            NombreUsuario: usuario.NombreUsuario,
            Contrasenna: usuario.Contrasenna,
            Email: usuario.Email
        }
      });
      await historialSistema.registrarHistorial('Usuario', 'Se agregó un usuario', resultado.IdUsuario);
    } catch (error) {
      console.error(`No se pudo insertar el usuario debido al error: ${error}`);
    }
    return resultado;
  }
  

  async Actualizar(IdUsuario, datosActualizados) {
    let resultado;
    try {
      resultado = await prisma.usuario.update({
        where: { IdUsuario: parseInt(IdUsuario) },
        data: {
          NombreUsuario: datosActualizados.NombreUsuario,
          Contrasenna: datosActualizados.Contrasenna, // This will now be hashed
          Email: datosActualizados.Email
        },
      });
      await historialSistema.registrarHistorial('Usuario', 'Se actualizó un usuario', IdUsuario);
    } catch (error) {
      console.error(`No se pudo actualizar el usuario ${IdUsuario} debido al error: ${error}`);
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
  
  
  Listar(IdUsuario) {
    let Usuarios;
    if (IdUsuario === undefined) {
      Usuarios = prisma.usuario.findMany();
    } else {
      Usuarios = prisma.usuario.findMany({
        where: {
            IdUsuario: parseInt(IdUsuario),
        },
      });
    }
    return Usuarios;
  };
}

module.exports = Usuario;