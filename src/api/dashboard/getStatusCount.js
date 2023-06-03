import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const getStatusCount = async (data) => {
  const res = await axios.post('/assignticket/getstatuscount', data)
  return res.data
}

export const useGetStatusCount = (ticketstatus) => {
  return useMutation({
    mutationKey: ['statuscount', ticketstatus],
    mutationFn: (data) => getStatusCount(data),
  })
}
