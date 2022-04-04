const mongoose = require('mongoose');

const purchaseSchema = new mongoose.Schema({

  user_id: {
    type: String,
    required: true
  },
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  product_id: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }

});

module.exports = mongoose.model('Purchase', purchaseSchema);