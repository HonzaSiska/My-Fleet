import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { VehiclesContextProvider } from './context/VehiclesContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <VehiclesContextProvider>
        <App />
      </VehiclesContextProvider> 
    </AuthContextProvider>
  </React.StrictMode>
);


