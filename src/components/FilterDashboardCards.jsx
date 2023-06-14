import { Button, Checkbox, Heading, Stack, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { shallow } from 'zustand/shallow'
import { useErrorToast, useSuccessToast } from '../hooks/useToastFeedback'
import useDashboardCardStore from '../store/DashboardCardStore'

const FilterDashboardCards = () => {
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

  return (
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
  )
}

export default FilterDashboardCards
