import { createContext, useState } from 'react'
import { axios } from '../api/axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (userObject) => {
    const res = await axios.post('/login/userlogin', userObject)

    if (res.data.msg === 'notmatch') {
      throw new Error('Invalid credentials')
    }

    set({ currentUser: res.data.data[0] })
  }

  const logout = () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
