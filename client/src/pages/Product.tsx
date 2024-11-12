import {
  Button,
  Card,
  FileButton,
  Grid,
  GridCol,
  Group,
  Menu,
  Pagination,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useEffect, useState } from 'react'

import { AxiosError } from 'axios'
import { useForm, zodResolver } from '@mantine/form'
import { InventoryFormData, inventorySchema } from '../schema/inventory.schema'
import { InventoryType } from '../types/Inventory.types'
import Modals from '../components/ui/Modal'
import ProductTable, { Column } from '../components/ProductTable'
import {
  createInventoryMutation,
  deleteInventoryMutation,
  fetchInventorysQuery,
  updateInventoryMutation,
} from '../services/shared/inventory.query'
import { MdDelete, MdLibraryAdd } from 'react-icons/md'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { CiSearch, CiViewList } from 'react-icons/ci'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import ProductModal from '../components/ui/ProductModal'

const Product = () => {
  const recordsPerPage = 10
  const [activePage, setPage] = useState(1)
  const startIndex = (activePage - 1) * recordsPerPage
  const [opened, { open, close }] = useDisclosure(false)
  const [item, setItem] = useState<InventoryType | null>(null)
  const [isViewing, setIsViewing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [searchItem, setSearchItem] = useState('')
  const [modalTitle, setModalTitle] = useState('Add Inventory')

  const { data: inventory, refetch } = fetchInventorysQuery(['inventory'])
  const [filteredData, setFilteredData] = useState(inventory?.data)

  useEffect(() => {
    if (searchItem.trim() !== '') {
      setFilteredData(
        inventory.data.filter((item) =>
          item.name.toLowerCase().includes(searchItem.toLowerCase())
        )
      )
    } else {
      setFilteredData(inventory?.data)
    }
  }, [searchItem, inventory?.data])

  const form = useForm<InventoryFormData>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      barcode: '',
      category: '',
      brand: '',
      buyingPrice: null,
      sellingPrice: null,
      productUnit: '',
      quantity: null,
      taxType: '',
      description: '',
      productType: '',
    },
    validate: zodResolver(inventorySchema),
  })

  const { mutate, isLoading } = createInventoryMutation(
    (error: AxiosError | any) => {
      console.log(error)
    },
    () => {
      form.reset()
      close()
      refetch()
      console.log('Inventory item created successfully')
    }
  )

  const { mutate: updateMutate, isLoading: isUpdating } =
    updateInventoryMutation(
      (error: AxiosError | any) => {
        console.log(error)
      },
      () => {
        form.reset()
        close()
        refetch()
        // console.log('Inventory item updated successfully')
      }
    )

  const { mutate: deleteMutate, isLoading: isDeleted } =
    deleteInventoryMutation(
      (error: AxiosError | any) => {
        console.log(error)
      },
      () => {
        form.reset()
        refetch()
        close()
        console.log('Inventory item deleted successfully')
      }
    )

  const onSave = (values: InventoryFormData) => {
    try {
      if (item) {
        console.log(`we are updating ${item.id}`)
        // @ts-ignore
        values.id = item.id
        updateMutate(values)
      } else {
        console.log(values)
        mutate(values)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onDeleteButton = (value: InventoryFormData) => {
    try {
      if (item) {
        console.log(`we are Deleting ${item}`)
        // @ts-ignore
        value.id = item.id
        deleteMutate(value)
      } else {
        mutate(item.id)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (item && !isDeleting && !isViewing) {
      form.setValues({
        barcode: item.barcode,
        name: item.name,
        category: item.category.name,
        brand: item.brand.name,
        buyingPrice: item.buyingPrice,
        sellingPrice: item.sellingPrice,
        productUnit: item.productUnit,
        quantity: item.quantity,
        taxType: item.taxType,
        description: item.description,
        productType: item.productType,
      })
    }
  }, [item])

  const onClose = () => {
    close()
    setItem(null)
    setIsViewing(false)
    setIsEditing(false)
    setIsDeleting(false)
    setModalTitle('Add Inventory')
    form.reset()
  }

  const onEdit = (filteredData: InventoryType) => {
    setItem(filteredData)
    setModalTitle('Edit Inventory')
    setIsEditing(true)
    open()
  }
  const onView = (filteredData: InventoryType) => {
    setItem(filteredData)
    setModalTitle('View Inventory')
    setIsViewing(true)
    open()
  }

  const onDelete = (filteredData: InventoryType) => {
    setItem(filteredData)
    setModalTitle('Delete Inventory')
    setIsDeleting(true)
    open()
  }

  const column: Column<InventoryType>[] = [
    { heading: 'Name', value: 'name' },
    { heading: 'Code', value: 'barcode' },
    { heading: 'Category', value: 'category.name' },
    { heading: 'Brand', value: 'brand.name' },
    { heading: 'Buying Price', value: 'buyingPrice' },
    { heading: 'Selling Price', value: 'sellingPrice' },
    { heading: 'Product Unit', value: 'productUnit' },
    { heading: 'Quantity', value: 'quantity' },
    { heading: 'Tax Type', value: 'taxType' },
    { heading: 'Description', value: 'description' },
    { heading: 'Product Type', value: 'productType' },
    {
      heading: 'Action',
      render: (item) => (
        <Menu withArrow>
          <Menu.Target>
            <UnstyledButton>
              <Group className="gap-1  text-blue-400 ">
                <Text className="flex justify-between" size="sm" fw={500}>
                  Action
                </Text>
              </Group>
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<CiViewList />}
              onClick={() => onView(item)}
            >
              View
            </Menu.Item>

            <Menu.Item leftSection={<FaEdit />} onClick={() => onEdit(item)}>
              Edit
            </Menu.Item>
            <Menu.Item
              leftSection={<MdDelete />}
              onClick={() => onDelete(item)}
            >
              delete
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ),
    },
  ]

  return (
    <Grid>
      <GridCol>
        <p>Product/List</p>
      </GridCol>

      <GridCol span={12}>
        <div className="flex flex-wrap gap-2">
          <Button
            className="px-10"
            variant="gradient"
            gradient={{ from: 'lime', to: 'green', deg: 284 }}
            size="md"
            leftSection={<IoMdAddCircleOutline />}
            onClick={() => {
              open()
            }}
          >
            Add Item
          </Button>
          <FileButton onChange={setFile} accept="image/png,image/jpeg">
            {(props) => (
              <Button
                {...props}
                className="px-10"
                variant="gradient"
                size="md"
                gradient={{ from: 'blue', to: 'green', deg: 284 }}
                leftSection={<MdLibraryAdd />}
              >
                Import Product
              </Button>
            )}
          </FileButton>
        </div>
      </GridCol>
      <GridCol span={12} className="flex flex-wrap">
        <GridCol span={9}>
          <TextInput
            leftSection={<CiSearch />}
            className="w-2/3"
            size="md"
            placeholder="Search..."
            onChange={(e) => setSearchItem(e.target.value)}
          />
        </GridCol>
        <GridCol span={3} className="flex flex-wrap gap-2">
          <Button.Group className="gap-2">
            <Button variant="default">
              <MdLibraryAdd />
              <Menu withArrow>
                <Menu.Target>
                  <UnstyledButton>
                    <Group className="">
                      <Text
                        variant="gradient"
                        gradient={{ from: 'lime', to: 'green', deg: 284 }}
                        className="flex justify-between"
                        fw={500}
                      >
                        Filter
                      </Text>
                    </Group>
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item

                  // onClick={() => onView(row)}
                  >
                    Name
                  </Menu.Item>

                  <Menu.Item
                  // onClick={() => onEdit(row)}
                  >
                    Category
                  </Menu.Item>
                  <Menu.Item

                  // onClick={() => onDelete(row)}
                  >
                    Sub-category
                  </Menu.Item>
                  <Menu.Item

                  // onClick={() => onDelete(row)}
                  >
                    Stock
                  </Menu.Item>
                  <Menu.Item

                  // onClick={() => onDelete(row)}
                  >
                    Price
                  </Menu.Item>
                </Menu.Dropdown>
                {/* ... menu items */}
              </Menu>
            </Button>
            <Button variant="default">
              <FaFilePdf />
            </Button>
            <Button variant="default">
              <FaFileCsv />
            </Button>
            <Button variant="default">
              <FaPrint />
            </Button>
          </Button.Group>
        </GridCol>
      </GridCol>
      <GridCol>
        <ProductModal
          onClose={onClose}
          opened={opened}
          isViewing={isViewing}
          isLoading={isLoading}
          isDeleting={isDeleting}
          onSave={onSave}
          onDeleteButton={onDeleteButton}
          item={item}
          form={form}
          modalTitle={modalTitle}
          formName="add"
        />
      </GridCol>
      <GridCol>
        <Card shadow="xl" padding="" radius="lg" withBorder>
          <ProductTable data={filteredData} column={column} />
          <Pagination
            className="flex justify-center my-4"
            total={Math.ceil(inventory?.data.length ?? 0 / recordsPerPage)}
            value={activePage}
            onChange={setPage}
          />
        </Card>
      </GridCol>
    </Grid>
  )
}

export default Product
