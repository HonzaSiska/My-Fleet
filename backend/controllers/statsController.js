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
        const totalPrice = (vehicle.salesPrice === 0 || vehicle.salesPrice === '') ? vehicle.price : vehicle.price - vehicle.salesPrice

        // const minutes = new Date(trip[0].duration).getMinutes()
        const minutes = trip[0].duration / (1000 * 60)
        const hours = trip[0].duration / (1000 * 60 * 60)
        const days = trip[0].duration / (1000 * 60 * 60 * 24)


        const pricePerMinute = (totalPrice + totalCost) / minutes
        const pricePerHour = (totalPrice + totalCost) / hours
        const pricePerDay = (totalPrice + totalCost) / days

        console.log('expense', totalCost)
        console.log('totalPrice', totalPrice)
        console.log('total', totalPrice + totalCost)
        console.log('tomins', minutes)
        console.log('pricePerMinute ', pricePerMinute)
        console.log('pricePerDay ', pricePerDay)
        console.log('days ', days)


        res.json({
            success: true, stats: {
                maintenance,
                fuel,
                trip,
                _totalCost: totalCost,
                _totalCostAndPrice: totalCost + totalPrice,
                _minutes: minutes,
                _hours: hours,
                _pricePerMinute: pricePerMinute.toFixed(2),
                _pricePerHour: pricePerHour.toFixed(2),
                _pricePerDay: pricePerDay.toFixed(2),
                _totalPrice: totalPrice,
                 isSold: (vehicle.salesPrice == 0 || vehicle.salesPrice == '')
                     ? false : true
            }
        })

    } catch (error) {
        res.json({ success: false, error })
    }

}