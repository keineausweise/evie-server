const express = require('express');
const router  = express.Router();
const GetTasksHandler = require("./handlers/GetTasksHandler");

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

module.exports = router;