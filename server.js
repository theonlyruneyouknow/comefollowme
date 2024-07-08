const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dataRoutes = require('./routes/dataRoutes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', dataRoutes);

mongoose.connect('mongodb://localhost:27017/comefollowme')
  .then(() => console.log('MongoDB connected to comefollowme database'))
  .catch(err => console.error(err));

app.listen(5001, () => {
  console.log('Server is running on port http://localhost:${5001}');
});
