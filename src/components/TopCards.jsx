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
import DoneTicketTable from './DoneTicketTable'
import SortableItem from './SortableItem'
import TopCardsItem from './TopCardsItem'
import { useEffect } from 'react'

const TopCards = () => {
  const { cards, updateCount, setCards } = useDashboardCardStore((state) => ({
    cards: state.cards,
    setCards: state.setCards,
    updateCount: state.updateCount,
  }))

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

  useEffect(() => {
    const interval = setInterval(updateCount, 5000)

    return () => {
      clearInterval(interval)
    }
  }, [])

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
              <TopCardsItem header={card.header}>{card.content()}</TopCardsItem>
            </SortableItem>
          ))}

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem>
              <BarGraph />
            </TopCardsItem>
          </GridItem>

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem>
              <DoneTicketTable />
            </TopCardsItem>
          </GridItem>
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  )
}

export default TopCards
