import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
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
  Stack,
  Switch,
  VStack,
} from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { shallow } from 'zustand/shallow'
import { SystemSettingsContext } from '../context/SystemSettingsContext'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'
import useDashboardCardStore from '../store/DashboardCardStore'

const Automation = () => {
  const { settings, setSettings } = useContext(SystemSettingsContext)
  console.log(settings)

  const { cards, activeIds, cardsData, filterCards } = useDashboardCardStore(
    (state) => ({
      cards: state.cards,
      activeIds: state.activeIds,
      cardsData: state.cardsData,
      filterCards: state.filterCards,
    }),
    shallow
  )
  const [checkedIds, setCheckedIds] = useState(activeIds())

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

  const successToast = useSuccessToast({
    title: 'Success',
    description: 'Setting applied successfully',
  })
  const errorToast = useErrorToast({
    title: 'Error',
  })

  const handleCheckboxChange = (e) => {
    if (!e.target.checked) {
      const filtered = checkedIds.filter((id) => id !== +e.target.value)
      setCheckedIds(filtered)
    }
    if (e.target.checked) {
      setCheckedIds((prev) => [...prev, +e.target.value])
    }
  }

  const handleApply = () => {
    filterCards(checkedIds)
    successToast()
  }

  const onSubmit = (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(data, null, 2))
        resolve()
      }, 3000)
    })
  }

  return (
    <Box p={['4', null, '8']}>
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
              <Button
                type="reset"
                onClick={() => reset()}
                isLoading={isSubmitting}
              >
                Reset
              </Button>
            </ButtonGroup>
          </VStack>
        </form>

        <VStack spacing="8">
          <VStack spacing="4">
            <Heading size="md">Filter Dashboard Cards</Heading>

            <Stack spacing="2" direction="column">
              {cardsData.map((card) => (
                <Checkbox
                  key={card.id}
                  colorScheme="purple"
                  value={card.id}
                  onChange={handleCheckboxChange}
                  isChecked={checkedIds.includes(card.id)}
                  name="cardChecklist"
                >
                  {card.header}
                </Checkbox>
              ))}
            </Stack>

            <Button size="sm" onClick={handleApply}>
              Apply
            </Button>
          </VStack>

          <HStack>
            <FormLabel htmlFor="realtimeData">
              <Heading size="md">Realtime Dashboard Data</Heading>
            </FormLabel>
            <Switch
              id="realtimeData"
              colorScheme="purple"
              size="lg"
              isChecked={settings.realtimeData}
              onChange={(e) => {
                setSettings((prev) => ({
                  ...prev,
                  realtimeData: e.target.checked,
                }))
              }}
            />
          </HStack>
        </VStack>
      </Flex>
    </Box>
  )
}

export default Automation
