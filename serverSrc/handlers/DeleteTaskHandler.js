const DbFacade = require("./../db/DbFacade");

module.exports = class GetTasksHandler{
    async handle(dbName, bodySelect){
        console.log("delete", bodySelect);
        if (bodySelect._id) { bodySelect = {_id: bodySelect._id} };
        console.log("delete post", bodySelect);
        return await DbFacade.deleteTask(dbName, bodySelect);
    }
}