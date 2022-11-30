const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tripSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  units: {
    type: String,
    required: true,
    default: 'km'
  },
  start: {
    type: Number
  },
  finish: {
    type: Number
  },
  completed: {
    type: Boolean,
    default: false
  },
  vehicle_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },
  distance: {
    type : Number
  }
  
}, 
{ toJson:{virtuals: true} },
{ timestamps: true })

// tripSchema.virtual('distance').get(function(){
//   console.log('distance', this.finish - this.start)
//   return this.finish - this.start
// })

module.exports = mongoose.model('Trip', tripSchema)