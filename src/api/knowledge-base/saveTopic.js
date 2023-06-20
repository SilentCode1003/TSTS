import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const saveTopic = async (input) => {
  const res = await axios.post('/knowledge/save', input)
  return res.data
}

export const useSaveTopic = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input) => saveTopic(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['filters'] }),
  })
}
