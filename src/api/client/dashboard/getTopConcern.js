import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTopConcern = async (inputs) => {
  // TODO: api
  const res = await axios.post('', inputs)
  return res.data
}

export const useGetTopConcern = (user) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['topConcern', `${user}`],
    mutationFn: (inputs) => getTopConcern(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['topConcern', `${user}`],
      }),
  })
}
