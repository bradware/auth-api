'use strict';

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

module.exports.isLoggedIn = isLoggedIn;
module.exports.isLoggedOut = isLoggedOut;