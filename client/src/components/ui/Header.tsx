import {
  Button,
  FileButton,
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

const Header = ({
  setFile,
  setSearchQuery,
  open,
  title,
  subTitle,
  addButtonName,
  importButtonName,
}) => {
  return (
    <Grid className=" w-full mr-4 pl-4">
      <GridCol className="bg-white">
        <Text>{title}</Text>
        <Text className="py-6 text-sm text-gray-400">{subTitle}</Text>
      </GridCol>
      <GridCol className="px-7 mt-7 pl-5">
        <GridCol>
          <Button
            className="px-10 mr-1"
            variant="gradient"
            gradient={{ from: 'lime', to: 'green', deg: 284 }}
            size="md"
            leftSection={<IoMdAddCircleOutline />}
            onClick={() => {
              open()
            }}
          >
            {addButtonName}
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
                {importButtonName}
              </Button>
            )}
          </FileButton>
        </GridCol>

        <GridCol span={12} className="flex pl-0 ">
          <GridCol span={8}>
            <TextInput
              leftSection={<CiSearch />}
              // className="w-2/3"
              size="md"
              placeholder="Search..."
              onChange={(e) => setSearchQuery(e.target.value)}
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
      </GridCol>
    </Grid>
  )
}

export default Header
