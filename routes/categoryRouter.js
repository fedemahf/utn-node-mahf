var express = require('express');
var router = express.Router();

const categoryController = require('../controllers/categoryController');
const authController = require('../controllers/authController');

router.post('/', authController.verifyToken, categoryController.create);
router.get('/', categoryController.getAll);
router.delete('/:id', authController.verifyToken, categoryController.delete);

module.exports = router;
