const express = require("express");
const ServicioCita = require('./../services/cita.js');
const ServicioUsuario = require('./../services/usuario.js');

const Router = express.Router();
const Citas = new ServicioCita();
const Usuario = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const Citas = await listadoDeCitas(solicitud.params.IdCita);
    respuesta.json({Token: newToken, Citas});
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.get("/:IdCita", async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if(isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const Citas = await listadoDeCitas(solicitud.params.IdCita);
    respuesta.json({Token: newToken, Citas});
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

function listadoDeCitas(IdCita) {
    return Citas.Listar(IdCita);
}

Router.post('/', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const resultado = await Citas.Agregar(solicitud.body);
    respuesta.json({ Cita: resultado, Token: newToken })
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
  });  

Router.delete('/:IdCita', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    respuesta.json({ Cita: Citas.Borrar(solicitud.params.IdCita), Token: newToken })
  } else {
    respuesta.status(401).json({ error: "Token inválido" });
  }
});

Router.put('/:IdCita', async (solicitud, respuesta) => {
  const isValidToken = await Usuario.ValidarToken(solicitud);
  if (isValidToken) {
    const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
    const { IdCita } = solicitud.params;
    const datosActualizados = solicitud.body;
    respuesta.json({ Cita: Citas.Actualizar(IdCita, datosActualizados), Token: newToken })
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
        const solicitantes = await Solicitantes.BuscarPorNombre(nombre);
        respuesta.json({ Token: newToken, Solicitantes: solicitantes });
      } else {
        respuesta.status(400).json({ error: 'Nombre no proporcionado' });
      }
    } else {
      respuesta.status(401).json({ error: "Token inválido" });
    }
  });
  
  Router.get('/buscarPorSolicitante', async (solicitud, respuesta) => {
    const isValidToken = await Usuario.ValidarToken(solicitud);
    if (isValidToken) {
      const newToken = await Usuario.RegenerarToken(isValidToken.Email, isValidToken.Rol, isValidToken.IdUsuario);
      const idSolicitante = solicitud.query.IdSolicitante;
      if (idSolicitante) {
        const citas = await Citas.BuscarPorSolicitante(idSolicitante);
        respuesta.json({ Token: newToken, Citas: citas });
      } else {
        respuesta.status(400).json({ error: 'IdSolicitante no proporcionado' });
      }
    } else {
      respuesta.status(401).json({ error: "Token inválido" });
    }
  });

module.exports = Router;