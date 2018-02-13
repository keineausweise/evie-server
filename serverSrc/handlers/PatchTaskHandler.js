const DbFacade = require("./../db/DbFacade");
const dequal = require("deep-equal");

module.exports = class GetTasksHandler{
    async handle(dbName, bodySelect, bodyUpdate){
        console.log("update", bodySelect, bodyUpdate);
        Object.keys(bodyUpdate).forEach(k=>{
            if (dequal(bodyUpdate[k], bodySelect[k])){
                delete bodyUpdate[k];
            }
        });
        if (bodySelect._id) { bodySelect = {_id: bodySelect._id} };
        delete bodyUpdate._id;
        delete bodyUpdate.__v;
        console.log("update post", bodySelect, bodyUpdate);
        return await DbFacade.updateTask(dbName, bodySelect, bodyUpdate);
    }
}