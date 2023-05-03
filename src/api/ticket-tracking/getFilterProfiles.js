import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getFilterProfiles = async () => {
  const res = await axios.get('/filter/load') // TODO: change this to /view
  return res.data
}

export const useGetFilterProfiles = () => {
  return useQuery({
    queryKey: ['filters'],
    queryFn: getFilterProfiles,
  })
}
