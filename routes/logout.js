'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var middleware = require('middleware');

router.get('/logout', [middleware.isLoggedIn, middleware.authorizeToken], function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) {
      return next(err);
    } else {
      return res.json({
        success: {
          message: 'User logged out'
        }
      });
    }
  });
});

module.exports = router;
