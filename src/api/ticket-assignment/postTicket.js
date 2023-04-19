import { useMutation, useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const postTicket = async (newTicket) => {
  const res = await axios.post('/ticket/save', newTicket, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}

export const usePostTicket = () => {
  return useMutation({
    mutationKey: ['ticket'],
    mutationFn: (newTicket) => postTicket(newTicket),
  })
}
