
const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true,
  },
  products: [{
    type: String,
  }],
});
module.exports = mongoose.model('baskets', basketSchema);
