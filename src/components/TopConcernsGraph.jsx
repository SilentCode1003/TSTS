import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useContext, useEffect, useState } from 'react'
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
      text: 'Top Concerns this Month',
    },
  },
  scales: {
    y: {
      title: {
        display: true,
        text: 'Count',
      },
      ticks: {
        stepSize: 1,
      },
    },
  },
}

const TopConcernsGraph = () => {
  const topConcernsData = {
    labels: [new Date().toLocaleString(undefined, { month: 'long' })],
    datasets: [
      {
        label: 'Concern 1',
        data: [10],
        backgroundColor: '#9F7AEA99',
      },
      {
        label: 'Concern 2',
        data: [5],
        backgroundColor: '#eae37a99',
      },
      {
        label: 'Concern 3',
        data: [15],
        backgroundColor: '#EA7A8D99',
      },
      {
        label: 'Concern 4',
        data: [7],
        backgroundColor: '#6d4d4d99',
      },
      {
        label: 'Concern 5',
        data: [21],
        backgroundColor: '#C5EA7A99',
      },
    ],
  }

  return <Bar options={options} data={topConcernsData} />
}

export default TopConcernsGraph
