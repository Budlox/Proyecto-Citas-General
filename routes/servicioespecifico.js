const express = require("express");
const ServicioServiciosEspecifico = require('./../services/servicioespecifico.js');

const Router = express.Router();
const ServicioEspecificos = new ServicioServiciosEspecifico();

Router.get("/", async (solicitud, respuesta) => {
  const ServiciosEspecificos = await listadoDeServiciosEspecificos(solicitud.params.IdServicioEspecifico);
  respuesta.json(ServiciosEspecificos);
});

Router.get("/:IdServicioEspecifico", async (solicitud, respuesta) => {
  const ServiciosEspecificos = await listadoDeServiciosEspecificos(solicitud.params.IdServicioEspecifico);
  respuesta.json(ServiciosEspecificos);
});

function listadoDeServiciosEspecificos(IdServicioEspecifico) {
    return ServicioEspecificos.Listar(IdServicioEspecifico);
}

Router.post('/', async (solicitud, respuesta) => {
    const resultado = await ServicioEspecificos.Agregar(solicitud.body);
    respuesta.json(resultado);
  });  

Router.delete('/:IdServicioEspecifico', async (solicitud, respuesta) => {
    respuesta.json(ServicioEspecificos.Borrar(solicitud.params.IdServicioEspecifico));
});

Router.put('/:IdServicioEspecifico', async (solicitud, respuesta) => {
    const { IdServicioEspecifico } = solicitud.params;
    const datosActualizados = solicitud.body;
  
    const resultado = await ServicioEspecificos.Actualizar(IdServicioEspecifico, datosActualizados);
    respuesta.json(resultado);
  });
  

module.exports = Router;