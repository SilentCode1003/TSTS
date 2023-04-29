import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const postTicketComment = async (ticketComment) => {
  const res = await axios.post('/ticketcomment/save', ticketComment)
  return res.data
}

export const usePostTicketComment = () => {
  return useMutation({
    mutationKey: ['comments'],
    mutationFn: (ticketComment) => postTicketComment(ticketComment),
  })
}
