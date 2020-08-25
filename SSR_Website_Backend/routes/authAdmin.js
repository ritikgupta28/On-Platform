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
		body('password')
		.trim()
		.isLength({ min: 5 }),
		body('name')
		.trim()
		.not()
		.isEmpty()
	], 
	authAdminController.signup
);

router.post('/login', authAdminController.login);

module.exports = router;