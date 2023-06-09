import { useMutation } from '@tanstack/react-query'
import { axios } from '../axios'
import pako from 'pako'

export const postChildTicket = async (newTicket) => {
  const compressedData = pako.gzip(JSON.stringify(newTicket))
  const res = await axios.post(
    '/assignticket/savechildticket',
    compressedData,
    {
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
      },
    }
  )
  return res.data
}

export const usePostChildTicket = () => {
  return useMutation({
    mutationKey: ['requestTicket'],
    mutationFn: (newTicket) => postChildTicket(newTicket),
  })
}
