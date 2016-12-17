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
			req.session.userID = user.email;
			var token = jwt.sign({
				data: user.email,
				expiresIn: 1800 }, 
				'moola-secret-token'
			);
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