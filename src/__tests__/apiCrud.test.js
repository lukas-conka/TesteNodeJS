const api = require("./../api");
let app = {};

const MOCK_CRUD_CADASTRAR = {
  nome: "Maria Rosario",
  email: "maria@email.com"
};

const MOCK_CRUD_ATUALIZAR = {
  nome: "Joao para Atu",
  email: "joao@email.com"
};

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1a2FzY29ua2EiLCJpZCI6MSwiaWF0IjoxNTcxMzIwOTE4fQ.9EyoFRiCnJ4RqZllYibDvmRV1Lm6777W5KaknGroXvI"

const headers = {
  Authorization: TOKEN
}
let MOCK_ID = {};

describe("Testes da Api", () => {
  beforeAll(async () => {
    app = await api;
    const result = await app.inject({
      method: "POST",
      url: "/cadastrar",
      payload: MOCK_CRUD_ATUALIZAR
    });

    const dados = JSON.parse(result.payload);
    MOCK_ID = dados._id;
  });

  it("Crud /listar", async () => {
    const result = await app.inject({
      method: "GET",
      url: "/listar",
      headers
    });
    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    expect(statusCode).toEqual(200);
    expect(true).toBe(Array.isArray(dados));
  });

  it("Crud Listar 10 registros", async () => {
    const TAMANHO_LIMIT = 3;
    const result = await app.inject({
      method: "GET",
      url: `/listar?skip=0&limit=${TAMANHO_LIMIT}`,
      headers
    });

    const dados = JSON.parse(result.payload);
    const statusCode = result.statusCode;
    expect(statusCode).toEqual(200);
  });

  it("Crud create POST /cadastrar", async () => {
    const result = await app.inject({
      method: "POST",
      url: "/cadastrar",
      payload: MOCK_CRUD_CADASTRAR,
      headers
    });

    const statusCode = result.statusCode;
    const { message, _id } = JSON.parse(result.payload);
    expect(message).toEqual("Cadastrado com sucesso.");
    expect(statusCode).toEqual(200);
  });

  it("Crud update PUT /atualizar", async () => {
		const _id = MOCK_ID
		const expected = {
			nome: "Joao ok"
		}

    const result = await app.inject({
      method: "PATCH",
      url: `/atualizar/${_id}`,
      payload: JSON.stringify(expected),
      headers
    });

    const statusCode = result.statusCode;
		const {message} = JSON.parse(result.payload)

    expect(message).toEqual("Atualizado com sucesso.");
    expect(statusCode).toEqual(200);
  });

	it("Crud remover DELETE /remover", async () => {
		const _id = MOCK_ID

    const result = await app.inject({
      method: "DELETE",
      url: `/remover/${_id}`,
      headers
    });

    const statusCode = result.statusCode;
		const {message} = JSON.parse(result.payload)

    expect(message).toEqual("Removido com sucesso.");
    expect(statusCode).toEqual(200);
  });
});
