const express = require('express')
const requireAuth = require('../middleware/requireAuth')

const { getStats, getAllStats } = require('../controllers/statsController')

const router = express.Router()


router.use(requireAuth)

router.post('/all', getAllStats)
router.post('/:id', getStats)


module.exports = router