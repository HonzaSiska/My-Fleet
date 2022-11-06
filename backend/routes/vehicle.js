const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    getVehicles,
    createVehicle,
    deleteVehicle,
    updateVehicle } = require('../controllers/vehicleController')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)

// login route
router.post('/create', createVehicle)

// signup route
router.post('/update', updateVehicle)



// Forgot-password
router.post('/', getVehicles)

// reset
router.get('/delete', deleteVehicle)




module.exports = router