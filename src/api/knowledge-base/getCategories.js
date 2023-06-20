import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getCategories = async () => {
  const res = await axios.get('/category/load')
  return res.data
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })
}
