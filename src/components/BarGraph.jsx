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
import { useGetStatusCount } from '../api/dashboard/getStatusCount'
import { SystemSettingsContext } from '../context/SystemSettingsContext'

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

const BarGraph = ({ dates }) => {
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

  const { settings } = useContext(SystemSettingsContext)

  const statusCountData = {
    labels: [
      dates
        ? 'Date range'
        : new Date().toLocaleString(undefined, { month: 'long' }),
    ],
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

    let datefrom
    let dateto

    if (dates) {
      datefrom = `${dates[0]?.toISOString().split('T')[0]} 00:00`
      dateto = `${dates[1]?.toISOString().split('T')[0]} 23:59`
    } else {
      datefrom = `${year}-${month}-01 00:00`
      dateto = `${year}-${month}-${day} 23:59`
    }

    const fetchCounts = async () => {
      try {
        const responses = await Promise.all([
          newCountMutation.mutateAsync({
            ticketstatus: 'NEW',
            datefrom,
            dateto,
          }),

          openCountMutation.mutateAsync({
            ticketstatus: 'OPEN',
            datefrom,
            dateto,
          }),

          pendingCountMutation.mutateAsync({
            ticketstatus: 'PENDING',
            datefrom,
            dateto,
          }),

          closedCountMutation.mutateAsync({
            ticketstatus: 'CLOSED',
            datefrom,
            dateto,
          }),

          resolvedCountMutation.mutateAsync({
            ticketstatus: 'RESOLVED',
            datefrom,
            dateto,
          }),
        ])

        setNewCount(responses[0].data[0].ticketcount)
        setOpenCount(responses[1].data[0].ticketcount)
        setPendingCount(responses[2].data[0].ticketcount)
        setClosedCount(responses[3].data[0].ticketcount)
        setResolvedCount(responses[4].data[0].ticketcount)
      } catch (e) {
        setNewCount(0)
        setOpenCount(0)
        setPendingCount(0)
        setClosedCount(0)
        setResolvedCount(0)
      }
    }

    fetchCounts()

    if (settings.realtimeData === true) {
      const interval = setInterval(fetchCounts, 5000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [dates, settings.realtimeData])

  return <Bar options={options} data={statusCountData} />
}

export default BarGraph
