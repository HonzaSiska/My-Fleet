const Trip = require('../models/tripModel')
const mongoose = require('mongoose')

const getTrips = async (req, res) => {
    
    const user_id = req.user._id
    const vehicleId = req.params.id

    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Trip.find({ user_id, vehicle_id: vehicleId }).count()
        const fetchedTrips = await Trip.find({ user_id, vehicle_id: vehicleId }).skip(skip).limit(limit).sort({ completed: 1, departure: -1, })
        const trips = fetchedTrips.map(trip => {
            return {
                ...trip._doc,
                  date: trip._doc.departure ? `${trip._doc.departure.getDate()}-${trip._doc.departure.getMonth() + 1}-${trip._doc.departure.getFullYear()}` : ''
            }
        })
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
    trip.user_id = req.user._id
 
    if(trip.finish < trip.start || (trip.finish<0 || trip.start<0))  return res.json({success: false, message: 'Incorrect values !! '} )
   
    if(trip.finish   && trip.start ){
        trip.distance = parseInt(trip.finish) - parseInt(trip.start)
    }
    if(trip.departure && trip.arrival){
        trip.duration = new Date(trip.arrival).getTime() - new Date(trip.departure).getTime()
    }

    
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
                    _id: '$vehicle_id',
                   "sum": { $sum: "$distance"},
                   "duration": {$sum: '$duration'},
                   "count" : { $sum: 1},
                }
             }
        ])

        // data[0].averageTripDistance = parseFloat((data[0].sum / data[0].count).toFixed(2))
        const filteredData = data.filter(item => item._id == id)
        filteredData[0].averageTripDistance = parseFloat((filteredData[0].sum / filteredData[0].count).toFixed(2))
        console.log('statst data',filteredData)
        res.json({ success: true, stats: filteredData })
        
    } catch (error) {
        res.json({ success: false, error })
    }
}

const deleteTrip = async( req, res ) => {
    const {id} = req.params

    try {
        await Trip.deleteOne({_id: id})
        res.json({success: true })
    } catch (error) {
        res.json({success: false, error })
    }
}

const updateTrip = async (req, res) => {
    const trip = req.body

    if(trip.finish   && trip.start ){
        trip.distance = parseInt(trip.finish) - parseInt(trip.start)
    }
    if(trip.departure && trip.arrival){
        trip.duration = new Date(trip.arrival).getTime() - new Date(trip.departure).getTime()
    }
    const tripId = req.body._id

    try {
        const updatedTrip = await Trip.findOneAndUpdate({ _id: tripId }, { ...trip }, { new: true })
     
        res.status(200).json({ success: true, trip: updatedTrip })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const search = async(req,res) => {
    const { 
        page, 
        keyword, 
    }  = req.query 

    const { id } = req.params



    //const regex = new RegExp(('.*'+ keyword +'.*','i'))

    const user_id = req.user._id
    const vehicleId = id
    
    try {
        const count = await Trip.find({ 
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {
                $or: [
                    { from: { $regex: keyword }},
                    { to: { $regex: keyword }}
                ]}
               
            ]  
            
        }).count()

        const fetchedTrips = await Trip.find({
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {
                $or: [
                    { from: { $regex: keyword}},
                    { to: { $regex: keyword}}
                ]}
            
            ]

        }).sort({ completed: 1, departure: -1, })
        const trips = fetchedTrips.map(trip => {
            return {
                ...trip._doc,
                  date: trip._doc.departure ? `${trip._doc.departure.getDate()}-${trip._doc.departure.getMonth() + 1}-${trip._doc.departure.getFullYear()}` : '',
                  date2: trip._doc.departure ? `${trip._doc.arrival.getDate()}-${trip._doc.arrival.getMonth()  + 1}-${trip._doc.arrival.getFullYear()}` : ''
            }
        })
        res.status(200).json({ success: true, trips, count })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}

const searchDate = async( req, res ) => {
    const { 
        start, 
        end, 
    }  = req.query 

    const { id } = req.params

    const startDate = new Date(start).toISOString()
    const endDate = new Date(end).toISOString()

    console.log('dates', startDate, endDate)

    const user_id = req.user._id
    const vehicleId = id
    
    try {
       
        const fetchedTrips = await Trip.find({
            $and:[
            {'vehicle_id': vehicleId},
            {'departure' : {
                $gte: start,
                $lte: end
        }}]
        }).sort({ completed: 1, departure: -1, })
        const trips = fetchedTrips.map(trip => {
            return {
                ...trip._doc,
                  date: trip._doc.departure ? `${trip._doc.departure.getDate()}-${trip._doc.departure.getMonth() + 1}-${trip._doc.departure.getFullYear()}` : '',
                  date2: trip._doc.departure ? `${trip._doc.arrival.getDate()}-${trip._doc.arrival.getMonth() + 1}-${trip._doc.arrival.getFullYear()}` : ''
            }
        })
        res.status(200).json({ success: true, trips })
       
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
    getStats,
    deleteTrip,
    search,
    searchDate
}