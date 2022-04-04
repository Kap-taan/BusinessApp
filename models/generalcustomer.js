const mongoose = require('mongoose');

const generalCustomerSchema = new mongoose.Schema({

  customer_id: {
    type: String,
    required: true
  },
  bank_id: {
    type: String,
    required: true
  },
  bank_name: {
    type: String,
    required: true
  },
  customer_name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Generalcustomer', generalCustomerSchema);