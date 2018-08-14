const express = require('express');
const data = require('../data/data');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(data.questions);
});

router.get('/questions', (req, res, next) => {
  res.json(data.questions);
});

router.get('/v1', (req, res, next) => {
  res.json(data.questions);
});

router.get('/v1/questions', (req, res, next) => {
  res.json(data.questions);
});

module.exports = router;