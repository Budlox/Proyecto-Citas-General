const express = require("express");
const routerAPI = require('./routes/index.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
routerAPI(app);
app.listen(80, () => {
  console.log("Servidor iniciado en el puerto 80");
});