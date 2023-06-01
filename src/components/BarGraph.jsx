import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    // title: {
    //   display: true,
    //   text: 'Resolved vs Unresolved Tickets per Month',
    // },
  },
}

// const labels = Array.from({ length: 3 }, (item, i) => {
//   return new Date(0, i).toLocaleString('en-Us', { month: 'long' })
// })

// const arr1 = new Uint8Array(3)
// crypto.getRandomValues(arr1)
// const arr2 = new Uint8Array(3)
// crypto.getRandomValues(arr2)

// const dummyData = {
//   labels,
//   datasets: [
//     {
//       label: 'Resolved',
//       data: arr1,
//       backgroundColor: '#9F7AEA88',
//     },
//     {
//       label: 'Unresolved',
//       data: arr2,
//       backgroundColor: '#EA7A8D88',
//     },
//   ],
// }

const BarGraph = ({ data }) => {
  return <Bar options={options} data={data} />
}

export default BarGraph
