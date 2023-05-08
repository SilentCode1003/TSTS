import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Flex,
  HStack,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuList,
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
import React, { useState } from 'react'
import { MdFilterList } from 'react-icons/md'
import { Link as RouterLink } from 'react-router-dom'
import { useGetTickets } from '../api/ticket-tracking/getTickets'
import TicketTrackingTabs from '../components/TicketTrackingTabs'
import ErrorMessage from '../components/UI/ErrorMessage'
import LoadingSpinner from '../components/UI/LoadingSpinner'
import { serializedDataToFile } from '../utils/fileData'

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
  columnHelper.accessor('attachement', {
    cell: (info) => {
      if (!info.getValue()) {
        return 'No attachment'
      }

      const base64filesArray = info.getValue().split(' 5LJOIN ')
      return base64filesArray.map((file) => {
        const { fileData, fileName } = serializedDataToFile(file)

        return (
          <Link key={fileName} href={fileData} download={fileName}>
            {fileName} <DownloadIcon color="blue" />
          </Link>
        )
      })
    },
    header: 'Attachment(s)',
  }),
  columnHelper.accessor('comment', {
    header: 'Comment',
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
  columnHelper.display({
    id: 'actions',
    cell: 'action',
  }),
]

const TicketTracking = () => {
  const { data: ticketsRes, isLoading, error } = useGetTickets()
  const tickets = ticketsRes?.data ?? []
  const [columnVisibility, setColumnVisibility] = useState({})
  // const tickets = sampleData.data
  const table = useReactTable({
    data: tickets,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <Box p={['4', null, '8']}>
      <Stack direction="column" spacing="8" alignItems="center">
        <Heading textAlign="center" size={['lg', null, 'xl']}>
          Ticket Tracking
        </Heading>

        <Flex w="100%" justifyContent="end">
          {tickets.length > 0 && (
            <Menu>
              <MenuButton as={IconButton} icon={<MdFilterList />} />
              <MenuList p="4" w={['290px', null, '500px']}>
                <TicketTrackingTabs
                  table={table}
                  columnVisibility={columnVisibility}
                  setColumnVisibility={setColumnVisibility}
                />
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
            <Table size="sm" variant="striped">
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

export default TicketTracking
