const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createTrip,
    getTrips,
    getTrip,
    updateTrip,
    getStats,
    deleteTrip,
    search,
    searchDate
} = require('../controllers/tripController')


const router = express.Router()

// require auth for all trip routes
router.use(requireAuth)


router.post('/create', createTrip)


router.post('/update', updateTrip)


router.post('/:id', getTrip)

router.post('/all/:id', getTrips)

router.post('/stats/:id', getStats)


router.post('/delete/:id', deleteTrip)

router.post('/search/:id', search)

router.post('/dates/:id', searchDate)


module.exports = router