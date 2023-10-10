module.exports = (sequelize, DataTypes) => {
  const AreaRepetible = sequelize.define('areaRepetible', {
    id: {
      field: 'areaRepetibleId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  return AreaRepetible;
};
