import express from 'express';
import signup from '../controllers/signup';
import signin from '../controllers/signin';

const userRouter = express.Router();

userRouter.post('/signup', signup);

userRouter.post('/signin', signin);

export default userRouter;
