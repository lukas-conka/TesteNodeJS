class NotImplementedExpection extends Error {
    constructor(){
        super("Not implemented expection")
    }
}
 class ICrud {
    create(item){
        throw new NotImplementedExpection()
    }

    read(query){
        throw new NotImplementedExpection()
    }

    update(id, item){
        throw new NotImplementedExpection()
    }

    delete(id){
        throw new  NotImplementedExpection()
    }
}

module.exports = ICrud
