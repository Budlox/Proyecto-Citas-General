const rotuterServiciosGenerales = require("./serviciogeneral.js");
const rotuterServiciosEspecifcos = require("./servicioespecifico.js");
const rotuterCita = require("./cita.js");
const rotuterUsuario = require("./usuario.js");
const rotuterSolicitante = require("./solicitante.js");

function routerAPI(app) {
  app.use("/serviciogeneral", rotuterServiciosGenerales);
  app.use("/servicioespecifico", rotuterServiciosEspecifcos);
  app.use("/cita", rotuterCita);
  app.use("/usuario", rotuterUsuario);
  app.use("/solicitante", rotuterSolicitante);
}

module.exports = routerAPI;
