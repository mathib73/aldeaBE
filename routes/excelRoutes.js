// importing modules
const express = require('express');
const multer = require('multer');

const upload = multer({ dest: 'uploads/excel/' });
const excelController = require('../controllers/excelController');

const {
  parseExcel,
} = excelController;

const router = express.Router();

// signup endpoint
// passing the middleware function to the signup
router.route('/').post(upload.single('excel'), parseExcel);

module.exports = router;
