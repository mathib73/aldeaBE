module.exports = (sequelize, DataTypes) => {
  const Rubro = sequelize.define('rubro', {
    id: {
      field: 'rubroId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
  return Rubro;
};
