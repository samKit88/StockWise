import {
  Card,
  Grid,
  GridCol,
  Group,
  Modal,
  ModalBody,
  Stack,
  Text,
} from '@mantine/core'
import DeleteInventory from '../DeleteInventoryModal'
import { PurchaseType } from '../../types/purchase.type'

interface ModalProps {
  opened: boolean
  onActionModalClose: () => void
  onDeleteButton?: (value) => void
  item: PurchaseType
  isDeleting?: boolean
  isViewing?: boolean
  isLoading?: boolean
  modalTitle?: string
}

// flat the data

const PurchaseActionModal = ({
  opened,
  onActionModalClose,
  onDeleteButton,
  isDeleting,
  isViewing,
  isLoading,
  modalTitle,
  item,
}: ModalProps) => {
  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={onActionModalClose}
        centered
        size={isDeleting ? 'md' : 'xl'}
      >
        <Modal.Overlay opacity={0.7} />

        <Modal.Content>
          <Modal.Header className="bg-gray-200 h-3">
            <Modal.Title>
              <Text fw={500} size="md">
                {modalTitle}
              </Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <ModalBody className="bg-gray-50 pt-4">
            {isViewing && item ? (
              <>
                <Stack>
                  <Grid>
                    <GridCol className="flex flex-wrap gap-6">
                      {Object.entries(item).map(([key, value]) => (
                        <GridCol className="w-auto flex-1 min-w-[300px]">
                          {typeof value === 'object' && value !== null ? (
                            <Card key={key} shadow="sm">
                              <Group>
                                <Text>{key}: -</Text>
                                <Text>{value.name}</Text>
                              </Group>
                            </Card>
                          ) : (
                            <Card key={key} shadow="sm">
                              <Group>
                                <Text>{key}: -</Text>
                                <Text>{value}</Text>
                              </Group>
                            </Card>
                          )}
                        </GridCol>
                      ))}
                    </GridCol>
                  </Grid>
                </Stack>
              </>
            ) : isDeleting && item ? (
              <DeleteInventory
                deleteData={item}
                onDeleteButton={onDeleteButton}
                actionModalClose={onActionModalClose}
              />
            ) : (
              <></>
            )}
          </ModalBody>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default PurchaseActionModal
