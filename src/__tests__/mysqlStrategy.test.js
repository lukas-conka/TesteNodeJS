const Mysql = require("../db/strategies/mysql");
const Context = require("../db/strategies/base/contextStrategy");

const ContextStrategy = new Context(new Mysql());

const MOCK_CRUD_DEFAULT = {
  nome: "Usuario Teste",
  email: "lukas@hotmail.co.jp"
};

describe("Mysql strategy", function() {
  beforeAll(async () => {
    await ContextStrategy.connect();
  });
  it("Mysql connection", async function() {
    const result = await ContextStrategy.isConnected();
    expect(result).toEqual(true);
  });

  it("Create Crud", async function() {
    const result = await ContextStrategy.create(MOCK_CRUD_DEFAULT);
    delete result.id;
    expect(result).toEqual(MOCK_CRUD_DEFAULT);
  });
  it("Listing Crud", async function(){
    const [result] = await ContextStrategy.read({nome: MOCK_CRUD_DEFAULT.nome})
    console.log(result)
    delete result.id
    expect(result).toEqual(MOCK_CRUD_DEFAULT)
  });

});
