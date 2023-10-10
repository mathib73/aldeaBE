// importing modules
const db = require('../models');
// Assigning db.users to User variable
const User = db.users;

// Function to check if userName already exist in the database
// this is to avoid having two users with the same userName
const saveUser = async (req, res, next) => {
  // search the database to see if user exist
  try {
    const username = await User.findOne({
      where: {
        userName: req.body.userName,
      },
    });
    // if username exist in the database respond with a status of 409
    if (username) {
      return res.json(409).send('username already taken');
    }

    return next();
  } catch (error) {
    return console.log(error);
  }
};

// exporting module
module.exports = {
  saveUser,
};
