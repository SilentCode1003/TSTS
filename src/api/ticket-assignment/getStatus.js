import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getStatus = async () => {
  const res = await axios.get('/status/load')
  return res.data
}

export const useGetStatus = () => {
  return useQuery({
    queryKey: ['status'],
    queryFn: getStatus,
  })
}
