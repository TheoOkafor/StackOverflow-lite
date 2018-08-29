import express from 'express';
import { signinReqValidate } from '../middlewares/signinReqValidate';
import { signupReqValidate } from '../middlewares/signupReqValidate';
import authValidate from '../middlewares/authValidate';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import logout from '../controllers/logout';
import user from '../controllers/user';

const userRouter = express.Router();
//The user signup router
userRouter.post('/signup', signupReqValidate, signup);
//The user signin router
userRouter.post('/signin', signinReqValidate, signin);
//The User
userRouter.get('/auth', authValidate, user);
//Logout
userRouter.get('/logout', logout);

export default userRouter;
