import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getClient = async () => {
  const res = await axios.get('/client/load')
  return res.data
}

export const useGetClient = () => {
  return useQuery({
    queryKey: ['client'],
    queryFn: getClient,
  })
}
