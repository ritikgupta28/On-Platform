const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const feedRoutes = require('./routes/feed');
const outputRoutes = require('./routes/output');
const authUserRoutes = require('./routes/authUser');
//const authAdminRoutes = require('./routes/authAdmin');
const Admin = require('./models/admin');

const app = express();
 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use((req, res, next) => {
  Admin.findById('5f2e5cc801c6442fd0d01c45')
    .then(admin => {
      req.admin = admin;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/feed', feedRoutes);
app.use(outputRoutes);
app.use('/authUser', authUserRoutes);
// app.use('/authAdmin', authAdminRoutes);

mongoose
  .connect(
    'mongodb+srv://ritikgupta:ZU5DvtmxnizGbPsu@cluster0-mzunh.mongodb.net/coding_round?retryWrites=true&w=majority'
  )
  .then(result => {
    Admin.findOne().then(admin => {
      if(!admin) {
        const admin = new Admin({
          name: 'test',
          email: 'test@test.com',
          password: 'tester',
          cart: {
            questions: []
          }
        });
        admin.save()
      }
    });
    app.listen(8000);
  })
  .catch(err => console.log(err));