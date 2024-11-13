import {
  Button,
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
import SalesModal from '../components/ui/SalesModal'
import { useDisclosure } from '@mantine/hooks'
import ShipmentModal from '../components/ui/SalesModal'
import ShipmentForm from '../components/ui/ShipmentForm'

const Ship = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const onClose = () => {
    close()
  }
  //   const modalTitle = 'New Shipment'

  //   const form = []
  //   const item = []
  //   const column = []
  //   const filteredData = []
  //   const onSave = () => {}
  //   const onClose = () => {}
  return (
    <Grid className="pt-4">
      <GridCol>
        <Text>Ship/List</Text>
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
            <Text>Add Shipment</Text>
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
          <ShipmentForm
            opened={opened}
            onClose={onClose}
            // form={form}
            // onSave={onSave}
            // modalTitle={modalTitle}
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
            {/* <ProductTable data={filteredData} column={column} /> */}
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

export default Ship
