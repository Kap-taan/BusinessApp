const mongoose = require('mongoose');

const generalFirmSchema = new mongoose.Schema({

  firm_id: {
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
  firm_name: {
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

module.exports = mongoose.model('Generalfirm', generalFirmSchema);