const express = require('express');
const data = require('../data/data');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.json(data.users);
  next();
});

router.get('/users', (req, res, next) => {
  res.json(data.users);
  next();
});

router.get('/v1', (req, res, next) => {
  res.json(data.users);
  next();
});

router.get('/v1/users', (req, res, next) => {
  res.json(data.users);
  next();
});


module.exports = router;
