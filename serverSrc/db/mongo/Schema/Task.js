const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    status: {type: String, default: "In Background"},
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        emergencyScore: {type: Number, default: 1}
    },
    tags: [String],
    visual: {
        color: String
    }
});

module.exports = taskSchema;