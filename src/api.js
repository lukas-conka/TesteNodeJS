const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const crudSchema = require("./db/strategies/mongodb/schemas/crudSchema");
const CrudRoute = require("./routes/crudRoute");

const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const app = new Hapi.Server({
  port: 4000
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, crudSchema));

  const swaggerOptions = {
    info: {
      title: 'API - CRUD - #Teste para ViviTech',
      version: 'v1.0'
    },
    lang: 'pt'
  }
  
  await app.register([
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  app.route(
    //new HeroRoute(new MongoDB(connection, crudSchema)).list()
    mapRoutes(new CrudRoute(context), CrudRoute.methods())
  );

  await app.start();
  console.log("Servidor rodando na porta", app.info.port);

  return app;
}

module.exports = main();
