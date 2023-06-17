import { GridItem, SimpleGrid } from '@chakra-ui/react'
import loadable from '@loadable/component'
import { useState } from 'react'
import TopCardsItem from './TopCardsItem'
import TopConcernsGraph from './TopConcernsGraph'

const ClientActiveRequestTable = loadable(() =>
  import('./ClientActiveRequestTable')
)

const ClientTopCards = () => {
  const [noOfActiveTickets, setNoOfActiveTickets] = useState()

  return (
    <SimpleGrid columns={[1, 4]} spacing="4">
      <GridItem colSpan={[4, 2, 2]}>
        <TopCardsItem header="Active Tickets">{noOfActiveTickets}</TopCardsItem>
      </GridItem>

      <GridItem colSpan={[4, 4, 4]} rowSpan="2">
        <TopCardsItem header="Top Concerns">
          <TopConcernsGraph />
        </TopCardsItem>
      </GridItem>

      <GridItem colSpan={4} rowSpan="2">
        <TopCardsItem header="Active Request Tickets">
          <ClientActiveRequestTable
            setNoOfActiveTickets={setNoOfActiveTickets}
          />
        </TopCardsItem>
      </GridItem>
    </SimpleGrid>
  )
}

export default ClientTopCards
