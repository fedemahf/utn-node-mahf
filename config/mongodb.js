const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ecommerce", error => {
    if (error) {
        throw error;
    } else {
        console.log("MongoDB connected");
    }
});

module.exports = mongoose;
