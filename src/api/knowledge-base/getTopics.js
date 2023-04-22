import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTopics = async () => {
  const res = await axios.get('/topics/load')
  return res.data
}

export const useGetTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })
}
