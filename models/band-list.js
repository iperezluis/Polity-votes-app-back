const Band = require("./band");

class BandList {
  constructor() {
    this.bands = [
      new Band("Skrillex"),
      new Band("Metallica"),
      new Band("Heroes"),
      new Band("Liking Park"),
    ];
  }
  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
  }
  // aqui devolvemos todos los elementos del arreglo con su id exepto el
  // elemento que tenga el id del parametro
  removeBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
    return this.bands;
  }

  // removeBand(id) {
  //   // const newBand = new Band(id);
  //   this.bands.splice(this.bands.indexOf(id));
  //   return this.bands;
  // }

  getBands() {
    return this.bands;
  }
  incrementBand(id) {
    this.bands.map((band) => {
      if (band.id === id) {
        band.votes += 1;
      }
      return band;
    });
  }
  //update Name
  changeName(id, newName) {
    this.bands.map((band) => {
      if (band.id === id) {
        band.name = newName;
      }
      return band;
    });
  }
}

module.exports = BandList;
