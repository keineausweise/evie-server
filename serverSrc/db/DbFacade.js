const MoDb = require("./mongo/MoDb");

const cache = {};

class DbFacade{
    async getTasksInBoard(boardName){
        const mo = this.getMoDb(this.boardNameToDbName(boardName));
        return await mo.getAllTasks();
    }

    async createTask(boardName, fields){
        const mo = this.getMoDb(this.boardNameToDbName(boardName));
        return await mo.insertTask(fields);
    }

    async updateTask(boardName, fieldsSelect, fieldsUpdate){
        const mo = this.getMoDb(this.boardNameToDbName(boardName));
        return await mo.updateTask(fieldsSelect, fieldsUpdate);
    }

    async deleteTask(boardName, fieldsSelect){
        const mo = this.getMoDb(this.boardNameToDbName(boardName));
        return await mo.deleteTask(fieldsSelect);
    }

    getMoDb(dbName){
        if (!cache[dbName]){
            cache[dbName] = new MoDb(dbName);
        }
        return cache[dbName];
    }

    boardNameToDbName(boardName){
        return encodeURIComponent(boardName);
    }
}

module.exports = new DbFacade();