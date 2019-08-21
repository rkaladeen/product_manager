const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must have at least 3 characters"]
  },
  price: {
    type: Number,
    required: [true, "Price is required"]
  },
  img_url: {
    type: String,
    required: [true, "Image URL is required"],
    minlength: [3, "Image URL must have at least 3 characters"]
  }
  
}, {timestamps: true});

mongoose.model("Product", ProductSchema);