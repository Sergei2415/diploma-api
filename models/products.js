const mongoose = require('mongoose');
const validator = require('validator');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  storage: {
    type: String,
    required: true,
  },
  temperature: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  measurement: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  discount: {
    type: String,
    required: false,
  },
});
module.exports = mongoose.model('products', productSchema);
