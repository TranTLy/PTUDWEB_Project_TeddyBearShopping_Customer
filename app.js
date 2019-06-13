var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/database');
var passport = require('passport');
const session = require('express-session');
require('./config/passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.connect(config.database, { useCreateIndex: true, useNewUrlParser: true }, (err, res) => {
	if (!err) {
		console.log('connect to database successfully!');
	}
});
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
	session({
		secret: config.secret,
		saveUninitialized: true,
		resave: true
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
	// set locals, only providing error in development
	res.locals.user = req.cookies.user || null;
	console.log('name user : log in app.js', req.cookies.user);
	next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
