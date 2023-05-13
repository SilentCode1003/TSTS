import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Link,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table'
import React, { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import { useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { useRef } from 'react'
import { RangeDatepicker } from 'chakra-dayzed-datepicker'
import { useGetAllTickets } from '../api/reporting/getAllTickets'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('ticketid', {
    header: 'Ticket Id',
    cell: (info) => (
      <Link
        as={RouterLink}
        to={`/admin/ticket-view/${info.getValue()}`}
        color="blue"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor('subject', {
    header: 'Subject',
  }),
  columnHelper.accessor('concern', {
    header: 'Concern',
  }),
  columnHelper.accessor('issue', {
    header: 'Issue',
  }),
  columnHelper.accessor('requestername', {
    header: 'Requester Name',
  }),
  columnHelper.accessor('requesteremail', {
    header: 'Requester Email',
  }),
  columnHelper.accessor('description', {
    header: 'Description',

    cell: (info) => (
      <Text
        maxW="350px"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {info.getValue()}
      </Text>
    ),
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
  }),
  columnHelper.accessor('ticketstatus', {
    header: 'Ticket Status',
    accessorKey: 'status',
    id: 'status',
  }),
  columnHelper.accessor('datecreated', {
    header: 'Date Created',
  }),
  columnHelper.accessor('duedate', {
    header: 'Due Date',
  }),
  columnHelper.accessor('statusdetail', {
    header: 'Status Detail',
  }),
  columnHelper.accessor('assignedto', {
    header: 'Assigned To',
  }),
  columnHelper.accessor('department', {
    header: 'Department',
  }),
]

const Reporting = () => {
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedDates, setSelectedDates] = useState([new Date(), new Date()])
  const { mutateAsync, error, isLoading } = useGetAllTickets()
  const tableRef = useRef(null)
  const [tickets, setTickets] = useState([])
  // const { data: ticketsRes, isLoading, error } = useGetTickets()
  // const tickets = ticketsRes?.data ?? []
  const statuses = useGetStatus()
  const table = useReactTable({
    data: tickets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Generated Report',
    sheet: 'Report',
  })

  const handleGenerateReport = (e) => {
    onDownload()
  }

  useEffect(() => {
    console.log(selectedStatus)
    if (selectedStatus === '') {
      mutateAsync({
        datefrom: `${selectedDates[0]?.toISOString().split('T')[0]} 00:00`,
        dateto: `${selectedDates[1]?.toISOString().split('T')[0]} 23:59`,
      }).then((data) => {
        setTickets(data.data)
      })
    } else {
    }
  }, [selectedStatus, selectedDates])

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Reporting
        </Heading>

        <Box w="100%">
          <Flex direction="column" gap="4" alignItems="start">
            <FormControl w="50%">
              <FormLabel htmlFor="ticket-status">Ticket Status</FormLabel>

              <Select
                onChange={handleChange}
                id="ticket-status"
                value={selectedStatus}
              >
                <option value="">ALL</option>
                {statuses.data?.data?.map((status) => (
                  <option key={status.statuscode} value={status.statusname}>
                    {status.statusname}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="date-range">Date range</FormLabel>
              <RangeDatepicker
                id="date-range"
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
              />
            </FormControl>

            <Button colorScheme="purple" onClick={handleGenerateReport}>
              Generate
            </Button>
          </Flex>
        </Box>

        {error ? (
          <ErrorMessage>{error.message}</ErrorMessage>
        ) : isLoading ? (
          <LoadingSpinner />
        ) : tickets.length <= 0 ? (
          <Text textAlign="center" fontSize="3xl">
            No results
          </Text>
        ) : (
          <TableContainer maxW="calc(100vw - 250px)">
            <Table ref={tableRef} size="sm" variant="striped">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <Th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id}>
                        <HStack>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </HStack>
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Box>
  )
}

export default Reporting
