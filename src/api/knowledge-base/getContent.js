import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'

export const getContent = async (ticketname) => {
  const res = await axios.post('/issue/getContent', {
    ticketname: ticketname,
  })
  return res.data
}

export const useGetContent = () => {
  return useMutation({
    mutationKey: ['content'],
    mutationFn: (ticketname) => getContent(ticketname),
  })
}
