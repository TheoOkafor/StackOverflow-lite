const express = require('express');
const data = require('../data/data');
const router = express.Router();

router.get('/users', (req, res, next) => {
  res.json(data.users);
});

router.get('/v1/users', (req, res, next) => {
  res.json(data.users);
});

module.exports = router;