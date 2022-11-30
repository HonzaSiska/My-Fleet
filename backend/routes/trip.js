const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    getStats
} = require('../controllers/tripController')


const router = express.Router()

// require auth for all workout routes
router.use(requireAuth)


router.post('/create', createTrip)


router.post('/update', updateTrip)


router.post('/:id', getTrip)

router.post('/all/:id', getTrips)

router.post('/stats/:id', getStats)


// router.get('/delete', deleteVehicle)




module.exports = router