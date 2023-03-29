import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { adminItems } from '../components/NavigationBar'

function Dashboard() {
  const navigate = useNavigate()
  const [newTicketsCount, setNewTicketsCount] = useState(3)
  const [urgentTicketsCount, setUrgentTicketsCount] = useState(12)

  return (
    <div className="p-8">
      <p className="text-2xl md:text-4xl font-bold text-center">Dashboard</p>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card classNames="px-4 py-5 min-h-[150px] hover:shadow-md cursor-pointer">
          <div className="h-full flex flex-col justify-between truncate">
            <p className="text-lg">New Tickets</p>
            <p className="font-bold text-4xl text-right text-yellow-500">
              {newTicketsCount}
            </p>
          </div>
        </Card>

        <Card classNames="px-4 py-5 min-h-[150px] hover:shadow-md cursor-pointer">
          <div className="h-full flex flex-col justify-between truncate">
            <p className="text-lg">Urgent Tickets</p>
            <p className="font-bold text-4xl text-right text-red-500">
              {urgentTicketsCount}
            </p>
          </div>
        </Card>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminItems.map((item) => (
          <Card
            key={item.name}
            onClick={() => navigate(item.url)}
            classNames="p-4 min-h-[200px] hover:shadow-md cursor-pointer"
          >
            <div>
              <p className="text-lg">{item.name}</p>
            </div>
          </Card>
        ))}
      </div>

      <Footer />
    </div>
  )
}

export default Dashboard
