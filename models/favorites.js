
const mongoose = require('mongoose');
const validator = require('validator');

const favoritSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  products: [{
    type: String,
  }],
});
module.exports = mongoose.model('favorites', favoritSchema);
