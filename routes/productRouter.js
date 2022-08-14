var express = require('express');
var router = express.Router();
const productController = require('../controllers/productController');
const authController = require('../controllers/authController');

router.get('/', productController.getAll);
router.post('/', authController.verifyToken, productController.create);
router.get('/:id', productController.getById);
router.put('/:id', authController.verifyToken, productController.update);
router.delete('/:id', authController.verifyToken, productController.delete);

module.exports = router;
