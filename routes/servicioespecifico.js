const express = require("express");
const ServicioServiciosEspecifico = require('./../services/servicioespecifico.js');
const ServicioUsuario = require('./../services/usuario.js');

const Router = express.Router();
const ServicioEspecificos = new ServicioServiciosEspecifico();
const Usuario = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const ServiciosEspecificos = await listadoDeServiciosEspecificos(solicitud.params.IdServicioEspecifico);
    respuesta.json({Token: newToken, ServiciosEspecificos});
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdServicioEspecifico", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const ServiciosEspecificos = await listadoDeServiciosEspecificos(solicitud.params.IdServicioEspecifico);
    respuesta.json({Token: newToken, ServiciosEspecificos})
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

function listadoDeServiciosEspecificos(IdServicioEspecifico) {
    return ServicioEspecificos.Listar(IdServicioEspecifico);
}

Router.post('/', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const resultado = await ServicioEspecificos.Agregar(solicitud.body);
    respuesta.json({Servicio: resultado, Token: newToken});
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
  });  

Router.delete('/:IdServicioEspecifico', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    respuesta.json({ Servicio: ServicioEspecificos.Borrar(solicitud.params.IdServicioEspecifico), Token: newToken })
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put('/:IdServicioEspecifico', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const { IdServicioEspecifico } = solicitud.params;
    const datosActualizados = solicitud.body;
    respuesta.json({ Servicio: ServicioEspecificos.Actualizar(IdServicioEspecifico, datosActualizados), Token: newToken })
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
  });
  

module.exports = Router;