import { PasswordInput, TextInput } from '@mantine/core'
import { type UseFormReturnType } from '@mantine/form'
import { SignupForm } from '../../schema/SignupSchema'

interface FormType {
  form: UseFormReturnType<SignupForm>
  type: string
}

const TextInputComponent = ({ form, type }: FormType) => {
  return (
    <>
      {type === 'signup' && (
        <>
          <TextInput
            className="my-1 flex flex-col gap-6 text-gray-700"
            label="First Name"
            placeholder="Enter your first name"
            {...form.getInputProps('firstName')}
            withAsterisk
          />
          <TextInput
            className="pt-3 flex flex-col gap-6 text-gray-700"
            label="Last Name"
            placeholder="Enter your last name"
            {...form.getInputProps('lastName')}
            withAsterisk
          />
        </>
      )}
      <TextInput
        className="mt-3 flex flex-col gap-6 text-gray-700"
        label="Email"
        placeholder="example@mail.com"
        {...form.getInputProps('email')}
        withAsterisk
      />
      <PasswordInput
        className="pt-3 flex flex-col gap-6 text-gray-700"
        label="Password"
        placeholder="use strong password"
        {...form.getInputProps('password')}
        withAsterisk
      />
    </>
  )
}

export default TextInputComponent
