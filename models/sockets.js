class Sockets {
  constructor(io) {
    this.io = io;
    this.socketsEvents();
  }

  //aqui creamos todos los eventos que necesitamos en los sopckets
  socketsEvents() {
    // configuracion del socket server
    this.io.on("connection", (client) => {
      console.log(client.id);

      client.on("message-to-server", (data) => {
        console.log(data);
        //con el io es para que le mandemos el msg a todos los clienmtes conectados en nuestro werbsockets
        this.io.emit("message-from-server", data);
      });

      client.on("disconnect", () => {
        console.log("cliente desconectado");
        /* … */
      });
    });
  }
}

module.exports = Sockets;
