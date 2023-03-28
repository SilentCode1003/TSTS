import { NavLink } from 'react-router-dom'

function NavigationLinks({ items }) {
  return (
    <>
      {items.map((item, index) => (
        <li key={index} className="w-full">
          <NavLink
            to={item.url}
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-gray-400'
                : isActive
                ? 'p-2 w-full inline-block border-b-2 border-white'
                : 'p-2 w-full inline-block border-b-2 border-red-500 hover:border-b-2 hover:border-white'
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
