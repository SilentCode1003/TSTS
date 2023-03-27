import { NavLink } from 'react-router-dom'

function NavigationLinks({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.url}
            className={({ isActive, isPending }) =>
              isPending ? 'text-gray-400' : isActive ? 'pb-2 border-b-2' : ''
            }
          >
            {item.name}
          </NavLink>
        </li>
      ))}
    </>
  )
}

export default NavigationLinks
