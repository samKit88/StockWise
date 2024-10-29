import { Grid, Image } from '@mantine/core'
import { Link, Outlet } from 'react-router-dom'
import InveImgTwo from '../../image/Inve5.png'

const NavGrid = () => {
  return (
    <>
      <Grid className="pt-6 pr-14  w-full max-w-full">
        <Grid.Col span={7} className="flex ">
          <Grid.Col span="auto">
            <Image
              src={InveImgTwo}
              alt="Logo"
              width={1} // Adjust width as needed
              fit="contain" // or "cover" based on your preference
            />
          </Grid.Col>
          <Grid.Col span={10} className="text-3xl text-center text-customOnes">
            <p className="flex items-start">InveTraker</p>
          </Grid.Col>
        </Grid.Col>

        <Grid.Col
          className="py-5 text-base text-customOne cursor-pointer transition duration-300  hover:text-teal-500 uppercase flex item-center "
          span="auto"
        >
          <Link to={'/'}> Home </Link>
        </Grid.Col>
        <Grid.Col
          className="py-5 text-base text-customOne  cursor-pointer transition duration-300  hover:text-teal-500 uppercase flex item-center gap-5"
          span="auto"
        >
          <Link to={'/about'}> About us </Link>
        </Grid.Col>
        <Grid.Col
          className="py-5 text-base text-customOne  cursor-pointer transition duration-300  hover:text-teal-500 uppercase flex item-center gap-5"
          span="auto"
        >
          <Link to={'/info'}> Info </Link>
        </Grid.Col>
        <Grid.Col
          className="py-5 text-base text-customOne  cursor-pointer transition duration-300  hover:text-teal-500 uppercase flex item-center gap-5"
          span="auto"
        >
          <Link to={'/signin'}> Login </Link>
        </Grid.Col>
        <Grid.Col
          className="py-5 text-base text-customOne  cursor-pointer transition duration-300  hover:text-teal-500 uppercase flex item-center gap-5"
          span="auto"
        >
          <Link to={'/signup'}>Signup</Link>
        </Grid.Col>
      </Grid>
      <Outlet />
    </>
  )
}

export default NavGrid
