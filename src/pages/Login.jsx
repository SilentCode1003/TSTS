import {
  Box,
  Button,
  ButtonGroup,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'

const Login = () => {
  const currentUser = useAuthStore((state) => state.currentUser)
  const login = useAuthStore((state) => state.login)
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = async (data) => {
    setError(null)

    try {
      // FIXME: WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
      await login(data)

      if (currentUser.role === 'ADMINISTRATOR') {
        console.log('admin')
        navigate('/admin')
      } else if (currentUser.role === 'CLIENT') {
        console.log('client')
        navigate('/')
      }
    } catch (e) {
      setError(e)
    }
  }

  return (
    <Grid
      p="2"
      minH="100vh"
      placeItems="center"
      bg="purple.400"
      overflowY="auto"
    >
      <Card
        w={['90%', '70%']}
        maxW="800px"
        direction={['column', 'row']}
        overflow="hidden"
      >
        <Box flex="1" position="relative">
          <Image
            h={['200px', '100%']}
            w="100%"
            objectFit="cover"
            maxW="100%"
            src="https://images.pexels.com/photos/5948347/pexels-photo-5948347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Box>

        <Flex flex="1" alignItems="center" justifyContent="center">
          <form onSubmit={handleSubmit(onSubmit)} style={{ padding: '2rem' }}>
            <VStack spacing="6">
              <Heading>Login</Heading>

              <FormControl isInvalid={errors.username}>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  {...register('username', {
                    required: 'Username is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <ButtonGroup>
                <Button
                  type="submit"
                  colorScheme="purple"
                  isLoading={isSubmitting}
                >
                  Login
                </Button>
              </ButtonGroup>

              {error && <Text>{error.message}</Text>}
            </VStack>
          </form>
        </Flex>
      </Card>
    </Grid>
  )
}

export default Login
