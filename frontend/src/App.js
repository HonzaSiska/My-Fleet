import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import './App.css';
import { useEffect } from 'react';

// pages & components
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Reset from './pages/Auth/Reset'
import Navbar from './Components/Navbar/Navbar';
import ChangePassword from './pages/Auth/ChangePassword';
import NewVehicle from './pages/NewVehicle';


function App() {

  const { user,lang, dispatch } = useAuthContext()

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
        <div className="pages">
          <Routes>
            <Route 
              path="/" 
              element={<Home /> } 
            />
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
            <Route path="/new-vehicle" 
              element={ user ? <NewVehicle/> : <Navigate to='/'/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
