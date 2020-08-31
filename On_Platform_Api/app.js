const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const isAuthAdmin = require('./middleware/is-authAdmin')
const isAuthUser = require('./middleware/is-authUser')
const feedRoutes = require('./routes/feed');
const ideRoutes = require('./routes/ide');
const sendMessageRoutes = require('./routes/sendMessage')
const authUserRoutes = require('./routes/authUser');
const authAdminRoutes = require('./routes/authAdmin');
const Admin = require('./models/admin')
const User = require('./models/user')
const app = express();
const helmet = require('helmet');
const compression = require('compression');

const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mzunh.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
});

app.use('/feed', feedRoutes);
app.use('/authUser', authUserRoutes);
app.use('/authAdmin', authAdminRoutes);
app.use(ideRoutes);

app.use(sendMessageRoutes);
app.use('/findAdmin', isAuthAdmin, (req, res, next) => {
	Admin.findById(req.adminId)
	.then(admin => {
		console.log(admin)
		res.status(200).json({
			id: admin._id,
			name: admin.name,
			email: admin.email
		})
		.catch(err => {
			const error = new Error;
			error.message = 'admin not found'
			next(error);
		})
	})
})
app.use('/findUser', isAuthUser, (req, res, next) => {
	User.findById(req.userId)
	.then(user => {
		res.status(200).json({
			id: user._id,
			name: user.name,
			email: user.email
		})
		.catch(err => {
			const error = new Error;
			error.message = 'user not found'
			next(error);
		})
	})
})

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	console.log(message)
	res.status(status).json({
		message: message,
		data: data
	});
})

mongoose
	.connect(MONGODB_URI)
	.then(result => {
		app.listen(process.env.PORT || 8000);
	})
	.catch(err => console.log(err));