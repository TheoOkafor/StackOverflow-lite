var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to Theo\'s api!' });
});

module.exports = router;
