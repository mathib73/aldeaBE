// importing modules
const express = require('express');
const prototipoController = require('../controllers/prototipoController');

const {
  getPrototipos, getPrototipo,
  createPrototipo, deletePrototipo,
  updatePrototipo,
} = prototipoController;

const router = express.Router();

// signup endpoint
// passing the middleware function to the signup
router.get('/', getPrototipos);
router.get('/:id', getPrototipo);
router.post('/', createPrototipo);
router.delete('/', deletePrototipo);
router.patch('/:id', updatePrototipo);

module.exports = router;
