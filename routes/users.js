'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userRouter = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _data = require('../data/data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

userRouter.get('/', function (req, res) {
  res.json(_data.data.users);
});

userRouter.get('/users', function (req, res) {
  res.json(_data.data.users);
});

userRouter.get('/v1', function (req, res) {
  res.json(_data.data.users);
});

userRouter.get('/v1/users', function (req, res) {
  res.json(_data.data.users);
});

exports.userRouter = userRouter;
