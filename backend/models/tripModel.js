const mongoose = require('mongoose')

const Schema = mongoose.Schema

const tripSchema = new Schema({
  departure: {
    type: Date,
  },
  arrival: {
    type: Date,
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
    type : Number,
    default:0
  },
  duration: {
    type: Number,
    default: 0
  }
  
}, 
{ toJson:{virtuals: true} },
{ timestamps: true })

// tripSchema.virtual('distance').get(function(){
//   console.log('distance', this.finish - this.start)
//   return this.finish - this.start
// })

module.exports = mongoose.model('Trip', tripSchema)