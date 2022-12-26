require('dotenv').config()

const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const vehicleRoutes = require('./routes/vehicle')
const tripRoutes = require('./routes/trip')
const fuelRoutes = require('./routes/fuel')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

app.use('/api/user', userRoutes)
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/trip', tripRoutes)
app.use('/api/fuel', fuelRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })