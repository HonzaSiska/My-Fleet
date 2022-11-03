import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useUpdatePassword = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)

  const { dispatch } = useAuthContext()

  const updatePassword = async (token, password, passwordConfirm) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch('/api/user/update-password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ token, password, passwordConfirm})
    })
    const json = await response.json()

    console.log('response', json)

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
      setTimeout(()=> {
        setError(null)
      }, 3000)
      
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json.user))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json.user})
      setError('Password successfuly updated')
      setTimeout(()=> {
        setError(null)
      }, 3000)

      // update loading state
      setIsLoading(false)
    }
  }

  return { updatePassword, isLoading, error }
}