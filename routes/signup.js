'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var User = require('models/user');

router.route('/signup')
	.post(function(req, res, next) {
		console.log('Using POST for SIGNUP');
		next();
	});


module.exports = router;
