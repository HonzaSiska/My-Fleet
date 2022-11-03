const Vehicle = require('../models/vehicleModel')

const getVehicles = async( req, res ) => {
    
}

const createVehicle = async( req, res ) => {

    try {
        const vehicle = await Vehicle.create({... req.body})
        res.status(200).json({success: true})
    } catch (error) {
        res.status(400).json({ error: error.message})
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