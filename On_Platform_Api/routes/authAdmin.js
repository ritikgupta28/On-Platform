const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const Admin = require('../models/admin');
const authAdminController = require('../controllers/authAdmin');

router.put('/signup', [
	body('email')
		.isEmail()
		.withMessage('Please enter a valid email.')
		.custom((value, { req }) => {
			return Admin.findOne({ email: value }).then(adminDoc => {
				if(adminDoc) {
					return Promise.reject('E-mail address already exists!');
				}
			})
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
	authAdminController.signup
);

router.post('/login', authAdminController.login);

module.exports = router;