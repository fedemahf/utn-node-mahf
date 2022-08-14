const Product = require("../models/product");

module.exports = {
  getAll: async function (req, res, next) {
    try {
      let queryFind = {};

      if (req.query.buscar) {
        queryFind = {
          name: {
            $regex: `.*${req.query.buscar}.*`,
            $options: "i"
          }
        };
      }

      const products = await Product.find(queryFind).select("code name").sort({ price: -1, name: 1 });
      res.status(200).json(products);
    } catch (e) {
      console.log(e);
    }
  },
  getById: async function (req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  create: async function (req, res, next) {
    try {
      const product = new Product(req.body);
      const document = await product.save();
      res.status(201).json(document);
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
      // next(e);
    }
  },
  update: async function (req, res, next) {
    try {
      const document = await Product.updateOne({ _id: req.params.id }, req.body)
      res.status(200).json(document)
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  },
  delete: async function (req, res, next) {
    try {
      const document = await Product.deleteOne({ _id: req.params.id })
      res.status(200).json(document)
    } catch (e) {
      console.log(e);
      res.status(400).json(e);
    }
  }
}