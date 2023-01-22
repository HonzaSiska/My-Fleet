const Trip = require('../models/tripModel')
const Fuel = require('../models/fuelModel')
const Maintenance = require('../models/maintenanceModel')
const Vehicle = require('../models/vehicleModel')

const mongoose = require('mongoose')


exports.getStats = async (req, res) => {

    const { id } = req.params

    try {
        const vehicle = await Vehicle.findById(id)

        const tripData = await Trip.aggregate(
            [
                {
                    $group: {
                        _id: '$vehicle_id',
                        "sum": { $sum: "$distance" },
                        "duration": { $sum: '$duration' },
                        "count": { $sum: 1 },
                    }
                }
            ])

        const trip = tripData.filter(item => item._id == id)


        console.log('duration', trip[0].duration)


        const fuelData = await Fuel.aggregate(
            [
                {
                    $group: {
                        _id: '$vehicle_id',
                        "amount": { $sum: "$amount" },
                        "price": { $sum: '$price' },
                        "count": { $sum: 1 },
                    }
                }
            ])

        const fuel = fuelData.filter(item => item._id == id)

        const maintenanceData = await Maintenance.aggregate(
            [
                {
                    $group: {
                        _id: '$vehicle_id',
                        "price": { $sum: '$price' },
                        "count": { $sum: 1 },
                    }
                }
            ])

        const maintenance = maintenanceData.filter(item => item._id == id)


        const totalCost = maintenance[0].price + fuel[0].price
        const totalPrice = (vehicle.salesPrice == null) ? vehicle.price : vehicle.price - vehicle.salesPrice

        // const minutes = new Date(trip[0].duration).getMinutes()
        const minutes = trip[0].duration / (1000 * 60)
        const hours = trip[0].duration / (1000 * 60 * 60)
        const days = trip[0].duration / (1000 * 60 * 60 * 24)


        const pricePerMinute = (totalPrice + totalCost) / minutes
        const pricePerHour = (totalPrice + totalCost) / hours
        const pricePerDay = (totalPrice + totalCost) / days

        const pricePerDistance =  (totalCost + totalPrice)/ trip[0].sum 

             console.log('all cost', totalCost, totalPrice)
             console.log('vehicle', vehicle)

        res.json({
            success: true, stats: {
                allMaitenance: maintenanceData,
                allFuel: fuelData,
                maintenance,
                fuel,
                trip,
                _totalCost: totalCost,
                _totalCostAndPrice: totalCost + totalPrice,
                _minutes: minutes,
                _hours: hours.toFixed(2),
                _pricePerMinute: pricePerMinute.toFixed(2),
                _pricePerHour: pricePerHour.toFixed(2),
                _pricePerDay: pricePerDay.toFixed(2),
                _totalPrice: totalPrice.toFixed(2),
                _pricePerDistance: pricePerDistance.toFixed(2),
                _totalDistance: trip[0].sum ,
                 isSold: (vehicle.salesPrice == null)
                     ? false : true
            }
        })

    } catch (error) {
        res.json({ success: false, error })
    }

}

exports.getAllStats = async (req, res) => {

    // const { id } = req.params
    const userId = req.user._id

    console.log('user id', userId)


    try {

        // const vehicle = await Vehicle.find({user_id: userId})

        // console.log('vehicles', vehicle)

        const tripData = await Trip.aggregate(
            [
                {
                    $group: {
                        _id: '$user_id',
                        "sum": { $sum: "$distance" },
                        "duration": { $sum: '$duration' },
                        "count": { $sum: 1 },
                    }
                }
            ])

        const trip = tripData.filter(item => item._id.toString()  == userId.toString() )

        const fuelData = await Fuel.aggregate(
            [
                {
                    $group: {
                        _id: '$user_id',
                        "amount": { $sum: "$amount" },
                        "price": { $sum: '$price' },
                        "count": { $sum: 1 },
                    }
                }
            ])
            const fuel = fuelData.filter(item => item._id.toString()  === userId.toString() )

            
            

        const maintenanceData = await Maintenance.aggregate(
            [
                {
                    $group: {
                        _id: '$user_id',
                        "price": { $sum: '$price' },
                        "count": { $sum: 1 },
                    }
                }
            ])
            const maintenance = maintenanceData.filter(item => item._id.toString()  == userId.toString() )
        
 

        // const totalCost = maintenance[0].price + fuel[0].price
        // const totalPrice = (vehicle.salesPrice === 0 || vehicle.salesPrice === '') ? vehicle.price : vehicle.price - vehicle.salesPrice


        // const minutes = trip[0].duration / (1000 * 60)
        // const hours = trip[0].duration / (1000 * 60 * 60)
        // const days = trip[0].duration / (1000 * 60 * 60 * 24)


        // const pricePerMinute = (totalPrice + totalCost) / minutes
        // const pricePerHour = (totalPrice + totalCost) / hours
        // const pricePerDay = (totalPrice + totalCost) / days

        // const pricePerDistance =  (totalCost + totalPrice)/ trip[0].sum 


3

        res.json({
            success: true, 
            stats: {
                trip,
                fuel,
                maintenance
            }
        })

    } catch (error) {
        res.json({ success: false, error })
    }

}