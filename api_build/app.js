import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

import {questionRouter} from './routes/questions';
//import {userRouter} from './routes/users';

const app = express();

app.use(logger('dev'));

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(cookieParser());


app.use('/', questionRouter);
//app.use('/users', userRouter);
//app.use('/v1/users', userRouter);
app.use('/questions', questionRouter);
app.use('/v1/questions', questionRouter);


// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : 'Something went wrong';

  // render the error page
  res.status(err.status || 500);
  res.send('error');
  next();
});

// listen for requests
app.listen(process.env.PORT || 5000, () => {
  console.log('Server is listening');
});

export {app};
