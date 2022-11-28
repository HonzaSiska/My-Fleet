import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import { useEffect } from 'react';
import { useVehiclesContext } from './hooks/useVehiclesContext';

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
import Fuel from './Components/VehicleNestedRoutes/Fuel'
import Maintenance from './Components/VehicleNestedRoutes/Maintenance'
import { NewTrip } from './Components/VehicleNestedRoutes/NewTrip';
import { AllTrips } from './Components/VehicleNestedRoutes/AllTrips';
import { TripsStats } from './Components/VehicleNestedRoutes/TripsStats';
import { UpdateTrip } from './Components/VehicleNestedRoutes/UpdateTrip';



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
                  </Route>

                  <Route path='fuel' element={<Fuel/> } />
                  <Route path='maintenance' element={<Maintenance/> } />
              </Route>

              <Route 
                path="/" 
                element={<Home /> }               />
            </Routes>
          </div>
        </div>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
