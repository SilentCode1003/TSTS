import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  HStack,
  Heading,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'

const Automation = () => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      refetchInterval: '1000',
      language: 'english',
    },
  })

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <Box p="8">
      <Flex direction="column" gap="8">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Automation
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid templateColumns={['1fr', null, '1fr 1fr']} gap="8">
            <FormControl>
              <FormLabel htmlFor="refetch-interval">Refetch Interval</FormLabel>

              <Controller
                name="refetchInterval"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    id="refetch-interval"
                    step={250}
                    min={250}
                    {...field}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                )}
              />

              <FormHelperText>
                How often should the system acquire new data (in milliseconds)
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="language">Language</FormLabel>

              <Select id="language" {...register('language')}>
                <option value="english">English</option>
                <option value="filipino">Filipino</option>
              </Select>

              <FormHelperText>Set the system's language</FormHelperText>
            </FormControl>
          </Grid>

          <VStack mt="4">
            <ButtonGroup spacing="4" justifyContent="center">
              <Button
                type="submit"
                colorScheme="purple"
                isLoading={isSubmitting}
              >
                Save
              </Button>
              <Button type="reset" onClick={() => reset()}>
                Reset
              </Button>
            </ButtonGroup>
          </VStack>
        </form>
      </Flex>
    </Box>
  )
}

export default Automation
