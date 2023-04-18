import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getContent = (id) => {
  return axios.get(`/topics/${id}`)
}

export const useGetContent = (topicId) => {
  return useQuery({
    queryKey: ['topics', topicId],
    queryFn: () => getContent(topicId),
  })
}
