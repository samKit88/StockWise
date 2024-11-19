import { useEffect, useState } from 'react'
import {
  ActionIcon,
  Autocomplete,
  Box,
  Button,
  Card,
  Grid,
  GridCol,
  Group,
  Modal,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Select,
  Stepper,
  Switch,
  Text,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { PartnerFormType } from '../../schema/partnerSchema'
import { fetchInventorysQuery } from '../../services/shared/inventory.query'
import { fetchPartnerQuery } from '../../services/shared/partner.query'
import { IoContractSharp } from 'react-icons/io5'
import { randomId } from '@mantine/hooks'
import { ItmesFormData, SalesFormData } from '../../schema/salesSchema'
import { useForm } from '@mantine/form'
import { SalesType } from '../../types/sales.types'

interface SalesFormProp {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<SalesFormData>>
  onSave: (value: any) => void
  isLoading?: boolean
  items: SalesType[]
}

const SalesForm = ({
  form,
  onSave,
  isLoading,
  items,
  onClose,
  opened,
}: SalesFormProp) => {
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [active, setActive] = useState(0)
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current))

  const { data: inventory } = fetchInventorysQuery(['inventory'])
  const { data: partner } = fetchPartnerQuery(['partner'])

  useEffect(() => {
    setProducts(
      inventory?.map((item) => ({
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

  const handleSubmit = (values: SalesFormData) => {
    console.log(values)
    const dataToSend = {
      ...values,
      orderDate:
        values.orderDate instanceof Date
          ? values.orderDate.toISOString()
          : new Date(values.orderDate).toISOString(),
      partnerId: parseInt(values.partnerId),
      salesItems: values.salesItems.map((value) => {
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

  const boxFields = form.getValues().salesItems.map((item, index) => (
    <Group key={item.key} mt="xs">
      <Select
        //   placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        // key={form.key(`salesItems.${index}.inventoryId`)}
        data={products}
        onChange={(value) => form.setFieldValue('inventoryId', parseInt(value))}
        {...form.getInputProps(`salesItems.${index}.inventoryId`)}
      />
      <NumberInput
        //   placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        // key={form.key(`salesItems.${index}.quantity`)}
        {...form.getInputProps(`salesItems.${index}.quantity`)}
      />

      <NumberInput
        //   placeholder="John Doe"
        withAsterisk
        style={{ flex: 1 }}
        // key={form.key(`salesItems.${index}.unitPrice`)}
        {...form.getInputProps(`salesItems.${index}.unitPrice`)}
      />
      <ActionIcon
        color="red"
        onClick={() => index > 0 && form.removeListItem('salesItems', index)}
      >
        <IoContractSharp size="1rem" />
      </ActionIcon>
    </Group>
  ))

  return (
    <>
      <Grid>
        <Modal.Root opened={opened} onClose={onClose} centered size={'xl'}>
          <Modal.Overlay opacity={0.7} />
          <Modal.Content>
            <Modal.Header className="bg-gray-200 h-3">
              <Modal.Title className="">
                <Text fw={500} size="md">
                  New Sales
                </Text>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body className="pt-3">
              <form
                className=" px-3 py-2 border border-gray-150 rounded-lg "
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <Stepper active={active} onStepClick={setActive}>
                  <Stepper.Step label="Step 1">
                    <div className="flex flex-wrap gap-6 ">
                      <TextInput
                        className="w-auto flex-1 min-w-[300px] "
                        label="Order#"
                        {...form.getInputProps('salesNumber')}
                      />
                      <DateInput
                        className="w-auto flex-1 min-w-[300px] "
                        label="Order Date"
                        {...form.getInputProps('orderDate')}
                      />
                      <Select
                        className="w-auto flex-1 min-w-[300px] "
                        label="Customer"
                        data={customers}
                        onChange={(value) =>
                          form.setFieldValue('partnerId', value)
                        }
                        {...form.getInputProps('partnerId')}
                      />
                      <div className="w-auto flex-1 min-w-[300px] "></div>
                    </div>
                  </Stepper.Step>
                  <Stepper.Step label="Step 2">
                    <Box className="w-full">
                      <>
                        <Group mb="xs" className="flex justify-evenly">
                          <Text>Product</Text>
                          <Text>Quantity</Text>
                          <Text>Unit Price</Text>
                        </Group>

                        {boxFields}

                        <Group justify="center" mt="md">
                          <Button
                            className="w-2/4 mt-7 mb-10"
                            onClick={() =>
                              form.insertListItem('salesItems', {
                                inventoryId: null,
                                quantity: 0,
                                unitPrice: 0,
                                key: randomId(),
                              })
                            }
                          >
                            Add Item
                          </Button>
                        </Group>
                      </>
                    </Box>
                  </Stepper.Step>
                </Stepper>
                {/* </div> */}
                <div
                  className="flex justify-end gap-10"
                  style={{ marginTop: 20 }}
                >
                  {active < 1 && (
                    <>
                      <Button
                        gradient={{ from: 'blue', to: 'green', deg: 284 }}
                        onClick={() =>
                          setActive((prev) => Math.min(prev + 1, 1))
                        }
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
                </div>
              </form>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </Grid>
    </>
  )
}

export default SalesForm
