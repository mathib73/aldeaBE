module.exports = (sequelize, DataTypes) => {
  const RubroExterior = sequelize.define('rubroExterior', {
    id: {
      field: 'rubroExteriorId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgMuestraId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
  return RubroExterior;
};
