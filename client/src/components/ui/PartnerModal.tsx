import { Grid, Modal, ModalBody, Text } from '@mantine/core'
import DeleteInventory from '../DeleteInventoryModal'
import { addPartnerConfig } from '../../types/FormFileds'

import { InventoryFormData } from '../../schema/inventory.schema'
import PartnerForm from './PartnerForm'

const flattenObject = (obj: any, prefix = ''): Record<string, any> =>
  Object.keys(obj).reduce((acc, key) => {
    const propName = prefix ? `${prefix}.${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(acc, flattenObject(obj[key], propName))
    } else {
      acc[propName] = obj[key]
    }
    return acc
  }, {})

const PartnerModal = ({
  opened,
  item,
  onSave,
  onClose,
  onDeleteButton,
  isDeleting,
  isViewing,
  isLoading,
  form,
  formName,
  modalTitle,
}) => {
  const formConfigs = {
    partner: addPartnerConfig,
  }

  const config = formConfigs[formName]

  return (
    <>
      <Modal.Root
        opened={opened}
        onClose={onClose}
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
            {isViewing && item ? (
              <>
                <Grid grow gutter="xl">
                  {Object.entries(item).map(([key, value]) =>
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
            ) : isDeleting && item ? (
              <DeleteInventory
                onDeleteButton={onDeleteButton}
                onClose={onClose}
              />
            ) : (
              <PartnerForm
                form={form}
                onSave={onSave}
                isLoading={isLoading}
                type="Add Inventory"
                fields={config.fields}
              />
            )}
          </ModalBody>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default PartnerModal
