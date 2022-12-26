const mongoose = require('mongoose')

const Schema = mongoose.Schema

// date, amount, location, units
const fuelSchema = new Schema({
    date: {
        type: Date
    },
    amount: {
        type: Number
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    units: {
        type: String
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle"
    },
},
{ timestamps: true })

module.exports = mongoose.model('Fuel', fuelSchema )
