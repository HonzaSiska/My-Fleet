import { useNavigate } from "react-router-dom"
import { useAuthContext } from "./useAuthContext"
import { useVehiclesContext } from "./useVehiclesContext"


export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch : dispatchVehicle}  = useVehiclesContext()
  const navigate = useNavigate()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchVehicle({ type: 'SET_VEHICLES', vehicles: null})

     navigate('/login')


  }

  return { logout }
}