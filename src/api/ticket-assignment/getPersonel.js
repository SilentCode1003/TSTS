import { useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getPersonel = async () => {
  const res = await axios.get('/personel/load')
  return res.data
}

export const useGetPersonel = () => {
  return useQuery({
    queryKey: ['personel'],
    queryFn: getPersonel,
  })
}
