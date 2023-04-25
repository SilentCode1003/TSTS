import { useToast } from '@chakra-ui/react'

export const useSuccessToast = ({ title, description }) => {
  return useToast({
    title,
    description,
    status: 'success',
    colorScheme: 'green',
    duration: 9000,
    isClosable: true,
  })
}

export const useErrorToast = ({ title, description }) => {
  return useToast({
    title,
    description,
    status: 'error',
    colorScheme: 'red',
    duration: 9000,
    isClosable: true,
  })
}
