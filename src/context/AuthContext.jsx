import { createContext, useEffect, useState } from 'react'
import { axios } from '../api/axios'
import CryptoJS from 'crypto-js'
import { ENC_SECRET_KEY } from '../config'

export const AuthContext = createContext()

const AuthContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const encryptedUser = localStorage.getItem('user')

    if (!encryptedUser) return null

    const bytes = CryptoJS.AES.decrypt(encryptedUser, ENC_SECRET_KEY)
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8)

    if (!decryptedData) return null

    const parsedData = JSON.parse(decryptedData)
    return parsedData || null
  })

  const login = async (userObject) => {
    const res = await axios.post('/login/userlogin', userObject)

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
    const encryptedUser = CryptoJS.AES.encrypt(
      JSON.stringify(currentUser),
      ENC_SECRET_KEY
    ).toString()

    localStorage.setItem('user', encryptedUser)
  }, [currentUser])

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
