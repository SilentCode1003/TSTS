import { create } from 'zustand'
import { getStatusCount } from '../api/dashboard/getStatusCount'

const dt = new Date()
const year = dt.getFullYear()
const month = (dt.getMonth() + 1).toString().padStart(2, '0')
const day = new Date(year, month + 1, 0).getDate().toString().padStart(2, '0')

const datefrom = `${year}-${month}-01 00:00`
const dateto = `${year}-${month}-${day} 23:59`

const useDashboardCardStore = create((set, get) => ({
  newCount: 1,
  openCount: 2,
  pendingCount: 3,
  closedCount: 4,
  cards: [
    {
      id: 1,
      header: 'New Tickets',
      content: () => get().newCount,
    },
    {
      id: 2,
      header: 'Open Tickets',
      content: () => get().openCount,
    },
    {
      id: 3,
      header: 'Pending Tickets',
      content: () => get().pendingCount,
    },
    {
      id: 4,
      header: 'Closed Tickets',
      content: () => get().closedCount,
    },
  ],
  activeIds: () => {
    const ids = get().cards.map((card) => card.id)
    return ids
  },
  filterCards: (idArray) => {
    set((state) => {
      const filtered = state.cardsData.filter(
        (card) => idArray.indexOf(card.id) !== -1
      )

      return {
        cards: filtered,
      }
    })
  },
  setCards: (newState) => {
    set((state) => {
      return { cards: newState }
    })
  },
  // set((state) => ({
  //   cards: state.cards.filter((item) => idArray.indexOf(item.id) === -1),
  // })),
  updateCount: async () => {
    const newCountRes = await getStatusCount({
      ticketstatus: 'NEW',
      datefrom,
      dateto,
    })
    const openCountRes = await getStatusCount({
      ticketstatus: 'OPEN',
      datefrom,
      dateto,
    })
    const pendingCountRes = await getStatusCount({
      ticketstatus: 'PENDING',
      datefrom,
      dateto,
    })
    const closedCountRes = await getStatusCount({
      ticketstatus: 'CLOSED',
      datefrom,
      dateto,
    })

    set({
      newCount: newCountRes.data[0].ticketcount,
      closedCount: openCountRes.data[0].ticketcount,
      pendingCount: pendingCountRes.data[0].ticketcount,
      closedCount: closedCountRes.data[0].ticketcount,
    })
  },
}))

export default useDashboardCardStore
