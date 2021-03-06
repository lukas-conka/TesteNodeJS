const Mysql = require("../db/strategies/mysql/mysql");
const Context = require("../db/strategies/base/contextStrategy");
const CrudSchema = require("./../db/strategies/mysql/schemas/crudSchema");

const MOCK_CRUD_DEFAULT = {
  nome: "Usuario Teste",
  email: "lukas@hotmail.co.jp"
};

const MOCK_CRUD_ATUALIZAR = {
  nome: "Usuario Para atualizar",
  email: "lukas@hotmail.co.jp"
};

let ContextStrategy = {};

describe("Mysql strategy", function() {
  beforeAll(async () => {
    const connection = await Mysql.connect();
    const model = await Mysql.defineModel(connection, CrudSchema)
    ContextStrategy = new Context(new Mysql(connection, model))
    await ContextStrategy.delete();
    await ContextStrategy.create(MOCK_CRUD_ATUALIZAR);
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
  it("Listing Crud", async function() {
    const [result] = await ContextStrategy.read({
      nome: MOCK_CRUD_DEFAULT.nome
    });
    delete result.id;
    expect(result).toEqual(MOCK_CRUD_DEFAULT);
  });
  it("Update Crud", async function() {
    const [itemAtualizar] = await ContextStrategy.read({
      nome: MOCK_CRUD_ATUALIZAR.nome
    });
    const novoItem = {
      ...MOCK_CRUD_ATUALIZAR,
      nome: "Nome atualizado"
    };
    const [result] = await ContextStrategy.update(itemAtualizar.id, novoItem);
    const [itemAtualizado] = await ContextStrategy.read({
      id: itemAtualizar.id
    });
    expect(itemAtualizado.nome).toEqual(novoItem.nome);
  });

  it("delete by id", async function() {
    const [item] = await ContextStrategy.read({});
    const result = await ContextStrategy.delete(item.id);
    expect(result).toBe(1);
  });
});
