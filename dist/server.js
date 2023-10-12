"use strict";

// importing modules
var express = require('express');
var sequelize = require('sequelize');
var dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser');
var db = require('./models');
var userRoutes = require('./routes/userRoutes');
var prototiposRoutes = require('./routes/prototiposRoutes');
var imagesRoutes = require('./routes/imagesRoutes');
var excelRoutes = require('./routes/excelRoutes');
var cors = require('cors');

// setting up your port
var PORT = process.env.PORT || 8080;

// assigning the variable app to express
var app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());

// synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({
  force: true
}).then(function () {
  console.log('db has been re sync');
});

// routes for the API
app.use('/api/users', userRoutes);
app.use('/api/prototipos', prototiposRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/excel', excelRoutes);

// listening to server connection
app.listen(PORT, function () {
  return console.log("Server is connected on ".concat(PORT));
});