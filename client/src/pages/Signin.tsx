import { useForm, zodResolver } from '@mantine/form'
import { AxiosError } from 'axios'
import AuthForm from '../components/ui/Form'
import { useNavigate } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { SigninForm, signinSchema } from '../schema/SigninSchema'
import { useAppDispatch } from '../services/store/store'
import { dispatchUser } from '../services/store/slice/userDispatcher'
import { SigninMutation } from '../services/shared/user.query'
import { TokenResponse } from '../types/User.types'
import { FormFiled, signInConfig } from '../types/FormFileds'

const Signin = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { mutate, isLoading } = SigninMutation(
    (error: AxiosError | any) => {
      // console.error(`mutation error ${error}`)
      notifications.show({
        title: 'Error',
        autoClose: 5000,
        message: error?.response?.data.message || 'An error occurred',
        color: 'red',
      })
    },
    (data: TokenResponse) => {
      // console.log(data)
      dispatchUser(data, dispatch)
      navigate('/dashboard')
    }
  )

  const onSave = async (values: SigninForm) => {
    try {
      // console.log(values)
      mutate(values)
    } catch (error) {
      console.log(error)
    }
  }

  const form = useForm<SigninForm>({
    initialValues: {
      email: '',
      password: '',
    },

    validate: zodResolver(signinSchema),
  })

  const formConfigs = {
    signin: signInConfig,
  }

  const config = formConfigs.signin
  return (
    <div className="h-screen flex justify-center bg-gray-50 ">
      <div className="bg-white p-8  rounded-lg shadow-lg w-full max-w-lg my-auto">
        <p className='className="text-2xl font-bold mb-6 text-center"'>
          SignIn
        </p>
        <AuthForm
          form={form}
          onSave={onSave}
          isLoading={isLoading}
          type="signin"
          fields={config.fields}
        />
      </div>
    </div>
  )
}

export default Signin
