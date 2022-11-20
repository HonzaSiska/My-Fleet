const Trip = require('../models/tripModel')
const mongoose = require('mongoose')

const getTrips = async( req, res ) => {
    const user_id = req.user._id
    const vehicleId = req.params.id
    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Trip.find({user_id, vehicle_id: vehicleId}).count()
        const fetchedTrips = await Trip.find({user_id, vehicle_id: vehicleId}).skip(skip).limit(limit).sort({date: -1})
        const trips =  fetchedTrips.map(trip => {
            return { ...trip._doc, date: `${trip._doc.date.getDate()}-${trip._doc.date.getMonth()}-${trip._doc.date.getFullYear()}`}
        })
        console.log('trips', trips)
        res.status(200).json({success: true, trips, count})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
}
// const getVehicle= async( req, res ) => {
//     const user_id = req.user._id
//     const vehicleId = req.params.id
    

//     try {
//         const vehicle = await Vehicle.findOne({_id: vehicleId})
//         res.status(200).json({success: true, vehicle})
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message})
//     }
// }
 
const createTrip = async( req, res ) => {
    const trip = req.body
    try {
        const newTrip = await Trip.create(trip)
        res.status(200).json({success: true})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message})
    }
    
}

// const deleteVehicle = async( req, res ) => {

// }

// const updateVehicle = async( req, res ) => {
//     const vehicle = req.body
//     const vehicleId = req.params.id
    

//     try {
//         const updatedVehicle = await Vehicle.findOneAndUpdate({_id: vehicleId },{...vehicle}, {new: true})
        
//         console.log('updatedVehicle', updatedVehicle)
//         res.status(200).json({success: true, vehicle: updatedVehicle})
//     } catch (error) {
//         res.status(400).json({ success: false, error: error.message})
//     }
// }

/////////////////////////////////////////////////////////////////

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
    createTrip,
    getTrips
}