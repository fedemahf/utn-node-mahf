var express = require('express');
var router = express.Router();
const productController = require("../controllers/productController");

router.get('/', productController.getAll);
router.post('/', productController.create);
router.get('/:id', productController.getById);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
