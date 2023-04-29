import { Card, CardBody, Text } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'

const TicketViewComments = () => {
  const [comments] = useState([
    {
      id: 1,
      content: 'Sample comment',
    },
    {
      id: 2,
      content: 'Second comment',
    },
  ])

  return (
    comments.length && (
      <>
        {comments.map((comment) => (
          <Card key={comment.id} fontSize="sm">
            <CardBody>
              <Text>{comment.content}</Text>
            </CardBody>
          </Card>
        ))}
      </>
    )
  )
}

export default TicketViewComments
