import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useGetStatusCount } from '../api/dashboard/getStatusCount'

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

const BarGraph = () => {
  const newCountMutation = useGetStatusCount('new')
  const openCountMutation = useGetStatusCount('open')
  const pendingCountMutation = useGetStatusCount('pending')
  const closedCountMutation = useGetStatusCount('closed')
  const resolvedCountMutation = useGetStatusCount('resolved')

  const [newCount, setNewCount] = useState(1)
  const [openCount, setOpenCount] = useState(2)
  const [pendingCount, setPendingCount] = useState(3)
  const [closedCount, setClosedCount] = useState(4)
  const [resolvedCount, setResolvedCount] = useState(5)

  const statusCountData = {
    labels: [new Date().toLocaleString(undefined, { month: 'long' })],
    datasets: [
      {
        label: 'New',
        data: [newCount],
        backgroundColor: '#9F7AEA99',
      },
      {
        label: 'Open',
        data: [openCount],
        backgroundColor: '#eae37a99',
      },
      {
        label: 'Pending',
        data: [pendingCount],
        backgroundColor: '#EA7A8D99',
      },
      {
        label: 'Closed',
        data: [closedCount],
        backgroundColor: '#6d4d4d99',
      },
      {
        label: 'Resolved',
        data: [resolvedCount],
        backgroundColor: '#C5EA7A99',
      },
    ],
  }

  useEffect(() => {
    try {
      newCountMutation
        .mutateAsync({
          ticketstatus: 'NEW',
          datefrom: '2023-05-01 00:00',
          dateto: '2023-05-30 23:59',
        })
        .then((res) => setNewCount(res.data[0].ticketcount))

      openCountMutation
        .mutateAsync({
          ticketstatus: 'OPEN',
          datefrom: '2023-05-01 00:00',
          dateto: '2023-05-30 23:59',
        })
        .then((res) => setOpenCount(res.data[0].ticketcount))

      pendingCountMutation
        .mutateAsync({
          ticketstatus: 'PENDING',
          datefrom: '2023-05-01 00:00',
          dateto: '2023-05-30 23:59',
        })
        .then((res) => setPendingCount(res.data[0].ticketcount))

      closedCountMutation
        .mutateAsync({
          ticketstatus: 'CLOSED',
          datefrom: '2023-05-01 00:00',
          dateto: '2023-05-30 23:59',
        })
        .then((res) => setClosedCount(res.data[0].ticketcount))

      resolvedCountMutation
        .mutateAsync({
          ticketstatus: 'RESOLVED',
          datefrom: '2023-05-01 00:00',
          dateto: '2023-05-30 23:59',
        })
        .then((res) => setResolvedCount(res.data[0].ticketcount))
    } catch (e) {
      setNewCount(0)
      setOpenCount(0)
      setPendingCount(0)
      setClosedCount(0)
      setResolvedCount(0)
    }
  }, [])

  return <Bar options={options} data={statusCountData} />
}

export default BarGraph
