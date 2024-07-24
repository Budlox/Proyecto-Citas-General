const express = require("express");
const ServicioCita = require('./../services/cita.js');

const Router = express.Router();
const Citas = new ServicioCita();

Router.get("/", async (solicitud, respuesta) => {
  const Citas = await listadoDeCitas(solicitud.params.IdCita);
  respuesta.json(Citas);
});

Router.get("/:IdCita", async (solicitud, respuesta) => {
  const Citas = await listadoDeCitas(solicitud.params.IdCita);
  respuesta.json(Citas);
});

function listadoDeCitas(IdCita) {
    return Citas.Listar(IdCita);
}

Router.post('/', async (solicitud, respuesta) => {
    const resultado = await Citas.Agregar(solicitud.body);
    respuesta.json(resultado);
  });  

Router.delete('/:IdCita', async (solicitud, respuesta) => {
    respuesta.json(Citas.Borrar(solicitud.params.IdCita));
});

Router.put('/:IdCita', async (solicitud, respuesta) => {
    const { IdCita } = solicitud.params;
    const datosActualizados = solicitud.body;
  
    const resultado = await Citas.Actualizar(IdCita, datosActualizados);
    respuesta.json(resultado);
  });
  

module.exports = Router;