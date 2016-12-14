'use strict';

var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
	first_name: {type: String, required: true},
	last_name: {type: String, required: true},
	date_of_birth: {type: String, required: true},
	created_at: {type: Date, default: Date.now},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	phone_number: {type: String, required: true},
	address: {
		street: {type: String, required: true},
		city: {type: String, required: true},
		state: {type: String, required: true},
		postal_code: {type: String, required: true},
		display_address: {type: String, required: true}
	},
	account: {
		routing_number: {type: String, required: true},
		account_number: {type: String, required: true},
		ssn4: {type: String, required: true}
	},
	children: [{
		first_name: {type: String, required: true},
		last_name: {type: String, required: true},
		date_of_birth: {type: String, required: true},
		created_at: {type: Date, default: Date.now}
	}]
});

var User = mongoose.model('User', UserSchema, 'users');

module.exports = User;

