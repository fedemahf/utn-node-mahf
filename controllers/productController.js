const HttpStatus = require('http-status');
const Product = require('../models/product');
const Category = require('../models/category');
const errorMessage = require('../utils/errorMessage');

module.exports = {
  getAll: async function (req, res, next) {
    try {
      let queryFind = {};

      if (req.query.find) {
        queryFind = {
          name: {
            $regex: `.*${req.query.find}.*`,
            $options: "i"
          }
        };
      }

      const products = await Product.find(queryFind).populate('category').select("code name price description category").sort({ price: -1, name: 1 });
      res.status(HttpStatus.OK).json(products);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  getAllStarred: async function (req, res, next) {
    try {
      const products = await Product.find({ starred: true }).populate('category').select("code name price description category").sort({ price: -1, name: 1 });
      res.status(HttpStatus.OK).json(products);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  getById: async function (req, res, next) {
    try {
      const product = await Product.findById(req.params.id);

      if (product) {
        res.status(HttpStatus.OK).json(product);
      } else {
        res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage.PRODUCTS.notFound });
      }
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  create: async function (req, res, next) {
    try {
      const category = await Category.findById(req.body.category);

      if (!category) {
        res.status(HttpStatus.BAD_REQUEST).json({ message: errorMessage.CATEGORIES.notFound });
      } else {
        const product = new Product(req.body);
        const document = await product.save();
        res.status(HttpStatus.CREATED).json(document);
      }
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  update: async function (req, res, next) {
    try {
      const document = await Product.updateOne({ _id: req.params.id }, req.body);
      res.status(HttpStatus.OK).json(document);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  },
  delete: async function (req, res, next) {
    try {
      const document = await Product.deleteOne({ _id: req.params.id });
      res.status(HttpStatus.OK).json(document);
    } catch (e) {
      console.log(e);
      res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}