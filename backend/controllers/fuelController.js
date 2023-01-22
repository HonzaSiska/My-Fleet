const Fuel = require('../models/fuelModel')
const mongoose = require('mongoose')

const getFuels = async(req, res) => {
    const user_id = req.user._id
    const vehicleId = req.params.id

    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Fuel.find({ user_id, vehicle_id: vehicleId }).count()
        const fetchedFuels = await Fuel.find({ user_id, vehicle_id: vehicleId }).skip(skip).limit(limit).sort({ completed: 1, date: -1, })
        const fuels = fetchedFuels.map(fuel => {
            return {
                ...fuel._doc,
                  dateFormatted: fuel._doc.date ? `${fuel._doc.date.getDate()}-${fuel._doc.date.getMonth() + 1}-${fuel._doc.date.getFullYear()}` : ''
            }
        })
        res.status(200).json({ success: true, fuels, count })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}

const getFuel = async (req, res) => {
    const fuelId = req.params.id
    try {
        const fuel = await Fuel.findOne({ _id: fuelId })
        res.status(200).json({ success: true, fuel })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const createFuel = async(req, res) => {
    const fuel = req.body
    fuel.user_id = req.user._id

    if(fuel){
        try {
            const newFuel = await Fuel.create(fuel)
            console.log('new fuel body', newFuel)
    
            res.status(200).json({ success: true, fuel: newFuel })
        } catch (error) {
            res.status(400).json({ success: false, error: error.message })
        }

    }else{
        res.json({ success: false, error: 'Fill all fields !!' })
    }
}

const deleteFuel = async( req, res ) => {
    const {id} = req.params

    try {
        await Fuel.deleteOne({_id: id})
        res.json({success: true })
    } catch (error) {
        res.json({success: false, error })
    }
}

const updateFuel = async (req, res) => {
    const fuel = req.body
    
    const fuelId = req.body._id

    try {
        const updatedFuel = await Fuel.findOneAndUpdate({ _id: fuelId }, { ...fuel }, { new: true })
     
        res.status(200).json({ success: true, trip: updateFuel })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

const getStats = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Fuel.aggregate(
            [   
                {
                 $group: {
                    _id: '$vehicle_id',
                   "amount": { $sum: "$amount"},
                   "price": {$sum: '$price'},
                   "count" : { $sum: 1},
                }
             }
        ])

      


        // data[0].averageAmount = parseFloat((data[0].amount / data[0].count).toFixed(2))
        // data[0].averagePrice = parseFloat((data[0].price / data[0].count).toFixed(2))

        // console.log('statst data',data)

        const filteredData = data.filter(item => item._id == id)
        filteredData[0].averageAmount = parseFloat((filteredData[0].amount / filteredData[0].count).toFixed(2))
        filteredData[0].averagePrice = parseFloat((filteredData[0].price / filteredData[0].count).toFixed(2))



        res.json({ success: true, stats: filteredData})
        
    } catch (error) {
        res.json({ success: false, error:error })
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
        const count = await Fuel.find({ 
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {location: { $regex: keyword }} 
            ]
            
            
            
        }).count()

        const fetchedFuels = await Fuel.find({
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {location: { $regex: keyword }} 
            
            ]

        }).sort({ date: -1, })
        const fuels = fetchedFuels.map(fuel => {
            return {
                ...fuel._doc,
                formatedDate: fuel._doc.date ? `${fuel._doc.date.getDate()}-${fuel._doc.date.getMonth() + 1}-${fuel._doc.date.getFullYear()}` : '',
                 
            }
        })
        res.status(200).json({ success: true, fuels, count })
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
       
        const fetchedFuels = await Fuel.find({
            $and:[
            {'vehicle_id': vehicleId},
            {'date' : {
                $gte: start,
                $lte: end
        }}]
        }).sort({ date: -1, })
        const fuels = fetchedFuels.map(fuel => {
            return {
                ...fuel._doc,
                formatedDate: fuel._doc.date ? `${fuel._doc.date.getDate()}-${fuel._doc.date.getMonth() + 1}-${fuel._doc.date.getFullYear()}` : '',
            }
        })
        res.status(200).json({ success: true, fuels })
       
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

module.exports = {
    createFuel,
    getFuels,
    deleteFuel,
    getFuel,
    updateFuel,
    getStats,
    search, 
    searchDate
}