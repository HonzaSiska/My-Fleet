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
    case 'DELETE_VEHICLE':
      return {
        vehicles: state.vehicles.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const VehiclesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vehiclesReducer, {
    vehicles: null
  })

  return (
    <VehiclesContext.Provider value={{...state, dispatch}}>
      { children }
    </VehiclesContext.Provider>
  )
}