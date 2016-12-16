'use strict';

var jwt = require('jsonwebtoken');

function isLoggedIn(req, res, next) {
	if (req.session && req.session.userID) {
		return next();
  	} else {
  		var err = new Error('User not logged in');
  		err.status = 401;
  		return next(err);
  	}
}

function isLoggedOut(req, res, next) {
	if (req.session && req.session.userID) {
    	var err = new Error('User already logged in');
  		err.status = 401;
  		return next(err);
  	} else {
  		return next();
  	}
}

function authorizeToken(req, res, next) {
	// check header or url parameters or post parameters for token
	console.log('in here');
  	var token = req.body.token || req.query.token || req.headers['token'];
  	// decode token
  	if (token) {
	    // verifies secret and checks exp
	    jwt.verify(token, 'moola-secret-token', function(err, decoded) {      
	      if (err) {
	      	var err = new Error('Failed to authorize token');
  			err.status = 401;
  			return next(err);  
	      } else {
	        req.decoded = decoded;    
	        next();
	      }
	    });
  	} else {
  		var err = new Error('No token provided');
  		err.status = 403;
  		return next(err);  
	}
}

module.exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedOut = isLoggedOut;
module.exports.authorizeToken = authorizeToken;
