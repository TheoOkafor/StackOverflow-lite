import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';

import { router } from './routes';

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));

// parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/json' }));

app.use('/v1', router);

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
  res.json({status: 'failed',
  	message: 'Server could not complete request'
  });
  next();
});

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export {app};
