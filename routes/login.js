'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var User = require('models/user');

router.route('/login')
	.post(function(req, res, next) {
		
	});

module.exports = router;