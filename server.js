'use strict';

require('rootpath')();

// Required modules
var express = require('express');
var mongoose = require('mongoose');
var helmet = require('helmet');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Required routes
var registerRoute = require('routes/register');
var loginRoute = require('routes/login');
var logoutRoute = require('routes/logout');

// Constants
var port = process.env.PORT || 3000;
var route_prefix = '/api/v1';

// Create our Express application
var app = express();

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/moola');
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', function(err) { 
	console.error('Connection error to Moola DB:', err); 
});

// Middleware setup
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Session & Token management setup
var sess = {
  secret: 'moola-secret-key',
	resave: true,
	saveUninitialized: false,
	store: new MongoStore({mongooseConnection: db}),
	cookie: {maxAge: 300000}
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess));
app.use(function(req, res, next) {
	res.locals.currentUser = req.session.userID;
	next();
});

// Connect all our routes with /api/v1
app.use(route_prefix, registerRoute);
app.use(route_prefix, loginRoute);
app.use(route_prefix, logoutRoute);

// Catch unused requests
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error handler, has to take in 4 params
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

app.listen(port, function() { 
	console.log('Server is running on port', port); 
});
