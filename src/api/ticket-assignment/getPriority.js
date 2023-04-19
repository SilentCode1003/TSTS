import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getPriority = async () => {
  const res = await axios.get('/priority/load')
  return res.data
}

export const useGetPriority = () => {
  return useQuery({
    queryKey: ['priority'],
    queryFn: getPriority,
  })
}
