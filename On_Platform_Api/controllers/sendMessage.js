const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.sendMessage = (req, res, next) => {
	const { name, email, message } = req.body;
	console.log(req.body)
	transporter.sendMail({
				to: 'rgritik001@gmail.com',
				from: email,
				subject: 'Help!!',
				html: `<h4>Hey! I am ${name}, My message is ${message}`
	})
	.then(res => console.log(res))
	.catch(err => console.log(err));
}