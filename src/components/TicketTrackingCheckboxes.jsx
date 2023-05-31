import { SimpleGrid } from '@chakra-ui/react'
import React from 'react'

const TicketTrackingCheckboxes = ({ table }) => {
  return (
    <SimpleGrid columns="2" spacing="2">
      <div>
        <label style={{ display: 'flex', gap: '5px' }}>
          <input
            name="tableColumnVisibility"
            {...{
              type: 'checkbox',
              checked: table.getIsAllColumnsVisible(),
              onChange: table.getToggleAllColumnsVisibilityHandler(),
            }}
          />
          Toggle All
        </label>
      </div>
      {table.getAllLeafColumns().map((column) => {
        return (
          <div key={column.id}>
            <label style={{ display: 'flex', gap: '5px' }}>
              <input
                name="tableColumnVisibility"
                {...{
                  type: 'checkbox',
                  checked: column.getIsVisible(),
                  onChange: column.getToggleVisibilityHandler(),
                }}
              />
              {column.id}
            </label>
          </div>
        )
      })}
    </SimpleGrid>
  )
}

export default TicketTrackingCheckboxes
