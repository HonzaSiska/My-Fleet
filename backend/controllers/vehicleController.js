const Vehicle = require('../models/vehicleModel')
const Trip = require('../models/tripModel')
const mongoose = require('mongoose')
const Fuel = require('../models/fuelModel')
const Maintenance = require('../models/maintenanceModel')

const getVehicles = async( req, res ) => {
    const user_id = req.user._id
    

    try {
        const vehicles = await Vehicle.find({user_id}).sort({make: 1})
        res.status(200).json({success: true, vehicles})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}
const getVehicle= async( req, res ) => {
    const user_id = req.user._id
    const vehicleId = req.params.id
    

    try {
        const vehicle = await Vehicle.findOne({_id: vehicleId})
        res.status(200).json({success: true, vehicle})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}

const createVehicle = async( req, res ) => {
    const newVehicle = req.body
    newVehicle.user_id = req.user._id
  
    try {
        const vehicle = await Vehicle.create(newVehicle)
        res.status(200).json({success: true})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
    
}

const deleteVehicle = async( req, res ) => {
    const { id } = req.params
    
    try {
        const deletedTrips = await Trip.deleteMany({ vehicle_id: id }).exec()
        const deletedFuels = await Fuel.deleteMany({ vehicle_id: id }).exec()
        const deletedMaintenance = await Maintenance.deleteMany({ vehicle_id: id }).exec()
        try {
            const deletedVehicle = await Vehicle.deleteOne({_id:id}).exec()
            res.status(200).json({success: true})
        } catch (error) {
            res.status(400).json({ success: false, error: error.message})
        }
        
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}

const updateVehicle = async( req, res ) => {
    const vehicle = req.body
    const vehicleId = req.params.id
    console.log('updateVehicle', vehicle)

    try {
        const updatedVehicle = await Vehicle.findOneAndUpdate({_id: vehicleId },{...vehicle}, {new: true})
    
        res.status(200).json({success: true, vehicle: updatedVehicle})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}

// Story.
//   find(...).
//   populate('fans').
//   populate('author').
//   exec();


// Story.
//   find().
//   populate({ path: 'fans', select: 'name' }).
//   populate({ path: 'fans', select: 'email' });
// // The above is equivalent to:
// Story.find().populate({ path: 'fans', select: 'email' });

// https://mongoosejs.com/docs/populate.html

module.exports = {
    getVehicle,
    getVehicles,
    createVehicle,
    deleteVehicle,
    updateVehicle
}