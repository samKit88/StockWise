import { Button } from '@mantine/core'

interface ButtonPro {
  isLoading?: any
  buttonName: string
}

const ButtonComponent = ({ isLoading, buttonName }: ButtonPro) => {
  return (
    <Button
      className="mx-auto w-28 mt-6 py-2 rounded-lg"
      type="submit"
      fullWidth
      loading={isLoading}
      loaderProps={{
        type: 'dots',
      }}
    >
      {buttonName}
    </Button>
  )
}

export default ButtonComponent
