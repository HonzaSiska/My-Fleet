const Vehicle = require('../models/vehicleModel')
const mongoose = require('mongoose')

const getVehicles = async( req, res ) => {
    const user_id = req.user._id
    

    try {
        const vehicles = await Vehicle.find({user_id}).sort({make: 1})
        res.status(200).json({success: true, vehicles})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}

const createVehicle = async( req, res ) => {
    console.log('user', req.user._id)
    const newVehicle = req.body
      newVehicle.user_id = req.user._id
    //  newVehicle.price = Number(req.price)
    //  newVehicle.year = Number(req.year)
    //  newVehicle.purchaseMilage = Number(req.purchaseMilage)

    console.log(newVehicle)
    try {
        const vehicle = await Vehicle.create(newVehicle)
        res.status(200).json({success: true})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
    
}

const deleteVehicle = async( req, res ) => {

}

const updateVehicle = async( req, res ) => {

}

module.exports = {
    getVehicles,
    createVehicle,
    deleteVehicle,
    updateVehicle
}