const mongoose = require("../config/mongodb");
const errorMessage = require('../utils/errorMessage');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.required],
    minLength: [3, errorMessage.GENERAL.min],
    uppercase: true
  },
  price: {
    type: Number,
    required: [true, errorMessage.GENERAL.required],
    min: 0
  },
  code: {
    type: String,
    required: [true, errorMessage.GENERAL.required],
    unique: true
  },
  description: String,
  category: {
    type: mongoose.Schema.ObjectId,
    required: [true, errorMessage.GENERAL.required],
    ref: "category"
  },
  starred: Boolean
});

productSchema.set('toJSON', {getters:true, setters:true, virtuals:true});
module.exports = mongoose.model("product", productSchema);
