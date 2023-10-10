module.exports = (sequelize, DataTypes) => {
  const SubRubro = sequelize.define('subRubro', {
    id: {
      field: 'subRubroId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coleccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  return SubRubro;
};
