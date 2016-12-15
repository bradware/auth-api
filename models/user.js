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

UserSchema.pre('save', function(next) {
	// hash function will salt & hash password
	var user = this;
	bcrypt.hash(user.password, SALT_ROUNDS, function(err, hash) {
		if (err) {
			return next(err);
		} else {
			user.password = hash;
		}
	});
	bcrypt.hash(user.account.ssn4, SALT_ROUNDS, function(err, hash) {
		if (err) {
			return next(err);
		} else {
			user.account.ssn4 = hash;
			next();
		}
	});
});

var User = mongoose.model('User', UserSchema);

module.exports = User;

