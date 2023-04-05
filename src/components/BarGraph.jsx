import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Resolved vs Unresolved Tickets per Month',
    },
  },
}

const labels = ['January', 'February', 'March']

const data = {
  labels,
  datasets: [
    {
      label: 'Resolved',
      data: [5, 10, 15],
      backgroundColor: 'rgba(74, 222, 128, 0.5)',
    },
    {
      label: 'Unresolved',
      data: [2, 4, 6],
      backgroundColor: 'rgba(239, 68, 68, 0.5)',
    },
  ],
}

function BarGraph() {
  const [responsive, setResponsive] = useState(true)

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < 586) {
        setResponsive(false)
      } else {
        setResponsive(true)
      }
    }

    window.addEventListener('resize', handleWindowResize)

    return () => {
      window.removeEventListener('resize', handleWindowResize)
    }
  }, [])

  return <Bar options={{ ...options, responsive }} data={data} />
}

export default BarGraph
