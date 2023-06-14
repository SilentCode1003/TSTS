import { useMutation } from '@tanstack/react-query'
import { axios } from '../../axios'
import pako from 'pako'

export const uploadRequestTicket = async (newTicket) => {
  const compressedData = pako.gzip(JSON.stringify(newTicket))
  const res = await axios.post('/requestticket/save', compressedData, {
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
  })
  return res.data
}

export const useUploadRequestTicket = () => {
  return useMutation({
    mutationKey: ['requestTicket'],
    mutationFn: (newTicket) => uploadRequestTicket(newTicket),
  })
}
