import { DownloadIcon } from '@chakra-ui/icons'
import {
  Box,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Link,
  Text,
  VStack,
} from '@chakra-ui/react'
import loadable from '@loadable/component'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetTopics } from '../api/knowledge-base/getTopics'
import { serializedDataToFile } from '../utils/fileData'
const ErrorMessage = loadable(() => import('./UI/ErrorMessage'))
const LoadingSpinner = loadable(() => import('./UI/LoadingSpinner'))

const KnowledgeContent = () => {
  const { topicId } = useParams()
  const { isLoading, error, data } = useGetTopics()
  const topicList = data?.data

  const content = topicList?.find((topic) => topic.postid === parseInt(topicId))

  const attachments = () => {
    const attachmentsJSX = []
    const serializedFiles = content?.attachment.split(' 5LJOIN ')
    serializedFiles?.forEach((file) => {
      const IMAGE_FILE_EXTENSIONS = ['png', 'jpg', 'jpeg']
      const { fileName, fileData } = serializedDataToFile(file)
      const fileNameExtension = fileName.replace(/^.*\./, '')

      let attachment

      if (IMAGE_FILE_EXTENSIONS.indexOf(fileNameExtension) !== -1) {
        attachment = <Image key={fileName} src={fileData} />
      } else {
        attachment = (
          <Link key={fileName} href={fileData} download={fileName}>
            {fileName} <DownloadIcon color="blue" />
          </Link>
        )
      }

      attachmentsJSX.push(attachment)
    })

    return attachmentsJSX
  }

  if (!content) {
    return (
      <Text fontSize="3xl" textAlign="center">
        Not found
      </Text>
    )
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage>{error.message}</ErrorMessage>
  }

  return (
    <Flex direction="column" gap="10">
      <Heading size="2xl" textAlign="center">
        {content?.title}
      </Heading>
      <Text whiteSpace="break-spaces" textAlign="justify">
        {content?.content}
      </Text>
      {content?.attachment && (
        <VStack spacing="4" divider={<Divider />}>
          {attachments().map((attachment) => attachment)}
        </VStack>
      )}
    </Flex>
  )
}

export default KnowledgeContent
