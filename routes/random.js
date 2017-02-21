'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var middleware = require('middleware');
var RANDOM_LENGTH = 10;

router.get('/random', [middleware.isLoggedIn, middleware.authorizeToken], function(req, res, next) {
	var token = req.query.token || req.headers['token'];
  res.status(200);
  res.json({
    header: {
      token: token
    },
    body: {
      string: randomString(RANDOM_LENGTH)
    }
  });
});

var randomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

module.exports = router;
