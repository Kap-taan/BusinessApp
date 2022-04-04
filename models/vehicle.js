const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
  vehicle_no : {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Vehicle', vehicleSchema);