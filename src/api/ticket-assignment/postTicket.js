import { useMutation, useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const postTicket = async (newTicket) => {
  const res = await axios.post('/ticket/save', newTicket)
  return res.data
}

export const usePostTicket = () => {
  return useMutation({
    mutationKey: ['ticket'],
    mutationFn: (newTicket) => postTicket(newTicket),
  })
}
