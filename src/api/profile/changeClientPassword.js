import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const changeClientPassword = async (inputs) => {
  const res = await axios.post('/client/updatepassword', inputs)
  return res.data
}

export const useChangeClientPassword = () => {
  return useMutation({
    mutationFn: (inputs) => changeClientPassword(inputs),
  })
}
