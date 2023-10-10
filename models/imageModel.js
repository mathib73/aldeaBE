module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('image', {
    id: {
      field: 'imageId',
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    image: {
      type: DataTypes.BLOB('long'),
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
  return Image;
};
