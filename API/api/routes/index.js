const express = require('express');
const data = require('../data/data');
const router = express.Router();



/* GET home page. */
router.get('/', (req, res, next) => {
  res.redirect('/questions')
});


module.exports = router;
