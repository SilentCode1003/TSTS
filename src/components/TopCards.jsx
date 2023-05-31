import { GridItem, SimpleGrid } from '@chakra-ui/react'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import React from 'react'
import { shallow } from 'zustand/shallow'
import useDashboardCardStore from '../store/DashboardCardStore'
import BarGraph from './BarGraph'
import SortableItem from './SortableItem'
import TopCardsItem from './TopCardsItem'

const TopCards = () => {
  const { cards, cardsData, filterCards, setCards } = useDashboardCardStore(
    (state) => ({
      cards: state.cards,
      cardsData: state.cardsData,
      filterCards: state.filterCards,
      setCards: state.setCards,
    }),
    shallow
  )

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  })

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 200,
      tolerance: 5,
    },
  })

  const sensors = useSensors(mouseSensor, touchSensor)

  const statusDummyData = {
    labels: [new Date().toLocaleString(undefined, { month: 'long' })],
    datasets: [
      {
        label: 'New',
        data: [25],
        backgroundColor: '#9F7AEA99',
      },
      {
        label: 'Open',
        data: [73],
        backgroundColor: '#eae37a99',
      },
      {
        label: 'Pending',
        data: [55],
        backgroundColor: '#EA7A8D99',
      },
      {
        label: 'Closed',
        data: [49],
        backgroundColor: '#6d4d4d99',
      },
      {
        label: 'Resolved',
        data: [75],
        backgroundColor: '#C5EA7A99',
      },
    ],
  }

  const handleDragEnd = (e) => {
    const { active, over } = e

    if (active.id !== over.id) {
      const activeIndex = cards.map((e) => e.id).indexOf(active.id)
      const overIndex = cards.map((e) => e.id).indexOf(over.id)
      setCards(arrayMove(cards, activeIndex, overIndex))
    }
  }

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={cards}>
        <SimpleGrid columns={[1, 2, 4]} spacing="4">
          {cards.map((card) => (
            <SortableItem key={card.id} id={card.id}>
              <TopCardsItem header={card.header}>{card.content}</TopCardsItem>
            </SortableItem>
          ))}

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem>
              <BarGraph data={statusDummyData} />
            </TopCardsItem>
          </GridItem>
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  )
}

export default TopCards
