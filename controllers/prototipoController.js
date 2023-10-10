const db = require('../models');

const Prototipo = db.prototipos;

const getPrototipos = async (req, res) => {
  try {
    // get prototipos from db
    const prototipos = await Prototipo.findAll();
    // send prototipos
    return res.status(201).send(prototipos);
  } catch (error) {
    return res.status(404);
  }
};
const getPrototipo = async (req, res) => {
  try {
    const Rubro = db.rubros;
    const SubRubro = db.subRubros;
    const Option = db.options;
    const RubroExterior = db.rubrosExteriores;
    const id = parseInt(req.params.id, 10);
    const prototipo = await Prototipo.findByPk(id, {
      include: [
        RubroExterior,
        {
          model: Rubro,
          include: [{
            model: SubRubro,
            include: Option,
          }],
        },
      ],
    });

    // send prototipo
    return res.status(201).send(prototipo);
  } catch (error) {
    return res.status(404);
  }
};
const createPrototipo = async (req, res) => {
  try {
    const {
      name,
      proyectoDe,
      shortDesc,
      m2,
      m2Interiores,
      m2Exteriores,
      dormitorios,
      banos,
      usdEstandar,
      plazoEstandar,
      usdMovimientoTierrasEstandar,
      usdImpuestosEstandar,
      usdConstruccion,
      description,
      imgText,
    } = req.body;
    const prototipo = await Prototipo.create({
      name,
      proyectoDe,
      shortDesc,
      m2,
      m2Interiores,
      m2Exteriores,
      dormitorios,
      banos,
      usdEstandar,
      plazoEstandar,
      usdMovimientoTierrasEstandar,
      usdImpuestosEstandar,
      usdConstruccion,
      description,
      imgText,
    });
    return res.status(201).send(JSON.stringify(prototipo.id));
  } catch (error) {
    return res.status(404);
  }
};
const updatePrototipo = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const {
      name,
      proyectoDe,
      shortDesc,
      m2,
      m2Interiores,
      m2Exteriores,
      dormitorios,
      banos,
      usdEstandar,
      plazoEstandar,
      usdMovimientoTierrasEstandar,
      usdImpuestosEstandar,
      usdConstruccion,
      description,
      imgText,
      imgPrincipalId,
      imgWideId,
      imgPlantaId,
      imgCorteId,
      imgFachadaId,
      imgId,
      imgExteriorId,
    } = req.body;
    const prototipo = await Prototipo.update({
      name,
      proyectoDe,
      shortDesc,
      m2,
      m2Interiores,
      m2Exteriores,
      dormitorios,
      banos,
      usdEstandar,
      plazoEstandar,
      usdMovimientoTierrasEstandar,
      usdImpuestosEstandar,
      usdConstruccion,
      description,
      imgText,
      imgPrincipalId,
      imgWideId,
      imgPlantaId,
      imgCorteId,
      imgFachadaId,
      imgId,
      imgExteriorId,
    }, {
      where: {
        prototipoId: id,
      },
    });
    return res.status(201).send(JSON.stringify(prototipo.id));
  } catch (error) {
    return res.status(404);
  }
};
const deletePrototipo = async (req, res) => {
  try {
    const {
      id,
    } = req.body;
    const result = await Prototipo.destroy({
      where: { prototipoId: id },
      force: true,
    });
    if (result === 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'Fallo en borrado de Prototipo',
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(404);
  }
};

module.exports = {
  getPrototipos,
  getPrototipo,
  createPrototipo,
  updatePrototipo,
  deletePrototipo,
};
