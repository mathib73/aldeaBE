// importing modules
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

// Assigning users to the variable User
const User = db.users;

// signing a user up
// hashing users password before its saved to the database with bcrypt
const signup = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const data = {
      userName,
      password: await bcrypt.hash(password, 10),
    };
    // saving the user
    const user = await User.create(data);

    // if user details is captured
    // generate token with the user's id and the secretKey in the env file
    // set cookie with the token generated
    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.secretKey, {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      });

      res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
      console.log('user', JSON.stringify(user, null, 2));
      console.log(token);
      // send users details
      return res.status(201).send(user);
    }
    return res.status(409).send('Details are not correct');
  } catch (error) {
    return console.log(error);
  }
};

// login authentication

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    // find a user by their userName
    const user = await User.findOne({
      where: {
        userName,
      },
    });

    // if userName is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);

      // if password is the same
      // generate token with the user's id and the secretKey in the env file

      if (isSame) {
        const token = jwt.sign({ id: user.id }, process.env.secretKey, {
          expiresIn: 1 * 24 * 60 * 60 * 1000,
        });

        // if password matches wit the one in the database
        // go ahead and generate a cookie for the user
        res.cookie('jwt', token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log('user', JSON.stringify(user, null, 2));
        console.log(token);
        // send user data
        return res.status(201).send(user);
      }
    }
    return res.status(401).send('Authentication failed');
  } catch (error) {
    return console.log(error);
  }
};

module.exports = {
  signup,
  login,
};
