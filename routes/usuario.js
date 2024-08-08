const express = require("express");
const bcrypt = require("bcrypt");
const ServicioUsuario = require("./../services/usuario.js");

const Router = express.Router();
const Usuario = new ServicioUsuario();

Router.post("/autenticar", async (solicitud, respuesta) => {
  try {
    const resultado = await Usuario.Autenticar(
      solicitud.body.Email,
      solicitud.body.Contrasenna
    );
    if (resultado) {
      respuesta.json({ token: resultado });
    } else {
      respuesta.status(401).json({ error: "Autenticación fallida" });
    }
  } catch (error) {
    respuesta.status(500).json({ error: error.message });
  }
});

Router.post("/validartoken", async (solicitud, respuesta) => {
  try {
    const resultado = await Usuario.ValidarToken(solicitud);
    if (resultado) {
      respuesta.json(resultado);
    } else {
      respuesta.status(401).json({ error: "Token inválido" });
    }
  } catch (error) {
    respuesta.status(500).json({ error: error.message });
  }
});

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(
      isValidToken.Email,
      isValidToken.Rol,
      isValidToken.IdUsuario
    );
    const Usuarios = await listadoDeUsuarios(solicitud.params.IdUsuario);
    respuesta.json({ Token: newToken, Usuarios });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdUsuario", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(
      isValidToken.Email,
      isValidToken.Rol,
      isValidToken.IdUsuario
    );
    const Usuarios = await listadoDeUsuarios(solicitud.params.IdUsuario);
    respuesta.json({ Token: newToken, Usuarios });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

function listadoDeUsuarios(IdUsuario) {
  return Usuario.Listar(IdUsuario);
}

Router.post("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(
      isValidToken.Email,
      isValidToken.Rol,
      isValidToken.IdUsuario
    );
    const resultado = await Usuario.Agregar(solicitud.body);
    respuesta.json({ Usuario: resultado, Token: newToken });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.delete("/:IdUsuario", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(
      isValidToken.Email,
      isValidToken.Rol,
      isValidToken.IdUsuario
    );
    respuesta.json({
      Usuario: Usuario.Borrar(solicitud.params.IdUsuario),
      Token: newToken,
    });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put("/:IdUsuario", async (solicitud, respuesta) => {
  // Validate token
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (!isValidToken) {
    return respuesta.status(401).json({ error: "Token inválido" });
  }

  // Regenerate token
  const newToken = await Usuario.RegenerarToken(
    isValidToken.Email,
    isValidToken.Rol,
    isValidToken.IdUsuario
  );

  const { IdUsuario } = solicitud.params;
  const datosActualizados = solicitud.body;

  // Check if a new password is provided and hash it
  if (datosActualizados.Contrasenna) {
    try {
      datosActualizados.Contrasenna = await bcrypt.hash(
        datosActualizados.Contrasenna,
        10
      );
    } catch (error) {
      console.error(`Error hashing the password: ${error}`);
      return respuesta
        .status(500)
        .json({ error: "Error hashing the password" });
    }
  }

  try {
    const resultado = await Usuario.Actualizar(IdUsuario, datosActualizados);
    respuesta.json({ Usuario: resultado, Token: newToken });
  } catch (error) {
    console.error(
      `No se pudo actualizar el usuario ${IdUsuario} debido al error: ${error}`
    );
    respuesta.status(500).json({ error: "Error updating user" });
  }
});

module.exports = Router;
