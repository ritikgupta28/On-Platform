const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const feedRoutes = require('./routes/feed');
const outputRoutes = require('./routes/output');
const authUserRoutes = require('./routes/authUser');
const authAdminRoutes = require('./routes/authAdmin');

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

app.use('/feed', feedRoutes);
app.use('/authUser', authUserRoutes);
app.use('/authAdmin', authAdminRoutes);
app.use(outputRoutes);

mongoose
  .connect(
    'mongodb+srv://ritikgupta:ZU5DvtmxnizGbPsu@cluster0-mzunh.mongodb.net/coding_round?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => console.log(err));