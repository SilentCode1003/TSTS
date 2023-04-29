import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const postTicketComment = async (ticketComment) => {
  const res = await axios.post('/ticketcomment/save', ticketComment)
  return res.data
}

export const usePostTicketComment = (ticketid) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (ticketComment) => postTicketComment(ticketComment),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['comments', `${ticketid}`] }),
  })
}
