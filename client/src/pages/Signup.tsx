import { useForm, zodResolver } from '@mantine/form'
import { AxiosError } from 'axios'
import AuthForm from '../components/ui/Form'
import { useNavigate } from 'react-router-dom'
import { SignupForm, signupSchema } from '../schema/SignupSchema'
import { useAppDispatch } from '../services/store/store'
import { dispatchUser } from '../services/store/slice/userDispatcher'
import { logout } from '../services/store/slice/authSlice'
import { TokenResponse } from '../types/User.types'
import { SignUpMutation } from '../services/shared/user.query'
import { signUpConfig } from '../types/FormFileds'

function Signup() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { mutateAsync, isLoading } = SignUpMutation(
    (error: AxiosError | any) => {
      console.log(error)
    },
    (data: TokenResponse) => {
      dispatchUser(data, dispatch)
    }
  )

  const onSave = async (values: SignupForm) => {
    try {
      console.log(values)

      await mutateAsync(values)
      dispatch(logout())
      navigate('/signin')
      // console.log(values)
    } catch (error) {
      console.log(error)
    }
  }

  const form = useForm<SignupForm>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },

    validate: zodResolver(signupSchema),
  })
  // console.log(form.values)

  const formConfigs = {
    signup: signUpConfig,
  }

  const config = formConfigs['signup']
  return (
    <div className="h-screen flex justify-center bg-gray-50 ">
      <div className="bg-white p-8  rounded-lg shadow-lg w-full max-w-lg my-auto">
        <p className='className="text-2xl font-bold mb-6 text-center"'>
          Signup
        </p>
        <AuthForm
          form={form}
          onSave={onSave}
          isLoading={isLoading}
          type="signup"
          fields={config.fields}
        />
      </div>
    </div>
  )
}

export default Signup
