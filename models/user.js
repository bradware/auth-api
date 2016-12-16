'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;

var UserSchema = mongoose.Schema({
	first_name: {type: String, required: true, trim: true},
	last_name: {type: String, required: true, trim: true},
	date_of_birth: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	email: {type: String, required: true, unique: true, trim: true},
	password: {type: String, required: true},
	phone_number: {type: String, required: true},
	address: {
		street: {type: String, required: true, trim: true},
		city: {type: String, required: true, trim: true},
		state: {type: String, required: true},
		postal_code: {type: String, required: true, trim: true}
	},
	account: {
		routing_number: {type: String, required: true, trim: true},
		account_number: {type: String, required: true, trim: true},
		ssn4: {type: String, required: true, trim: true}
	},
	children: [{
		first_name: {type: String, required: true, trim: true},
		last_name: {type: String, required: true, trim: true},
		date_of_birth: {type: String, required: true},
		created_at: {type: Date, default: Date.now}
	}]
});

// Authenticate user against database
UserSchema.statics.authenticate = function(email, password, callback) {
	User.findOne({email: email}).exec(function(error, user) {
		if (error) {
			// Mongo returned an error
			callback(error);
		} else if (!user) { 
			// No user was found
			var err = new Error('Email not found');
			err.status = 401;
			callback(err);
		} else { 
			// Found user so comparing password to hashed/salted version in Mongo
			bcrypt.compare(password, user.password, function(error, result) {
				if (result) {
					// Password matched, returning the user
					return callback(null, user);
				} else {
					// Password did not match the email
					var err = new Error('Wrong password');
					err.status = 401;
					return callback(err, null);
				}
			});
		}
	});
}

// Hash & Salt password, ssn4 before saving to Mongo
UserSchema.pre('save', function(next) {
	// Salts & hashes password
	var user = this;
	bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
		if (err) {
			return next(err);
		} else {
			user.password = hash;
			bcrypt.hash(user.account.ssn4, SALT_ROUNDS, function(err, hash) {
				if (err) {
					return next(err);
				} else {
					user.account.ssn4 = hash;
					next();
				}
			});
		}
	});
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

