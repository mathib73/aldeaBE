module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('option', {
    id: {
      field: 'optionId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    costo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    moneda: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medidaUnidad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  return Option;
};
