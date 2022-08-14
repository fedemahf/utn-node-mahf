const mongoose = require("../config/mongodb");
const errorMessage = require('../utils/errorMessage');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.required],
    unique: true,
    lowercase: true
  }
});

module.exports = mongoose.model("category", categorySchema);
