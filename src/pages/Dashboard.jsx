import Card from '../components/Card'
import Footer from '../components/Footer'
import { adminItems } from '../components/NavigationBar'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
  const navigate = useNavigate()

  return (
    <>
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
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
    </>
  )
}

export default Dashboard
