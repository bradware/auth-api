'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var User = require('models/user');

router.route('/signup')
	.post(function(req, res, next) {
		var user = new User(req.body);
		user.save(function(err, newUser) {
			if (err) console.log(err); return next(err);
			res.status(201);
			res.json(newUser);
		});
	});

module.exports = router;
