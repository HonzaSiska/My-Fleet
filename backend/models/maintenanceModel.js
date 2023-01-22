const mongoose = require('mongoose')

const Schema = mongoose.Schema

const maintenanceSchema = new Schema ({
    date: {
        type: Date
    },
    price: {
        type: Number
    },
    location: {
        type: String
    },
    description: {
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
},{timestamps: true})

module.exports = mongoose.model('Maintenance', maintenanceSchema)

