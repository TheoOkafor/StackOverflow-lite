import express from 'express';
import { signinReqValidate } from '../middlewares/signinReqValidate';
import { signupReqValidate } from '../middlewares/signupReqValidate';
import authValidate from '../middlewares/authValidate';
import signup from '../controllers/signup';
import signin from '../controllers/signin';
import logout from '../controllers/logout';

const authRouter = express.Router();
//The user signup router
authRouter.post('/signup', signupReqValidate, signup);
//The user signin router
authRouter.post('/signin', signinReqValidate, signin);
//Logout
authRouter.get('/logout', logout);

export default authRouter;
