const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const userRoutes = require('./API/routes/users');
const timetableRoutes = require('./API/routes/timetable');

const path = require('path');
const mongoose = require('mongoose');

const DATABASE_URI = 'mongodb://RyanStark24:' + process.env.MONGO_ATLAS_PW +
  '@timetablegenerator-shard-00-00-govcj.mongodb.net:27017,timetablegenerator-shard-00-01-govcj.mongodb.net:27017,' +
  'timetablegenerator-shard-00-02-govcj.mongodb.net:27017/test?ssl=true&replicaSet=TimeTableGenerator-shard-0&authSource=admin';

// Creating DataBase connection

mongoose.connect(DATABASE_URI)
  .catch(err => { // mongoose connection error will be handled here
    console.error('App starting error:', err.stack);
    process.exit(1);
  });
mongoose.connection.on('connected', function() {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose default connection disconnected');
});
process.on('SIGINT', function() {
  mongoose.connection.close(function() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


app.set('views', path.join(__dirname, 'API/views'));
app.set('view engine', 'jade');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
//To prevent CORS Errors

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Accept,Content-Type,Authorization");
  if (req.method == 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'POST,GET,DELETE,PATCH');
    return res.status(200).json({});
  }
  next();
});

//Routes used to handle requests

app.use('/user', userRoutes);
app.use('/timetable', timetableRoutes);

app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



module.exports = app;