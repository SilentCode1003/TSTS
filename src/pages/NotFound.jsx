import { NavLink } from 'react-router-dom'

function NotFound() {
  return (
    <div className="p-8 w-screen h-screen grid place-items-center place-content-center gap-8">
      <h1 className="text-red-500 text-3xl md:text-6xl font-bold text-center">
        404 Page Not Found
      </h1>
      <NavLink to="/" className="underline text-lg md:text-2xl">
        Back to Home
      </NavLink>
    </div>
  )
}

export default NotFound
