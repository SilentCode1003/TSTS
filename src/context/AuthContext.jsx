import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axios } from '../api/axios'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem('user')) || null
  )

  const login = async (userObject, cb) => {
    const res = await axios.post('/login/userlogin', userObject)

    // const res = {
    //   data: {
    //     data: [
    //       {
    //         userid: userObject.username === 'admin' ? 1 : 2,
    //         role: userObject.username === 'admin' ? 'ADMINISTRATOR' : 'CLIENT',
    //       },
    //     ],
    //   },
    // }

    if (res.data.msg === 'notmatch') {
      throw new Error('Invalid credentials')
    }

    setCurrentUser(res.data.data[0])

    return res.data.data[0]
  }

  const logout = () => {
    setCurrentUser(null)
  }

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
