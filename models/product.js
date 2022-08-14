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
    min: 0
  },
  code: {
    type: String,
    unique: true
  },
  description: String,
  quantity: Number,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category"
  },
  starred: Boolean
});

productSchema.set('toJSON', {getters:true, setters:true, virtuals:true});
module.exports = mongoose.model("product", productSchema);
