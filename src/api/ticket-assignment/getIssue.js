import { useMutation, useQuery } from '@tanstack/react-query'
import { axios } from '../axios'

export const getIssue = async (concernname) => {
  const res = await axios.post('/issue/getissue', {
    concernname: concernname,
  })
  return res.data
}

export const useGetIssue = () => {
  return useMutation({
    mutationKey: ['issue'],
    mutationFn: (concernname) => getIssue(concernname),
  })
}
