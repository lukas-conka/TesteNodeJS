const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const crudSchema = require("./db/strategies/mongodb/schemas/crudSchema");
const CrudRoute = require('./routes/crudRoute')

const app = new Hapi.Server({
  port: 6000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, crudSchema));
  app.route([
    //new HeroRoute(new MongoDB(connection, crudSchema)).list()
    ...mapRoutes(new CrudRoute(context), CrudRoute.methods())
  ]);

  await app.start();
  console.log("Servidor rodando na porta", app.info.port);

  return app;
}

module.exports = main();
