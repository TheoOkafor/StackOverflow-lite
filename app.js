import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import userRouter from './server/routes/users';
import { router } from './server/routes';
import { urlErrHandler } from './server/middlewares/urlErrHandler';

const app = express();
const port = process.env.PORT || 3000;

app.use(logger('dev'));

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/v1', router);
app.use('/v1/auth', userRouter);
app.use('/v1', urlErrHandler);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  const mssg = 'Something went wrong';
  res.locals.error = req.app.get('env') === 'development' ? err : mssg;

  // render the error page
  res.status(err.status || 500);
  res.json(err.body || {
    status: 'failed',
  	message: 'Server could not complete request',
  });
  next();
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export { app };
