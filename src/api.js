const { config } = require('dotenv')
const { join } = require('path')

const env = process.env.NODE_ENV || "dev";

const configPath = join(__dirname, './config', `.env.${env}`)

console.log(configPath)

config({
  path: configPath
})

const Hapi = require("hapi");
const Context = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb/mongodb");
const crudSchema = require("./db/strategies/mongodb/schemas/crudSchema");
const CrudRoute = require("./routes/crudRoute");
const AuthRoute = require("./routes/authRoute");

const Mysql = require('./db/strategies/mysql/mysql')
const UsuarioSchema = require('./db/strategies/mysql/schemas/usuarioSchema')

const HapiJwt = require('hapi-auth-jwt2')
const HapiSwagger = require('hapi-swagger')
const Vision = require('vision')
const Inert = require('inert')

const JWT_SECRET = process.env.JWT_KEY;

const app = new Hapi.Server({
  port: process.env.PORT
});

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]());
}

async function main() {
  const connection = MongoDB.connect();
  const context = new Context(new MongoDB(connection, crudSchema));

  const connectionMysql = await Mysql.connect();
  const model = await Mysql.defineModel(connectionMysql, UsuarioSchema)
  const contextMysql = new Context(new Mysql(connectionMysql, model))

  const swaggerOptions = {
    info: {
      title: 'API - CRUD - #Teste para ViviTech',
      version: 'v1.0'
    },
    lang: 'pt'
  }
  
  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ]);

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    /*options: {
      expiresIn: 20
    }
    */
    validate: async (dado, request) => {

      const [result] = await contextMysql.read({
        username: dado.username.toLowerCase()
      })

      if(!result){
        return {
          isValid: false  
        }
      }

      return {
        isValid: true
      }
    }
  })
  app.auth.default('jwt')

  app.route([
    //new HeroRoute(new MongoDB(connection, crudSchema)).list()
    ...mapRoutes(new CrudRoute(context), CrudRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextMysql), AuthRoute.methods())

  ]);

  await app.start();
  console.log("Servidor rodando na porta", app.info.port);

  return app;
}

module.exports = main();
