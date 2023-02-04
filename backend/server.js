require('dotenv').config()
// "proxy": "http://127.0.0.1:4000",
const cors = require('cors')
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const vehicleRoutes = require('./routes/vehicle')
const tripRoutes = require('./routes/trip')
const fuelRoutes = require('./routes/fuel')
const maintenanceRoutes = require('./routes/maintenance')
const statsRoutes = require('./routes/stats')

// express app
const app = express()

// middleware
app.use(express.json())
app.use(cors(
  {origin: '*', credentials: true}
))

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes

app.use('/api/user', userRoutes)
app.use('/api/vehicle', vehicleRoutes)
app.use('/api/trip', tripRoutes)
app.use('/api/fuel', fuelRoutes)
app.use('/api/maintenance', maintenanceRoutes)
app.use('/api/stats', statsRoutes)



// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT || 4000, () => {
      console.log('connected to db & listening on port', process.env.PORT)
      if (process.env.NODE_ENV === "production") {
        console.log('ditname', __dirname)
        const path = require("path");
        app.use(express.static(path.resolve(__dirname, '../frontend', 'build')));
        app.get("*", (req, res) => {
            res.sendFile(path.resolve(__dirname, '../frontend', 'build', 'index.html'),function (err) {
                if(err) {
                    res.status(500).send(err)
                }
            });
        })
      }
    })
    
  })
  .catch((error) => {
    console.log(error)
  })

  

  