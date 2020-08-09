const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');

exports.signup = (req, res, next) => {
	const email = req.body.email;
	const name = req.body.name;
	const password = req.body.password;
	bcryptjs.hash(password, 12)
			.then(hashedPw => {
				const admin = newAdmin({
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
			})
			.catch(err => {
				console.log(err);
			})
}