import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const getActiveTickets = async (inputs) => {
  const res = await axios.post('', inputs)
  return res.data
}

export const useGetActiveTickets = (user) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['activeTickets', `${user}`],
    mutationFn: (inputs) => getActiveTickets(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['activeTickets', `${user}`],
      }),
  })
}
