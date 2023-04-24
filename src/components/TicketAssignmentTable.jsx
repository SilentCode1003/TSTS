import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import React from 'react'

const TicketAssignmentTable = () => {
  return (
    <TableContainer>
      <Table variant="striped" colorScheme="purple" size="sm">
        <Thead>
          <Tr>
            <Th>Ticket No.</Th>
            <Th>Client/Store</Th>
            <Th>Date Created</Th>
            <Th>Priority</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>

        <Tbody>
          <Tr>
            <Td>1</Td>
            <Td>Client 1</Td>
            <Td>March 24, 2023</Td>
            <Td>High</Td>
            <Td>Unresolved</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TicketAssignmentTable
