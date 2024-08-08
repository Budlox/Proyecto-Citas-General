const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const HistorialSistema = require("./historialsistema");

const prisma = new PrismaClient();
const historialSistema = new HistorialSistema();
const PALABRA_SECRETA =
  "7f2c2b4aa10a242fde16664ecfdd97536f2064412af3c9d93777570201d97510";

class Usuario {
  constructor() {
    this.PalabraSecreta = PALABRA_SECRETA;
  }

  async Autenticar(Email, ClaveSinEncriptar) {
    try {
      const usuarios = await prisma.usuario.findMany({
        where: { Email: Email },
        select: { IdUsuario: true, Rol: true, Contrasenna: true },
      });

      if (usuarios.length === 0) {
        return false;
      }

      const usuario = usuarios[0];
      const resultado = await bcrypt.compare(
        ClaveSinEncriptar,
        usuario.Contrasenna
      );

      if (resultado) {
        const payload = {
          Email: Email,
          Rol: usuario.Rol,
          IdUsuario: usuario.IdUsuario,
        };
        const token = jwt.sign({ data: payload }, this.PalabraSecreta, {
          expiresIn: "1m",
        });

        await prisma.usuario.update({
          where: { IdUsuario: usuario.IdUsuario },
          data: { Token: token },
        });

        return token;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error en la autenticación");
    }
  }

  async ValidarToken(solicitud) {
    try {
      const token = solicitud.headers.authorization.split(" ")[1];
      const resultado = jwt.verify(token, this.PalabraSecreta);
      return resultado.data;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async RegenerarToken(Email, Rol, IdUsuario) {
    if (!IdUsuario) {
      console.error("IdUsuario is required but not provided.");
      throw new Error("IdUsuario is required.");
    }

    const payload = { Email: Email, Rol: Rol, IdUsuario: IdUsuario };
    const newToken = jwt.sign({ data: payload }, this.PalabraSecreta, {
      expiresIn: "1m",
    });

    try {
      await prisma.usuario.update({
        where: {
          IdUsuario: IdUsuario,
        },
        data: {
          Token: newToken,
        },
      });
    } catch (error) {
      console.error(
        `Failed to update token for IdUsuario ${IdUsuario} due to error: ${error}`
      );
      throw error;
    }

    return newToken;
  }

  async Agregar(usuario) {
    let resultado;
    if (!usuario) {
      throw new Error("Faltan los datos");
    }

    try {
      console.log("Usuario:", usuario);

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(usuario.Contrasenna, 10);

      // Create user with hashed password
      resultado = await prisma.usuario.create({
        data: {
          NombreUsuario: usuario.NombreUsuario,
          Contrasenna: hashedPassword, // Use hashed password
          Email: usuario.Email,
        },
      });
      console.log("User added:", resultado);
      await historialSistema.registrarHistorial(
        "Usuario",
        "Se agregó un usuario",
        resultado.IdUsuario
      );
    } catch (error) {
      console.error(`No se pudo insertar el usuario debido al error: ${error}`);
      throw error;
    }
    return resultado;
  }

  async Actualizar(IdUsuario, datosActualizados) {
    if (!datosActualizados) {
      throw new TypeError("Datos actualizados no pueden estar vacíos");
    }

    try {
      const idUsuarioInt = parseInt(IdUsuario, 10);
      if (isNaN(idUsuarioInt)) {
        throw new TypeError("IdUsuario debe ser un número válido");
      }

      // Prepare update data
      const updateData = {
        NombreUsuario: datosActualizados.NombreUsuario,
        Email: datosActualizados.Email,
      };

      // Hash the password if provided
      if (datosActualizados.Contrasenna) {
        updateData.Contrasenna = await bcrypt.hash(
          datosActualizados.Contrasenna,
          10
        );
      }

      const resultado = await prisma.usuario.update({
        where: { IdUsuario: idUsuarioInt },
        data: updateData,
      });

      await historialSistema.registrarHistorial(
        "Usuario",
        "Se actualizó un usuario",
        IdUsuario
      );
      return resultado;
    } catch (error) {
      console.error(
        `No se pudo actualizar el usuario ${IdUsuario} debido al error: ${error}`
      );
      throw error;
    }
  }

  async Borrar(IdUsuario) {
    let resultado;
    try {
      resultado = await prisma.usuario.delete({
        where: {
          IdUsuario: parseInt(IdUsuario),
        },
      });
      await historialSistema.registrarHistorial(
        "Solicitante",
        "Se borró un solicitante",
        IdUsuario
      );
    } catch (error) {
      console.error(
        `No se pudo borrar el solicitante ${IdUsuario} debido al error: ${error}`
      );
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
  }
}

module.exports = Usuario;
