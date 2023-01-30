const mongoose = require('mongoose')

const Schema = mongoose.Schema


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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
{
    toJson: { virtuals: true },
    timestamps: true,
    toObject: {
        virtuals: true,
    },
})

module.exports = mongoose.model('Fuel', fuelSchema)
