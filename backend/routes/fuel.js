const express = require('express')
const requireAuth = require('../middleware/requireAuth')

// controller functions
const { 
    createFuel,
    getFuels
} = require('../controllers/fuelController')

const router = express.Router()


router.use(requireAuth)


router.post('/create', createFuel)
router.post('/all/:id', getFuels)

module.exports = router