import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getClientRequestTickets = async (inputs) => {
  const res = await axios.post('requestticket/getrequestticket', inputs)
  return res.data
}

export const useGetClientRequestTickets = (user) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requestTicket', `${user}`],
    mutationFn: (inputs) => getClientRequestTickets(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requestTicket', `${user}`],
      }),
  })
}
