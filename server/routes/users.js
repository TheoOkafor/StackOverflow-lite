import express from 'express';
import { signinReqValidate } from '../middlewares/signinReqValidate';
import { signupReqValidate } from '../middlewares/signupReqValidate';
import signup from '../controllers/signup';
import signin from '../controllers/signin';

const userRouter = express.Router();
//The user signup router
userRouter.post('/signup', signupReqValidate, signup);
//The user signin router
userRouter.post('/signin', signinReqValidate, signin);

export default userRouter;
