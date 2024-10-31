import { Grid, Stack } from '@mantine/core'
import InveImg from '../image/Inve4.avif'
import NavGrid from '../components/ui/NavGrid'
import ButtonComponent from '../components/ui/Button'

const Home = () => {
  return (
    <div className="mx-8">
      <div className="h-24">
        <NavGrid />
      </div>
      <div className="mt-16">
        <Grid>
          <Grid.Col
            className="flex items-center text-customOne text-center"
            span={4}
          >
            <Stack className="gap-14">
              <p className="text-6xl text-center text-customOnes">
                Inventroy Management System
              </p>
              <p>
                Our Inventory Management System (IMS) website simplifies stock
                tracking and management for businesses. With a user-friendly
                interface, users can easily add, update, and remove inventory
                items.
              </p>

              <ButtonComponent buttonName="Learn More" />
            </Stack>
          </Grid.Col>
          <Grid.Col className="h-full w-full" span={8}>
            <img className=" h-full w-full object-cover" src={InveImg} alt="" />
          </Grid.Col>
        </Grid>
      </div>
    </div>
  )
}

export default Home
