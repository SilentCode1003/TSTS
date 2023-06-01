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
    title: {
      display: true,
      text: 'Ticket Count by Status',
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

const BarGraph = () => {
  const newCountMutation = useGetStatusCount('new')
  const openCountMutation = useGetStatusCount('open')
  const pendingCountMutation = useGetStatusCount('pending')
  const closedCountMutation = useGetStatusCount('closed')
  const resolvedCountMutation = useGetStatusCount('resolved')

  const [newCount, setNewCount] = useState(0)
  const [openCount, setOpenCount] = useState(0)
  const [pendingCount, setPendingCount] = useState(0)
  const [closedCount, setClosedCount] = useState(0)
  const [resolvedCount, setResolvedCount] = useState(0)

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
    const dt = new Date()

    const year = dt.getFullYear()
    const month = (dt.getMonth() + 1).toString().padStart(2, '0')
    const day = new Date(year, month + 1, 0)
      .getDate()
      .toString()
      .padStart(2, '0')

    let interval
    try {
      interval = setInterval(() => {
        newCountMutation
          .mutateAsync({
            ticketstatus: 'NEW',
            datefrom: `${year}-${month}-01 00:00`,
            dateto: `${year}-${month}-${day} 23:59`,
          })
          .then((res) => setNewCount(res.data[0].ticketcount))

        openCountMutation
          .mutateAsync({
            ticketstatus: 'OPEN',
            datefrom: `${year}-${month}-01 00:00`,
            dateto: `${year}-${month}-${day} 23:59`,
          })
          .then((res) => setOpenCount(res.data[0].ticketcount))

        pendingCountMutation
          .mutateAsync({
            ticketstatus: 'PENDING',
            datefrom: `${year}-${month}-01 00:00`,
            dateto: `${year}-${month}-${day} 23:59`,
          })
          .then((res) => setPendingCount(res.data[0].ticketcount))

        closedCountMutation
          .mutateAsync({
            ticketstatus: 'CLOSED',
            datefrom: `${year}-${month}-01 00:00`,
            dateto: `${year}-${month}-${day} 23:59`,
          })
          .then((res) => setClosedCount(res.data[0].ticketcount))

        resolvedCountMutation
          .mutateAsync({
            ticketstatus: 'RESOLVED',
            datefrom: `${year}-${month}-01 00:00`,
            dateto: `${year}-${month}-${day} 23:59`,
          })
          .then((res) => setResolvedCount(res.data[0].ticketcount))
      }, 2500)
    } catch (e) {
      setNewCount(0)
      setOpenCount(0)
      setPendingCount(0)
      setClosedCount(0)
      setResolvedCount(0)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <Bar options={options} data={statusCountData} />
}

export default BarGraph
