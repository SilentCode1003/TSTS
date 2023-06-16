import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const searchRequestTicket = async (inputs) => {
  const res = await axios.post('/requestticket/getrequestticketid', inputs)
  return res.data
}

export const useSearchRequestTicket = (ticketid) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requestTicket', `${ticketid}`],
    mutationFn: (inputs) => searchRequestTicket(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requestTicket', `${ticketid}`],
      }),
  })
}
