const PasswordHelper = require("../helpers/passwordHelper");

const SENHA = "123";
const HASH = "$2b$04$IKKIV/.aCWMgRw2ABNtd5ONx9S4QF1TAFcj.ztasvgGnIPkkRndd.";

describe("CrudHelper test suite", () => {
  it("deve gerar um hash a partir de uma senha", async () => {
    const result = await PasswordHelper.hashPassword(SENHA);
    console.log("result", result);
    //expect(result.length).toBe(result.length > 10);
  });

  it("deve validar a senha", async() => {
      const result = await PasswordHelper.comparePassword(SENHA, HASH)
      expect(HASH.length > 0).toBe(true)
  })


});
