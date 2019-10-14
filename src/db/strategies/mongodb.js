const ICrud = require("./interfaces/interfaceCrud");
const Mongoose = require("mongoose");

const STATUS = {
  0: 'Desconectado',
  1: 'Conectado',
  2: 'Conectando',
  3: 'Desconectado'
}

class MongoDB extends ICrud {
  constructor() {
    super();
    this._crud = null
    this._driver = null
  }
  async isConnected() {
    const state = STATUS[this._driver.readyState]
    if(state === 'Conectado') return state;
    if(state !== 'Conectando') return state
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
    this._driver = connection
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
})

  this._crud = Mongoose.model('crud', crudSchema)
  }
  
  async create(item) {
    const resultCadastrar = await crud.create({
        nome: "Lucas Amaral",
        email: "lukas@hotmail.co.jp"
    })

    return resultCadastrar  }
}

module.exports = MongoDB;
