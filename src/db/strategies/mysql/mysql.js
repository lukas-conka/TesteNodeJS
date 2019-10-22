const ICrud = require("./../interfaces/interfaceCrud");
const Sequelize = require("sequelize");

class MySQL extends ICrud {
  constructor(connection, schema) {
    super();
    this._connection = connection;
    this._schema = schema;
  }

  async isConnected() {
    try {
      await this._connection.authenticate();
      return true;
    } catch (error) {
      console.error("Erro na conexao", error);
      return false;
    }
  }

  static async defineModel(connection, schema) {
    const model = connection.define(schema.name, schema.schema, schema.options);
    await model.sync();
    return model;
  }

  async create(item) {
    const { dataValues } = await this._schema.create(item);

    return dataValues;
  }

  async read(item = {}) {
    const result = this._schema.findAll({ where: item, raw: true });
    return result;
  }

  async update(id, item, upsert = false) {
    const fn = upsert ? "upsert" : "update";
    const result = this._schema[fn](item, { where: { id: id } });
    return result;
  }

  async delete(id) {
    const query = id ? { id } : {};
    return this._schema.destroy({ where: query });
  }

  static async connect() {
    const sequelize = new Sequelize(process.env.MYSQL_URL, {
      logging: false,
      ssl: process.env.SSL_DB,
      /*dialectOptions:  {
        ssl: process.env.SSL_DB
      }*/
    });
    console.log("Database MYSQL ON");
    return sequelize;
  }
}

module.exports = MySQL;
