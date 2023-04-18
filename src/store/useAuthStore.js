import axios from 'axios'
import { create } from 'zustand'

const useAuthStore = create((set) => ({
  currentUser: JSON.parse(localStorage.getItem('user')) || null,

  login: async (userObject) => {
    const res = await axios.post('', userObject, {
      withCredentials: true,
    })

    set({ currentUser: res.data })
  },

  logout: async () => {
    await axios.post('', null, {
      withCredentials: true,
    })
    set({ currentUser: null })
  },
}))

useAuthStore.subscribe((state) =>
  localStorage.setItem('user', JSON.stringify(state.currentUser))
)

export default useAuthStore
