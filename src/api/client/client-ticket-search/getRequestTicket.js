import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getProtectedRequestTicket = async (inputs) => {
  const res = await axios.post('/requestticket/searchrequestid', inputs)
  return res.data
}

export const useGetProtectedRequestTicket = (requestId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requestTicket', `${requestId}`],
    mutationFn: (inputs) => getProtectedRequestTicket(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requestTicket', `${requestId}`],
      }),
  })
}
