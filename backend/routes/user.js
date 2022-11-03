const express = require('express')

// controller functions
const { 
    loginUser, 
    signupUser, 
    sendEmail, 
    changePassword,
    updatePassword } = require('../controllers/userController')

const router = express.Router()


// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)



// Forgot-password
router.post('/forgot-password', sendEmail)

// reset
router.get('/reset/:id/:token', changePassword)

// updatePassword

router.post('/update-password', updatePassword)


module.exports = router