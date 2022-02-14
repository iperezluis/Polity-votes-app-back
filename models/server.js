// servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Http server
    this.server = http.createServer(this.app);

    //configuraciuon sockets
    // aqui vamos a mantener a todos los clientes conectados
    this.io = socketio(this.server, {
      cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"],
        credentials: true,
      },
    });
  }
  //aqui vamos a colocar todos lso middleweares que necesitamos
  middlewares() {
    // desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // habilitamos el cors para que cualquier persona se conecte a nuestra app
    // tambien puedes configurar que dominios son los que se pueden conectar
    this.app.use(
      cors({
        //el asterisco significa que estoy permitiendo que cualquier red se conecte a esta web
        origin: "*",
        methods: "GET,POST",
        credentials: true,
      })
    );
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
