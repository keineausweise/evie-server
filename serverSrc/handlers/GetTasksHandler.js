const DbFacade = require("./../db/DbFacade");

module.exports = class GetTasksHandler{
    async handle(dbName){
        const tasks = await DbFacade.getTasksInBoard(dbName);
        return tasks;
    }
}