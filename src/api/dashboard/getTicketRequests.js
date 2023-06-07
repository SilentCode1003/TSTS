import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTicketRequests = async () => {
  const res = await axios.get('')
  return res.data
}

export const useGetTicketRequests = () => {
  return useQuery({
    queryKey: ['ticketRequests'],
    queryFn: getTicketRequests,
  })
}
