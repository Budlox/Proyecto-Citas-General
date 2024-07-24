const express = require("express");
const ServicioSolicitante = require('./../services/solicitante.js');

const Router = express.Router();
const Solicitantes = new ServicioSolicitante();

Router.get("/", async (solicitud, respuesta) => {
  const Solicitantes = await listadoDeSolicitantes(solicitud.params.IdSolicitante);
  respuesta.json(Solicitantes);
});

Router.get("/:IdSolicitante", async (solicitud, respuesta) => {
  const Solicitantes = await listadoDeSolicitantes(solicitud.params.IdSolicitante);
  respuesta.json(Solicitantes);
});

function listadoDeSolicitantes(IdSolicitante) {
    return Solicitantes.Listar(IdSolicitante);
}

Router.post('/', async (solicitud, respuesta) => {
    const resultado = await Solicitantes.Agregar(solicitud.body);
    respuesta.json(resultado);
  });  

Router.delete('/:IdSolicitante', async (solicitud, respuesta) => {
    respuesta.json(Solicitantes.Borrar(solicitud.params.IdSolicitante));
});

Router.put('/:IdSolicitante', async (solicitud, respuesta) => {
    const { IdSolicitante } = solicitud.params;
    const datosActualizados = solicitud.body;
  
    const resultado = await Solicitantes.Actualizar(IdSolicitante, datosActualizados);
    respuesta.json(resultado);
  });
  

module.exports = Router;