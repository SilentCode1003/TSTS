import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getAllTickets = async (inputs) => {
  const res = await axios.post('/assignticket/getallticket', inputs)
  return res.data
}

export const useGetAllTickets = (inputs) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tickets', `${inputs}`],
    mutationFn: (inputs) => getAllTickets(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['tickets', `${inputs}`],
      }),
  })
}
