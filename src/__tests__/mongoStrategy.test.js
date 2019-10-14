const MongoDB = require("../db/strategies/mongodb");
const Context = require("../db/strategies/base/contextStrategy");

const ContextStrategy = new Context(new MongoDB());
describe('MongoDB Testes', () =>{
    beforeAll(async ()=> {
        await ContextStrategy.connect();
    })
    it('Verify connection', async () =>{
        const result = await ContextStrategy.isConnected()
        expect(result).toBe('Conectado') 
    })

    it('Create crud', async () => {
        
    })
})