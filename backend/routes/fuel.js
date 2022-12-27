const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createFuel,
    getFuels, 
    deleteFuel,
    getFuel
} = require('../controllers/fuelController')

const router = express.Router()


router.use(requireAuth)

router.post('/:id', getFuel)
router.post('/create', createFuel)
router.post('/all/:id', getFuels)
router.post('/delete/:id', deleteFuel)

module.exports = router