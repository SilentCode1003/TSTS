import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const postTicketStatusUpdate = async (ticketDetails) => {
  const res = await axios.post('/assignticket/updateticket', ticketDetails)
  return res.data
}

export const usePostTicketStatusUpdate = (ticketid) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ticketDetails) => postTicketStatusUpdate(ticketDetails),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['tickets'],
      }),
  })
}
