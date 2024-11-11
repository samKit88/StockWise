import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { TokenResponse } from '../../types/User.types'
import { SigninForm } from '../../schema/SigninSchema'
import { signInUser } from '../api/signinApi'
import { SignupForm } from '../../schema/SignupSchema'
import { signUpUser } from '../api/signupApi'

export const SigninMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
): UseMutationResult<TokenResponse, AxiosError, SigninForm> => {
  return useMutation({
    mutationFn: signInUser,
    onSuccess: onSuccess,
    onError: onError,
  })
}

export const SignUpMutation = (
  onError?: (error: AxiosError | any) => void,
  onSuccess?: (data: any) => void
): UseMutationResult<TokenResponse, AxiosError, SignupForm> => {
  return useMutation({
    mutationFn: signUpUser,
    onSuccess,
    onError,
  })
}
