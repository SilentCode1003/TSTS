import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
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
  useReactTable,
} from '@tanstack/react-table'
import { RangeDatepicker } from 'chakra-dayzed-datepicker'
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import React, { useEffect, useRef, useState } from 'react'
import { useDownloadExcel } from 'react-export-table-to-excel'
import { MdFilterList } from 'react-icons/md'
import { SiMicrosoftexcel } from 'react-icons/si'
import { Link as RouterLink } from 'react-router-dom'
import { useGetAllTickets } from '../api/reporting/getAllTickets'
import { useGetTicketsByStatus } from '../api/reporting/getTicketsByStatus'
import { useGetStatus } from '../api/ticket-assignment/getStatus'
import TicketTrackingCheckboxes from '../components/TicketTrackingCheckboxes'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'

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

const date = new Date()

const Reporting = () => {
  const [columnVisibility, setColumnVisibility] = useState({})
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedDates, setSelectedDates] = useState([
    new Date(date.getFullYear(), date.getMonth(), 1),
    new Date(date.getFullYear(), date.getMonth() + 1, 0),
  ])
  const { mutateAsync, error, isLoading } = useGetAllTickets('')
  const getTicketByStatusMutation = useGetTicketsByStatus(selectedStatus)
  const tableRef = useRef(null)
  const [tickets, setTickets] = useState([])
  const statuses = useGetStatus()
  const table = useReactTable({
    data: tickets,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Generated Report',
    sheet: 'Report',
  })

  const exportPDF = () => {
    const doc = new jsPDF('l')
    doc.setFont('Helvetica')
    autoTable(doc, { html: '#reports-table' })
    doc.save('reports-table.pdf')
  }

  const handleGenerate = (e) => {
    onDownload()
    exportPDF()
  }

  const handleChange = (e) => {
    setSelectedStatus(e.target.value)
  }

  useEffect(() => {
    if (selectedStatus === '') {
      mutateAsync({
        datefrom: `${selectedDates[0]?.toISOString().split('T')[0]} 00:00`,
        dateto: `${selectedDates[1]?.toISOString().split('T')[0]} 23:59`,
      }).then((data) => {
        setTickets(data.data)
      })
    } else {
      getTicketByStatusMutation
        .mutateAsync({
          ticketstatus: selectedStatus,
          datefrom: `${selectedDates[0]?.toISOString().split('T')[0]} 00:00`,
          dateto: `${selectedDates[1]?.toISOString().split('T')[0]} 23:59`,
        })
        .then((data) => {
          setTickets(data.data)
        })
    }
  }, [selectedStatus, selectedDates])

  // The only solution I managed to create for the excel export
  useEffect(() => {
    setSelectedStatus((prev) => prev)
  }, [])

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

            <FormControl w="50%">
              <FormLabel htmlFor="date-range">Date range</FormLabel>
              <RangeDatepicker
                id="date-range"
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
              />
            </FormControl>

            <Button
              leftIcon={<SiMicrosoftexcel />}
              colorScheme="green"
              onClick={handleGenerate}
              isLoading={isLoading}
            >
              Generate
            </Button>
          </Flex>
        </Box>

        <Flex w="100%" justifyContent="end">
          {tickets.length > 0 && (
            <Menu>
              <MenuButton as={IconButton} icon={<MdFilterList />} />
              <MenuList p="4">
                <TicketTrackingCheckboxes table={table} />
              </MenuList>
            </Menu>
          )}
        </Flex>

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
            <Table
              ref={tableRef}
              id="reports-table"
              size="sm"
              variant="striped"
            >
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
