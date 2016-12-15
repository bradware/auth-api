'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var User = require('models/user');

router.use('/register', function(req, res, next) {
	if (req.body.first_name && req.body.last_name && req.body.date_of_birth && req.body.email && req.body.password && req.body.phone_number 
	  && req.body.address && req.body.account) {
		next();
	} else {
		var err = new Error('All fields are requried to register');
		err.status = 400;
		return next(err);
	}
}, function(req, res, next) {
	if (req.body.address.street && req.body.address.city && req.body.address.state && req.body.address.postal_code) {
		next();
	} else {
		var err = new Error('All address fields are requried to register');
		err.status = 400;
		return next(err);
	}
}, function(req, res, next) {
	if (req.body.account.account_number && req.body.account.routing_number && req.body.account.ssn4) {
		next();
	} else {
		var err = new Error('All account fields are requried to register');
		err.status = 400;
		return next(err);
	}	
});

router.post('/register', function(req, res, next) {
	var user = new User(req.body);
	user.save(function(err, newUser) {
		if (err) {
			return next(err);
		} else {
			req.session.userID = user._id;
			res.status(201);
			res.json(newUser);
		}
	});
});

module.exports = router;
