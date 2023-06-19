import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const changeClientInfo = async (inputs) => {
  const res = await axios.post('/client/updateinfo', inputs)
  return res.data
}

export const useChangeClientInfo = () => {
  return useMutation({
    mutationFn: (inputs) => changeClientInfo(inputs),
  })
}
