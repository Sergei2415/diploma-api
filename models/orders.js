
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  products: [{
    type: String,
  }],
  quantityproducts: [{
    type: String,
  }],
  date: {
    type: Date,
    required: true,
  },
});
module.exports = mongoose.model('orders', orderSchema);
