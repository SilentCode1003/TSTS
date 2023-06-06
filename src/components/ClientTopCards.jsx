import { GridItem, SimpleGrid } from '@chakra-ui/react'
import loadable from '@loadable/component'
import TopCardsItem from './TopCardsItem'

const ClientActiveTicketsTable = loadable(() =>
  import('./ClientActiveTicketsTable')
)
const ClientTopConcernsTable = loadable(() =>
  import('./ClientTopConcernsTable')
)
const ClientActiveRequestTable = loadable(() =>
  import('./ClientActiveRequestTable')
)

const ClientTopCards = () => {
  return (
    <SimpleGrid columns={[1, 2, 4]} spacing="4">
      <GridItem colSpan={[1, 2]} rowSpan="2">
        <TopCardsItem header="Active Tickets">
          <ClientActiveTicketsTable />
        </TopCardsItem>
      </GridItem>

      <GridItem colSpan={[1, 2]} rowSpan="2">
        <TopCardsItem header="Top Concerns">
          <ClientTopConcernsTable />
        </TopCardsItem>
      </GridItem>

      <GridItem colSpan={4} rowSpan="2">
        <TopCardsItem header="Active Request Tickets">
          <ClientActiveRequestTable />
        </TopCardsItem>
      </GridItem>
    </SimpleGrid>
  )
}

export default ClientTopCards
