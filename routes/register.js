'use strict';

require('rootpath')();

var express = require('express');
var router = express.Router();
var middleware = require('middleware');
var jwt = require('jsonwebtoken');
var User = require('models/user');

router.use('/register', function(req, res, next) {
  if (req.body.first_name && req.body.last_name && req.body.date_of_birth && req.body.email && req.body.password && req.body.phone_number 
    && req.body.address) {
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
      var err = new Error('All address fields are required to register');
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
      req.session.userID = newUser.email;
      var token = jwt.sign({data: newUser.email}, 'very-secret-token', {expiresIn: '1h'});
      res.status(201);
      res.json({
        header: {
          token: token
        },
        body: {
          user: newUser
        }
      });
    }
  });
});

module.exports = router;
