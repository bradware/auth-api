'use strict';

require('rootpath')();

var express = require('express');
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var signupRoute = require('routes/signup');
var port = process.env.PORT || 3000;

// Create our Express application
var app = express();

// Middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Register all our routes with /api/v1
app.use('/api/v1', signupRoute);

// Start the server
app.listen(port);
