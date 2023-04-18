import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getTopics = () => {
  return axios.get('/topics')
}

export const useGetTopics = () => {
  return useQuery({
    queryKey: ['topics'],
    queryFn: () => getTopics(),
  })
}
