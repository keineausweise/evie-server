const DbFacade = require("./../db/DbFacade");

module.exports = class GetTasksHandler{
    async handle(dbName, body){
        return await DbFacade.createTask(dbName, body);
    }
}