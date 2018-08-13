const express = require('express');
const data = require('../data/data');
const router = express.Router();



/* GET home page. */
router.get('/questions', (req, res, next) => {
  res.json(data.questions[0]);
});

module.exports = router;