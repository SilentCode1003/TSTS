import { GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import TopCardsItem from './TopCardsItem'
import BarGraph from './BarGraph'

const TopCards = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="4">
      <TopCardsItem header="New Tickets">3</TopCardsItem>

      <TopCardsItem header="Urgent Tickets">12</TopCardsItem>

      <GridItem colSpan={[1, 2]} rowSpan="2">
        <TopCardsItem>
          <BarGraph />
        </TopCardsItem>
      </GridItem>
    </SimpleGrid>
  )
}

export default TopCards
