const Sequelize = require("sequelize");
const driver = new Sequelize("dbvivitech", "root", "swordfish", {
  host: "localhost",
  dialect: "mysql"
});

async function main() {
  const Crud = driver.define(
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

  await Crud.sync();

  await Crud.create({
    nome: "Lucas",
    email: "lucas@email.com"
  });

  const result = await Crud.findAll({ raw: true });
  console.log("result", result);
}

main()
  .then(console.log("Conectando..."))
  .catch(function(e) {
    console.log(e);
  });
