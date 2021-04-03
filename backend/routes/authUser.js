const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const User = require('../models/user');
const authUserController = require('../controllers/authUser');

router.put('/signup', [
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			return User.findOne({ email: value }).then(userDoc => {
				if(userDoc) {
					return Promise.reject('Email address is already exists');
				}
			});
		})
		.normalizeEmail(),
	body('password',
		'Please enter a password with only numbers and text and at least 6 characters.'
	)
		.trim()
		.isLength({ min: 6 })
		.isAlphanumeric(),
	body('name')
		.trim()
		.not()
		.isEmpty()

	],
	authUserController.signup
);

router.post('/login', authUserController.login);

module.exports = router;