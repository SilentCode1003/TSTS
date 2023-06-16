import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Colors,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useContext, useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useGetTopConcerns } from '../api/client/dashboard/getTopConcerns'
import { AuthContext } from '../context/AuthContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Colors
)

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
    colors: {
      enabled: true,
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
  const { currentUser } = useContext(AuthContext)

  const topConcernsMutation = useGetTopConcerns()

  const [datasets, setDataSets] = useState([])

  const topConcernsData = {
    labels: [new Date().toLocaleString(undefined, { month: 'long' })],
    datasets,
    // datasets: [
    //   {
    //     label: 'Concern 1',
    //     data: [10],
    //     backgroundColor: '#9F7AEA99',
    //   },
    //   {
    //     label: 'Concern 2',
    //     data: [5],
    //     backgroundColor: '#eae37a99',
    //   },
    //   {
    //     label: 'Concern 3',
    //     data: [15],
    //     backgroundColor: '#EA7A8D99',
    //   },
    //   {
    //     label: 'Concern 4',
    //     data: [7],
    //     backgroundColor: '#6d4d4d99',
    //   },
    //   {
    //     label: 'Concern 5',
    //     data: [21],
    //     backgroundColor: '#C5EA7A99',
    //   },
    // ],
  }

  useEffect(() => {
    const dt = new Date()
    const year = dt.getFullYear()
    const month = (dt.getMonth() + 1).toString().padStart(2, '0')
    const day = new Date(year, month + 1, 0)
      .getDate()
      .toString()
      .padStart(2, '0')

    const fetchTopConcerns = async () => {
      try {
        const topConcernsData = await topConcernsMutation.mutateAsync({
          datefrom: `${year}-${month}-01 00:00`,
          dateto: `${year}-${month}-${day} 23:59`,
          requestby: currentUser.fullname,
        })

        const transformedData = topConcernsData.data.map((el) => {
          return {
            label: el.concern,
            data: [el.totalcount],
          }
        })

        setDataSets(transformedData)
      } catch (e) {
        console.log(e)
      }
    }

    fetchTopConcerns()
  }, [])

  return <Bar options={options} data={topConcernsData} />
}

export default TopConcernsGraph
