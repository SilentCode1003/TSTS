import { NavLink } from 'react-router-dom'

function NavigationLinks({ items }) {
  return (
    <ul className="flex flex-col text-white text-sm text-center">
      {items.map((item, index) => (
        <li key={index} className="w-full">
          <NavLink
            to={item.url}
            className={({ isActive, isPending }) =>
              isPending
                ? 'text-gray-400'
                : isActive
                ? 'p-1 sm:p-4 w-full flex flex-col sm:flex-row gap-2 items-center bg-red-700 font-semibold'
                : 'p-1 sm:p-4 w-full flex flex-col sm:flex-row gap-2 items-center hover:bg-red-700'
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        </li>
      ))}
    </ul>
  )
}

export default NavigationLinks
