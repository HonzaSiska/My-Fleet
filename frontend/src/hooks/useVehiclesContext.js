import { VehiclesContext } from '../context/VehiclesContext'
import { useContext } from 'react'

export const useVehiclesContext = () => {
  const context = useContext(VehiclesContext)

  if (!context) {
    throw Error('useWorkoutsContext must be used inside an WorkoutsContextProvider')
  }

  return context
}