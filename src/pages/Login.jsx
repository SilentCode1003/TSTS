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
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { useForm } from 'react-hook-form'

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data))
        resolve()
      }, 3000)
    })
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
        <Box
          flex="1"
          position="relative"
          // bg="center url('https://images.pexels.com/photos/5948347/pexels-photo-5948347.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')"
          // backgroundSize="cover"
        >
          {/* <Flex
            w="100%"
            h="100%"
            p="8"
            alignItems="center"
            textAlign="center"
            position="absolute"
            bg="blackAlpha.600"
          >
            <Heading color="white">Technical Service Ticketing System</Heading>
          </Flex> */}
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
            </VStack>
          </form>
        </Flex>
      </Card>
    </Grid>
  )
}

export default Login
