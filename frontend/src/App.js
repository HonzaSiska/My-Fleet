import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'
import { useEffect } from 'react'
import { useVehiclesContext } from './hooks/useVehiclesContext'

// pages & components
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Reset from './pages/Auth/Reset'
import Navbar from './Components/Navbar/Navbar'
import ChangePassword from './pages/Auth/ChangePassword'
import NewVehicle from './pages/NewVehicle'
import Sidebar from './Components/Sidebar/Sidebar'
import Vehicle from './pages/Vehicle'
import Trips from './Components/VehicleNestedRoutes/Trips'
import Fuel from './Components/VehicleNestedRoutes/fuel/Fuel'
import Maintenance from './Components/VehicleNestedRoutes/Maintenance'
import { NewTrip } from './Components/VehicleNestedRoutes/NewTrip'
import { AllTrips } from './Components/VehicleNestedRoutes/AllTrips'
import { TripsStats } from './Components/VehicleNestedRoutes/TripsStats'
import { UpdateTrip } from './Components/VehicleNestedRoutes/UpdateTrip'
import TripSearch from './Components/VehicleNestedRoutes/TripSearch'
import { DateSearch } from './Components/VehicleNestedRoutes/DateSearch'
import NewFuel from './Components/VehicleNestedRoutes/fuel/NewFuel'
import AllFuels from './Components/VehicleNestedRoutes/fuel/AllFuels'
import UpdateFuel from './Components/VehicleNestedRoutes/fuel/UpdateFuel'
import FuelStats from './Components/VehicleNestedRoutes/fuel/FuelStats'
import FuelSearch from './Components/VehicleNestedRoutes/fuel/FuelSearch'
import FuelDateSearch from './Components/VehicleNestedRoutes/fuel/DateSearch'
import NewMaintenance from './Components/VehicleNestedRoutes/maintenance/NewMaintenance'
import AllMaintenance from './Components/VehicleNestedRoutes/maintenance/AllMaintenance'
import MaintenanceStats from './Components/VehicleNestedRoutes/maintenance/MaintenanceStats'
import MaintenanceSearch from './Components/VehicleNestedRoutes/maintenance/MaintenanceSearch'
import MaintenanceUpdate from './Components/VehicleNestedRoutes/maintenance/MaintenanceUpdate'
import DateMaintenance from './Components/VehicleNestedRoutes/maintenance/DateMaintenance'


function App() {

  const { user,lang, dispatch } = useAuthContext()
  const { dispatch: vehicleDispatch, isOpenMenu } = useVehiclesContext()

  useEffect(() => {

    const language = localStorage.getItem('language')

    // IF LANGUAGE IS SET IN LOCAL STORAGE , LOAD THE LANGUAGE
    // OTHERWISE SET LANGUAGE TO ENGLISH

    if(!language)localStorage.setItem('language', 'english')
    if(language) dispatch({type: 'CHANGE_LANGUAGE', payload: language})
   
    if(lang === undefined){
      dispatch({type: 'CHANGE_LANGUAGE', payload: 'english'})
    }

  },[lang])

  return (
    <div className="App">
      <BrowserRouter>    
        <Navbar/>   
        <div className='content'>
          <div className='side-bar'>
            <Sidebar/>
          </div> 
          <div className="pages">
            <Routes>
              
              <Route 
                path="/login" 
                element={!user ? <Login /> : <Navigate to='/'/>} 
              />
              <Route 
                path="/signup" 
                element={!user ? <Signup /> : <Navigate to='/'/>  } 
              />
              <Route 
                path="/reset" 
                element={!user ? <Reset/> : <Navigate to='/'/>  } 
              />
              <Route 
                path="/change-password/:token" 
                element={<ChangePassword/> } 
              />
              <Route 
                path="/new-vehicle" 
                element={ user ? <NewVehicle/> : <Navigate to='/'/>}
              />

              <Route 
                path="/vehicle/:id" 
                element={ user ? <Vehicle/> : <Navigate to='/'/>}
              >
                  <Route path='trips' element={<Trips/> } >
                      <Route path='new' element={<NewTrip/> } />
                      <Route path='all' element={<AllTrips/> } />
                      <Route path='stats' element={<TripsStats/> } />
                      <Route path='update/:tripId' element={<UpdateTrip/>} />
                      <Route path='search' element={<TripSearch/>} />
                      <Route path='dates' element={<DateSearch/>} />
                  </Route>

                  <Route path='fuel' element={<Fuel/> } >
                    <Route path='new' element={<NewFuel/> } />
                    <Route path='all' element={<AllFuels/>} />
                    <Route path='stats' element={<FuelStats/> } />
                    <Route path='update/:fuelId' element={<UpdateFuel/>} />
                    <Route path='search' element={<FuelSearch/>} />
                    <Route path='dates' element={<FuelDateSearch/>} />
                  </Route>
                  
                  <Route path='maintenance' element={<Maintenance/> }>
                    <Route path='new' element={<NewMaintenance/> } />
                    <Route path='all' element={<AllMaintenance/>} />
                    <Route path='stats' element={<MaintenanceStats/>} />
                    <Route path='search' element={<MaintenanceSearch/>} />
                    <Route path='dates' element={<DateMaintenance/>} />
                    <Route path='update/:maintenanceId' element={<MaintenanceUpdate />} />
                  </Route>
              </Route>

              <Route 
                path="/" 
                element={<Home /> }  />
            </Routes>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
  )
}

export default App
