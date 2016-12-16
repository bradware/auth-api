'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var middleware = require('middleware');
var jwt = require('jsonwebtoken');
var User = require('models/user');

router.use('/login', middleware.isLoggedOut, function(req, res, next) {
	if (req.body.email && req.body.password) {
		next();
	} else {
		var err = new Error('Email and password are required');
		err.status = 401;
		return next(err);
	}
});

router.post('/login', function(req, res, next) {
	User.authenticate(req.body.email, req.body.password, function(error, user) {
		if (error) {
			next(error);
		} else {
			// Password matched
			req.session.userID = user._id;
			var token = jwt.sign(user, 'moola-secret-token', {
				expiresIn: 1800 // seconds for 30 minutes of time
			});
			res.status(200);
			res.json({
				header: {
					token: token
				},
				body: {
					user: user
				}
			});
		}
	});
});

module.exports = router;