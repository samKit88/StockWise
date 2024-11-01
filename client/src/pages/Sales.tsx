import {
  Button,
  ButtonGroup,
  Card,
  Grid,
  GridCol,
  Group,
  Menu,
  Text,
  TextInput,
} from '@mantine/core'
import { CiSearch } from 'react-icons/ci'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa6'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdLibraryAdd } from 'react-icons/md'
import ProductTable from '../components/ProductTable'
import Modals from '../components/ui/Modal'
import { randomId, useDisclosure } from '@mantine/hooks'
import { useForm, zodResolver } from '@mantine/form'
import {
  SalesFormData,
  salesItemsSchema,
  salesSchema,
} from '../schema/salesSchema'
import { useEffect, useState } from 'react'
import {
  createSalesMutation,
  fetchSalesQuery,
} from '../services/shared/sales.query'
import { AxiosError } from 'axios'
import SalesModal from '../components/ui/SalesModal'

const Sales = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const modalTitle = 'New Sales Order'

  const { data: sales, refetch } = fetchSalesQuery(['sales'])
  const [filteredData, setFilteredData] = useState(sales?.data)

  useEffect(() => {
    setFilteredData(sales?.data)
  }, [sales])

  // useEffect(() => {
  //   console.log('filtered Data', filteredData)
  // }, [sales, filteredData])

  const item = []
  const form = useForm<SalesFormData>({
    mode: 'uncontrolled',
    initialValues: {
      salesNumber: '',
      orderDate: new Date(),
      partnerId: '',
      salesItems: [
        { inventoryId: '', quantity: 0, unitPrice: 0, key: randomId() },
      ],
    },

    // transformValues: (values) => ({
    //   partnerId: parseInt(String(values.partnerId)),
    // }),
    validate: zodResolver(salesSchema),
  })

  const { mutateAsync, isLoading } = createSalesMutation(
    (error: AxiosError | any) => console.log(error),
    () => {
      form.reset()
      close()
      refetch()
    }
  )

  const column = [
    { heading: '#', value: 'orderNumber' },
    { heading: 'Customer', value: 'partner' },
    { heading: 'Order#', value: 'salesNumber' },
    { heading: 'Order Date', value: 'orderdDate' },
    { heading: 'Total Amount', value: 'totalAmount' },
    { heading: 'Action', render: () => <Button>Action</Button> },
  ]
  const data = []

  const onSave = (values: SalesFormData) => {
    values.orderDate = new Date(values.orderDate)
    mutateAsync(values)
  }

  const onClose = () => {
    close()
  }

  return (
    <Grid className="pt-4">
      <GridCol>
        <Text>Sales/List</Text>
      </GridCol>
      <GridCol className=" pt-10">
        <GridCol>
          <Button
            className="px-10"
            variant="gradient"
            gradient={{ from: 'teal', to: 'lime', deg: 96 }}
            size="md"
            leftSection={<IoMdAddCircleOutline />}
            onClick={() => {
              open()
            }}
          >
            <Text>Add Sales</Text>
          </Button>
        </GridCol>
        <GridCol span={12} className="flex">
          <GridCol span={8}>
            <TextInput
              leftSection={<CiSearch />}
              size="md"
              className="w-2/3"
              placeholder="Search..."
            />
          </GridCol>
          <GridCol span={4} className="gap-x-5">
            <Group gap="xs" justify="end">
              <Button
                variant="default"
                className="border-purple-500 text-purple-500  "
                size="md"
                radius="md"
                leftSection={<MdLibraryAdd />}
              >
                <Menu withArrow>
                  <Menu.Target>
                    <Text>Filter</Text>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                    // onClick={() => onView(row)}
                    >
                      Standard
                    </Menu.Item>
                    <Menu.Item
                    // onClick={() => onEdit(row)}
                    >
                      Casual
                    </Menu.Item>
                    <Menu.Item
                    // onClick={() => onDelete(row)}
                    >
                      Local
                    </Menu.Item>
                    <Menu.Item
                    // onClick={() => onDelete(row)}
                    >
                      Foreign
                    </Menu.Item>
                  </Menu.Dropdown>
                  {/* ... menu items */}
                </Menu>
              </Button>

              <Button
                variant="default"
                className="flex justify-center border-orange-400 text-orange-400"
                size="md"
                radius="md"
                children={<FaFilePdf />}
              />

              <Button
                variant="default"
                className="flex justify-center  border-green-400 text-green-400"
                size="md"
                radius="md"
                children={<FaFileCsv />}
              />
              <Button
                variant="default"
                className="flex justify-center  border-indigo-500 text-indigo-500"
                size="md"
                radius="md"
                children={<FaPrint />}
              />
            </Group>
          </GridCol>
        </GridCol>
        <GridCol>
          <SalesModal
            onClose={onClose}
            opened={opened}
            // isViewing={isViewing}
            // isLoading={isLoading}
            // isDeleting={isDeleting}
            onSave={onSave}
            // onDeleteButton={onDeleteButton}
            item={item}
            form={form}
            modalTitle={modalTitle}
            formName="sales"
          />
        </GridCol>
        <GridCol>
          <Card
            // className="my-8 mr-3"
            shadow="xl"
            padding=""
            radius="lg"
            withBorder
          >
            <ProductTable data={filteredData} column={column} />
            {/* <Pagination
              className="flex justify-center my-4"
              total={Math.ceil(inventory?.data.length ?? 0 / recordsPerPage)}
              value={activePage}
              onChange={setPage}
            /> */}
          </Card>
        </GridCol>
      </GridCol>
    </Grid>
  )
}

export default Sales
