const db = require('../models');

const RubroExterior = db.rubrosExteriores;

const getRubrosExteriores = async (req, res) => {
  try {
    // get prototipos from db
    const prototipos = await RubroExterior.findAll();
    // send prototipos
    return res.status(201).send(prototipos);
  } catch (error) {
    return res.status(404);
  }
};
const getRubroExterior = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const rubroExterior = await RubroExterior.findByPk(id);

    // send prototipo
    return res.status(201).send(rubroExterior);
  } catch (error) {
    return res.status(404);
  }
};
const createRubroExterior = async (req, res) => {
  try {
    const {
      name,
      description,
      cost,
      imgId,
      imgMuestraId,
      prototipoId,
    } = req.body;
    const rubroExterior = await RubroExterior.create({
      name,
      description,
      cost,
      imgId,
      imgMuestraId,
      prototipoId,
    });
    return res.status(201).send(JSON.stringify(rubroExterior.id));
  } catch (error) {
    return res.status(404);
  }
};
const updateRubroExterior = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const {
      name,
      description,
      cost,
      imgId,
      imgMuestraId,
    } = req.body;
    const rubroExterior = await RubroExterior.update({
      name,
      description,
      cost,
      imgId,
      imgMuestraId,
    }, {
      where: {
        rubroExteriorId: id,
      },
    });
    return res.status(201).send(JSON.stringify(rubroExterior.id));
  } catch (error) {
    return res.status(404);
  }
};
const deleteRubroExterior = async (req, res) => {
  try {
    const {
      id,
    } = req.body;
    const result = await RubroExterior.destroy({
      where: { rubroExteriorId: id },
      force: true,
    });
    if (result === 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'Fallo en borrado de Rubro exterior',
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(404);
  }
};

module.exports = {
  getRubrosExteriores,
  getRubroExterior,
  createRubroExterior,
  updateRubroExterior,
  deleteRubroExterior,
};
