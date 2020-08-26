const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.signup = (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
	 	const error = new Error(errors.array()[0].msg);
	 	error.statusCode = 422;
	 	error.data = errors.array()[0].msg;
	 	throw error;
	}
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password; 
	bcrypt.hash(password, 12)
		.then(hashedPw => {
			const user = new User({
				email: email,
				name: name,
				password: hashedPw
			});
			return user.save();
		})
		.then(result => {
			res.status(201).json({
				message: 'User created!',
				userId: result._id
			});
			return transporter.sendMail({
				to: email,
				from: 'rgritik001@gmail.com',
				subject: 'Signup Succeeded!',
				html: '<h4>Hey! You have successfully signed up as an user on Platform Up.</h4>'
			});
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
};

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser; 
	User.findOne({ email: email })
	.then(user => {
		if(!user) {
			const error = new Error('E-mail is not registered!');
			error.statusCode = 401;
			throw error;
		}
		loadedUser = user;
		return bcrypt.compare(password, user.password);
	})
	.then(isEqual => {
		if(!isEqual) {
			const error = new Error('Wrong password!');
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign({
			email: loadedUser.email,
			userId: loadedUser._id.toString()
		}, 
		'somesupersecretsecret', 
		{ expiresIn: '1h' }
		);
		res.status(200).json({ 
			token: token, 
			userId: loadedUser._id.toString() 
		});
	}) 
	.catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};