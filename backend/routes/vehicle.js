const express = require('express')

// controller functions
const { 
    getVehicles,
    createVehicle,
    deleteVehicle,
    updateVehicle } = require('../controllers/vehicleController')

const router = express.Router()


// login route
router.post('/create', createVehicle)

// signup route
router.post('/update', updateVehicle)



// Forgot-password
router.post('/vehicles', getVehicles)

// reset
router.get('/delete', deleteVehicle)




module.exports = router