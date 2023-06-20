import { useMutation } from '@tanstack/react-query'
import { axios } from '../../axios'

export const getServiceTickets = async (inputs) => {
  const res = await axios.post('/requestticket/getserviceticketstatus', inputs)
  return res.data
}

export const useGetServiceTickets = () => {
  return useMutation({
    mutationFn: (inputs) => getServiceTickets(inputs),
  })
}
