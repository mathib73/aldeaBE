// importing modules
const express = require('express');

const sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const prototiposRoutes = require('./routes/prototiposRoutes');
const imagesRoutes = require('./routes/imagesRoutes');
const excelRoutes = require('./routes/excelRoutes');

// setting up your port
const PORT = process.env.PORT || 8080;

// assigning the variable app to express
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

// synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: true }).then(() => {
  console.log('db has been re sync');
});

// routes for the API
app.use('/api/users', userRoutes);
app.use('/api/prototipos', prototiposRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/excel', excelRoutes);

// listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
