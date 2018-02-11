const MoDb = require("./mongo/MoDb");

const cache = {};

class DbFacade{
    async getTasksInBoard(boardName){
        const mo = this.getMoDb(this.boardNameToDbName(boardName));
        return await mo.getAllTasks();
    }

    getMoDb(dbName){
        if (cache[dbName]){
        }else{
            cache[dbName] = new MoDb(dbName);
        }
        return cache[dbName];
    }

    boardNameToDbName(boardName){
        return encodeURIComponent(boardName);
    }
}

module.exports = new DbFacade();