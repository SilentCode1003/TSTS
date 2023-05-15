import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTicketsByStatus = async (inputs) => {
  const res = await axios.post('/assignticket/getticketstatus', inputs)
  return res.data
}

export const useGetTicketsByStatus = (inputs) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['tickets', `${inputs}`],
    mutationFn: (inputs) => getTicketsByStatus(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['tickets', `${inputs}`],
      }),
  })
}
