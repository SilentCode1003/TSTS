import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const changeAdminPassword = async (inputs) => {
  const res = await axios.post('/users/update', inputs)
  return res.data
}

export const useChangeAdminPassword = () => {
  return useMutation({
    mutationFn: (inputs) => changeAdminPassword(inputs),
  })
}
