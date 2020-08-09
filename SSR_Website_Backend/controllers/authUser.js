const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
	 const errors = validationResult(req);
	 if (!errors.isEmpty()) {
	 	console.log(errors);
	// 	const error = new Error('Validation failed');
	// 	error.statusCode = 422;
	// 	error.data = error.array();
	// 	throw error;
	 }
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password; 
	bcrypt
	.hash(password, 12)
	.then(hashedPw => {
		const user = new User({
			name: name,
			email: email,
			password: hashedPw
		});
		return user.save();
	})
	.then(result => {
		res.status(201).json({ message: 'User created!', userId: result._id });
	})
	.catch(err => {
		console.log(err);
		next(err);
	})
};

exports.login = (req, res, next) => {
	const name = req.body.name;
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser; 
	User.findOne({ email: email })
	.then(user => {
		if (!user) {
			console.log(user);
			// const error = new Error('User not found');
			// error.statusCode = 401;
			// throw error;
		}
		loadedUser = user;
		return bcrypt.compare(password, user.password);
	})
	.then(isEqual => {
		if (!isEqual) {
			console.log(isEqual);
			// const error = new Error('Wrong password');
			// error.statusCode = 401;
			// throw error;
		}
		const token = jwt.sign({
			email: loadedUser.email,
			userId: loadedUser._id.toString()
		}, 
		'somesupersecretsecret', 
		{ expiresIn: '1h' }
		);
		res.status(200).json({ token: token, userId: loadedUser._id.toString() });
	}) 
	.catch(err => {
		console.log(err);
		next(err);
	})
}