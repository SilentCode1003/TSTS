import { create } from 'zustand'

const cardsData = [
  {
    id: 1,
    header: 'New Tickets',
    content: '3',
  },
  {
    id: 2,
    header: 'Urgent Tickets',
    content: '5',
  },
  {
    id: 3,
    header: 'Open Tickets',
    content: '23',
  },
  {
    id: 4,
    header: 'Closed Tickets',
    content: '999',
  },
]

const useDashboardCardStore = create((set, get) => ({
  cards: cardsData,
  cardsData,
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
  // set((state) => ({
  //   cards: state.cards.filter((item) => idArray.indexOf(item.id) === -1),
  // })),
}))

export default useDashboardCardStore
