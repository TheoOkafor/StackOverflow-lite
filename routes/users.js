import express from 'express';
import {data} from '../data/data';

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.json(data.users);
});

userRouter.get('/users', (req, res) => {
  res.json(data.users);
});

userRouter.get('/v1', (req, res) => {
  res.json(data.users);
});

userRouter.get('/v1/users', (req, res) => {
  res.json(data.users);
});


export {userRouter};
