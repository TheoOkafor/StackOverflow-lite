'use strict';

var express = require('express');
var data = require('../data/data');
var router = express.Router();

/* GET home page. */
router.get('/questions', function (req, res, next) {
  res.json(data.questions);
});

module.exports = router;
