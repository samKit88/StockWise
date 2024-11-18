import { useEffect, useState } from 'react'
import {
  Autocomplete,
  Button,
  Card,
  Grid,
  GridCol,
  Modal,
  NativeSelect,
  NumberInput,
  PasswordInput,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { InventoryFormData } from '../../schema/inventory.schema'
import { useForm } from '@mantine/form'
import { InventoryType } from '../../types/Inventory.types'

interface ProductFormProp {
  opened: boolean
  onClose: () => void
  form: ReturnType<typeof useForm<InventoryFormData>>
  onSave: (value: any) => void
  isLoading?: boolean
  items: InventoryType[]
}

const ProductForm = ({
  opened,
  form,
  onSave,
  isLoading,
  onClose,
  items,
}: ProductFormProp) => {
  const [value, setValue] = useState('')
  const handleSubmit = (data: InventoryFormData) => {
    onSave(data)
  }

  console.log('item', items)

  useEffect(() => {
    console.log('Form Value', form.getValues())
    console.log('Form Error', form.errors)
  }, [form])

  return (
    <>
      <Grid>
        <Modal.Root opened={opened} onClose={onClose} centered size={'xl'}>
          {/* <Modal.Overlay opacity={0.7} /> */}
          <Modal.Content>
            <Modal.Header className="bg-gray-200 h-3">
              <Modal.Title className="">
                <Text fw={500} size="md">
                  New Item
                </Text>
              </Modal.Title>
              <Modal.CloseButton />
            </Modal.Header>
            <Modal.Body className="pt-3">
              <form
                className="px-3 py-2 border border-gray-150 rounded-lg"
                onSubmit={form.onSubmit(handleSubmit)}
              >
                <Grid>
                  <GridCol className="flex flex-wrap gap-6">
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Name"
                      key={form.key('name')}
                      {...form.getInputProps('name')}
                    />

                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Barcode"
                      key={form.key('barcode')}
                      {...form.getInputProps('barcode')}
                    />
                    <Autocomplete
                      className="w-auto flex-1 min-w-[300px] "
                      label="Category"
                      data={[
                        ...new Set(items?.map((item) => item.category.name)),
                      ]}
                      key={form.key('category')}
                      {...form.getInputProps('category')}
                    />
                    <Autocomplete
                      className="w-auto flex-1 min-w-[300px] "
                      label="Brand"
                      data={[...new Set(items?.map((item) => item.brand.name))]}
                      onChange={setValue}
                      key={form.key('brand')}
                      {...form.getInputProps('brand')}
                    />

                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Tax Type"
                      {...form.getInputProps('taxType')}
                      data={[
                        {
                          label: 'Taxable',
                          value: 'taxable',
                        },
                        {
                          label: 'Non Taxable',
                          value: 'nonTaxable',
                        },
                      ]}
                      key={form.key('taxType')}
                    />
                    <NumberInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Quantity"
                      key={form.key('quantity')}
                      {...form.getInputProps('quantity')}
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Product Type"
                      data={['Sale', 'Use']}
                      key={form.key('productType')}
                      {...form.getInputProps('productType')}
                      // mt="md"
                    />
                    <Select
                      className="w-auto flex-1 min-w-[300px] "
                      label="Product Unit"
                      data={[
                        'pieces',
                        'kilograms',
                        'liters',
                        'boxes',
                        'meters',
                      ]}
                      key={form.key('productUnit')}
                      {...form.getInputProps('productUnit')}
                      // mt="md"
                    />
                    <NumberInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Buying Price"
                      key={form.key('buyingPrice')}
                      {...form.getInputProps('buyingPrice')}
                    />
                    <NumberInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Selling Price"
                      key={form.key('sellingPrice')}
                      {...form.getInputProps('sellingPrice')}
                    />
                    <TextInput
                      className="w-auto flex-1 min-w-[300px] "
                      label="Descriprion"
                      key={form.key('description')}
                      {...form.getInputProps('description')}
                    />
                  </GridCol>
                  <Button
                    type="submit"
                    className="mt-6 mx-auto block"
                    loading={isLoading}
                    loaderProps={{
                      type: 'dots',
                    }}
                  >
                    Save
                  </Button>
                </Grid>
              </form>
            </Modal.Body>
          </Modal.Content>
        </Modal.Root>
      </Grid>
    </>
  )
}

export default ProductForm
