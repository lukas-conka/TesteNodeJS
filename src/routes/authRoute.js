const BaseRoutes = require("./base/baseRoute");
const Joi = require("joi");
const Boom = require("boom");

const Jwt = require("jsonwebtoken");
const PasswordHelper = require("./../helpers/passwordHelper");

const USER = {
  username: "lukasconka",
  password: "123"
};

const failAction = (request, headers, error) => {
  throw error;
};

class AuthRoute extends BaseRoutes {
  constructor(secret, db) {
    super();
    this.secret = secret;
    this.db = db;
  }

  login() {
    return {
      method: "POST",
      path: "/login",
      config: {
        auth: false,
        tags: ["api"],
        description: "Obter o token",
        notes: "faz login com user a senha do banco",
        validate: {
          failAction,
          payload: {
            username: Joi.string().required(),
            password: Joi.string().required()
          }
        }
      },
      handler: async request => {
        const { username, password } = request.payload;

        const [usuario] = await this.db.read({
          username: username.toLowerCase()
        });
        if (!usuario) {
          return Boom.unauthorized("O usuario informado não existe.");
        }

        const match = await PasswordHelper.comparePassword(
          password,
          usuario.password
        );

        if(!match){
          return Boom.unauthorized('Usuario ou senha invalidos.')
        }
        /* if (
          username.toLowerCase() !== USER.username ||
          password !== USER.password
        ) {
          return Boom.unauthorized();
        }*/

        const token = Jwt.sign(
          {
            username: username,
            id: usuario.id
          },
          this.secret
        );
        return {
          token
        };
      }
    };
  }
}

module.exports = AuthRoute;
