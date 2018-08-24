import express from 'express';
import signup from '../controllers/signup';

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', (req, res) => {
  res.json('signin not implemented');
});

export default userRouter;
