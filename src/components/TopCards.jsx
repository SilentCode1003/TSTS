import { GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import TopCardsItem from './TopCardsItem'
import BarGraph from './BarGraph'
import useDashboardCardStore from '../store/DashboardCardStore'
import { shallow } from 'zustand/shallow'

const TopCards = () => {
  const { cards, cardsData, filterCards } = useDashboardCardStore(
    (state) => ({
      cards: state.cards,
      cardsData: state.cardsData,
      filterCards: state.filterCards,
    }),
    shallow
  )

  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="4">
      {cards.map((card) => (
        <TopCardsItem key={card.id} header={card.header}>
          {card.content}
        </TopCardsItem>
      ))}

      <GridItem colSpan={[1, 2]} rowSpan="2">
        <TopCardsItem>
          <BarGraph />
        </TopCardsItem>
      </GridItem>
    </SimpleGrid>
  )
}

export default TopCards
