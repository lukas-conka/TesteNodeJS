const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: "Desconectado",
  1: "Conectado",
  2: "Conectando",
  3: "Desconectado"
};

class MongoDB extends ICrud {
  constructor() {
    super();
    this._crud = null;
    this._driver = null;
    this.defineModel();
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState];
    if (state === "Conectado") return state;
    if (state !== "Conectando") return state;
    await new Promise(resolve => setTimeout(resolve, 1000));

    return STATUS[this._driver.readyState];
  }

  connect() {
    Mongoose.connect(
      "mongodb://localhost:27017/dbivivitech",
      { useNewUrlParser: true },
      error => {
        if (!error) return;
        console.log("Connection fail!", error);
      }
    );

    const connection = Mongoose.connection;
    connection.once("open", () => console.log("Database ON"));
    this._driver = connection;
  }

  defineModel() {
    const crudSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    });

    this._crud = Mongoose.model("crud", crudSchema);
  }

  create(item) {
    return this._crud.create(item);
  }

  read(item, skip = 0, limit = 10){
    return this._crud.find(item).skip(skip).limit(limit)
  }

  update(id, item){
    return this._crud.updateOne({_id: id}, {$set: item})
  }

  delete(id){
    return this._crud.deleteOne({_id: id})
  }
}

module.exports = MongoDB;
