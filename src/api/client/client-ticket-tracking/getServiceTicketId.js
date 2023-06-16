import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getServiceTicketId = async (inputs) => {
  const res = await axios.post('/requestticket/getserviceticket', inputs)
  return res.data
}

export const useGetServiceTicketId = (requestId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['serviceTicketId', `${requestId}`],
    mutationFn: (inputs) => getServiceTicketId(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['serviceTicketId', `${requestId}`],
      }),
  })
}
