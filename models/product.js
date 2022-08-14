const mongoose = require("../config/mongodb");

const productSchema = mongoose.Schema({
  code: {
    type: String,
    unique: true
  },
  name: {
    type: String,
    required: [true, "This field is required."],
    minLength: [3, "This field should have at least 3 characters."],
    uppercase: true
  },
  price: {
    type: Number,
    min: 0
  },
  description: String,
  quantity: Number,
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "category"
  }
});

productSchema.set('toJSON', {getters:true, setters:true, virtuals:true});
module.exports = mongoose.model("product", productSchema);
