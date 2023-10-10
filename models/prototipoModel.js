module.exports = (sequelize, DataTypes) => {
  const Prototipo = sequelize.define('prototipo', {
    id: {
      field: 'prototipoId',
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
    proyectoDe: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortDesc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    m2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    m2Interiores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    m2Exteriores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    banos: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dormitorios: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usdEstandar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plazoEstandar: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    usdMovimientoTierrasEstandar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usdImpuestosEstandar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usdConstruccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imgText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    imgPrincipalId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgWideId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgPlantaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgCorteId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgFachadaId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    imgExteriorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {
    timestamps: true,
  });
  return Prototipo;
};
