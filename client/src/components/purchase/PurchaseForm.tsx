import {
  ActionIcon,
  Box,
  Button,
  Grid,
  GridCol,
  Modal,
  NumberInput,
  Select,
  Stepper,
  Table,
  Text,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useEffect, useState } from 'react'
import { IoContractSharp } from 'react-icons/io5'
import { PurchaseFormData } from '../../schema/purchaseSchema'
import { fetchInventorysQuery } from '../../services/shared/inventory.query'
import { fetchPartnerQuery } from '../../services/shared/partner.query'
import { randomId } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { SalesType } from '../../types/sales.types'
import { PurchaseType } from '../../types/purchase.type'

interface PurchaseFormPro {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<PurchaseFormData>>
  onSave: (value: any) => void
  isLoading?: boolean
}

const PurchaseForm = ({
  opened,
  onClose,
  onSave,
  form,
  isLoading,
}: PurchaseFormPro) => {
  const [active, setActive] = useState(0)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const { data: inventory } = fetchInventorysQuery(['inventory'])
  const { data: partner } = fetchPartnerQuery(['partner'])

  useEffect(() => {
    setProducts(
      inventory.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [inventory])

  useEffect(() => {
    setCustomers(
      partner?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [partner])

  const handleSubmit = (values: PurchaseFormData) => {
    console.log(values)
    const dataToSend = {
      ...values,
      orderDate:
        values.orderDate instanceof Date
          ? values.orderDate.toISOString()
          : new Date(values.orderDate).toISOString(),
      partnerId: parseInt(values.partnerId),
      purchaseItems: values.purchaseItems.map((value) => {
        const newItem = {
          ...value,
          inventoryId: parseInt(value.inventoryId),
        }
        delete newItem.key
        return newItem
      }),
    }
    onSave(dataToSend)
  }

  useEffect(() => {
    console.log(form.errors)
    console.log(form.getValues())
  }, [form.errors])

  const row = form.getValues().purchaseItems.map((item, index) => (
    <Table.Tr key={item.key}>
      <Table.Td>
        <Select
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`salesItems.${index}.inventoryId`)}
          data={products}
          onChange={(value) =>
            form.setFieldValue('inventoryId', parseInt(value))
          }
          {...form.getInputProps(`purchaseItems.${index}.inventoryId`)}
        />
      </Table.Td>
      <Table.Td>
        <NumberInput
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`purchaseItems.${index}.quantity`)}
          {...form.getInputProps(`purchaseItems.${index}.quantity`)}
        />
      </Table.Td>
      <Table.Td>
        <NumberInput
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`purchaseItems.${index}.quantity`)}
          {...form.getInputProps(`purchaseItems.${index}.unitPrice`)}
        />
      </Table.Td>
      <Table.Td>
        <ActionIcon
          color="red"
          onClick={() =>
            index > 0 && form.removeListItem('purchaseItems', index)
          }
        >
          <IoContractSharp size="1rem" />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <>
      <Modal.Root opened={opened} onClose={onClose} centered size={'xl'}>
        <Modal.Overlay opacity={0.7} />
        <Modal.Content>
          <Modal.Header className="bg-gray-200 h-3">
            <Modal.Title className="">
              <Text fw={500} size="md">
                New Purchase
              </Text>
            </Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Body className="pt-3">
            <form
              className="px-3 py-2 border border-gray-150 rounded-lg"
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <Stepper active={active} onStepClick={setActive}>
                <Stepper.Step label="Step 1">
                  <GridCol className="flex flex-wrap gap-6">
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Order#"
                      {...form.getInputProps('purchaseNumber')}
                    />
                    <DateInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Order Date"
                      {...form.getInputProps('orderDate')}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Supplier"
                      data={customers}
                      onChange={(value) =>
                        form.setFieldValue('partnerId', value)
                      }
                      {...form.getInputProps('partnerId')}
                    />
                    <GridCol className="w-auto flex-1 min-w-[300px] "></GridCol>
                  </GridCol>
                </Stepper.Step>
                <Stepper.Step label="Step 2">
                  <Box className="w-full">
                    <>
                      <Table>
                        <Table.Thead>
                          <Table.Tr>
                            <Table.Th>Product</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th>Unit Price</Table.Th>
                          </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>{row}</Table.Tbody>
                      </Table>
                      <GridCol className="flex justify-center">
                        <Button
                          className="w-2/4 mt-7 mb-10"
                          onClick={() =>
                            form.insertListItem('purchaseItems', {
                              inventoryId: null,
                              quantity: 0,
                              unitPrice: 0,
                              key: randomId(),
                            })
                          }
                        >
                          Add Item
                        </Button>
                      </GridCol>
                    </>
                  </Box>
                </Stepper.Step>
              </Stepper>
              <GridCol className="flex justify-end gap-10 mt-5">
                {active < 1 && (
                  <>
                    <Button
                      gradient={{ from: 'blue', to: 'green', deg: 284 }}
                      onClick={() => setActive((prev) => Math.min(prev + 1, 1))}
                    >
                      Next
                    </Button>
                  </>
                )}
                {active === 1 && (
                  <>
                    <Button
                      gradient={{ from: 'blue', to: 'green', deg: 284 }}
                      variant="default"
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button
                      gradient={{ from: 'blue', to: 'green', deg: 284 }}
                      type="submit"
                      // className="mt-6 mx-auto block"
                      loading={isLoading}
                      loaderProps={{
                        type: 'dots',
                      }}
                    >
                      Save
                    </Button>
                  </>
                )}
              </GridCol>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  )
}

export default PurchaseForm
