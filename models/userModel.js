const bcrypt = require('bcrypt');

// user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      field: 'userId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
    instanceMethods: {
      generateHash(password) {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
      },
      validPassword(password) {
        return bcrypt.compare(password, this.password);
      },
    },
  });
  return User;
};
