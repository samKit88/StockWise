import {
  ActionIcon,
  Box,
  Button,
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
import { ShipmentFormData, shipmentSchama } from '../../schema/shipment.schema'
import { fetchInventorysQuery } from '../../services/shared/inventory.query'
import { fetchPartnerQuery } from '../../services/shared/partner.query'
import { randomId, useDisclosure } from '@mantine/hooks'
import { useForm, zodResolver } from '@mantine/form'
import { createShipmentMutation } from '../../services/shared/shipment.query'
import { AxiosError } from 'axios'
import { fetchSalesQuery } from '../../services/shared/sales.query'
import Sales from '../../pages/Sales'

// interface ShipmentFormPro {
//   opened: boolean
//   onClose: () => void
//   form: ReturnType<typeof useForm<ShipmentFormData>>
//   onSave: (value: any) => void
//   isLoading?: boolean
// }

const ShipmentForm = ({
  opened,
  onClose,
  //   onSave,
  //   form,
  //   isLoading,
}) => {
  const [active, setActive] = useState(0)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [sale, setSales] = useState([])
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const { data: inventory } = fetchInventorysQuery(['inventory'])
  const { data: partner } = fetchPartnerQuery(['partner'])
  const { data: sales } = fetchSalesQuery(['sales'])

  const form = useForm<ShipmentFormData>({
    mode: 'uncontrolled',
    initialValues: {
      shipmentDate: new Date(),
      shipmentNumber: '',
      partnerId: '',
      shippedItems: [{ quantity: 0, salesItemId: '', key: randomId() }],
    },
    validate: zodResolver(shipmentSchama),
  })

  const { mutateAsync, isLoading } = createShipmentMutation(
    (error: AxiosError | any) => console.log(error),
    () => {
      form.reset()
      onClose()
      // refetch()
    }
  )

  const onSave = (values: ShipmentFormData) => {
    values.shipmentDate = new Date(values.shipmentDate)
    mutateAsync(values)
  }

  useEffect(() => {
    setProducts(
      inventory?.data.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [inventory?.data])

  useEffect(() => {
    setCustomers(
      partner?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [partner])

  useEffect(() => {
    setSales(
      sales?.data.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [sales])

  const handleSubmit = (values: ShipmentFormData) => {
    console.log(values)
    const dataToSend = {
      ...values,
      shipmentDate:
        values.shipmentDate instanceof Date
          ? values.shipmentDate.toISOString()
          : new Date(values.shipmentDate).toISOString(),
      partnerId: parseInt(values.partnerId),
      salesId: parseInt(values.salesId),
      shippedItems: values.shippedItems.map((value) => {
        const newItem = {
          ...value,
          salesItemId: parseInt(value.salesItemId),
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

  const row = form.getValues().shippedItems.map((item, index) => (
    <Table.Tr key={item.key}>
      <Table.Td>
        <Select
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`salesItems.${index}.salesItemId`)}
          data={products}
          onChange={(value) =>
            form.setFieldValue('salesItemId', parseInt(value))
          }
          {...form.getInputProps(`shippedItems.${index}.salesItemId`)}
        />
      </Table.Td>
      <Table.Td>
        <NumberInput
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`shippedItems.${index}.quantity`)}
          {...form.getInputProps(`shippedItems.${index}.quantity`)}
        />
      </Table.Td>
      {/* <Table.Td>
        <NumberInput
          //   placeholder="John Doe"
          withAsterisk
          style={{ flex: 1 }}
          // key={form.key(`shippedItems.${index}.quantity`)}
          {...form.getInputProps(`shippedItems.${index}.unitPrice`)}
        />
      </Table.Td> */}
      <Table.Td>
        <ActionIcon
          color="red"
          onClick={() =>
            index > 0 && form.removeListItem('shippedItems', index)
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
                New Shipment
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
                      label="Shipment#"
                      {...form.getInputProps('shipmentNumber')}
                    />
                    <DateInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Shipment Date"
                      {...form.getInputProps('shipmentDate')}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Customer"
                      data={customers}
                      onChange={(value) =>
                        form.setFieldValue(
                          parseInt('partnerId', parseInt(value))
                        )
                      }
                      {...form.getInputProps('partnerId')}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Sales Order"
                      data={customers}
                      onChange={(value) =>
                        form.setFieldValue(parseInt('salesId', parseInt(value)))
                      }
                      {...form.getInputProps('salesId')}
                    />
                    {/* <GridCol className="w-auto flex-1 min-w-[300px] "></GridCol> */}
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
                            form.insertListItem('shippedItems', {
                              salesItemId: null,
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

export default ShipmentForm
