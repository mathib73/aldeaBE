// importing modules
const express = require('express');
const imageController = require('../controllers/imageController');

const {
  getImage, createImage, deleteImage,
} = imageController;

const router = express.Router();

// signup endpoint
// passing the middleware function to the signup
router.get('/:id', getImage);
router.post('/', createImage);
router.delete('/', deleteImage);

module.exports = router;
