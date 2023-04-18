import { GridItem, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import TopCardsItem from './TopCardsItem'

const TopCards = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="4">
      <TopCardsItem header="New Tickets">3</TopCardsItem>

      <TopCardsItem header="Urgent Tickets">12</TopCardsItem>

      <GridItem colSpan={[1, null, 2]} rowSpan="2">
        <TopCardsItem header="Resolved vs Unresolved Tickets"></TopCardsItem>
      </GridItem>
    </SimpleGrid>
  )
}

export default TopCards
