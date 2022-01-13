const Server = require("./models/server");
//esta importacion es para extraer globalmente la configuracion en  las varinales de entorno
require("dotenv").config();
const server = new Server();

server.execute();
