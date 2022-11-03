import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    case 'CHANGE_LANGUAGE': 
    return { ...state, lang: action.payload}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    lang: 'english'
  })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
    }
  }, [])

  const changeLanguage = (language) => {
    localStorage.removeItem('language')
    localStorage.setItem('language', language)
    dispatch({
        type: 'CHANGE_LANGUAGE',
        payload: language
    })
  }

  const translate = (lang, czWord, enWord, espWord) => {
   
    switch(lang){
        case 'cesky':
            return czWord
        case 'espanol':
            return espWord
        case 'english':
            return enWord
        
    }
}
  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch, changeLanguage, translate }}>
      { children }
    </AuthContext.Provider>
  )

}