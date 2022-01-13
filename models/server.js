// servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    //configuraciuon sockets
    // aqui vamos a mantener a todos los clientes conectados
    this.io = socketio(this.server, {
      /*configuraciones*/
    });
  }
  //aqui vamos a colocar todos lso middleweares que necesitamos
  middlewares() {
    // desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }
  //configurar los sockets por clases para refactorizar el codigo
  settingsSockets() {
    new Sockets(this.io);
  }

  execute() {
    //inicialiozar middlewares
    this.middlewares();

    //inicializar server
    this.server.listen(this.port, () => {
      console.log("corriendo en el puerto", this.port);
    });
    // incilaizat sockets
    this.settingsSockets();
  }
}

module.exports = Server;
