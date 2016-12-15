'use strict';

require('rootpath')();

// Required modules
var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Required routes
var registerRoute = require('routes/register');
var loginRoute = require('routes/login');
var port = process.env.PORT || 3000;

// Create our Express application
var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Mongo
mongoose.connect('mongodb://localhost:27017/moola');
var db = mongoose.connection;

db.on('error', function(err) { 
	console.error('Connection error to Moola DB:', err); 
});

db.once('open', function() { 
	console.error('Connection successful to Moola DB'); 
});

// Connect all our routes with /api/v1
app.use('/api/v1', registerRoute);
app.use('/api/v1', loginRoute);

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
