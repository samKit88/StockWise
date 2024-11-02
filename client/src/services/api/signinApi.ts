import axios, { AxiosError } from 'axios'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { SigninForm } from '../../schema/SigninSchema'
import { TokenResponse } from '../../types/User.types'

export const signInUser = async (data: SigninForm): Promise<TokenResponse> => {
  console.log(`signin data ${data}`)
  const response = await axios.post('http://localhost:3000/auth/signin', data)
  console.log(`response data ${response.data}`)
  return response.data
}
