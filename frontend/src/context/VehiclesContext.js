import { createContext, useReducer } from 'react'


export const VehiclesContext = createContext()

export const vehiclesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VEHICLES':
      return {
        vehicles: action.payload
      }
    case 'CREATE_VEHICLE':
      return {
        vehicles: [action.payload, ...state.vehicles]
      }
    case 'SET_CAR':
      return {
        car: action.payload
      }
    case 'DELETE_VEHICLE':
      return {
        vehicles: state.vehicles.filter((w) => w._id !== action.payload._id)
      }
    case 'CREATE_TRIP':
      return {
        vehicles: action.payload, ...state
      }
    case 'SET_TRIPS':
      return {
        trips: action.payload, 
        vehicles: state.vehicles,
        maintenance: state.maintenance,
        fuels: state.fuels,
        distanceUnits: state.distanceUnits,
        volumeUnits: state.volumeUnits,
        // isOpenMenu: true,
      }
    case 'SET_FUELS':
      return {
        fuels: action.payload, 
        trips: action.payload, 
        vehicles: state.vehicles,
        maintenance: state.maintenance,
        distanceUnits: state.distanceUnits,
        volumeUnits: state.volumeUnits,
        // isOpenMenu: true,
      }
    case 'SET_MAINTENANCE':
      return {
        maintenance: action.payload, 
        fuels: action.payload, 
        trips: action.payload, 
        vehicles: state.vehicles,
        distanceUnits: state.distanceUnits,
        volumeUnits: state.volumeUnits,
        // isOpenMenu: true,
      }
    case 'SET_DISTANCE_UNITS':
      return {
        distanceUnits: action.payload,
        volumeUnits: state.volumeUnits,
      }
    case 'SET_VOLUME_UNITS':
      return {
        volumeUnits: action.payload,
        distanceUnits: state.distanceUnits
      }
   
    case 'OPEN_MENU':
      return {
        vehicles: state.vehicles,
        trips: state.trips,
        maintenance: state.maintenance,
        fuels: state.fuels,
        distanceUnits: state.distanceUnits,
        volumeUnits: state.volumeUnits,
        isOpenMenu: true,
      }
    case 'CLOSE_MENU':
      return {
        vehicles: state.vehicles,
        trips: state.trips,
        fuels: state.fuels,
        maintenance: state.maintenance,
        distanceUnits: state.distanceUnits,
        volumeUnits: state.volumeUnits,
        isOpenMenu: false,
        
        
      }
    default:
      return state
  }
}

export const VehiclesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vehiclesReducer, {
    vehicles: null,
    trips: null,
    fuels: null,
    maintenance: null,
    car: null,
    isOpenMenu: false,
    distanceUnits: null,
    volumeUnits: null,test: null
  })

  return (
    <VehiclesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VehiclesContext.Provider>
  )
}