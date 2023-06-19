import { useMutation, useQueryClient } from '@tanstack/react-query'
import { axios } from '../axios'
import { useState } from 'react'

export const getClientInfo = async (inputs) => {
  const res = await axios.post('/client/clientinfo', inputs)
  return res.data
}

export const useGetClientInfo = (fullname) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['clientinfo', `${fullname}`],
    mutationFn: (inputs) => getClientInfo(inputs),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['clientinfo', `${fullname}`],
      }),
  })
}

export const useClientInfo = (fullname) => {
  const [clientInfo, setClientInfo] = useState()
  const { isLoading, error, mutateAsync } = useGetClientInfo(fullname)

  useState(() => {
    mutateAsync({
      requestby: fullname,
    }).then((data) => {
      setClientInfo(data.data[0])
    })
  }, [])

  return { clientInfo, isLoading, error }
}
