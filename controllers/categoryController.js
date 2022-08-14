const Category = require('../models/category');
const HttpStatus = require('http-status');
const errorMessage = require('../utils/errorMessage');

module.exports = {
  getAll: async function (req, res, next) {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  create: async function (req, res, next) {
    try {
      const category = await Category.findOne({ name: req.body.name });

      if (category) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage.CATEGORIES.alreadyExists });
      } else {
        const document = new Category(req.body);
        const response = await document.save();
        res.json(response);
      }
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  delete: async function (req, res, next) {
    try {
      const document = await Category.deleteOne({ _id: req.params.id });
      res.status(HttpStatus.OK).json(document);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
