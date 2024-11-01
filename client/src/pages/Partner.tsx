import { useForm, zodResolver } from '@mantine/form'
import { AxiosError } from 'axios'
import { PartnerFormType, partnerSchema } from '../schema/partnerSchema'
import {
  createPartnerMutation,
  deletePartnerMutation,
  fetchPartnerQuery,
  updatePartnerMutation,
} from '../services/shared/partner.query'

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
import { IoMdAddCircleOutline } from 'react-icons/io'
import { CiSearch } from 'react-icons/ci'
import { useEffect, useState } from 'react'
import { MdLibraryAdd } from 'react-icons/md'
import { FaFileCsv, FaFilePdf, FaPrint } from 'react-icons/fa6'
import Modals from '../components/ui/Modal'
import ProductTable, { Column } from '../components/ProductTable'
import { useDisclosure } from '@mantine/hooks'
import { PartnerResponsType } from '../types/Partner.types'
import { IoEyeOutline } from 'react-icons/io5'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin5Line } from 'react-icons/ri'
import PartnerModal from '../components/ui/PartnerModal'

function Partner() {
  const [searchItem, setSearchItem] = useState('')
  const [opened, { open, close }] = useDisclosure(false)
  const [isViewing, setIsViewing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [userData, setUserData] = useState<PartnerResponsType | null>(null)
  const [modalTitle, setModalTitle] = useState('Add Partner')

  const { data: partner, refetch } = fetchPartnerQuery(['partner'])
  const [filteredData, setFilteredData] = useState(partner)

  useEffect(() => {
    setFilteredData(partner)
  }, [filteredData, partner])

  const { mutateAsync, isLoading } = createPartnerMutation(
    (error: AxiosError | any) => {
      console.log(error)
    },
    () => {
      form.reset()
      close()
      refetch()
      console.log('People created successfully')
    }
  )

  const { mutateAsync: updateMutate, isLoading: isUpdated } =
    updatePartnerMutation(
      (error: AxiosError | any) => console.log(error),
      () => {
        form.reset()
        refetch()
        console.log('Partner updated successfully')
      }
    )

  const { mutateAsync: deleteMutate } = deletePartnerMutation(
    (error: AxiosError | any) => {
      console.log(error)
    },
    () => {
      refetch(), form.reset, close()
    }
  )

  const onSave = (values: PartnerFormType) => {
    try {
      if (userData) {
        values.id = userData.id
        updateMutate(values)
        onClose()
      } else {
        mutateAsync(values)
      }

      // console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  const form = useForm<PartnerFormType>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      customerGroup: '',
      phoneNumber: 0,
      country: '',
      city: '',
      address: '',
      zipCode: 0,
      customer: 0,
      supplier: '',
    },

    validate: zodResolver(partnerSchema),
  })

  useEffect(() => {
    if (userData && !isViewing && !isDeleting)
      form.setValues({
        name: userData.name,
        email: userData.email,
        customerGroup: userData.customerGroup,
        phoneNumber: userData.phoneNumber,
        country: userData.country,
        city: userData.city,
        address: userData.address,
        zipCode: userData.zipCode,
      })
  }, [userData])
  const onClose = () => {
    close()
    setUserData(null)
    setIsViewing(false)
    setIsEditing(false)
    setIsDeleting(false)
    setModalTitle('Add Partner')
    form.reset()
  }

  const onView = (filteredData: PartnerResponsType) => {
    setUserData(filteredData)
    setModalTitle('View Patner')
    setIsViewing(true)
    open()
  }

  const onEdit = (filteredData: PartnerResponsType) => {
    setUserData(filteredData)
    setModalTitle('Edit Partner')
    setIsEditing(true)
    open()
    console.log(userData)
  }

  const onDelete = (filteredData: PartnerResponsType) => {
    setUserData(filteredData)
    setModalTitle('Delete Partner')
    setIsDeleting(true)
    open()
    console.log(userData)
  }

  const onDeleteButton = (value: PartnerFormType) => {
    try {
      if (userData) {
        value.id = userData.id
        deleteMutate(value)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const column: Column<PartnerResponsType>[] = [
    { heading: 'Name', value: 'name' },
    { heading: 'Email', value: 'email' },
    { heading: 'Customer Group', value: 'customerGroup' },
    { heading: 'phoneNumber', value: 'phoneNumber' },
    { heading: 'Country', value: 'country' },
    { heading: 'City', value: 'city' },
    { heading: 'Address', value: 'address' },
    { heading: 'ZipCode', value: 'zipCode' },
    {
      heading: 'Action',
      render: (userData) => (
        <Grid className="">
          <GridCol>
            <Button
              className="bg-green-100 mr-4"
              variant="default"
              radius={5}
              onClick={() => onView(userData)}
            >
              <IoEyeOutline className="mr-3 " />
              <Text>View</Text>
            </Button>
            <Button
              className="mr-3 bg: bg-transparent border-none"
              variant="default"
              onClick={() => onEdit(userData)}
            >
              <FiEdit />
            </Button>
            <Button
              className="bg:bg-transparent border-none "
              variant="default"
              onClick={() => onDelete(userData)}
            >
              <RiDeleteBin5Line className="colo" />
            </Button>
          </GridCol>
        </Grid>
      ),
    },
  ]

  return (
    <Grid className="pt-4">
      <GridCol>
        <Text>Partner/List</Text>
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
            <Text>Add Partner</Text>
          </Button>
        </GridCol>
        <GridCol span={12} className="flex ">
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
          <PartnerModal
            onClose={onClose}
            opened={opened}
            isViewing={isViewing}
            isLoading={isLoading}
            isDeleting={isDeleting}
            onSave={onSave}
            onDeleteButton={onDeleteButton}
            item={userData}
            form={form}
            modalTitle={modalTitle}
            formName="partner"
          />
        </GridCol>

        <GridCol>
          <Card shadow="xl" padding="" radius="lg" withBorder>
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

export default Partner
