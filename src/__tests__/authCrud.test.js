const api = require("../api");
const Context = require("./../db/strategies/base/contextStrategy");
const Mysql = require("./../db/strategies/mysql/mysql");
const UsuarioSchema = require("./../db/strategies/mysql/schemas/usuarioSchema");
let app = {};
const USER = {
  username: "lukasconka",
  password: "123"
};

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: "$2b$04$IKKIV/.aCWMgRw2ABNtd5ONx9S4QF1TAFcj.ztasvgGnIPkkRndd."
};

describe("Authentication", () => {
  beforeAll(async () => {
    app = await api;
    const connectionMysql = await Mysql.connect();
    const model = await Mysql.defineModel(connectionMysql, UsuarioSchema);
    const mysql = new Context(new Mysql(connectionMysql, model))
    await mysql.update(null, USER_DB, true);
  });

  it("deve obter um token", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/login",
      payload: USER
    });
    console.log('result', result.payload);

    const statusCode = result.statusCode;
    const dados = JSON.parse(result.payload);

    console.log(dados.token);

    expect(statusCode).toEqual(200);
    //expect(true).toBe(dados.token.length > 10);
  });
});
