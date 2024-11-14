import {
  Button,
  ComboboxItem,
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
import { ShipmentFormData } from '../../schema/shipment.schema'
import { fetchPartnerQuery } from '../../services/shared/partner.query'
import { useForm } from '@mantine/form'

import { fetchSalesByIdQuery } from '../../services/shared/sales.query'

interface ShipmentFormPro {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<ShipmentFormData>>
  onSave: (value: any) => void
  // isLoading?: boolean
}

const ShipmentForm = ({
  opened,
  onClose,
  onSave,
  form,
}: //   isLoading,
ShipmentFormPro) => {
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  const [active, setActive] = useState(0)
  const [customers, setCustomers] = useState([])
  const [salesOrderId, setSalesOrderId] = useState([])
  const [custoemrId, setcustoemrId] = useState<string | null>('')
  const [orderedItems, setOrderedItems] = useState([])
  const [selectedOrderId, setSelectedOrderId] = useState<ComboboxItem | null>(
    null
  )
  const [shipQuantities, setShipQuantities] = useState([])

  const { data: partner } = fetchPartnerQuery(['partner'])
  const { data: orderedData } = fetchSalesByIdQuery(custoemrId)

  useEffect(() => {
    setCustomers(
      partner?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [partner])

  useEffect(() => {
    setSalesOrderId(
      orderedData?.data.map((item) => ({
        label: item.salesNumber,
        value: item.id.toString(),
      }))
    )
  }, [orderedData?.data])

  useEffect(() => {
    orderedData?.data.map((item) => {
      if (item.salesNumber === selectedOrderId?.label) {
        setOrderedItems(item.salesItems)
        // form.setFieldValue('salesItemsId', item.salesItems.id.toString())
        // console.log('items', item)
      }
    })
  }, [orderedData?.data, selectedOrderId, shipQuantities])

  useEffect(() => {
    if (orderedItems?.length) {
      setShipQuantities(Array(orderedItems.length).fill(0))
    }
  }, [orderedItems])

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
      shipmentNumber: values.shipmentNumber,
      shippedItems: values.shippedItems.map((value) => {
        const newItem = {
          ...value,
          quantity: value.quantity,
          salesItemId: parseInt(value.salesItemId),
        }

        console.log('ShippedItem before deletion:', newItem)

        delete newItem.key
        delete newItem.remaining

        console.log('ShippedItem after deletion:', newItem)
        return newItem
      }),
    }
    console.log('Data To be Saved', dataToSend)
    onSave(dataToSend)
  }

  const handleQuantityChange = (index, value) => {
    setShipQuantities((prev) =>
      prev.map((qty, i) => (i === index ? value || 0 : qty))
    )

    // const updatedRemaining = item.quantity - (value || 0)

    // form.setFieldValue(
    //   `shippedItems[${index}].remaining`,
    //   updatedRemaining
    // )
    // form.setFieldValue(`shippedItems[${index}].quantity`, item.quantity)
  }

  const row = form.getValues().shippedItems.map(() =>
    orderedItems.length > 0
      ? orderedItems?.map((item, index) => {
          const shipQuantity = shipQuantities[index] || 0
          const remaining = item.quantity - shipQuantity

          return (
            <Table.Tr key={item.key}>
              <Table.Td>
                {remaining < 0 ? <Text>Not Allowed</Text> : remaining}
              </Table.Td>
              <Table.Td>
                <NumberInput
                  className="w-28"
                  key={form.key(`shippedItems.${index}.quantity`)}
                  value={shipQuantity}
                  onChange={(value) => handleQuantityChange(index, value)}
                />
              </Table.Td>
              <Table.Td>{item.quantity}</Table.Td>
              <Table.Td>{item.inventoryId}</Table.Td>
              <Table.Td>{item.unitPrice}</Table.Td>
            </Table.Tr>
          )
        })
      : null
  )

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
                      value={custoemrId}
                      onChange={(value, option) => (
                        // handleCustomer(option)
                        console.log('partner Id ', value),
                        form.setFieldValue('partnerId', value),
                        setcustoemrId(value),
                        setSelectedOrderId(null)
                      )}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Sales Order"
                      data={salesOrderId}
                      value={selectedOrderId ? selectedOrderId.value : null}
                      onChange={(value, option) => (
                        form.setFieldValue('salesId', value),
                        setSelectedOrderId(option)
                      )}
                    />
                  </GridCol>
                </Stepper.Step>
                <Stepper.Step label="Step 2">
                  <>
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Remaining</Table.Th>
                          <Table.Th>Ship</Table.Th>
                          <Table.Th>Quantity</Table.Th>
                          <Table.Th>Product</Table.Th>
                          <Table.Th>Unit Price</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>{row}</Table.Tbody>
                    </Table>
                  </>
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
                      // loading={isLoading}
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
