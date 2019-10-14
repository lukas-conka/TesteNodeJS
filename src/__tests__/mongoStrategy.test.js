const MongoDB = require("../db/strategies/mongodb/mongodb");
const Context = require("../db/strategies/base/contextStrategy");
const CrudSchema = require("./../db/strategies/mongodb/schemas/crudSchema");
const MOCK_CRUD_DEFAULT = {
  nome: "Usuario Teste",
  email: "lukas@hotmail.co.jp"
};

const MOCK_CRUD_ATUALIZAR = {
  nome: "Usuario para Atualizar",
  email: "lukas@hotmail.co.jp"
};

let MOCK_CRUD_ID = "";

let ContextStrategy = {};

describe("MongoDB Testes", () => {
  beforeAll(async () => {
    const connection = MongoDB.connect();
    ContextStrategy = new Context(new MongoDB(connection, CrudSchema))
    const result = await ContextStrategy.create(MOCK_CRUD_ATUALIZAR);
    MOCK_CRUD_ID = result._id;
  });
  it("Verify connection", async () => {
    const result = await ContextStrategy.isConnected();
    expect(result).toBe("Conectado");
  });

  it("Create crud", async () => {
    const { nome, email } = await ContextStrategy.create(MOCK_CRUD_DEFAULT);

    expect({ nome, email }).toEqual(MOCK_CRUD_DEFAULT);
  });

  it("listar crud", async () => {
    const [{ nome, email }] = await ContextStrategy.read({
      nome: MOCK_CRUD_DEFAULT.nome
    });
    const result = {
      nome,
      email
    };
    expect(result).toEqual(MOCK_CRUD_DEFAULT);
  });

  it("update crud", async () => {
    const result = await ContextStrategy.update(MOCK_CRUD_ID, {
      nome: "Novo usuario alterado teste"
    });

    expect(result.nModified).toEqual(1);
  });

  it("delete crud", async () => {
    const result = await ContextStrategy.delete(MOCK_CRUD_ID);
    expect(result.n).toEqual(1);
  });
});
