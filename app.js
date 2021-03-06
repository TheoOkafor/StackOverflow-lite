import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './server/routes/routes';
import router from './server/routes';
import authRouter from './server/routes/auth';
import getValidate from './server/middlewares/getValidate';
import urlErrHandler from './server/middlewares/urlErrHandler';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));


app.use(cors());

app.use(express.static('static'));
app.use('', routes);
app.use('/v1', router);
app.use('/v1/auth', authRouter);
app.use('/v1', getValidate, urlErrHandler);

// error handler
app.use((err, req, res, next) => {
  // render the error
  console.log(err);
  res.status(err.status || 500);
  res.json(err.body || {
    statusCode: 500,
    error: 'Server could not complete request',
  });
  next();
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
