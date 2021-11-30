var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:userId', function(req, res, next) {
    // gets result that matches the userid eg: SELECT * WHERE userid = ?
});

router.post('/add', function(req, res, next) {
    // if result exist for user update, else add new result
    // The following link has some info on how to do that
    // https://dba.stackexchange.com/questions/89696/how-to-insert-or-update-using-single-query
});

module.exports = router;