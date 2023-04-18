import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
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
      backgroundColor: '#9F7AEA88',
    },
    {
      label: 'Unresolved',
      data: [2, 4, 6],
      backgroundColor: '#EA7A8D88',
    },
  ],
}

const BarGraph = () => {
  return <Bar options={options} data={data} />
}

export default BarGraph
