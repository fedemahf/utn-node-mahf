const mongoose = require("../config/mongodb");
const bcrypt = require("bcrypt");
const errorMessage = require('../utils/errorMessage');
const validators = require('../utils/validator');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, errorMessage.GENERAL.required]
  },
  email: {
    type: String,
    required: [true, errorMessage.GENERAL.required],
    unique: true
  },
  password: {
    type: String,
    validate: {
      validator: value => validators.passwordValidate(value),
      message: errorMessage.USERS.wrongPassword
    }
  }
});

userSchema.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = mongoose.model("users", userSchema);
