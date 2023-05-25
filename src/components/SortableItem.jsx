import { Box } from '@chakra-ui/react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const SortableItem = ({ id, children }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'manipulation',
    zIndex: 10,
    userSelect: 'none',
    cursor: 'grab',
  }

  return (
    <Box ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </Box>
  )
}

export default SortableItem
