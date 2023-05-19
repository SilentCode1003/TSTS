import { GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import TopCardsItem from './TopCardsItem'
import BarGraph from './BarGraph'
import useDashboardCardStore from '../store/DashboardCardStore'
import { shallow } from 'zustand/shallow'
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { SortableContext, arrayMove } from '@dnd-kit/sortable'
import SortableItem from './SortableItem'

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
              <BarGraph />
            </TopCardsItem>
          </GridItem>
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  )
}

export default TopCards
