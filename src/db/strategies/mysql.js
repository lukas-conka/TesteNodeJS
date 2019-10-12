const ICrud = require("./interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class MySQL extends ICrud {
  constructor() {
    super();
    this._driver = null;
    this._crud = null;
  }

  async isConnected() {
    try {
      await this._driver.authenticate();
      return true;
    } catch (error) {
      console.error("Erro na conexao", error);
      return false;
    }
  }

  async create(item) {
    const { dataValues } = await this._crud.create(item);

    return dataValues;
  }

  async read(item = {}) {
    const result = this._crud.findAll({where: item, raw: true})
    return result;
  }

  async update(id, item){
    const result = this._crud.update(item, {where: {id: id}})
    return result
  }

  async delete(id){
    const query = id ? { id } : {}
    return this._crud.destroy({where: query})
  }

  async defineModel() {
    this._crud = this._driver.define(
      "Crud",
      {
        id: {
          type: Sequelize.INTEGER,
          required: true,
          primaryKey: true,
          autoIncrement: true
        },
        nome: {
          type: Sequelize.STRING,
          required: true
        },
        email: {
          type: Sequelize.STRING,
          required: true
        }
      },
      {
        tableName: "TB_CRUD",
        freezeTableName: false,
        timestamps: false
      }
    );

    await this._crud.sync();
  }

  async connect() {
    this._driver = new Sequelize("dbvivitech", "root", "swordfish", {
      host: "localhost",
      dialect: "mysql"
    });
    await this.defineModel();
  }
}

module.exports = MySQL;
