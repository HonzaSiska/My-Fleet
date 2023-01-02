const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createFuel,
    getFuels, 
    deleteFuel,
    getFuel,
    updateFuel,
    getStats,
    search,
    searchDate
} = require('../controllers/fuelController')

const router = express.Router()


router.use(requireAuth)

router.post('/create', createFuel)
router.post('/update', updateFuel)
router.post('/:id', getFuel)
router.post('/all/:id', getFuels)
router.post('/delete/:id', deleteFuel)
router.post('/stats/:id', getStats)
router.post('/search/:id', search)
router.post('/dates/:id', searchDate)

module.exports = router