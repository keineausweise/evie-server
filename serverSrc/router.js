const express = require('express');
const router  = express.Router();

router.get('/status', (req, res) => {
    res.json({status: 'running'})
});

router.get('/:boardName', function(req, res) {
    res.render('index', {locals: {boardName: req.params.boardName}});
});

module.exports = router;