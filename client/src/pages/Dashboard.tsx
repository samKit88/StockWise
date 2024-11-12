import {
  AppShell,
  Avatar,
  Button,
  Grid,
  GridCol,
  Group,
  Image,
  Menu,
  Text,
  TextInput,
  UnstyledButton,
} from '@mantine/core'
import { IoLogOutOutline } from 'react-icons/io5'
import { SlArrowRight } from 'react-icons/sl'
import { VscGraph } from 'react-icons/vsc'
import {
  FaTradeFederation,
  FaPeopleGroup,
  FaProductHunt,
  FaExplosion,
  FaUsersRays,
  FaReplyAll,
  FaMoneyBillTransfer,
  FaWarehouse,
  FaAddressCard,
} from 'react-icons/fa6'
import { useDisclosure } from '@mantine/hooks'
import { forwardRef, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { logout } from '../services/store/slice/authSlice'
import InveImg from '../image/Inve4.avif'
import LogoImage from '../image/StockWiseLogo.webp'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../services/store/store'
import { CiSearch } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'

const data = [
  { link: './product', label: 'Product', icon: <FaProductHunt /> },
  { link: './partner', label: 'Partner', icon: <FaPeopleGroup /> },
  { link: './sales', label: 'Sales', icon: <VscGraph /> },
  { link: './purchase', label: 'Purchase', icon: <FaMoneyBillTransfer /> },
  { link: './trading', label: 'Trading', icon: <FaTradeFederation /> },
  { link: '', label: 'Expesne', icon: <FaExplosion /> },
  { link: '.', label: 'User Management', icon: <FaUsersRays /> },
  { link: '.', label: 'Reports', icon: <FaReplyAll /> },
  { link: '.', label: 'Warehouse', icon: <FaWarehouse /> },
  { link: '.', label: 'Administrative Tools', icon: <FaAddressCard /> },
]

interface UserButton extends React.ComponentPropsWithoutRef<'button'> {
  image: string
  name: string
  role: string
  icon?: React.ReactNode
}

const UserButton = forwardRef<HTMLButtonElement, UserButton>(
  ({ image, name, role, icon, ...others }: UserButton, ref) => (
    <UnstyledButton
      ref={ref}
      style={{
        padding: 'var(--mantine-spacing-md)',
        color: 'var(--mantine-color-text)',
        borderRadius: 'var(--mantine-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={InveImg} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {role}
          </Text>
        </div>

        {icon || <SlArrowRight />}
      </Group>
    </UnstyledButton>
  )
)

const Dashboard = () => {
  const [opened, { toggle }] = useDisclosure()
  const navigate = useNavigate()
  const [active, setActive] = useState<'olala' | 'Company'>('olala')
  const dispatch = useAppDispatch()
  const auth = useSelector((state: RootState) => state.auth)

  const onLogOut = () => {
    dispatch(logout())
    navigate('/signin')
  }

  return (
    <AppShell
      // header={{ height: 60 }}
      navbar={{
        width: 225,
        breakpoint: 'sm',
        // collapsed: { mobile: !opened },
      }}
      // padding="sm"
      className="flex"
    >
      {/* <AppShell.Header className="flex justify-end ">
        <Menu withArrow>
          <Menu.Target>
            <UserButton image={InveImg} name={auth.user} role="admin" />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item component="a" href="#">
              Your work space
            </Menu.Item>
            <Menu.Item
              leftSection={<IoLogOutOutline />}
              component="a"
              onClick={onLogOut}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </AppShell.Header> */}

      <AppShell.Navbar p="md" className="w-52">
        <Image src={LogoImage} />
        {data?.map((data) => (
          <div key={data.label}>
            <Button
              fullWidth
              size="sm"
              variant={active === data.label ? 'light' : 'transparent'}
              leftSection={data.icon}
              className="text-sm font-medium text-gray-900 hover:bg-gray-100 mt-2"
              justify="start"
              onClick={(e) => {
                e.preventDefault()
                setActive(data.label as any)
                navigate(data.link)
              }}
            >
              {data.label}
            </Button>
          </div>
        ))}
      </AppShell.Navbar>

      <AppShell.Main className="ml-0 w-full">
        <Grid>
          <GridCol className="flex justify-end ">
            <TextInput
              radius={10}
              size="md"
              leftSection={<CiSearch />}
              className="w-1/4 mt-4"
              placeholder="Search..."
            />
            {/* <Button> */}
            <IoIosNotificationsOutline className="mt-4 size-10" />
            {/* </Button> */}
            <Menu withArrow>
              <Menu.Target>
                <UserButton image={InveImg} name={auth.user} role="admin" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item component="a" href="#">
                  Your work space
                </Menu.Item>
                <Menu.Item
                  leftSection={<IoLogOutOutline />}
                  component="a"
                  onClick={onLogOut}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </GridCol>
          <GridCol>
            <Outlet />
          </GridCol>
        </Grid>
      </AppShell.Main>
    </AppShell>
  )
}

export default Dashboard
