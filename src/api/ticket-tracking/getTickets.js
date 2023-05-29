import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTickets = async () => {
  const res = await axios.get('/assignticket/load')
  return res.data
}

export const useGetTickets = () => {
  return useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets,
  })
}
