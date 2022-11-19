const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createTrip,
    getTrips
} = require('../controllers/tripController')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


router.post('/create', createTrip)


// router.post('/update/:id', updateVehicle)


// router.post('/:id', getVehicle)

router.post('/all/:id', getTrips)


// router.get('/delete', deleteVehicle)




module.exports = router