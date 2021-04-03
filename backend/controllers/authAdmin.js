const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Admin = require('../models/admin');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_KEY
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
			const admin = new Admin({
				email: email,
				name: name,
				password: hashedPw
			});
			return admin.save();
		})

		.then(result => {
			res.status(201).json({
				message: 'Admin created!',
				adminId: result._id
			});
			return transporter.sendMail({
				to: email,
				from: 'rgritik001@gmail.com',
				subject: 'Signup Succeeded!',
				html: '<h4>Hey! You have successfully signed up as an admin on Platform Up.</h4>'
			});
		})
		.catch(err => {
			if(!err.statusCode) {
				err.statusCode = 500;
			}
			next(err);
		});
}

exports.login = (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	let loadedAdmin; 
	Admin.findOne({ email: email })
	.then(admin => {
		if(!admin) {
			const error = new Error('E-mail is not registered!');
			error.statusCode = 401;
			throw error;
		}
		loadedAdmin = admin;
		return bcrypt.compare(password, admin.password);
	})
	.then(isEqual => {
		if (!isEqual) {
			const error = new Error('Wrong password');
			error.statusCode = 401;
			throw error;
		}
		const token = jwt.sign({
			email: loadedAdmin.email,
			adminId: loadedAdmin._id.toString()
		}, 
		'somesupersecretsecret', 
		{ expiresIn: '3h' }
		);
		res.status(200).json({ 
			token: token,
			adminId: loadedAdmin._id.toString()
		});
	}) 
	.catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};