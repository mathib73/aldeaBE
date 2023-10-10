module.exports = (sequelize, DataTypes) => {
  const Result = sequelize.define('result', {
    id: {
      field: 'resultId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  }, {
    timestamps: true,
  });
  return Result;
};
