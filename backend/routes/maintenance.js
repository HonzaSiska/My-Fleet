const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
    createMaintenance,
    getAll,
    getStats,
    search
} = require('../controllers/maintenanceController')

const router = express.Router()


router.use(requireAuth)

router.post('/create', createMaintenance)
router.post('/all/:id', getAll)
router.post('/stats/:id', getStats)
router.post('/search/:id', search)

module.exports = router