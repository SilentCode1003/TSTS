import { GridItem, SimpleGrid } from '@chakra-ui/react'
import loadable from '@loadable/component'
import TopCardsItem from './TopCardsItem'

const ClientActiveRequestTable = loadable(() =>
  import('./ClientActiveRequestTable')
)

const ClientTopCards = () => {
  return (
    <SimpleGrid columns={[1, 4]} spacing="4">
      <TopCardsItem header="Active Tickets">WIP</TopCardsItem>

      <GridItem colSpan={[4, 4, 3]} rowSpan="2">
        <TopCardsItem header="Top Concerns">WIP</TopCardsItem>
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
