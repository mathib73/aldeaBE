const db = require('../models');

const Image = db.images;

const getImage = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const image = await Image.findByPk(id);

    // send image
    return res.status(201).send(image);
  } catch (error) {
    return res.status(404);
  }
};
const createImage = async (req, res) => {
  try {
    const {
      data,
    } = req.body;
    const image = await Image.create({
      data,
    });
    return res.status(201).send(JSON.stringify(image.id));
  } catch (error) {
    return res.status(404);
  }
};
const deleteImage = async (req, res) => {
  try {
    const {
      id,
    } = req.body;
    const result = await Image.destroy({
      where: { imageId: id },
      force: true,
    });
    if (result === 0) {
      return res.status(404).json({
        status: 'Error',
        message: 'Fallo en borrado de Imagen',
      });
    }
    return res.status(204).json();
  } catch (error) {
    return res.status(404);
  }
};

module.exports = {
  getImage,
  createImage,
  deleteImage,
};
