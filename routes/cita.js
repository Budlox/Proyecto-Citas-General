const express = require("express");
const ServicioCita = require('./../services/cita.js');
const ServicioUsuario = require('./../services/usuario.js');

const Router = express.Router();
const Cita = new ServicioCita();
const Usuario = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    try {
      const citas = await Cita.Listar(); // Ensure Listar returns a Promise
      respuesta.json({ Token: newToken, Citas: citas });
    } catch (error) {
      console.error('Error al listar citas:', error);
      respuesta.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdCita", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    try {
      const citas = await Cita.Listar(solicitud.params.IdCita); // Ensure Listar returns a Promise
      respuesta.json({ Token: newToken, Citas: citas });
    } catch (error) {
      console.error(`Error al buscar la cita ${solicitud.params.IdCita}:`, error);
      respuesta.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.post('/', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    try {
      const resultado = await Cita.Agregar(solicitud.body);
      respuesta.json({ Cita: resultado, Token: newToken });
    } catch (error) {
      console.error('Error al agregar cita:', error);
      respuesta.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.delete('/:IdCita', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    try {
      const resultado = await Cita.Borrar(solicitud.params.IdCita);
      respuesta.json({ Cita: resultado, Token: newToken });
    } catch (error) {
      console.error(`Error al borrar la cita ${solicitud.params.IdCita}:`, error);
      respuesta.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put('/:IdCita', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    try {
      const resultado = await Cita.Actualizar(solicitud.params.IdCita, solicitud.body);
      respuesta.json({ Cita: resultado, Token: newToken });
    } catch (error) {
      console.error(`Error al actualizar la cita ${solicitud.params.IdCita}:`, error);
      respuesta.status(500).json({ error: "Error interno del servidor" });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get('/buscarPorNombre', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const nombre = solicitud.query.nombre;
    if (nombre) {
      try {
        const solicitantes = await Solicitantes.BuscarPorNombre(nombre);
        respuesta.json({ Token: newToken, Solicitantes: solicitantes });
      } catch (error) {
        console.error('Error al buscar solicitantes por nombre:', error);
        respuesta.status(500).json({ error: "Error interno del servidor" });
      }
    } else {
      respuesta.status(400).json({ error: 'Nombre no proporcionado' });
    }
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get('/solicitante/:IdSolicitante', async (solicitud, respuesta) => {
  try {
    const isValidToken = await Usuario.ValidarToken(solicitud);
    if (!isValidToken) {
      return respuesta.status(401).json({ error: "Token inválido" });
    }

    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const citas = await Cita.BuscarPorSolicitante(solicitud.params.IdSolicitante);
    return respuesta.json({ Token: newToken, Citas: citas });
  } catch (error) {
    console.error('Error processing request:', error);
    return respuesta.status(500).json({ error: "Internal server error" });
  }
});

module.exports = Router;
