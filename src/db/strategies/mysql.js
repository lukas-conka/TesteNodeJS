const ICrud = require("./interfaces/interfaceCrud");

class MySQL extends ICrud {
    constructor(){
        super()
    }

    create(item){
        console.log('o item foi salvo no MYSQL')
    }
}

module.exports = MySQL
