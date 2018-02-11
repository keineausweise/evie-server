const mongoose = require("mongoose");
const TaskScheme = require("./Schema/Task");

function buildConntectionString(host, port, dbName){
    return `mongodb://${host}:${port}/${dbName}`;
}

module.exports = class MoDb{
    constructor(dbName){
        const settings = global.server_settings;
        this._connection = mongoose.createConnection(buildConntectionString(settings.db.host, settings.db.port, dbName));
        this._TaskModel = this._connection.model("Task", TaskScheme);
    }

    getAllTasks(){
        return new Promise((resolve => {
            this._TaskModel.find(resolve);
        }))
    }
}