import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'

export const applyFilterProfile = async (filterObj) => {
  const res = await axios.post('/filter/apply', filterObj)
  return res.data
}

export const useApplyFilterProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (filterObj) => applyFilterProfile(filterObj),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['filters'] }),
  })
}
