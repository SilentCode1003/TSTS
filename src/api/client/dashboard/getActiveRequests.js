import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getActiveRequests = async (inputs) => {
  // TODO: api
  const res = await axios.post('', inputs)
  return res.data
}

export const useGetActiveRequests = (user) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requestTicket', `${user}`],
    mutationFn: (inputs) => getActiveRequests(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requestTicket', `${user}`],
      }),
  })
}
