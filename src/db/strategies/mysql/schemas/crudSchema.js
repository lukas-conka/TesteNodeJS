const Sequelize = require("sequelize");
const CrudSchema = {
  name: "Crud",

  schema: {
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
  options: {
    tableName: "TB_CRUD",
    freezeTableName: false,
    timestamps: false
  }
};

module.exports = CrudSchema;
