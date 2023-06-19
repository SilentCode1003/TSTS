import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../../axios'
import { useEffect, useState } from 'react'

export const getRequestTicketCount = async (inputs) => {
  const res = await axios.post('/requestticket/getactivecount', inputs)
  return res.data
}

export const useGetRequestTicketCount = (user) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['requestTicketCount', `${user}`],
    mutationFn: (inputs) => getRequestTicketCount(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['requestTicketCount', `${user}`],
      }),
  })
}

export const useRequestTicketCount = ({ requestby }) => {
  const [count, setCount] = useState()
  const { isLoading, error, mutateAsync } = useGetRequestTicketCount()

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await mutateAsync({
          requestby,
        })
        console.log(data)
        setCount(data.data[0].totalactive)
      } catch (e) {
        console.log(e)
      }
    }

    fetchCount()
  }, [])

  return { count, isLoading, error }
}
