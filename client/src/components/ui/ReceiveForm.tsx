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
import { fetchPartnerQuery } from '../../services/shared/partner.query'
import { useForm } from '@mantine/form'
import { ReceiveFormData } from '../../schema/received.shema'

interface ReceiveFormProp {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<ReceiveFormData>>
  onSave: (value: any) => void
  // isLoading?: boolean
}

const ShipmentForm = ({
  opened,
  onClose,
  onSave,
  form,
}: //   isLoading,
ReceiveFormProp) => {
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))
  const [active, setActive] = useState(0)
  const [customers, setCustomers] = useState([])
  const [purchaseId, setPurchaseId] = useState([])
  const [custoemrId, setcustoemrId] = useState<string | null>('')
  const [purchasedItems, setPurchasedItems] = useState([])
  const [selectedPurchaseId, setSelectedPurchaseId] =
    useState<ComboboxItem | null>(null)
  const [receiveQuantity, setReceiveQuantity] = useState<string | number>('')

  const { data: partner } = fetchPartnerQuery(['partner'])
  const { data: fetchedReceivedData } = fetchSalesByIdQuery(custoemrId)

  useEffect(() => {
    setCustomers(
      partner?.map((item) => ({
        label: item.name,
        value: item.id.toString(),
      }))
    )
  }, [partner])

  useEffect(() => {
    setPurchaseId(
      fetchedReceivedData?.data.map((item) => ({
        label: item.salesNumber,
        value: item.id.toString(),
      }))
    )
  }, [fetchedReceivedData?.data])

  const handleSubmit = (values: ReceiveFormData) => {
    console.log(values)
    const dataToSend = {
      ...values,
      receivedDate:
        values.receivedDate instanceof Date
          ? values.receivedDate.toISOString()
          : new Date(values.receivedDate).toISOString(),
      partnerId: parseInt(custoemrId),
      purchaseId: parseInt(selectedPurchaseId.value),
      receiveNumber: values.receiveNumber,
      receivedItems: values.receivedItems.map((value) => {
        const newItem = {
          ...value,
          quantity: receiveQuantity,
          purchasedItemsId: parseInt(selectedPurchaseId.value),
        }
        delete newItem.key
        return newItem
      }),
    }
    console.log('Data To be Saved', dataToSend)
    onSave(dataToSend)
  }

  useEffect(() => {
    fetchedReceivedData?.data.map((item) => {
      if (item.salesNumber === selectedPurchaseId?.label) {
        setPurchasedItems(item.salesItems)
      }
    })
  }, [fetchedReceivedData?.data, selectedPurchaseId, receiveQuantity])

  const row = form.getValues().receivedItems.map((item, index) =>
    purchasedItems !== null ? (
      purchasedItems?.map((item) => (
        <Table.Tr key={item.key}>
          <Table.Td>
            {receiveQuantity > item.quantity ? (
              <Text>Not Allowed</Text>
            ) : (
              item.quantity - receiveQuantity
            )}
          </Table.Td>
          <Table.Td>
            <NumberInput
              className="w-28"
              value={receiveQuantity}
              onChange={setReceiveQuantity}
              // {...form.getInputProps(`receivedItems.${index}.quantity`)}
            />
          </Table.Td>
          <Table.Td>{item.quantity}</Table.Td>
          <Table.Td>{item.inventoryId}</Table.Td>
          <Table.Td>{item.unitPrice}</Table.Td>
        </Table.Tr>
      ))
    ) : (
      <Table.Tr></Table.Tr>
    )
  )

  useEffect(() => {
    console.log(form.errors)
    console.log(form.values)
    console.log(selectedPurchaseId)
  }, [form.errors, form.getValues(), selectedPurchaseId])

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
                      onChange={setcustoemrId}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Sales Order"
                      data={purchaseId}
                      value={
                        selectedPurchaseId ? selectedPurchaseId.value : null
                      }
                      onChange={(_value, option) =>
                        setSelectedPurchaseId(option)
                      }
                      // {...form.getInputProps('purchaseId')}
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
