import {
  Button,
  Grid,
  GridCol,
  Group,
  Menu,
  Text,
  TextInput,
} from '@mantine/core'
import { randomId, useDisclosure } from '@mantine/hooks'
import { CiSearch } from 'react-icons/ci'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa6'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { MdLibraryAdd } from 'react-icons/md'
import SalesModal from '../components/ui/SalesModal'
import PurchaseForm from '../components/ui/PurchaseForm'
import { useForm, zodResolver } from '@mantine/form'
import { PurchaseFormData, purchaseSchama } from '../schema/purchaseSchema'
import { createSalesMutation } from '../services/shared/sales.query'
import { createPurchaseMutation } from '../services/shared/purchase.query'
import { AxiosError } from 'axios'

const Purchase = () => {
  const [opened, { open, close }] = useDisclosure(false)

  const form = useForm<PurchaseFormData>({
    mode: 'uncontrolled',
    initialValues: {
      orderDate: new Date(),
      purchaseNumber: '',
      partnerId: '',
      purchaseItems: [
        { inventoryId: '', quantity: 0, unitPrice: 0, key: randomId() },
      ],
    },
    validate: zodResolver(purchaseSchama),
  })

  const { mutateAsync, isLoading } = createPurchaseMutation(
    (error: AxiosError | any) => console.log(error),
    () => {
      form.reset()
      close()
      // refetch()
    }
  )

  const onSave = (values: PurchaseFormData) => {
    values.orderDate = new Date(values.orderDate)
    mutateAsync(values)
  }

  const onClose = () => {
    close()
  }

  return (
    <Grid className="pt-4">
      <GridCol>
        <Text>Purchase/List</Text>
      </GridCol>
      <GridCol className="pt-10">
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
            Add Purchase
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
          <PurchaseForm
            opened={opened}
            onClose={onClose}
            form={form}
            onSave={onSave}
            // modalTitle={modalTitle}
          />
        </GridCol>
      </GridCol>
    </Grid>
  )
}

export default Purchase
