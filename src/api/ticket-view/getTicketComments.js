import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTicketComments = async (ticketid) => {
  const res = await axios.post('ticketcomment/getticketcomment', {
    ticketid,
  })
  return res.data
}

export const useGetTicketComments = (ticketid) => {
  return useQuery({
    queryKey: ['comments', ticketid],
    queryFn: () => getTicketComments(ticketid),
  })
}
