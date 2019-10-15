const BaseRoutes = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const failAction = (request, headers, error) => {
  throw error;
};

class CrudRoutes extends BaseRoutes {
  constructor(db) {
    super();
    this.db = db;
  }

  list() {
    return {
      config: {
        validate: {
          failAction,
          query: {
            skip: Joi.number()
              .integer()
              .default(0),
            limit: Joi.number()
              .integer()
              .default(10),
            nome: Joi.string()
              .min(3)
              .max(100)
          }
        }
      },
      path: "/listar",
      method: "GET",
      handler: (request, headers) => {
        try {
          const { skip, limit, nome } = request.query;
          let query = nome ? { nome: nome } : {};

          return this.db.read(query, skip, limit);
        } catch (error) {
          console.log("Erro na leitura dos dados", error);
          return Boom.internal();
        }
      }
    };
  }

  create() {
    return {
      path: "/cadastrar",
      method: "POST",
      config: {
        validate: {
          failAction,
          payload: {
            nome: Joi.string()
              .required()
              .min(3)
              .max(100),
            email: Joi.string()
              .required()
              .min(2)
              .max(70)
          }
        }
      },
      handler: async request => {
        try {
          const { nome, email } = request.payload;
          const result = await this.db.create({
            nome,
            email
          });
          return { message: "Cadastrado com sucesso.", _id: result._id };
        } catch (error) {
          console.log("Erro na requisicao ", error);
          return Boom.internal();
        }
      }
    };
  }

  update() {
    return {
      path: "/atualizar/{id}",
      method: "PATCH",
      config: {
        validate: {
          params: {
            id: Joi.string().required()
          },
          payload: {
            nome: Joi.string()
              .min(3)
              .max(70),
            email: Joi.string()
              .min(3)
              .max(70)
          }
        }
      },

      handler: async request => {
        try {
          const { id } = request.params;
          const { payload } = request;

          const dadosString = JSON.stringify(payload);
          const dados = JSON.parse(dadosString);

          const result = await this.db.update(id, dados);
          if (result.nModified !== 1)
            return Boom.preconditionFailed("Id não encontrado.");
          return {
            message: "Atualizado com sucesso."
          };
        } catch (error) {
          console.log("erro na requisicao", error);
          return Boom.internal();
        }
      }
    };
  }

  delete() {
    return {
      path: "/remover/{id}",
      method: "DELETE",
      config: {
        validate: {
          failAction,
          params: {
            id: Joi.string().required()
          }
        }
      },
      handler: async request => {
        try {
          const { id } = request.params;
          const result = await this.db.delete(id);
          if (result.n !== 1) {
            return Boom.preconditionFailed("Id não encontrado.");
          }

          return {
            message: "Removido com sucesso."
          };
        } catch (error) {
          console.log("Falha na requisicao".error);
          return Boom.internal();
        }
      }
    };
  }
}

module.exports = CrudRoutes;
