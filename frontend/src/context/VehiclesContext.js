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
        vehicles: action.payload, ...state.trips
      }
    case 'SET_TRIPS':
      return {
        trips: action.payload, ...state.trips
      }
    case 'OPEN_MENU':
      return {
        vehicles: state.vehicles,
        isOpenMenu: true
      }
    case 'CLOSE_MENU':
      return {
        vehicles: state.vehicles,
        isOpenMenu: false
      }
    default:
      return state
  }
}

export const VehiclesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vehiclesReducer, {
    vehicles: null,
    trips: null,
    car: null,
    isOpenMenu: false
  })

  return (
    <VehiclesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </VehiclesContext.Provider>
  )
}