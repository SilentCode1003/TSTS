import { create } from 'zustand'
import { getStatusCount } from '../api/dashboard/getStatusCount'

const dt = new Date()
const year = dt.getFullYear()
const month = (dt.getMonth() + 1).toString().padStart(2, '0')
const day = new Date(year, month + 1, 0).getDate().toString().padStart(2, '0')

const datefrom = `${year}-${month}-01 00:00`
const dateto = `${year}-${month}-${day} 23:59`

const cardsData = [
  {
    id: 1,
    header: 'New Tickets',
  },
  {
    id: 2,
    header: 'Open Tickets',
  },
  {
    id: 3,
    header: 'Pending Tickets',
  },
  {
    id: 4,
    header: 'Closed Tickets',
  },
]

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
      active: true,
    },
    {
      id: 2,
      header: 'Open Tickets',
      content: () => get().openCount,
      active: true,
    },
    {
      id: 3,
      header: 'Pending Tickets',
      content: () => get().pendingCount,
      active: true,
    },
    {
      id: 4,
      header: 'Closed Tickets',
      content: () => get().closedCount,
      active: true,
    },
  ],
  cardsData,
  activeIds: () => {
    const ids = get().cards.map((card) => {
      if (card.active) return card.id
    })
    return ids
  },
  filterCards: (idArray) => {
    set((state) => {
      const filtered = state.cards.map((card) => {
        if (idArray.includes(card.id)) {
          return { ...card, active: true }
        } else {
          return { ...card, active: false }
        }
      })

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
      openCount: openCountRes.data[0].ticketcount,
      pendingCount: pendingCountRes.data[0].ticketcount,
      closedCount: closedCountRes.data[0].ticketcount,
    })
  },
}))

export default useDashboardCardStore
