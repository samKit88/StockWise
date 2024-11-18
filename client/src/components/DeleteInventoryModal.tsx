import { Button, Grid, Modal, SimpleGrid, Text } from '@mantine/core'

const DeleteInventory = ({ onDeleteButton, actionModalClose, deleteData }) => {
  return (
    <>
      <SimpleGrid cols={1} className="gap-8 pt-5">
        <div className="flex justify-start">
          <Text size="md">Are you sure you want to delete?</Text>
        </div>
        <div className="flex justify-end gap-4">
          <Button
            onClick={() => onDeleteButton(deleteData)}
            color="red"
            radius="lg"
          >
            Delete
          </Button>
          <Button onClick={actionModalClose} color="gray" radius="lg">
            Cancel
          </Button>
        </div>
      </SimpleGrid>
    </>
  )
}

export default DeleteInventory

// item, opened, onClose
