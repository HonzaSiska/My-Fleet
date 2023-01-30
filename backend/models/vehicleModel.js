const mongoose = require('mongoose')
const Trip = require('./tripModel')

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
    type: Number,
    required: true
  },
  saleMilage: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  salesPrice: {
    type: Number,
  },
  units: {
    type: String,
    default: 'km'
  },
  volume: {
    type: String,
    default: 'liters'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
},

  {
    // toJson: { virtuals: true },
    timestamps: true,
    toObject: {
      virtuals: true,
    },
  })


vehicleSchema.virtual("fuels", {
  ref: "Fuel",
  foreignField: "vehicle_id",
  localField: "_id"
})

vehicleSchema.virtual("trip", {
  ref: "Trip",
  foreignField: "vehicle_id",
  localField: "_id"
})
vehicleSchema.virtual("maintenance", {
  ref: "Maintenance",
  foreignField: "vehicle_id",
  localField: "_id"
})


// vehicleSchema.pre("deleteOne", function(next) {
//   // 'this' is the user being removed. Provide callbacks here if you want
//   // to be notified of the calls' result.
//   Trip.deleteMany({ vehicle_id: this._id }).exec();
//   // categoryModel.remove({ user: this._id }).exec();
//   next();
// });

module.exports = mongoose.model('Vehicle', vehicleSchema)