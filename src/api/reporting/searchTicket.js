import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const searchTicket = async (inputs) => {
  const res = await axios.post('/assignticket/getticket', inputs)
  return res.data
}

export const useSearchTicket = (ticketid) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tickets', `${ticketid}`],
    mutationFn: (inputs) => searchTicket(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['tickets', `${ticketid}`],
      }),
  })
}
