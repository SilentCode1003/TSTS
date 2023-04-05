import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BarGraph from '../components/BarGraph'
import Card from '../components/Card'
import { adminItems } from '../components/NavigationBar'

function Dashboard() {
  const navigate = useNavigate()
  const [newTicketsCount, setNewTicketsCount] = useState(3)
  const [urgentTicketsCount, setUrgentTicketsCount] = useState(12)

  return (
    <div className="w-auto h-screen p-8 flex flex-col gap-8 overflow-y-auto">
      <p className="text-2xl md:text-4xl font-bold text-center">Dashboard</p>
      <div className="p-8 flex flex-col md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <Card classNames="px-4 py-5 min-h-[250px] sm:min-h-fit row-span-2 col-span-2 sm:col-span-2 overflow-x-auto">
          <div className="min-w-[500px] flex items-center sm:justify-center">
            <BarGraph />
          </div>
        </Card>
      </div>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {adminItems.map((item) => (
          <Card
            key={item.name}
            onClick={() => navigate(item.url)}
            classNames="group p-4 min-h-[200px] hover:shadow-md truncate cursor-pointer"
          >
            <div className="h-full flex flex-col gap-4">
              <p className="text-lg">{item.name}</p>
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-600 group-hover:text-gray-900 flex text-6xl">
                  {item.icon}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
