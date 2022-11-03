const mongoose = require('mongoose')

const Schema = mongoose.Schema

const vehicleSchema = new Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  purchaseMilage: {
    type: String,
    required: true
  },
  saleMilage: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
  }
}, { timestamps: true })

module.exports = mongoose.model('Vehicle',  vehicleSchema)