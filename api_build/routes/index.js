const express = require('express');
const router = express.Router();

const questions = require('../data/questions');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'hooray! welcome to Theo\'s api!' });
});

module.exports = router;
