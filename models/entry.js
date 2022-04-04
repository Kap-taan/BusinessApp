const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({

  customer_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    // required: true
  },
  quantity: {
    type: Number,
    // required: true
  },
  amount: {
    type: Number,
    required: true
  },
  slip: {
    type: String,
    // required: true
  },
  product: {
    type: String,
    // required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  mode: {
    type: String
  },
  vehicle: {
    type: String
  }

});

module.exports = mongoose.model('Entry', entrySchema);