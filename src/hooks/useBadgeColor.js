import { useEffect, useState } from 'react'

export const useBadgeColor = (searchedTicket) => {
  const [badgeColor, setBadgeColor] = useState('gray')

  useEffect(() => {
    switch (searchedTicket?.ticketstatus) {
      case 'NEW': {
        setBadgeColor('purple')
        break
      }
      case 'OPEN': {
        setBadgeColor('yellow')
        break
      }
      case 'PENDING': {
        setBadgeColor('red')
        break
      }
      case 'CLOSED': {
        setBadgeColor('gray')
      }
      case 'RESOLVED': {
        setBadgeColor('green')
      }
      default:
        break
    }
  }, [searchedTicket])

  return badgeColor
}
