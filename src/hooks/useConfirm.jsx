import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'
import { useState } from 'react'

const useConfirm = (title, message) => {
  const [promise, setPromise] = useState(null)

  const confirm = () => {
    return new Promise((resolve, reject) => {
      setPromise({ resolve })
    })
  }

  const handleClose = () => {
    promise?.resolve(false)
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationAlertDialog = () => (
    <AlertDialog isOpen={promise !== null} onClose={handleClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <ButtonGroup>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button colorScheme="purple" onClick={handleConfirm}>
                Yes
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  return [ConfirmationAlertDialog, confirm]
}

export default useConfirm
