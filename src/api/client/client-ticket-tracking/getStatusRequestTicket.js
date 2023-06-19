import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getStatusRequestTicket = async (inputs) => {
  const res = await axios.post('/requestticket/getticketstatus', inputs)
  return res.data
}

export const useGetStatusRequestTicket = (status) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['statusRequestTicket', `${status}`],
    mutationFn: (inputs) => getStatusRequestTicket(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['statusRequestTicket', `${status}`],
      }),
  })
}
