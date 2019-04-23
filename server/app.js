const express = require('express');
const env = require('dotenv').config();

const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authorsRoute = require('./routes/authors');
const authRoute = require('./routes/auth');

const app = express();
const {
  parsed: {
    DB_NAME: dbname,
    DB_USERNAME: dbuser,
    DB_PASSWORD: dbpassword
  }
} = env;

// mongodb connection
mongoose.connect(
  // 'mongodb://localhost/mydb',
  `mongodb://${dbuser}:${dbpassword}@ds141766.mlab.com:41766/${dbname}`,
  { useNewUrlParser: true },
  (err) => {
    if (err) throw err;
    global.console.log('Mongo connected!');
  }
);
mongoose.set('useCreateIndex', true);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', authorsRoute);
app.use('/api', authRoute);
app.get('/api/*', (req, res) => {
  res.status(400).send('Bad request');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res
    .status(err.status || 500)
    .json(err.message);
});

module.exports = app;
