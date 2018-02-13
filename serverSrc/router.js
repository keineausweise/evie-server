const express = require('express');
const router  = express.Router();
const GetTasksHandler = require("./handlers/GetTasksHandler");
const PutTaskHandler = require("./handlers/PutTaskHandler");
const PatchTaskHandler = require("./handlers/PatchTaskHandler");
const DeleteTaskHandler = require("./handlers/DeleteTaskHandler");

router.get('/status', (req, res) => {
    res.json({status: 'running'})
});

router.get('/:boardName', function(req, res) {
    res.render('index', {locals: {boardName: req.params.boardName}});
});

router.get('/:boardName/tasks', function(req, res) {
    new GetTasksHandler().handle(req.params.boardName).then(tasks=>{
        res.json(tasks);
    }).catch(e=>{
        console.warn(e);
        res.status(500).send();
    });
});

router.put('/:boardName/task', function(req, res){
    new PutTaskHandler().handle(req.params.boardName, req.body).then((t)=>{
        res.json({"got":"it", t: t});
    }).catch(e=>{
        res.status(500).json({
            error: "Error while creating task.",
            details: e,
            details_str: e.toString()
        });
    })
});

router.patch('/:boardName/task', function (req, res) {
    new PatchTaskHandler().handle(req.params.boardName, req.body.was, req.body.now).then(()=>{
        res.json({patch: "done"});
    }).catch(e=>{
        res.status(500).json({
            error: "Error while updating task.",
            details: e,
            details_str: e.toString()
        });
    });
});

router.delete('/:boardName/task', function (req, res) {
    new DeleteTaskHandler().handle(req.params.boardName, req.body).then(()=>{
        res.json({delete: "done"});
    }).catch(e=>{
        res.status(500).json({
            error: "Error while deleting task.",
            details: e,
            details_str: e.toString()
        });
    });
});

module.exports = router;