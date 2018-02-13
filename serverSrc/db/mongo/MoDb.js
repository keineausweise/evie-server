const mongoose = require("mongoose");
const TaskScheme = require("./Schema/Task");

function buildConntectionString(host, port, dbName){
    return `mongodb://${host}:${port}/${dbName}`;
}

module.exports = class MoDb{
    constructor(dbName){
        const settings = global.server_settings;
        this._connection = mongoose.createConnection(buildConntectionString(settings.db.host, settings.db.port, dbName));
        this._TaskModel = this._connection.model(settings.db.collections.tasks, TaskScheme);
    }

    getAllTasks(){
        return new Promise((resolve, reject) => {
            this._TaskModel.find()
                .where('hidden').ne(true)
                .sort('-meta.emergencyScore')
                .sort('-date')
                .exec(function(err, tasks){
                    if (err) {return reject(err);}
                    resolve(tasks);
                });
        })
    }

    insertTask(fields){
        return new Promise((resolve, reject) => {
            this._TaskModel.create(fields, (err, t)=>{
                if (err){
                    reject(err);
                }else{
                    resolve(t);
                }
            });
        })
    }

    updateTask(fieldsSelect, fieldsUpdate){
        return new Promise((resolve, reject)=>{
            this._TaskModel.update(fieldsSelect, {$set: fieldsUpdate}, err=>{
                if (err) return reject(err);
                resolve();
            })
        });
    }

    deleteTask(fieldsSelect){
        return new Promise((resolve, reject)=>{
            this._TaskModel.remove(fieldsSelect, err=>{
                if (err) return reject(err);
                resolve();
            });
        });
    }
}