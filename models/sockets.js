const BandList = require("./band-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketsEvents();
  }

  //aqui creamos todos los eventos que necesitamos en los sopckets
  socketsEvents() {
    // configuracion del socket server
    this.io.on("connection", (client) => {
      console.log("cliente conectado");

      // emitir al cliente conectado todas las bandas actuales
      client.emit("band-list-current", this.bandList.getBands());
      //emtir el incremento de votos
      client.on("voto-incrementar", (id) => {
        this.bandList.incrementBand(id);
        // client.emit("band-list-current", this.bandList.getBands());
        this.io.emit("band-list-current", this.bandList.getBands());
      });
      //eliminar banda
      client.on("eliminar-banda", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("band-list-current", this.bandList.getBands());
      });
      //agregar banda
      client.on("create-band", (name) => {
        this.bandList.addBand(name);
        this.io.emit("band-list-current", this.bandList.getBands());
      });
      //update name
      client.on("update-name", ({ id, newName }) => {
        this.bandList.changeName(id, newName);
        this.io.emit("band-list-current", this.bandList.getBands());
      });

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
