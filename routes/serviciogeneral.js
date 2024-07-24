const express = require("express");
const ServicioServiciosGeneral = require('./../services/serviciogeneral.js');

const Router = express.Router();
const ServicioGenerales = new ServicioServiciosGeneral();

Router.get("/", async (solicitud, respuesta) => {
  const ServiciosGenerales = await listadoDeServiciosGenerales(solicitud.params.IdServicio);
  respuesta.json(ServiciosGenerales);
});

Router.get("/:IdServicio", async (solicitud, respuesta) => {
  const ServiciosGenerales = await listadoDeServiciosGenerales(solicitud.params.IdServicio);
  respuesta.json(ServiciosGenerales);
});

function listadoDeServiciosGenerales(IdServicio) {
    return ServicioGenerales.Listar(IdServicio);
}

 Router.post('/', async (solicitud, respuesta) => {
  const resultado = await ServicioGenerales.Agregar(solicitud.body)
  respuesta.json(resultado);
});

Router.delete('/:IdServicio', async (solicitud, respuesta) => {
  respuesta.json(ServicioGenerales.Borrar(solicitud.params.IdServicio));
});

Router.put('/:IdServicio', async (solicitud, respuesta) => {
  const { IdServicio } = solicitud.params;
  const { ServiciosGeneral } = solicitud.body;
  
  respuesta.json(ServicioGenerales.Actualizar(IdServicio, ServiciosGeneral));
});

module.exports = Router;