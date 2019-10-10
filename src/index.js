const ContextStrategy = require("./db/strategies/base/contextStrategy");
const  MongoDB = require("./db/strategies/mongodb");
const  MySQL  = require("./db/strategies/mysql");

const contextMongo = new ContextStrategy(new MongoDB());

contextMongo.create();

const contextMysql = new ContextStrategy(new MySQL());

contextMysql.create();
