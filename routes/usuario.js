const express = require("express");
const bcrypt = require('bcrypt');
const ServicioUsuario = require('./../services/usuario.js');

const Router = express.Router();
const Usuarios = new ServicioUsuario();

Router.get("/", async (solicitud, respuesta) => {
  const Usuarios = await listadoDeUsuarios(solicitud.params.IdUsuario);
  respuesta.json(Usuarios);
});

Router.get("/:IdUsuario", async (solicitud, respuesta) => {
  const Usuarios = await listadoDeUsuarios(solicitud.params.IdUsuario);
  respuesta.json(Usuarios);
});

function listadoDeUsuarios(IdUsuario) {
    return Usuarios.Listar(IdUsuario);
}

Router.post('/', async (solicitud, respuesta) => {
    const resultado = await Usuarios.Agregar(solicitud.body);
    respuesta.json(resultado);
  });  

Router.delete('/:IdUsuario', async (solicitud, respuesta) => {
    respuesta.json(Usuarios.Borrar(solicitud.params.IdUsuario));
});

Router.put('/:IdUsuario', async (solicitud, respuesta) => {
  const { IdUsuario } = solicitud.params;
  const datosActualizados = solicitud.body;

  // Check if a new password is provided and hash it
  if (datosActualizados.Contrasenna) {
    try {
      datosActualizados.Contrasenna = await bcrypt.hash(datosActualizados.Contrasenna, 10);
    } catch (error) {
      console.error(`Error hashing the password: ${error}`);
      return respuesta.status(500).json({ error: 'Error hashing the password' });
    }
  }

  try {
    const resultado = await Usuarios.Actualizar(IdUsuario, datosActualizados);
    respuesta.json(resultado);
  } catch (error) {
    console.error(`No se pudo actualizar el usuario ${IdUsuario} debido al error: ${error}`);
    respuesta.status(500).json({ error: 'Error updating user' });
  }
});
  

module.exports = Router;