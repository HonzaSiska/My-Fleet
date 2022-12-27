const Fuel = require('../models/fuelModel')
const mongoose = require('mongoose')

const getFuels = async(req, res) => {
    const user_id = req.user._id
    const vehicleId = req.params.id

    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Fuel.find({ user_id, vehicle_id: vehicleId }).count()
        const fetchedFuels = await Fuel.find({ user_id, vehicle_id: vehicleId }).skip(skip).limit(limit).sort({ completed: 1, departure: -1, })
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

    console.log('new fuel body', fuel)

    if(fuel){
        try {
            const newFuel = await Fuel.create(fuel)
    
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


module.exports = {
    createFuel,
    getFuels,
    deleteFuel,
    getFuel
}