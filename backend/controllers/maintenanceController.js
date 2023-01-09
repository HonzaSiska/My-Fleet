const Maintenance = require('../models/maintenanceModel')
const mongoose = require('mongoose')

exports.createMaintenance = async (req, res) => {
    const maintenance = req.body

    if(maintenance){
        try {
            const newMaintenance = await Maintenance.create(maintenance)
            console.log('new maintenance body', newMaintenance)
    
            res.status(200).json({ success: true, maintenance: newMaintenance })
        } catch (error) {
            res.status(400).json({ success: false, error: error.message })
        }

    }else{
        res.json({ success: false, error: 'Fill all fields !!' })
    }
}

exports.getAll = async(req, res) => {
    const user_id = req.user._id
    const vehicleId = req.params.id

    const limit = 5
    const skip = req.query.page * limit

    try {
        const count = await Maintenance.find({ user_id, vehicle_id: vehicleId }).count()
        const fetchedResults = await Maintenance.find({ user_id, vehicle_id: vehicleId }).skip(skip).limit(limit).sort({ completed: 1, date: -1, })
        const maintenance = fetchedResults.map(item => {
            return {
                ...item._doc,
                  dateFormatted: item._doc.date ? `${item._doc.date.getDate()}-${item._doc.date.getMonth() + 1}-${item._doc.date.getFullYear()}` : ''
            }
        })
        res.status(200).json({ success: true, maintenance, count })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}

exports.getStats = async (req, res) => {
    const { id } = req.params
    try {
        const data = await Maintenance.aggregate(
            [   
                {
                 $group: {
                    _id: '$vehicle_id',
                   "price": {$sum: '$price'},
                   "count" : { $sum: 1},
                }
             }
        ])

        
        data[0].averagePrice = parseFloat((data[0].price / data[0].count).toFixed(2))

        console.log('statst data',data)
        res.json({ success: true, stats: data })
        
    } catch (error) {
        res.json({ success: false, error:error })
    }
}

exports.search = async(req,res) => {


    const { 
        page, 
        keyword, 
    }  = req.query 

    const { id } = req.params

    //const regex = new RegExp(('.*'+ keyword +'.*','i'))

    const user_id = req.user._id
    const vehicleId = id
    
    try {
        const count = await Maintenance.find({ 
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {
                    $or: [
                        {location: { $regex: keyword }},
                        {description: { $regex: keyword }},

                    ]
                }
                
            ]
            
            
            
        }).count()

        const fetchedMaintenance = await Maintenance.find({
           
            $and:[
                {user_id}, 
                {vehicle_id: vehicleId} ,
                {
                    $or: [
                        {location: { $regex: keyword }},
                        {description: { $regex: keyword }},
    
                    ]
                }
            
            ]

        }).sort({ date: -1, })
        const maintenance = fetchedMaintenance.map(item => {
            return {
                ...item._doc,
                dateFormatted: item._doc.date ? `${item._doc.date.getDate()}-${item._doc.date.getMonth() + 1}-${item._doc.date.getFullYear()}` : '',
                description: item.description.length > 10 ? item.description.substring(0,15) + ' ...' : item.description
                 
            }
        })
        res.status(200).json({ success: true, maintenance, count })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}

exports.searchDate = async( req, res ) => {
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
       
        const fetchedMaintenance = await Maintenance.find({
            $and:[
            {'vehicle_id': vehicleId},
            {'date' : {
                $gte: start,
                $lte: end
        }}]
        }).sort({ date: -1, })
        const maintenance = fetchedMaintenance.map(item => {
            return {
                ...fuel._doc,
                formatedDate: item._doc.date ? `${item._doc.date.getDate()}-${item._doc.date.getMonth() + 1}-${item._doc.date.getFullYear()}` : '',
            }
        })
        res.status(200).json({ success: true, maintenance })
       
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }

}
exports.updateMaintenance = async (req, res) => {

    const maintenance = req.body
    const maintenanceId = req.body._id

    try {
        const updatedMaintenance= await Maintenance.findOneAndUpdate({ _id: maintenanceId }, { ...maintenance }, { new: true })
     
        res.status(200).json({ success: true, maintenance: updatedMaintenance })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}

exports.getMaintenance= async (req, res) => {
    const maintenanceId = req.params.id
    console.log()
    try {
        const maintenance = await Maintenance.findOne({ _id: maintenanceId })
        console.log('maintenance', maintenance)
        res.status(200).json({ success: true, maintenance})
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
}