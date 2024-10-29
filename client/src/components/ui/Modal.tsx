import {
  Autocomplete,
  Button,
  Grid,
  Modal,
  ModalBody,
  NativeSelect,
  NumberInput,
  TextInput,
} from '@mantine/core'

const Modals = ({
  opened,
  onClose,
  isViewing,
  item,
  isDeleting,
  onSave,
  inventory,
  isLoading,
  form,
}) => {
  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title={
          isViewing
            ? 'View Inventory'
            : item
            ? 'Edit Inventory'
            : 'Add Inventory'
        }
        centered
        size={'xl'}
      >
        <ModalBody>
          {isViewing && item ? (
            <Grid grow gutter="xl">
              <Grid.Col span={4}>{item.name}</Grid.Col>
              <Grid.Col span={4}>{item.brand.name}</Grid.Col>
              <Grid.Col span={4}>{item.buyingPrice}</Grid.Col>
              <Grid.Col span={4}>{item.barcode}</Grid.Col>
              <Grid.Col span={4}>{item.category.name}</Grid.Col>
              <Grid.Col span={4}>{item.productType}</Grid.Col>
              <Grid.Col span={4}>{item.productUnit}</Grid.Col>
              <Grid.Col span={4}>{item.quantity}</Grid.Col>
              <Grid.Col span={4}>{item.sellingPrice}</Grid.Col>
              <Grid.Col span={4}>{item.taxType}</Grid.Col>
              <Grid.Col span={4}>{item.description}</Grid.Col>
            </Grid>
          ) : isDeleting && item ? (
            <h1>are you sure u want to delete </h1>
          ) : (
            <form
              onSubmit={form.onSubmit(onSave)}
              // className="mt-6 "
            >
              <div className="flex gap-6">
                <div className="flex-grow">
                  <TextInput
                    label="Name"
                    placeholder="item name"
                    {...form.getInputProps('name')}
                  />
                  <TextInput
                    label="Code"
                    placeholder="3490"
                    {...form.getInputProps('barcode')}
                    mt="md"
                  />

                  <Autocomplete
                    label="Category"
                    placeholder="Pick value or enter anything"
                    data={[
                      ...new Set(
                        inventory?.data.map((data) => data.category.name)
                      ),
                    ]}
                    {...form.getInputProps('category')}
                    mt="md"
                  />

                  <Autocomplete
                    label="Brand"
                    placeholder="Pick value or enter anything"
                    // data={}
                    data={[
                      ...new Set(
                        inventory?.data.map((data) => data.brand.name)
                      ),
                    ]}
                    {...form.getInputProps('brand')}
                    mt="md"
                  />
                  <TextInput
                    label="Buying Price"
                    placeholder="349.4839"
                    {...form.getInputProps('buyingPrice')}
                    mt="md"
                  />
                </div>
                <div className="flex-grow">
                  <NumberInput
                    label="Quantity"
                    placeholder="quntity"
                    {...form.getInputProps('quantity')}
                  />
                  <NativeSelect
                    label="Tax Type"
                    // rightSection={
                    //   <IconChevronDown
                    //     style={{ width: rem(16), height: rem(16) }}
                    //   />
                    // }
                    {...form.getInputProps('taxType')}
                    data={['taxable', 'nonTaxable']}
                    mt="md"
                  />
                  <NativeSelect
                    label="Product Type"
                    // rightSection={
                    //   <IconChevronDown
                    //     style={{ width: rem(16), height: rem(16) }}
                    //   />
                    // }
                    {...form.getInputProps('productType')}
                    data={['Sale', 'Use']}
                    mt="md"
                  />
                  <NativeSelect
                    label="Product Unit"
                    // rightSection={
                    //   <IconChevronDown
                    //     style={{ width: rem(16), height: rem(16) }}
                    //   />
                    // }
                    {...form.getInputProps('productUnit')}
                    data={['pieces', 'kilograms', 'liters', 'boxes', 'meters']}
                    mt="md"
                  />
                  <TextInput
                    label="Selling Price"
                    placeholder="749.4839"
                    {...form.getInputProps('sellingPrice')}
                    mt="md"
                  />
                  {/* <FileInput
                    label="Image"
                    placeholder="upload image"
                    {...form.getInputProps('Image')}
                    mt="md"
                  /> */}
                </div>
              </div>
              <TextInput
                label="Descriprion"
                placeholder="hulaal lalhulal lhausd"
                {...form.getInputProps('description')}
                mt="md"
              />

              <Button
                type="submit"
                // fullWidth

                className="mt-6 mx-auto block"
                loading={isLoading}
                loaderProps={{
                  type: 'dots',
                }}
              >
                Save
              </Button>
            </form>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}

export default Modals
