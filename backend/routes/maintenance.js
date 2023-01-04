const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const {
    createMaintenance,
    getAll
} = require('../controllers/maintenanceController')

const router = express.Router()


router.use(requireAuth)

router.post('/create', createMaintenance)
router.post('/all/:id', getAll)

module.exports = router