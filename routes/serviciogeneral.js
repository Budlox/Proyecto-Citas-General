const express = require("express");
const ServicioServiciosGeneral = require('./../services/serviciogeneral.js');
const ServicioUsuario = require('./../services/usuario.js');

const Router = express.Router();
const ServicioGenerales = new ServicioServiciosGeneral();
const Usuario = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const ServiciosGenerales = await listadoDeServiciosGenerales(solicitud.params.IdServicio);
    respuesta.json({Token: newToken, ServiciosGenerales });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdServicio", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const ServiciosGenerales = await listadoDeServiciosGenerales(solicitud.params.IdServicio);
    respuesta.json({Token: newToken, ServiciosGenerales });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

function listadoDeServiciosGenerales(IdServicio) {
    return ServicioGenerales.Listar(IdServicio);
}

Router.post('/', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const nuevoServicio = await ServicioGenerales.Agregar(solicitud.body); // Await the result here
    respuesta.json({ Servicio: nuevoServicio, Token: newToken });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});


Router.delete('/:IdServicio', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    respuesta.json({ Servicio: ServicioGenerales.Borrar(solicitud.params.IdServicio), Token: newToken })
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put('/:IdServicio', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const { IdServicio } = solicitud.params;
    const datosActualizados = solicitud.body;
    respuesta.json({ Servicio: ServicioGenerales.Actualizar(IdServicio, datosActualizados), Token: newToken });
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

module.exports = Router;