const Trip = require('../models/tripModel')
const mongoose = require('mongoose')

const getTrips = async (req, res) => {
    const user_id = req.user._id
    const vehicleId = req.params.id
    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Trip.find({ user_id, vehicle_id: vehicleId }).count()
        const fetchedTrips = await Trip.find({ user_id, vehicle_id: vehicleId }).skip(skip).limit(limit).sort({ completed: 1, date: -1, })
        const trips = fetchedTrips.map(trip => {
            return {
                ...trip._doc,
                date: `${trip._doc.date.getDate()}-${trip._doc.date.getMonth()}-${trip._doc.date.getFullYear()}`
                //distance: trip._doc.finish - trip._doc.start
            }
        })
        console.log('trips', trips)
        res.status(200).json({ success: true, trips, count })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}
const getTrip = async (req, res) => {
    const tripId = req.params.id
    try {
        const trip = await Trip.findOne({ _id: tripId })
        res.status(200).json({ success: true, trip })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const createTrip = async (req, res) => {
    const trip = req.body
    trip.distance = trip.finish - trip.start
    try {
        const newTrip = await Trip.create(trip)

        res.status(200).json({ success: true, trip: newTrip })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}

const getStats = async (req, res) => {
    const { id } = req.params

    try {
        const data = await Trip.aggregate(
            [       
                {
                 $group: {
                   _id: id,
                   "sum": { $sum: "$distance"},
                   "count" : { $sum: 1},
                }
             }
        ])
        res.json({ success: true, stats: data })
    } catch (error) {
        res.json({ success: false, error:'Could not fetch data' })
    }
}

// const deleteVehicle = async( req, res ) => {

// }

const updateTrip = async (req, res) => {
    const trip = req.body
    trip.distance = trip.finish - trip.start
    console.log('total milage', trip.totalMilage)
    const tripId = req.body._id

    try {
        const updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, { ...trip }, { new: true })
        console.log('trip uipdated', updatedTrip)
        res.status(200).json({ success: true, trip: updatedTrip })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

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
    getTrips,
    getTrip,
    updateTrip,
    getStats
}