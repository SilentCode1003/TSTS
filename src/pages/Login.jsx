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
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Login = () => {
  const { currentUser, login } = useContext(AuthContext)
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
      const user = await login(data)

      console.log(user)
      if (user.role === 'ADMINISTRATOR') {
        console.log('admin')
        navigate('/admin')
      } else if (user.role === 'CLIENT') {
        console.log('client')
        navigate('/')
      }
    } catch (e) {
      setError(e)
    }
  }

  if (currentUser && currentUser.role === 'CLIENT') {
    return <Navigate to="/" />
  }

  if (currentUser && currentUser.role === 'ADMINISTRATOR') {
    return <Navigate to="/admin" />
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
        minH="500px"
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
                  autoComplete="username"
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

              {error && (
                <Text color="red.500" fontWeight="semibold">
                  {error.message}
                </Text>
              )}
            </VStack>
          </form>
        </Flex>
      </Card>
    </Grid>
  )
}

export default Login
