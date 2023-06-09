import { DownloadIcon } from '@chakra-ui/icons'
import {
  Avatar,
  Card,
  CardBody,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react'
import React from 'react'
import { useGetTicketComments } from '../api/ticket-view/getTicketComments'
import { serializedDataToFile } from '../utils/fileData'

const TicketViewComments = ({ searchedTicket }) => {
  const ticketComments = useGetTicketComments(searchedTicket?.ticketid)
  const comments = ticketComments?.data || ''

  const attachments = (comment) => {
    const attachmentsJSX = []
    const serializedFiles = comment.split(' 5LJOIN ')
    serializedFiles.forEach((file) => {
      const { fileName, fileData } = serializedDataToFile(file)
      const attachment = (
        <Link key={fileName} href={fileData} download={fileName}>
          {fileName} <DownloadIcon color="blue" />
        </Link>
      )
      attachmentsJSX.push(attachment)
    })

    return attachmentsJSX
  }

  if (!searchedTicket) return

  return comments.data?.length ? (
    <>
      {comments?.data?.map((comment) => (
        <Card key={comment.commentid} fontSize="sm">
          <CardHeader pb="0">
            <HStack spacing="4">
              <Avatar name={comment.commentby} />

              <Stack>
                <Heading size="xs">{comment.commentby}</Heading>
                <Text>{comment.commentdate}</Text>
              </Stack>
            </HStack>
          </CardHeader>

          <CardBody>
            <Stack divider={<Divider />} spacing="4">
              <Text whiteSpace="pre-line" textAlign="justify">
                {comment.comment}
              </Text>

              {comment.attachement && (
                <HStack spacing="8">
                  {attachments(comment.attachement).map(
                    (attachmentLink) => attachmentLink
                  )}
                </HStack>
              )}
            </Stack>
          </CardBody>
        </Card>
      ))}
    </>
  ) : undefined
}

export default TicketViewComments
