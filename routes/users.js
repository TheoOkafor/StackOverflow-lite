const express = require('express');
const data = require('../data/data');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(data.users);
});

router.get('/users', (req, res) => {
  res.json(data.users);
});

router.get('/v1', (req, res) => {
  res.json(data.users);
});

router.get('/v1/users', (req, res) => {
  res.json(data.users);
});


module.exports = router;
