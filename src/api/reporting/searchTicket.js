import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const searchTicket = async (inputs) => {
  const res = await axios.post('/assignticket/getticket', inputs)
  return res.data
}

export const useGetAllTickets = (inputs) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (inputs) => searchTicket(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['tickets', `${inputs}`],
      }),
  })
}
