import { axios } from '../api/axios'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem('user')) || null,

  login: async (userObject) => {
    const res = await axios.post('/login/userlogin', userObject)

    if (res.data.msg === 'notmatch') {
      throw new Error('Invalid credentials')
    }

    set({ currentUser: res.data.data[0] })
  },

  logout: async () => {
    await axios.post('', null)
    set({ currentUser: null })
  },
}))

useAuthStore.subscribe((state) =>
  localStorage.setItem('user', JSON.stringify(state.currentUser))
)

export default useAuthStore
