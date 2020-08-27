const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const feedRoutes = require('./routes/feed');
const ideRoutes = require('./routes/ide');
const sendMessageRoutes = require('./routes/sendMessage')
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
app.use(ideRoutes);
app.use(sendMessageRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data
  });
})

mongoose
  .connect(
    'mongodb+srv://ritikgupta:ZU5DvtmxnizGbPsu@cluster0-mzunh.mongodb.net/coding_round?retryWrites=true&w=majority'
  )
  .then(result => {
    app.listen(8000);
  })
  .catch(err => console.log(err));