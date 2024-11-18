import { Grid, Modal, ModalBody, Text } from '@mantine/core'
import DeleteInventory from '../DeleteInventoryModal'
import { addPartnerConfig } from '../../types/FormFileds'

import { InventoryFormData } from '../../schema/inventory.schema'
import PartnerForm from './PartnerForm'
import { PartnerResponsType } from '../../types/Partner.types'

interface ModalProps {
  opened: boolean
  onActionModalClose: () => void
  onDeleteButton?: (value) => void
  userData: PartnerResponsType
  isDeleting?: boolean
  isViewing?: boolean
  isLoading?: boolean
  modalTitle?: string
}

const PartnerActionModal = ({
  opened,
  onActionModalClose,
  onDeleteButton,
  isDeleting,
  isViewing,
  isLoading,
  modalTitle,
  userData,
}: ModalProps) => {
  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={() => onActionModalClose()}
        centered
        // trapFocus={true}
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
            {isViewing && userData ? (
              <>
                <Grid grow gutter="xl">
                  {Object.entries(userData).map(([key, value]) =>
                    typeof value === 'object' && value !== null ? (
                      <Grid.Col>{String(value)}</Grid.Col>
                    ) : (
                      <Grid.Col span={4} key={key}>
                        {String(value)}
                      </Grid.Col>
                    )
                  )}
                </Grid>
              </>
            ) : isDeleting && userData ? (
              <DeleteInventory
                deleteData={userData}
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

export default PartnerActionModal
