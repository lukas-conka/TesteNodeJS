  const Mongoose = require("mongoose");

    const crudSchema = new Mongoose.Schema({
      nome: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      }
    });

   module.exports = Mongoose.model("crud", crudSchema);
  