import { type UseFormReturnType } from '@mantine/form'

import React from 'react'
import { Card } from '@mantine/core'
import { SigninForm } from '../../schema/SigninSchema'
import { SignupForm } from '../../schema/SignupSchema'
import ButtonComponent from './Button'
import TextInputComponent from './TextInput'

interface SigninFormProps {
  form: UseFormReturnType<SigninForm>
  onSave: (values: SigninForm) => void
  isLoading: boolean
  type: string
}

interface SignupFormProps {
  form: UseFormReturnType<SignupForm>
  onSave: (values: SignupForm) => void
  isLoading: boolean
}

const AuthForm: React.FC<SigninFormProps> = ({
  form,
  onSave,
  isLoading,
  type,
}) => {
  return (
    <>
      <Card className="mb-4">
        <form
          className=" px-3 py-2 border border-gray-150 rounded-lg "
          onSubmit={form.onSubmit(onSave)}
        >
          {' '}
          {type === 'signin' ? (
            <>
              <TextInputComponent form={form} type="signin" />
              <ButtonComponent isLoading={isLoading} buttonName="Sign In" />
            </>
          ) : (
            <>
              <TextInputComponent form={form} type="signup" />
              <ButtonComponent isLoading={isLoading} buttonName="SignUp" />
            </>
          )}
        </form>
      </Card>
    </>
  )
}

export default AuthForm
