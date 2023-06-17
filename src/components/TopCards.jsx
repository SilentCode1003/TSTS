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
import loadable from '@loadable/component'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { SystemSettingsContext } from '../context/SystemSettingsContext'
import useDashboardCardStore from '../store/DashboardCardStore'
import SortableItem from './SortableItem'
import TopCardsItem from './TopCardsItem'

const BarGraph = loadable(() => import('./admin/BarGraph'))
const DoneTicketTable = loadable(() => import('./admin/DoneTicketTable'))
const RequestTicketTable = loadable(() => import('./RequestTicketTable'))

const TopCards = () => {
  const navigate = useNavigate()

  const { settings } = useContext(SystemSettingsContext)

  const { cards, updateCount, cardsData, setCards } = useDashboardCardStore(
    (state) => ({
      cards: state.cards,
      setCards: state.setCards,
      cardsData: state.cardsData,
      updateCount: state.updateCount,
    })
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

  useEffect(() => {
    updateCount()

    if (settings.realtimeData === true) {
      const interval = setInterval(updateCount, 5000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [settings.realtimeData])

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      modifiers={[restrictToParentElement]}
    >
      <SortableContext items={cards}>
        <SimpleGrid columns={[1, 2, 4]} spacing="4">
          {cards.map((card) => {
            if (card.active) {
              return (
                <SortableItem key={card.id} id={card.id}>
                  <TopCardsItem
                    header={card.header}
                    onClick={() => {
                      // NEW, OPEN, ...
                      navigate(
                        `/admin/reporting?status=${card.header
                          .split(' ')[0]
                          .toUpperCase()}`
                      )
                    }}
                  >
                    {card.content()}
                  </TopCardsItem>
                </SortableItem>
              )
            }
          })}

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem header="Ticket Requests">
              <RequestTicketTable />
            </TopCardsItem>
          </GridItem>

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem>
              <BarGraph />
            </TopCardsItem>
          </GridItem>

          <GridItem colSpan={[1, 2]} rowSpan="2">
            <TopCardsItem header="Done Tickets">
              <DoneTicketTable />
            </TopCardsItem>
          </GridItem>
        </SimpleGrid>
      </SortableContext>
    </DndContext>
  )
}

export default TopCards
