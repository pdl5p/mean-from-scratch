var express = require('express');
var router = express.Router();

router.get('/', (req, resp, next) => {

    resp.render('index.html');

});

module.exports = router;
