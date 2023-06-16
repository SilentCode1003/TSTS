import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getRequesterDetails = async (inputs) => {
  const res = await axios.post('/client/clientinfo', inputs)
  return res.data
}

export const useGetRequesterDetails = (fullname) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requester', `${fullname}`],
    mutationFn: (inputs) => getRequesterDetails(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requester', `${fullname}`],
      }),
  })
}
