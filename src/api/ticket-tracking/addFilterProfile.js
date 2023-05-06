import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const addFilterProfile = async (filterObj) => {
  const res = await axios.post('/filter/save', filterObj)
  return res.data
}

export const useAddFilterProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (filterObj) => addFilterProfile(filterObj),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['filters'] }),
  })
}
