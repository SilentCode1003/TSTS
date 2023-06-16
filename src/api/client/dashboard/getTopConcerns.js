import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getTopConcerns = async (inputs) => {
  const res = await axios.post('requestticket/getrequestticketactive', inputs)
  return res.data
}

export const useGetTopConcerns = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['topConcerns'],
    mutationFn: (inputs) => getTopConcerns(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['topConcerns'],
      }),
  })
}
