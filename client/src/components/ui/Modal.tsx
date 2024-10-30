import { Grid, Modal, ModalBody, Text } from '@mantine/core'
import DeleteInventory from '../DeleteInventoryModal'
import AuthForm from './Form'
import {
  addItemConfig,
  addPartnerConfig,
  addSalesConfig,
} from '../../types/FormFileds'
import { UseFormReturnType } from '@mantine/form'
import { useEffect, useState } from 'react'
import { fetchInventorysQuery } from '../../services/shared/inventory.query'
import { fetchPartnerQuery } from '../../services/shared/partner.query'

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

interface FormWithSubmit {
  onSubmit: (callback: () => void) => void
  getInputProps: (name: string) => any
}

export type ModalProps<T> = {
  opened: boolean
  item: object
  onSave: (values: any) => void
  onClose: () => void
  onDeleteButton?: (value) => void
  isDeleting?: boolean
  isViewing?: boolean
  isLoading?: boolean
  formName: string
  modalTitle: string
  form: T
}

// flat the data

const Modals = <T extends FormWithSubmit>({
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
}: // isUpdating,

ModalProps<T>) => {
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  if (modalTitle === 'New Sales Order') {
    const { data: inventory } = fetchInventorysQuery(['inventory'])
    const { data: partner } = fetchPartnerQuery(['partner'])

    useEffect(() => {
      console.log('Items ******************* ', inventory?.data)
    }, [inventory?.data])

    useEffect(() => {
      setCustomers(partner?.map((item) => item.name))
    }, [partner])
  }

  const formConfigs = {
    add: addItemConfig,
    partner: addPartnerConfig,
    sales: addSalesConfig(customers, products),
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
                {/* {modalTitle !== '' ? modalTitle : 'Add Inventory'} */}
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
              <AuthForm
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

export default Modals
