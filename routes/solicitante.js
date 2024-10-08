const express = require("express");
const ServicioSolicitante = require("./../services/solicitante.js");
const ServicioUsuario = require("./../services/usuario.js");

const Router = express.Router();
const Solicitantes = new ServicioSolicitante();
const Usuario = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      const Solicitantes = await listadoDeSolicitantes(
        solicitud.params.IdSolicitante
      );
      respuesta.json({ Token: newToken, Solicitantes });
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdSolicitante", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      const Solicitantes = await listadoDeSolicitantes(
        solicitud.params.IdSolicitante
      );
      respuesta.json({ Token: newToken, Solicitantes });
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

function listadoDeSolicitantes(IdSolicitante) {
  return Solicitantes.Listar(IdSolicitante);
}

Router.post("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      const resultado = await Solicitantes.Agregar(solicitud.body);
      respuesta.json({ Solicitante: resultado, Token: newToken });
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.delete("/:IdSolicitante", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      respuesta.json({
        Solicitante: Solicitantes.Borrar(solicitud.params.IdSolicitante),
        Token: newToken,
      });
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put("/:IdSolicitante", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      const { IdSolicitante } = solicitud.params;
      const datosActualizados = solicitud.body;
      respuesta.json({
        Solicitante: Solicitantes.Actualizar(IdSolicitante, datosActualizados),
        Token: newToken,
      });
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/buscarPorNombre", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  const isValidRol = await Usuario.validarRol(solicitud);
  if (isValidToken) {
    if (isValidRol) {
      const newToken = await Usuario.RegenerarToken(
        isValidToken.Email,
        isValidToken.Rol,
        isValidToken.IdUsuario
      );
      const nombre = solicitud.query.nombre;
      if (nombre) {
        const solicitantes = await Solicitantes.BuscarPorNombre(nombre);
        respuesta.json({ Token: newToken, Solicitantes: solicitantes });
      } else {
        respuesta.status(400).json({ error: "Nombre no proporcionado" });
      }
    } else {
      respuesta.status(401).json({ error: "Rol inválido" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

module.exports = Router;
