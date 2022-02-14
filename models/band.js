const { v4: uuidv4 } = require("uuid");

class Band {
  constructor(name) {
    //aqui descagramos un paquete llamado npm i uuid para generar ids a nuestras bandas
    this.id = uuidv4();
    this.name = name;
    this.votes = 0;
  }
}

module.exports= Band;