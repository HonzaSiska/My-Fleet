const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    getVehicles,
    createVehicle,
    deleteVehicle,
    updateVehicle,
    getVehicle
} = require('../controllers/vehicleController')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


router.post('/create', createVehicle)


router.post('/update/:id', updateVehicle)


router.post('/:id', getVehicle)

router.post('/', getVehicles)


router.post('/delete/:id', deleteVehicle)




module.exports = router